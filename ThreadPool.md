# How does a Thread Pool Works?

A thread pool is a collection of pre-initialized threads. Generally, the collection size is fixed, but it is not mandatory. It facilitates the execution of N number of tasks using the same threads. If there are more tasks than threads, then tasks need to wait in a queue like structure (FIFO – First in first out).

When any thread completes its execution, it can pickup a new task from the queue and execute it. When all tasks are completed, the threads remain active and wait for more tasks in the thread pool.

![Hotspot JVMImages/](/Images/Thread_pool.png)

A watcher keeps watching the queue (usually BlockingQueue) for any new tasks. As soon as tasks come, threads start picking up tasks and executing them again.1. How does a Thread Pool Works?

A thread pool reuses previously created threads to execute current tasks and offers a solution to the problem of thread cycle overhead and resource thrashing. Since the thread is already existing when the request arrives, the delay introduced by thread creation is eliminated, making the application more responsive.

* Java provides the Executor framework which is centered around the Executor interface, its sub-interface –ExecutorService and the class-ThreadPoolExecutor, which implements both of these interfaces. By using the executor, one only has to implement the Runnable objects and send them to the executor to execute.
* They allow you to take advantage of threading, but focus on the tasks that you want the thread to perform, instead of thread mechanics.
* To use thread pools, we first create a object of ExecutorService and pass a set of tasks to it. ThreadPoolExecutor class allows to set the core and maximum pool size.The runnables that are run by a particular thread are executed sequentially.

## ThreadPoolExecutor class

Since Java 5, the Java concurrency API provides a mechanism Executor framework. The main pieces are Executor interface, its sub-interface ExecutorService and the ThreadPoolExecutor class that implements both interfaces.

ThreadPoolExecutor separates the task creation and its execution. With ThreadPoolExecutor, we only have to implement the Runnable objects and send them to the executor. It is responsible for executing, instantiating, and running the tasks with necessary threads.

It goes beyond that and improves performance using a pool of threads. When you send a task to the executor, it tries to use a pooled thread to execute this task, to avoid the continuous spawning of threads.

## Creating ThreadPoolExecutor

We can create the following 5 types of thread pool executors with pre-built methods in java.util.concurrent.Executors interface.

### Fixed Sized Thread Pool Executor

Creates a thread pool that reuses a fixed number of threads to execute any number of tasks. If additional tasks are submitted when all threads are active, they will wait in the queue until a thread is available. It is the best fit for most of real-life use-cases.
```java
ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);
```

### Cached Thread Pool Executor

Creates a thread pool that creates new threads as needed, but will reuse previously constructed threads when they are available. DO NOT use this thread pool if tasks are long-running. It can bring down the system if the number of threads exceeds what the system can handle.
```java
ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
```

### Scheduled Thread Pool Executor

Creates a thread pool that can schedule commands to run after a given delay or to execute periodically.
```java
ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newScheduledThreadPool(10);
```

### Single Thread Pool Executor

Creates a single thread to execute all tasks. Use it when you have only one task to execute.

```java
ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newSingleThreadExecutor();
```

### Work Stealing Thread Pool Executor

Creates a thread pool that maintains enough threads to support the given parallelism level. Here, parallelism level means the maximum number of threads that will be used to execute a given task at a single point in multi-processor machines.

```java
ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newWorkStealingPool(4);
```

## Executor Thread Pool Methods

| Method | Description |
| --- | --- |
| newFixedThreadPool(int) | Creates a fixed size thread pool. |
| newCachedThreadPool() | Creates a thread pool that creates new threads as needed, but will reuse previously constructed threads when they are available |
| newSingleThreadExecutor() | Creates a single thread. |

In case of a fixed thread pool, if all threads are being currently run by the executor then the pending tasks are placed in a queue and are executed when a thread becomes idle.

## Thread Pool Example

In the following tutorial, we will look at a basic example of thread pool executor- FixedThreadPool.

Steps to be followed

1. Create a task(Runnable Object) to execute
2. Create Executor Pool using Executors
3. Pass tasks to Executor Pool
4. Shutdown the Executor Pool

``` java
// Java program to illustrate 
// ThreadPool
import java.text.SimpleDateFormat; 
import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
  
// Task class to be executed (Step 1)
class Task implements Runnable   
{
    private String name;
      
    public Task(String s)
    {
        name = s;
    }
      
    // Prints task name and sleeps for 1s
    // This Whole process is repeated 5 times
    public void run()
    {
        try
        {
            for (int i = 0; i<=5; i++)
            {
                if (i==0)
                {
                    Date d = new Date();
                    SimpleDateFormat ft = new SimpleDateFormat("hh:mm:ss");
                    System.out.println("Initialization Time for"
                            + " task name - "+ name +" = " +ft.format(d));   
                    //prints the initialization time for every task 
                }
                else
                {
                    Date d = new Date();
                    SimpleDateFormat ft = new SimpleDateFormat("hh:mm:ss");
                    System.out.println("Executing Time for task name - "+
                            name +" = " +ft.format(d));   
                    // prints the execution time for every task 
                }
                Thread.sleep(1000);
            }
            System.out.println(name+" complete");
        }
          
        catch(InterruptedException e)
        {
            e.printStackTrace();
        }
    }
}
public class Test
{
     // Maximum number of threads in thread pool
    static final int MAX_T = 3;             
  
    public static void main(String[] args)
    {
        // creates five tasks
        Runnable r1 = new Task("task 1");
        Runnable r2 = new Task("task 2");
        Runnable r3 = new Task("task 3");
        Runnable r4 = new Task("task 4");
        Runnable r5 = new Task("task 5");      
          
        // creates a thread pool with MAX_T no. of 
        // threads as the fixed pool size(Step 2)
        ExecutorService pool = Executors.newFixedThreadPool(MAX_T);  
         
        // passes the Task objects to the pool to execute (Step 3)
        pool.execute(r1);
        pool.execute(r2);
        pool.execute(r3);
        pool.execute(r4);
        pool.execute(r5); 
          
        // pool shutdown ( Step 4)
        pool.shutdown();    
    }
}
Sample Execution

Output:
Initialization Time for task name - task 2 = 02:32:56
Initialization Time for task name - task 1 = 02:32:56
Initialization Time for task name - task 3 = 02:32:56
Executing Time for task name - task 1 = 02:32:57
Executing Time for task name - task 2 = 02:32:57
Executing Time for task name - task 3 = 02:32:57
Executing Time for task name - task 1 = 02:32:58
Executing Time for task name - task 2 = 02:32:58
Executing Time for task name - task 3 = 02:32:58
Executing Time for task name - task 1 = 02:32:59
Executing Time for task name - task 2 = 02:32:59
Executing Time for task name - task 3 = 02:32:59
Executing Time for task name - task 1 = 02:33:00
Executing Time for task name - task 3 = 02:33:00
Executing Time for task name - task 2 = 02:33:00
Executing Time for task name - task 2 = 02:33:01
Executing Time for task name - task 1 = 02:33:01
Executing Time for task name - task 3 = 02:33:01
task 2 complete
task 1 complete
task 3 complete
Initialization Time for task name - task 5 = 02:33:02
Initialization Time for task name - task 4 = 02:33:02
Executing Time for task name - task 4 = 02:33:03
Executing Time for task name - task 5 = 02:33:03
Executing Time for task name - task 5 = 02:33:04
Executing Time for task name - task 4 = 02:33:04
Executing Time for task name - task 4 = 02:33:05
Executing Time for task name - task 5 = 02:33:05
Executing Time for task name - task 5 = 02:33:06
Executing Time for task name - task 4 = 02:33:06
Executing Time for task name - task 5 = 02:33:07
Executing Time for task name - task 4 = 02:33:07
task 5 complete
task 4 complete
```
As seen in the execution of the program, the task 4 or task 5 are executed only when a thread in the pool becomes idle. Until then, the extra tasks are placed in a queue.

> One of the main advantages of using this approach is when you want to process 100 requests at a time, but do not want to create 100 Threads for the same, so as to reduce JVM overload. You can use this approach to create a ThreadPool of 10 Threads and you can submit 100 requests to this ThreadPool. 
ThreadPool will create maximum of 10 threads to process 10 requests at a time.  After process completion of any single Thread, 
ThreadPool will internally allocate the 11th request to this Thread 
and will keep on doing the same to all the remaining requests.

## Risks in using Thread Pools

* **Deadlock** : While deadlock can occur in any multi-threaded program, thread pools introduce another case of deadlock, one in which all the executing threads are waiting for the results from the blocked threads waiting in the queue due to the unavailability of threads for execution.
* **Thread Leakage** :Thread Leakage occurs if a thread is removed from the pool to execute a task but not returned to it when the task completed. As an example, if the thread throws an exception and pool class does not catch this exception, then the thread will simply exit, reducing the size of the thread pool by one. If this repeats many times, then the pool would eventually become empty and no threads would be available to execute other requests.
* **Resource Thrashing** :If the thread pool size is very large then time is wasted in context switching between threads. Having more threads than the optimal number may cause starvation problem leading to resource thrashing as explained.

## Important Points

* Don’t queue tasks that concurrently wait for results from other tasks. This can lead to a situation of deadlock as described above.
* Be careful while using threads for a long lived operation. It might result in the thread waiting forever and would eventually lead to resource leakage.
* The Thread Pool has to be ended explicitly at the end. If this is not done, then the program goes on executing and never ends. Call shutdown() on the pool to end the executor. If you try to send another task to the executor after shutdown, it will throw a RejectedExecutionException.
* One needs to understand the tasks to effectively tune the thread pool. If the tasks are very contrasting then it makes sense to use different thread pools for different types of tasks so as to tune them properly.
* You can restrict maximum number of threads that can run in JVM, reducing chances of JVM running out of memory.
* If you need to implement your loop to create new threads for processing, using ThreadPool will help to process faster, as ThreadPool does not create new Threads after it reached it’s max limit.
* After completion of Thread Processing, ThreadPool can use the same Thread to do another process(so saving the time and resources to create another Thread.)

## Tuning Thread Pool

* The optimum size of the thread pool depends on the number of processors available and the nature of the tasks. On a N processor system for a queue of only computation type processes, a maximum thread pool size of N or N+1 will achieve the maximum efficiency.But tasks may wait for I/O and in such a case we take into account the ratio of waiting time(W) and service time(S) for a request; resulting in a maximum pool size of N*(1+ W/S) for maximum efficiency.

### Java ExecutorService Example

Here is a simple Java ExecutorService example:
```java
ExecutorService executorService = Executors.newFixedThreadPool(10);

executorService.execute(new Runnable() {
    public void run() {
        System.out.println("Asynchronous task");
    }
});

executorService.shutdown();
```

First an ExecutorService is created using the Executors ``newFixedThreadPool()`` factory method. This creates a thread pool with 10 threads executing tasks.

Second, an anonymous implementation of the Runnable interface is passed to the ``execute()`` method. This causes the Runnable to be executed by one of the threads in the ExecutorService.

#### Java ExecutorService Implementations

The Java ExecutorService is very similar to a thread pool. In fact, the implementation of the ExecutorService interface present in the java.util.concurrent package is a thread pool implementation. If you want to understand how the ExecutorService interface can be implemented internally, read the above tutorial.

Since ExecutorService is an interface, you need to its implementations in order to make any use of it. The ExecutorService has the following implementation in the ``java.util.concurrent`` package:

* ThreadPoolExecutor
* ScheduledThreadPoolExecutor

#### Creating an ExecutorService

How you create an ExecutorService depends on the implementation you use. However, you can use the Executors factory class to create ExecutorService instances too. Here are a few examples of creating an ExecutorService:
```java
ExecutorService executorService1 = Executors.newSingleThreadExecutor();

ExecutorService executorService2 = Executors.newFixedThreadPool(10);

ExecutorService executorService3 = Executors.newScheduledThreadPool(10);
```

#### Creating an ExecutorService That Uses Virtual Threads

Java virtual threads were added to Java in Java 19. It is also possible to create a Java ExecutorService that uses virtual threads internally. Here is an example of creating a Java ExecutorService that starts a new virtual thread for each task submitted to it:

```java
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
```
#### ExecutorService Usage

There are a few different ways to delegate tasks for execution to an ExecutorService:

* execute(Runnable)
* submit(Runnable)
* submit(Callable)
* invokeAny(...)
* invokeAll(...)

I will take a look at each of these methods in the following sections.

### Execute Runnable

The Java ExecutorService execute(Runnable) method takes a java.lang.Runnable object, and executes it asynchronously. Here is an example of executing a Runnable with an ExecutorService:
```java
ExecutorService executorService = Executors.newSingleThreadExecutor();

executorService.execute(new Runnable() {
    public void run() {
        System.out.println("Asynchronous task");
    }
});

executorService.shutdown();
```

There is no way of obtaining the result of the executed Runnable, if necessary. You will have to use a Callable for that (explained in the following sections).

#### Submit Runnable

The Java ExecutorService submit(Runnable) method also takes a Runnable implementation, but returns a Future object. This Future object can be used to check if the Runnable has finished executing.

Here is a Java ExecutorService submit() example:
```java
Future future = executorService.submit(new Runnable() {
    public void run() {
        System.out.println("Asynchronous task");
    }
});

future.get();  //returns null if the task has finished correctly.
```

The submit() method returns a Java Future object which can be used to check when the Runnable has completed.

#### Submit Callable

The Java ExecutorService submit(Callable) method is similar to the submit(Runnable) method except it takes a Java Callable instead of a Runnable. The precise difference between a Callable and a Runnable is explained a bit later.

The Callable's result can be obtained via the Java Future object returned by the submit(Callable) method. Here is an ExecutorService Callable example:
```java
Future future = executorService.submit(new Callable(){
    public Object call() throws Exception {
        System.out.println("Asynchronous Callable");
        return "Callable Result";
    }
});

System.out.println("future.get() = " + future.get());
```

The above code example will output this:
```java
Asynchronous Callable
future.get() = Callable Result
```

### ``invokeAny()``

The ``invokeAny()`` method takes a collection of Callable objects, or subinterfaces of Callable. Invoking this method does not return a Future, but returns the result of one of the Callable objects. You have no guarantee about which of the Callable's results you get. Just one of the ones that finish.

If one Callable finishes, so that a result is returned from invokeAny(), then the rest of the Callable instances are cancelled.

If one of the tasks complete (or throws an exception), the rest of the Callable's are cancelled.

Here is a code example:
```java
ExecutorService executorService = Executors.newSingleThreadExecutor();

Set<Callable<String>> callables = new HashSet<Callable<String>>();

callables.add(new Callable<String>() {
    public String call() throws Exception {
        return "Task 1";
    }
});
callables.add(new Callable<String>() {
    public String call() throws Exception {
        return "Task 2";
    }
});
callables.add(new Callable<String>() {
    public String call() throws Exception {
        return "Task 3";
    }
});

String result = executorService.invokeAny(callables);

System.out.println("result = " + result);

executorService.shutdown();
```

This code example will print out the object returned by one of the Callable's in the given collection. I have tried running it a few times, and the result changes. Sometimes it is "Task 1", sometimes "Task 2" etc.

#### ``invokeAll()``

The invokeAll() method invokes all of the Callable objects you pass to it in the collection passed as parameter. The invokeAll() returns a list of Future objects via which you can obtain the results of the executions of each Callable.

Keep in mind that a task might finish due to an exception, so it may not have "succeeded". There is no way on a Future to tell the difference.

Here is a code example:

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();

Set<Callable<String>> callables = new HashSet<Callable<String>>();

callables.add(new Callable<String>() {
    public String call() throws Exception {
        return "Task 1";
    }
});
callables.add(new Callable<String>() {
    public String call() throws Exception {
        return "Task 2";
    }
});
callables.add(new Callable<String>() {
    public String call() throws Exception {
        return "Task 3";
    }
});

List<Future<String>> futures = executorService.invokeAll(callables);

for(Future<String> future : futures){
    System.out.println("future.get = " + future.get());
}

executorService.shutdown();
```

### Callable Interface

The Java Callable interface, ``java.util.concurrent.Callable``, represents an ``asynchronous task`` which can be executed by a separate thread. For instance, it is possible to submit a Callable object to a Java ExecutorService which will then execute it asynchronously.

#### Java Callable Interface Definition

The Java Callable interface is quite simple. It contains a single method named call(). Here is how the Callable interface looks (approximately):

```java
public interface Callable<V> {

    V call() throws Exception;

}
```

> **The ``call()`` method is called in order to execute the asynchronous task.** The ``call()`` method can return a result. If the task is executed asynchronously, the result is typically propagated back to the creator of the task via a Java Future. This is the case when a Callable is submitted to an ExecutorService for concurrent execution.

The ``call()`` method can also thrown an Exception in case the task fails during execution.

#### Implementing Callable
Here is a simple example of implementing the Java Callable interface:

```java
public class MyCallable implements Callable<String> {

    @Override
    public String call() throws Exception {
        return String.valueOf(System.currentTimeMillis());
    }
}
```
This implementation is very simple. It has the generic type set to a Java String. The result of that is that the call() method will return a String. The call() implementation just returns a String representation of the current time in milliseconds. In a real application the task would probably be a more complex, or larger, set of operations.

Quite often, IO operations like reading from or writing to disk or network, are good candidates for tasks that can be executed concurrently. IO operations often have long waiting times in between reading and writing blocks of data. By executing such tasks in a separate thread, you avoid blocking your main application thread unnecessarily.

#### Callable vs. Runnable

The Java Callable interface is similar to the Java Runnable interface, in that both of them represents a task that is intended to be executed concurrently by a separate thread.

The main difference between the Runnable ``run()`` method and the Callable ``call()`` method is that the ``call()`` method can ``return an Object`` from the method call. Another difference between ``call()`` and ``run()`` is that ``call()`` can ``throw an exception``, whereas ``run()`` ``cannot (except for unchecked exceptions - subclasses of RuntimeException)``.

    If you need to submit a task to a Java ExecutorService and you need a result from the task, then you need to make your task implement the Callable interface. Otherwise your task can just implement the Runnable interface.

Here is first the Runnable interface declaration:

```java
public interface Runnable {
    public void run();
}
```

And here is the Callable interface declaration:
```java
public interface Callable{
    public Object call() throws Exception;
}
```

#### Cancel Task

You can cancel a task (Runnable or Callable) submitted to a Java ExecutorService by calling the cancel() method on the Future returned when the task is submitted. Cancelling the task is only possible if the task has not yet started executing. Here is an example of cancelling a task by calling the Future.cancel() method:
``future.cancel()``;

#### ExecutorService Shutdown

When you are done using the Java ExecutorService you should shut it down, so the threads do not keep running. If your application is started via a main() method and your main thread exits your application, the application will keep running if you have an active ExexutorService in your application. The active threads inside this ExecutorService prevents the JVM from shutting down.

##### ``shutdown()``

To terminate the threads inside the ExecutorService you call its shutdown() method. The ExecutorService will not shut down immediately, but it will no longer accept new tasks, and once all threads have finished current tasks, the ExecutorService shuts down. All tasks submitted to the ExecutorService before shutdown() is called, are executed. Here is an example of performing a Java ExecutorService shutdown:
``executorService.shutdown();``

##### ``shutdownNow()``

If you want to shut down the ExecutorService immediately, you can call the shutdownNow() method. This will attempt to stop all executing tasks right away, and skips all submitted but non-processed tasks. There are no guarantees given about the executing tasks. Perhaps they stop, perhaps the execute until the end. It is a best effort attempt. Here is an example of calling ExecutorService shutdownNow:

``executorService.shutdownNow();``

##### ``awaitTermination()``

The ExecutorService awaitTermination() method will block the thread calling it until either the ExecutorService has shutdown completely, or until a given time out occurs. The awaitTermination() method is typically called after calling shutdown() or shutdownNow(). Here is an example of calling ExecutorService awaitTermination():

```java
executorService.shutdown();

executorService.awaitTermination(10_000L, TimeUnit.MILLISECONDS );
```

### Creating Futures

Simply put, the Future class represents a future result of an asynchronous computation. This result will eventually appear in the Future after the processing is complete.

Let's see how to write methods that create and return a Future instance.

Long running methods are good candidates for asynchronous processing and the Future interface because we can execute other processes while we're waiting for the task encapsulated in the Future to complete.

Some examples of operations that would leverage the async nature of Future are:

computational intensive processes (mathematical and scientific calculations)
manipulating large data structures (big data)
remote method calls (downloading files, HTML scrapping, web services)

#### Implementing Futures With FutureTask

For our example, we're going to create a very simple class that calculates the square of an Integer. This definitely doesn't fit the long-running methods category, but we're going to put a Thread.sleep() call to it so that it lasts 1 second before completing:

```java
public class SquareCalculator {    
    
    private ExecutorService executor 
      = Executors.newSingleThreadExecutor();
    
    public Future<Integer> calculate(Integer input) {        
        return executor.submit(() -> {
            Thread.sleep(1000);
            return input * input;
        });
    }
}
```

The bit of code that actually performs the calculation is contained within the ``call()`` method, and supplied as a lambda expression. As we can see, there's nothing special about it, except for the ``sleep()`` call mentioned earlier.

It gets more interesting when we direct our attention to the use of Callable and ExecutorService.

Callable is an interface representing a task that returns a result, and has a single call() method. Here we've created an instance of it using a lambda expression.

Creating an instance of Callable doesn't take us anywhere; we still have to pass this instance to an executor that will take care of starting the task in a new thread, and give us back the valuable Future object. That's where ExecutorService comes in.

There are a few ways we can access an ExecutorService instance, and most of them are provided by the utility class Executors‘ static factory methods. In this example, we used the basic newSingleThreadExecutor(), which gives us an ExecutorService capable of handling a single thread at a time.

Once we have an ExecutorService object, we just need to call ``submit()``, passing our Callable as an argument. Then ``submit()`` will start the task and return a FutureTask object, which is an implementation of the Future interface.

#### Consuming Futures

Up to this point, we've learned how to create an instance of Future.

In this section, we'll learn how to work with this instance by exploring all the methods that are part of Future‘s API.

##### Using ``isDone()`` and ``get()`` to Obtain Results

Now we need to call calculate(), and use the returned Future to get the resulting Integer. Two methods from the Future API will help us with this task.

``Future.isDone()`` tells us if the executor has finished processing the task. If the task is complete, it will return true; otherwise, it returns false.

The method that returns the actual result from the calculation is ``Future.get()``. We can see that this method blocks the execution until the task is complete. However, this won't be an issue in our example because we'll check if the task is complete by calling isDone().

By using these two methods, we can run other code while we wait for the main task to finish:

```java
Future<Integer> future = new SquareCalculator().calculate(10);

while(!future.isDone()) {
    System.out.println("Calculating...");
    Thread.sleep(300);
}

Integer result = future.get();
```

In this example, we'll write a simple message on the output to let the user know the program is performing the calculation.

The method ``get()`` will block the execution until the task is complete. Again, this won't be an issue because in our example, get() will only be called after making sure that the task is finished. So in this scenario, ``future.get()`` will always return immediately.

It's worth mentioning that ``get()`` has an overloaded version that takes a timeout and a TimeUnit as arguments:
```java
Integer result = future.get(500, TimeUnit.MILLISECONDS);
```

The difference between ``get(long, TimeUnit)`` and ``get()`` is that the former will throw a TimeoutException if the task doesn't return before the specified timeout period.

##### Canceling a Future With ``cancel()``

Suppose we triggered a task, but for some reason, we don't care about the result anymore. We can use ``Future.cancel(boolean)`` to tell the executor to stop the operation and interrupt its underlying thread:
```java
Future<Integer> future = new SquareCalculator().calculate(4);

boolean canceled = future.cancel(true);
```

Our instance of Future, from the code above, will never complete its operation. In fact, if we try to call ``get()`` from that instance, after the call to ``cancel()``, the outcome will be a ``CancellationException``. ``Future.isCancelled()`` will tell us if a Future was already cancelled. This can be quite useful to avoid getting a ``CancellationException``.

It's also possible that a call to ``cancel()`` fails. In that case, the returned value will be false. It's important to note that ``cancel()`` takes a boolean value as an argument. This controls whether the thread executing the task should be interrupted or not.

#### More Multithreading With Thread Pools

Our current ``ExecutorService`` is single threaded, since it was obtained with the ``Executors.newSingleThreadExecutor``. To highlight this single thread, let's trigger two calculations simultaneously:
```java
SquareCalculator squareCalculator = new SquareCalculator();

Future<Integer> future1 = squareCalculator.calculate(10);
Future<Integer> future2 = squareCalculator.calculate(100);

while (!(future1.isDone() && future2.isDone())) {
    System.out.println(
      String.format(
        "future1 is %s and future2 is %s", 
        future1.isDone() ? "done" : "not done", 
        future2.isDone() ? "done" : "not done"
      )
    );
    Thread.sleep(300);
}

Integer result1 = future1.get();
Integer result2 = future2.get();

System.out.println(result1 + " and " + result2);

squareCalculator.shutdown();
```

Now let's analyze the output for this code:

```java
calculating square for: 10
future1 is not done and future2 is not done
future1 is not done and future2 is not done
future1 is not done and future2 is not done
future1 is not done and future2 is not done
calculating square for: 100
future1 is done and future2 is not done
future1 is done and future2 is not done
future1 is done and future2 is not done
100 and 10000
```

It's clear that the process isn't parallel. We can see that the second task only starts once the first task is complete, making the whole process take around 2 seconds to finish.

To make our program really multi-threaded, we should use a different flavor of ExecutorService. Let's see how the behavior of our example changes if we use a thread pool provided by the factory method Executors.newFixedThreadPool():
```java
public class SquareCalculator {
 
    private ExecutorService executor = Executors.newFixedThreadPool(2);
    
    //...
}
```

With a simple change in our SquareCalculator class, we now have an executor which is able to use 2 simultaneous threads.

If we run the exact same client code again, we'll get the following output:
```java
calculating square for: 10
calculating square for: 100
future1 is not done and future2 is not done
future1 is not done and future2 is not done
future1 is not done and future2 is not done
future1 is not done and future2 is not done
100 and 10000
```

This is looking much better now. We can see that the 2 tasks start and finish running simultaneously, and the whole process takes around 1 second to complete.

There are other factory methods that can be used to create thread pools, like Executors.``newCachedThreadPool()``, which reuses previously used Threads when they're available, and ``Executors.newScheduledThreadPool()``, which schedules commands to run after a given delay.

For more information about ExecutorService, read our article dedicated to the subject.

#### Overview of ForkJoinTask

``ForkJoinTask`` is an abstract class which implements Future, and is capable of running a large number of tasks hosted by a small number of actual threads in ``ForkJoinPool``.

In this section, we'll quickly cover the main characteristics of ``ForkJoinPool``. For a comprehensive guide about the topic, check out our Guide to the Fork/Join Framework in Java.

The main characteristic of a ``ForkJoinTask`` is that it will usually spawn new subtasks as part of the work required to complete its main task. It generates new tasks by calling ``fork()``, and it gathers all results with ``join()``, thus the name of the class.

There are two abstract classes that implement ``ForkJoinTask``: ``RecursiveTask``, which returns a value upon completion, and RecursiveAction, which doesn't return anything. As their names imply, these classes are to be used for recursive tasks, such as file-system navigation or complex mathematical computation.

Let's expand our previous example to create a class that, given an Integer, will calculate the sum squares for all of its factorial elements. So for instance, if we pass the number 4 to our calculator, we should get the result from the sum of 4² + 3² + 2² + 1², which is 30.

First, we need to create a concrete implementation of RecursiveTask and implement its ``compute()`` method. This is where we'll write our business logic:

```java
public class FactorialSquareCalculator extends RecursiveTask<Integer> {
 
    private Integer n;

    public FactorialSquareCalculator(Integer n) {
        this.n = n;
    }

    @Override
    protected Integer compute() {
        if (n <= 1) {
            return n;
        }

        FactorialSquareCalculator calculator 
          = new FactorialSquareCalculator(n - 1);

        calculator.fork();

        return n * n + calculator.join();
    }
}
```

Notice how we achieve recursiveness by creating a new instance of FactorialSquareCalculator within ``compute()``. By calling ``fork()``, a non-blocking method, we ask ForkJoinPool to initiate the execution of this subtask.

The ``join()`` method will return the result from that calculation, to which we'll add the square of the number we're currently visiting.

Now we just need to create a ForkJoinPool to handle the execution and thread management:

```java
ForkJoinPool forkJoinPool = new ForkJoinPool();

FactorialSquareCalculator calculator = new FactorialSquareCalculator(10);

forkJoinPool.execute(calculator);
```
