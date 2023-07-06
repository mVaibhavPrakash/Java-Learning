# Parallel Stream

Let's start with a simple example – calling the parallelStream method on any of the Collection types – which will return a possibly parallel Stream:

```java
@Test
public void givenList_whenCallingParallelStream_shouldBeParallelStream(){
    List<Long> aList = new ArrayList<>();
    Stream<Long> parallelStream = aList.parallelStream();
        
    assertTrue(parallelStream.isParallel());
}
```
The default processing that occurs in such a Stream uses the ForkJoinPool.commonPool(), a thread pool shared by the entire application.


## Custom Thread Pool

We can actually pass a custom ThreadPool when processing the stream.

The following example lets have a parallel Stream use a custom ThreadPool to calculate the sum of long values from 1 to 1,000,000, inclusive:

```java
@Test
public void giveRangeOfLongs_whenSummedInParallel_shouldBeEqualToExpectedTotal() 
  throws InterruptedException, ExecutionException {
    
    long firstNum = 1;
    long lastNum = 1_000_000;

    List<Long> aList = LongStream.rangeClosed(firstNum, lastNum).boxed()
      .collect(Collectors.toList());

    ForkJoinPool customThreadPool = new ForkJoinPool(4);
    long actualTotal = customThreadPool.submit(
      () -> aList.parallelStream().reduce(0L, Long::sum)).get();
 
    assertEquals((lastNum + firstNum) * lastNum / 2, actualTotal);
}
```

We used the ForkJoinPool constructor with a parallelism level of 4. Some experimentation is required to determine the optimal value for different environments, but a good rule of thumb is simply choosing the number based on how many cores your CPU has.

Next, we processed the content of the parallel Stream, summing them up in the reduce call.

This simple example may not demonstrate the full usefulness of using a custom thread pool, but the benefits become obvious in situations where we do not want to tie-up the common thread pool with long-running tasks – such as processing data from a network source – or the common thread pool is being used by other components within the application.

If we run the test method above, it'll pass. So far, so good.

However, if we instantiate ForkJoinPool class in a normal method in the same way as we do in the test method, it may lead to the OutOfMemoryError.

Next, let's take a closer look at the cause of the memory leak.

## Beware of the Memory Leak

As we've talked about earlier, the common thread pool is used by the entire application by default. The common thread pool is a static ThreadPool instance.

Therefore, no memory leak occurs if we use the default thread pool.

Now, let's review our test method. In the test method, we created an object of ForkJoinPool. When the test method is finished, the customThreadPool object won't be dereferenced and garbage collected — instead, it will be waiting for new tasks to be assigned.

That is to say, every time we call the test method, a new customThreadPool object will be created and it won't be released.

The fix to the problem is pretty simple: shutdown the customThreadPool object after we've executed the method:
```java
try {
    long actualTotal = customThreadPool.submit(
      () -> aList.parallelStream().reduce(0L, Long::sum)).get();
    assertEquals((lastNum + firstNum) * lastNum / 2, actualTotal);
} finally {
    customThreadPool.shutdown();
}
```
