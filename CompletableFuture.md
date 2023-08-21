# What is CompletableFuture?

* A CompltableFuture is used for asynchronous programming. 
    * Asynchronous programming means writing non-blocking code. 
    * It runs a task on a separate thread than the main application thread and notifies the main thread about its progress, completion or failure.
* In this way, the main thread does not block or wait for the completion of the task. Other tasks execute in parallel. Parallelism improves the performance of the program.

* A CompletableFuture is a class in Java.
* It belongs to java.util.cocurrent package. 
* It implements CompletionStage and Future interface.

## CompletionStage
* It performs an action and returns a value when another completion stage completes.
* A model for a task that may trigger other tasks.

Hence, it is an element of a chain.

When more than one thread attempt to complete - complete exceptionally or cancel a CompletableFuture, only one of them succeeds.

## Future vs. CompletableFuture

A CompletableFuture is an extension to Java's Future API which was introduced in Java 8.

* A Future is used for asynchronous Programming. 
* It provides two methods, isDone() and get(). 
* The methods retrieve the result of the computation when it completes.

### Limitations of the Future
* A Future cannot be mutually complete.
* We cannot perform further action on a Future's result without blocking.
* Future has not any exception handling.
* We cannot combine multiple futures.
* Future has so many limitations, that's why we have CompletableFuture. 

CompletableFuture provides a broad set of methods for creating multiple Futures, chaining, and combining. It also has comprehensive exception handling support.

### Creating a CompletableFuture

We can create a CompletableFuture only by using the following no-argument constructor.
```java
CompletableFuture<String> CompletableFuture = new CompletableFuture<String>();  
```
#### Example

The most frequently used CompletableFuture methods are:

* ``supplyAsync()``: It complete its job asynchronously. The result of supplier is run by a task from ``ForkJoinPool.commonPool()`` as default. The ``supplyAsync()`` method returns CompletableFuture on which we can apply other methods.
* ``runAsync()``: It complete its job asynchronously. The ``runAsync()`` method returns ``CompletableFuture<Void>``(means nothing) on which we can't apply other methods.
* ``thenApply()``: The method accepts function as an arguments. It returns a new CompletableStage when this stage completes normally. The new stage use as the argument to the supplied function.
* ``join()``: the method returns the result value when complete. It also throws a CompletionException (unchecked exception) if completed exceptionally.

```java
import java.util.Arrays;  
import java.util.List;  
import java.util.concurrent.CompletableFuture;  
public class CompletableFutureExample1   
{  
public static void main(String[] args)   
{  
try  
{  
List<Integer> list = Arrays.asList(5,9,14);  
list.stream()
    .map(num->CompletableFuture.supplyAsync(()->getNumber(num)))
    .map(CompletableFuture->CompletableFuture.thenApply(n-  
>n*n))
    .map(t->t.join()).forEach(s->System.out.println(s));  
}  
catch (Exception e)  
{  
e.printStackTrace();  
}  
}  
private static int getNumber(int a)  
{  
return a*a;  
}  
}  
Output:
625
6561
38416
```

> NOTE: By Default ``supplyAsync()`` and ``runAsync()`` uses ``ForkJoinPool`` but we can pass 2nd argument as Executor which will act as custom Threadpool.
Ex- 
```java
Executor executor = Executors.newCachedThreadPool();
CompletableFuture<List<Students>> futureStudents = CompletableFuture.supplyAsync(()->getStudents(),executor);
futureStudents.get();
```
### Exception Handling of CompletableFuture

Consider the following figure, which represents the five CFs:
![Hotspot JVMImages/](/Images/exception-handling-of-java.png)

Suppose Five CFs in execution and CF21 raises an exception then all the depending CF (CF31 and CF41) are in error. It means that:

* The call to ``isCompletedExceptionally()`` method returns ``true``.
* The call to ``get()`` throws an ExecutionException which causes the root Exception.

Consider the following figure, in which we have created CF30 with an exception.
![Hotspot JVMImages/](/Images/exception-handling-of-java2.png)

When CF21 executes normally, then CF30 just transmits the value. If it raises an exception, CF30 handles it and generate value for CF31.

There are three method to handle an exception:
```java
public CompletableFuture <T> exceptionally(Function <Throwable, ? extends T> function);  
public <U> CompletableFuture<U> hadle(BiFunction<? super T, Throwable, ? extends U> bifunction);  
public CompletableFuture<T> whenComplete(BiConsumer<? super T, ? super Throwable> action); 
```