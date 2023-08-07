### What is Thread Group? Why it’s advised not to use it?

Thread group is a collection of threads or sub thread groups that are responsible for doing something similar and Java provides a convenient way to group multiple threads in a single object.The advantage of using thread group is that we can perform common operation on the whole group so in other words programmer can group the threads in thread group based on their functions to be performed.
But ThreadGroup API is weak and it doesn’t have any functionality that is not provided by Thread.
Two of the major feature it had are to get the list of active threads in a thread group
and to set the uncaught exception handler for the thread.
So ThreadGroup is obsolete and hence not advised to use anymore

### What is Thread Pool? How can we create Thread Pool in Java?
A thread pool manages the pool of threads, it contains a queue that keeps tasks waiting to get executed. ``java.util.concurrent.Executors`` provide implementation of java.util.concurrent.
Executor interface to create the thread pool in java.

### What is Callable?⭐️

Callable is an interface with single abstract method call().
Java 5 introduced java.util.concurrent.Callable interface in concurrency package
that is similar to Runnable interface but it can return any Object and is able to throw Exception.
Callable interface use Generic to define the return type of Object.

### What is ExecutorService?⭐️

The Java ExecutorService is a construct that allows you to pass a task to be executed by a thread asynchronously.
The executor service creates and maintains a reusable pool of threads for executing submitted tasks.

### How to create executor service?

```java
ExecutorService executorService = new ThreadPoolExecutor(10, 10, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>());

ExecutorService executor = Executors.newFixedThreadPool(10)

ExecutorService executor = Executors.newSingleThreadExecutor()

ExecutorService executor = Executors.newCachedThreadPool()

ExecutorService executor = Executors.newScheduledThreadPool(5)

ExecutorService executor = Executors.newSingleThreadScheduledExecutor()

ExecutorService executor = Executors.newWorkStealingPool();
```

### ExecutorService methods

1. ``invokeAny()``

``The invokeAny()`` method *takes a collection of Callable objects, or subinterfaces of Callable*. Invoking this method does not return a Future, but returns the result of one of the Callable objects. You have no guarantee about which of the Callable's results you get. Just one of the ones that finish.

Example:
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

2. ``invokeAll()``

The ``invokeAll()`` method *invokes all of the Callable objects you pass to it in the collection passed as parameter*. The invokeAll() returns a list of Future objects via which you can obtain the results of the executions of each Callable.

Keep in mind that a task might finish due to an exception, so it may not have "succeeded". There is no way on a Future to tell the difference.

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

3. ``submit()`` and ``execute()`` are defined in below example

### How do you execute a callable from executorservice?

We pass the callable task inside the ``submit`` method and invoke the submit on the created ExecutorService.

Code :
```java
import java.util.concurrent.*;

public class Main {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        Callable<String> stringCallable = () -> "Callable called";

        Future<String> callableFuture = executorService.submit(stringCallable);

        System.out.println("Result of the callable - " + callableFuture.get());

        executorService.shutdown();
    }
}
```

### How do you execute runnable task from executorservice?

We pass the runnable in the ``submit/execute`` method and invoke it on the ExecutorService.

> Note  ``execute()`` method will not return any Future object and is used only with ``Runnable``

Code :

```java
import java.util.concurrent.*;

public class Main {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        Runnable runnable = () -> System.out.println("Callable called");

        Future<?> runnableFuture = executorService.submit(runnable);

        System.out.println("Result of the Future - " + runnableFuture.get());

        executorService.shutdown();

        ExecutorService executorService1 = Executors.newSingleThreadExecutor();

        executorService1.execute(new Runnable() {
            public void run() {
                System.out.println("Asynchronous task");
            }
        });

        executorService1.shutdown();

    }
}
```

### What is Future?⭐️

Executors class provide useful methods to execute Callable in a thread pool.
Since callable tasks run in parallel, we have to wait for the returned Object.
Callable tasks return ``java.util.concurrent.Future`` object. Future is an interface.
Using Future we can find out the status of the Callable task and get the returned Object.
It provides get() method that can wait for the Callable to finish and then return the result.
So, Future is basically a placeholder for the object which is going to be returned by the callable task at any time in future.

### What is FutureTask Class?

FutureTask is the base implementation class of Future interface and we can use it with Executors for asynchronous processing.

Most of the time we don’t need to use FutureTask class but it comes real handy if we want to override some of the methods of Future interface and want to keep most of the base implementation.
We can just extend this class and override the methods according to our requirements.

### What is ThreadLocal?

Java ThreadLocal is used to create thread-local variables. i.e., variables local to each thread.
We know that all threads on an Object share it’s variables, so if the variable is not thread safe,
we can use synchronization but if we want to avoid synchronization, we can use ThreadLocal variables.
If the same code runs in different threads, these executions will not share the value, instead of that, each thread has its own variable that is local to the thread and they can use it’s get() and set() methods to get the default value or change it’s value local to Thread.
ThreadLocal instances are typically private static fields in classes that wish to associate state with a thread.

ThreadLocal Example

```java
public class ThreadLocalExp  
{  
    public static class MyRunnable implements Runnable   
    {  
        private ThreadLocal<Integer> threadLocal =  
               new ThreadLocal<Integer>();  
        @Override  
        public void run() {  
            threadLocal.set( (int) (Math.random() * 50D) );  
            try   
            {  
                Thread.sleep(1000);  
            } catch (InterruptedException e) {  
            }  
            System.out.println(threadLocal.get());  
        }  
    }  
    public static void main(String[] args)   
    {  
        MyRunnable runnableInstance = new MyRunnable();  
          
        Thread t1 = new Thread(runnableInstance);  
        Thread t2 = new Thread(runnableInstance);  
        // this will call run() method   
        t1.start();  
        t2.start();  
    }  
}
```
  Output:
  10
  33

### What is Java Thread Dump, How can we get Java Thread dump of a Program?

Thread dump is list of all the threads active in the JVM,
thread dumps are very helpful in analyzing bottlenecks in the application
and analyzing deadlock situations.
There are many ways using which we can generate Thread dump – Using Profiler, Kill -3 command, jstack tool etc.

### How to schedule a task to run after specific interval?
    
``java.util.TimerTask`` is an abstract class that implements Runnable interface and we need to extend this class to create our own TimerTask that can be scheduled using java Timer class and ``java.util.Timer`` class can be used to schedule a task to be run one-time or to be run at regular intervals at certain time in future.

#### Java Timer Example

Java Timer class is thread safe and multiple threads can share a single Timer object without need for external synchronization. 

Timer class uses ``java.util.TaskQueue`` to add tasks at given regular interval and at any time there can be only one thread running the TimerTask, for example if you are creating a Timer to run every 10 seconds but single thread execution takes 20 seconds, then Timer object will keep adding tasks to the queue and as soon as one thread is finished, it will notify the queue and another thread will start executing. 

Java Timer class uses Object wait and notify methods to schedule the tasks. 

Here is a simple program for Java Timer and TimerTask example.

```java
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

public class MyTimerTask extends TimerTask {

    @Override
    public void run() {
        System.out.println("Timer task started at:"+new Date());
        completeTask();
        System.out.println("Timer task finished at:"+new Date());
    }

    private void completeTask() {
        try {
            //assuming it takes 20 secs to complete the task
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    public static void main(String args[]){
        TimerTask timerTask = new MyTimerTask();
        //running timer task as daemon thread
        Timer timer = new Timer(true);
        timer.scheduleAtFixedRate(timerTask, 0, 10*1000);
        System.out.println("TimerTask started");
        //cancel after sometime
        try {
            Thread.sleep(120000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        timer.cancel();
        System.out.println("TimerTask cancelled");
        try {
            Thread.sleep(30000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
```
Notice that one thread execution will take 20 seconds but Java Timer object is scheduled to run the task every 10 seconds. Here is the output of the program:

```Java
TimerTask started
Timer task started at:Wed Dec 26 19:16:39 PST 2012
Timer task finished at:Wed Dec 26 19:16:59 PST 2012
Timer task started at:Wed Dec 26 19:16:59 PST 2012
Timer task finished at:Wed Dec 26 19:17:19 PST 2012
Timer task started at:Wed Dec 26 19:17:19 PST 2012
Timer task finished at:Wed Dec 26 19:17:39 PST 2012
Timer task started at:Wed Dec 26 19:17:39 PST 2012
Timer task finished at:Wed Dec 26 19:17:59 PST 2012
Timer task started at:Wed Dec 26 19:17:59 PST 2012
Timer task finished at:Wed Dec 26 19:18:19 PST 2012
Timer task started at:Wed Dec 26 19:18:19 PST 2012
TimerTask cancelled
Timer task finished at:Wed Dec 26 19:18:39 PST 2012
```
The output confirms that if a task is already executing, Timer will wait for it to finish and once finished, it will start again the next task from the queue. 

Java Timer object can be created to run the associated tasks as a daemon thread. Timer cancel() method is used to terminate the timer and discard any scheduled tasks, however it doesn’t interfere with the currently executing task and let it finish. 

If the timer is run as daemon thread, whether we cancel it or not, it will terminate as soon as all the user threads are finished executing. 

Timer class contains several schedule() methods to schedule a task to run once at given date or after some delay. 

There are several scheduleAtFixedRate() methods to run a task periodically with certain interval. While scheduling tasks using Timer, you should make sure that time interval is more than normal thread execution, otherwise tasks queue size will keep growing and eventually task will be executing always.

### What is context switching in multithreading ?

Context Switching is the process of storing and restoring of CPU state so that Thread execution can be resumed from the same point at a later point of time. Context Switching is the essential feature for multitasking operating system and support for multi-threaded environment.

### What is fork join pool?⭐️

The ForkJoinPool was added to Java in Java 7. The ForkJoinPool is similar to the Java ExecutorService but with one difference. The ForkJoinPool makes it easy for tasks to split their work up into smaller tasks which are then submitted to the ForkJoinPool too. Tasks can keep splitting their work into smaller subtasks for as long as it makes to split up the task. 

#### Fork
A task that uses the fork and join principle can fork (split) itself into smaller subtasks which can be executed concurrently. This is illustrated in the diagram below:

![Fork](/Images/java-fork-and-join-1.png)

Splitting tasks into smaller tasks is referred to as forking tasks.
By splitting itself up into subtasks, each subtask can be executed in parallel by different CPUs, or different threads on the same CPU.

A task only splits itself up into subtasks if the work the task was given is large enough for this to make sense. There is an overhead to splitting up a task into subtasks, so for small amounts of work this overhead may be greater than the speedup achieved by executing subtasks concurrently.

The limit for when it makes sense to fork a task into subtasks is also called a threshold. It is up to each task to decide on a sensible threshold. It depends very much on the kind of work being done.

#### Join

When a task has split itself up into subtasks, the task waits until the subtasks have finished executing.

Once the subtasks have finished executing, the task may join (merge) all the results into one result. This is illustrated in the diagram below:

![Join](/Images/java-fork-and-join-2.png)

Merging the results of subtasks is referred to as joining results.
Of course, not all types of tasks may return a result. If the tasks do not return a result then a task just waits for its subtasks to complete. No result merging takes place then.

The ForkJoinPool

* ForkJoinPool is a thread pool that uses a divide-and-conquer strategy to execute tasks recursively.
* It is used by JVM languages such as Kotlin and Akka to build message-driven applications.
* ForkJoinPool executes tasks in parallel, enabling efficient use of computer resources.
* The work-stealing algorithm optimizes resource utilization by allowing idle threads to steal tasks from busy ones.
* Tasks are stored in a double-ended queue, with the LIFO strategy used for storage and FIFO for stealing.
* The main classes in the ForkJoinPool framework include ForkJoinPool, RecursiveAction, and RecursiveTask:
    * RecursiveAction is used to compute recursive actions and doesn't return any values.
    * RecursiveTask is similar but returns a value.
    * The compute() method is overridden in both classes to implement custom logic.
    * The fork() method invokes the compute() method and breaks down the task into smaller subtasks.
    * The join() method waits for subtasks to complete and merges their results.
    * ForkJoinPool is commonly used with parallel streams and CompletableFuture.


The fork and join principle consists of two steps which are performed recursively. These two steps are the fork step and the join step.
The ForkJoinPool is a special thread pool which is designed to work well with fork-and-join task splitting. The ForkJoinPool located in the java.util.concurrent package, so the full class name is ``java.util.concurrent.ForkJoinPool``.

##### Creating a ForkJoinPool

You create a ForkJoinPool using its constructor. As a parameter to the ForkJoinPool constructor you pass the indicated level of parallelism you desire. The parallelism level indicates how many threads or CPUs you want to work concurrently on on tasks passed to the ForkJoinPool. Here is a ForkJoinPool creation example:

```java
ForkJoinPool forkJoinPool = new ForkJoinPool(4);
This example creates a ForkJoinPool with a parallelism level of 4.
```

##### Submitting Tasks to the ForkJoinPool

You submit tasks to a ForkJoinPool similarly to how you submit tasks to an ExecutorService. You can submit two types of tasks. A task that does not return any result (an "action"), and a task which does return a result (a "task"). These two types of tasks are represented by the RecursiveAction and RecursiveTask classes. How to use both of these tasks and how to submit them will be covered in the following sections.

##### RecursiveAction

A RecursiveAction is a task which does not return any value. It just does some work, e.g. writing data to disk, and then exits.

A RecursiveAction may still need to break up its work into smaller chunks which can be executed by independent threads or CPUs.

You implement a RecursiveAction by subclassing it. Here is a RecursiveAction example:

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.RecursiveAction;

public class MyRecursiveAction extends RecursiveAction {

    private long workLoad = 0;

    public MyRecursiveAction(long workLoad) {
        this.workLoad = workLoad;
    }

    @Override
    protected void compute() {

        //if work is above threshold, break tasks up into smaller tasks
        if(this.workLoad > 16) {
            System.out.println("Splitting workLoad : " + this.workLoad);

            List<MyRecursiveAction> subtasks =
                new ArrayList<MyRecursiveAction>();

            subtasks.addAll(createSubtasks());

            for(RecursiveAction subtask : subtasks){
                subtask.fork();
            }

        } else {
            System.out.println("Doing workLoad myself: " + this.workLoad);
        }
    }

    private List<MyRecursiveAction> createSubtasks() {
        List<MyRecursiveAction> subtasks =
            new ArrayList<MyRecursiveAction>();

        MyRecursiveAction subtask1 = new MyRecursiveAction(this.workLoad / 2);
        MyRecursiveAction subtask2 = new MyRecursiveAction(this.workLoad / 2);

        subtasks.add(subtask1);
        subtasks.add(subtask2);

        return subtasks;
    }

}
```

This example is very simplified. The MyRecursiveAction simply takes a fictive workLoad as parameter to its constructor. If the workLoad is above a certain threshold, the work is split into subtasks which are also scheduled for execution (via the .fork() method of the subtasks. If the workLoad is below a certain threshold then the work is carried out by the MyRecursiveAction itself.

You can schedule a MyRecursiveAction for execution like this:
```java
MyRecursiveAction myRecursiveAction = new MyRecursiveAction(24);

forkJoinPool.invoke(myRecursiveAction);
```

##### RecursiveTask

A RecursiveTask is a task that returns a result. It may split its work up into smaller tasks, and merge the result of these smaller tasks into a collective result. The splitting and merging may take place on several levels. Here is a RecursiveTask example:

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.RecursiveTask;
    
    
public class MyRecursiveTask extends RecursiveTask<Long> {

    private long workLoad = 0;

    public MyRecursiveTask(long workLoad) {
        this.workLoad = workLoad;
    }

    protected Long compute() {

        //if work is above threshold, break tasks up into smaller tasks
        if(this.workLoad > 16) {
            System.out.println("Splitting workLoad : " + this.workLoad);

            List<MyRecursiveTask> subtasks =
                new ArrayList<MyRecursiveTask>();
            subtasks.addAll(createSubtasks());

            for(MyRecursiveTask subtask : subtasks){
                subtask.fork();
            }

            long result = 0;
            for(MyRecursiveTask subtask : subtasks) {
                result += subtask.join();
            }
            return result;

        } else {
            System.out.println("Doing workLoad myself: " + this.workLoad);
            return workLoad * 3;
        }
    }

    private List<MyRecursiveTask> createSubtasks() {
        List<MyRecursiveTask> subtasks =
        new ArrayList<MyRecursiveTask>();

        MyRecursiveTask subtask1 = new MyRecursiveTask(this.workLoad / 2);
        MyRecursiveTask subtask2 = new MyRecursiveTask(this.workLoad / 2);

        subtasks.add(subtask1);
        subtasks.add(subtask2);

        return subtasks;
    }
}
```

This example is similar to the RecursiveAction example except it returns a result. The class MyRecursiveTask extends RecursiveTask<Long> which means that the result returned from the task is a Long .

The MyRecursiveTask example also breaks the work down into subtasks, and schedules these subtasks for execution using their fork() method.

Additionally, this example then receives the result returned by each subtask by calling the join() method of each subtask. The subtask results are merged into a bigger result which is then returned. This kind of joining / mergining of subtask results may occur recursively for several levels of recursion.

You can schedule a RecursiveTask like this:

MyRecursiveTask myRecursiveTask = new MyRecursiveTask(128);

long mergedResult = forkJoinPool.invoke(myRecursiveTask);

System.out.println("mergedResult = " + mergedResult);    
Notice how you get the final result out from the ForkJoinPool.invoke() method call.

ForkJoinPool Critique
It seems not everyone is equally happy with the new ForkJoinPool in Java 7. While searching for experiences with, and opinions about, the ForkJoinPool, I came across the following critique:

### What are Concurrent Collection Classes?

Java Collection classes are fail-fast which means that if the Collection is changed while some thread is traversing over it using iterator, the iterator.next() will throw ConcurrentModificationException.
Concurrent Collection classes support full concurrency of retrievals and
adjustable expected concurrency for updates. Major classes are ConcurrentHashMap CopyOnWriteArrayList and CopyOnWriteArraySet, LinkedBlockingQueue etc.

#### Briefly explain concurrentHashMap. How is it better than HashMap and HashTable in terms of concurrency?

| ConcurrentHashMap	| SynchronizedMap | HashTable |
|---|---|---|
| We will get thread safety without locking the total map object just with a bucket level lock. | We will get thread safety by locking the whole map object. | We will get thread safety by locking the whole map object |
| At a time multiple threads are allowed to operate on map objects safely. | At a time only one thread is allowed to perform any operation on a map object. | At a time one thread is allowed to operate on a map object. |
| Read operation can be performed without lock but write operation can be performed with bucket level lock.	| Every read and write operations required total map object | Every read and write operations required total map object |
| While one thread iterating map objects the other thread is allowed to modify the map and won’t get ConcurrentModificationException. | While one thread iterating map object the other threads are not allowed to modify the map otherwise we will get ConcurrentModificationException. | While one thread iterating map object the other threads are not allowed to modify the map otherwise we will get ConcurrentModificationException |
| Iterator of ConcurrentHashMap is fail-safe and won’t raise ConcurrentModificationException | Iterator of SynchronizedMap is fail-fast and it will raise ConcurrentModificationException |	Iterator of HashTable is fail-fast and it will raise ConcurrentModificationException |
| Null is not allowed for both keys and values.	| Null is allowed for both keys and values	| Null is not allowed for both keys and values. |
| Introduce in java 1.5version | Introduce in java 1.2 version | Introduce in java 1.0 version|

#### Briefly explain ``CopyOnwriteArraylist``

``public class CopyOnWriteArrayList extends Object implements List, RandomAccess, Cloneable, Serializable``

* As the name indicates, CopyOnWriteArrayList creates a Cloned copy of underlying ArrayList, for every update operation at a certain point both will be synchronized automatically, which is taken care of by JVM. Therefore, there is no effect for threads that are performing read operation.
* It is costly to use because for every update operation a cloned copy will be created. Hence, CopyOnWriteArrayList is the best choice if our frequent operation is read operation.
* CopyOnWriteArrayList is a thread-safe variant of ArrayList.
* CopyOnWriteArrayList is to be used in a Thread based environment where read operations are very frequent and update operations are rare.
* Iterator of CopyOnWriteArrayList will never throw ConcurrentModificationException.
* Any type of modification to CopyOnWriteArrayList will not reflect during iteration since the iterator was created.
* null can be added to the list.

#### Explain ``CopyOnwriteArraySet``.

CopyOnWriteArraySet is a member of the Java Collections Framework. It is a Set that uses an internal CopyOnWriteArrayList for all of its operations. It was introduced in JDK 1.5, we can say that it is a thread-safe version of Set. To use this class, we need to import it from java.util.concurrent package. 

It shares some properties of Set and also has its own properties as listed:

* The internal implementation of ``CopyOnWriteArraySet`` is ``CopyOnWriteArrayList`` only.
* Multiple Threads are able to perform update operations simultaneously but for every update operation, a separate cloned copy is created. As for every update a new cloned copy will be created which is costly. Hence if multiple update operations are required then it is not recommended to use CopyOnWriteArraySet.
* While one thread iterating the Set, other threads can perform updation, here we won’t get any runtime exception like ConcurrentModificationException.
* Use CopyOnWriteArraySet in applications in which set sizes generally stay small, read-only operations vastly outnumber mutative operations, and you need to prevent interference among threads during traversal.
* CopyOnWriteArraySet helps in minimizing programmer-controlled synchronization steps and moving the control to inbuilt, well-tested APIs.

#### What is CountDownLatch? When we use CountDownLatch?

CountDownLatch is used to make sure that a task waits for other threads before it starts. To understand its application, let us consider a server where the main task can only start when all the required services have started.

##### Working of CountDownLatch:

When we create an object of CountDownLatch, we specify the number of threads it should wait for, all such thread are required to do count down by calling ``CountDownLatch.countDown()`` once they are completed or ready to the job. As soon as count reaches zero, the waiting task starts running.

Example of CountDownLatch in JAVA:

```java
// Java Program to demonstrate how 
// to use CountDownLatch, Its used 
// when a thread needs to wait for other 
// threads before starting its work.
import java.util.concurrent.CountDownLatch;
  
public class CountDownLatchDemo
{
    public static void main(String args[]) 
                   throws InterruptedException
    {
        // Let us create task that is going to 
        // wait for four threads before it starts
        CountDownLatch latch = new CountDownLatch(4);
  
        // Let us create four worker 
        // threads and start them.
        Worker first = new Worker(1000, latch, 
                                  "WORKER-1");
        Worker second = new Worker(2000, latch, 
                                  "WORKER-2");
        Worker third = new Worker(3000, latch, 
                                  "WORKER-3");
        Worker fourth = new Worker(4000, latch, 
                                  "WORKER-4");
        first.start();
        second.start();
        third.start();
        fourth.start();
  
        // The main task waits for four threads
        latch.await();
  
        // Main thread has started
        System.out.println(Thread.currentThread().getName() +
                           " has finished");
    }
}
  
// A class to represent threads for which
// the main thread waits.
class Worker extends Thread
{
    private int delay;
    private CountDownLatch latch;
  
    public Worker(int delay, CountDownLatch latch,
                                    String name)
    {
        super(name);
        this.delay = delay;
        this.latch = latch;
    }
  
    @Override
    public void run()
    {
        try
        {
            Thread.sleep(delay);
            latch.countDown();
            System.out.println(Thread.currentThread().getName()
                            + " finished");
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
    }
}
Output:

WORKER-1 finished
WORKER-2 finished
WORKER-3 finished
WORKER-4 finished
main has finished
```

#### What is CyclicBarrier? What is the difference between CountDownLatch and CyclicBarrier?

| CountDownLatch | CyclicBarrier |
| --- | --- |
| CountDownLatch is a construct that a thread looks out for while different threads tally down on the latch until it arrives at zero. | A CyclicBarrier is a reusable construct where a gathering of threads stands by together until the entirety of the threads shows up. By then, the barrier is broken and a move can alternatively be made. |
| CountDownLatch keeps up a count of tasks. |	CyclicBarrier keeps up a count of threads. |
| In CountDownLatch single thread can countdown more than once, this would reduce count by number of times countdown() method is called. | In CyclicBarrier single thread can call awaits only once which would reduce barrier count by one only, even if call awaits() method more than once. |
| When we are using a CountDownLatch, you must specify the no. of calls to the countdown() method while creating a CountDownLatch object. | When we are using CyclicBarrier, you must specify the no. of threads that should call await() function to trip the barrier. |
| It is initialized to N used to make one thread stand by until N strings have finished some activity, or some activity has been finished N times. | If you have a CyclicBarrier initialized to 3 that implies you ought to have in any event 3 strings to call await(). |
| CountDownLatch cannot be reused, when count arrives at zero it can’t be reset.  | CyclicBarrier can be reused after holding threads are released. |
| In CountDownLatch just the current thread that has an issue throws a special case/exception. | In a CyclicBarrier, if a thread experiences an issue (timeout, interruption), the wide range of various threads that have reached await() get a special case/exception. |
| It’s advanceable. | It’s not advanceable. |
| If the current thread is interrupted, it will throw InterruptedException. It will not impact other threads. | If one thread is interrupted while waiting then all other waiting threads will throw BrokenBarrierException |

#### What is BlockingQueue? How can we implement Producer-Consumer problem using Blocking Queue?

BlockingQueue Usage

* A BlockingQueue is typically used to have one thread produce objects, which another thread consumes. Here is a diagram that illustrates this principle:
* A BlockingQueue with one thread putting into it, and another thread taking from it.
* A BlockingQueue with one thread putting into it, and another thread taking from it.
* The producing thread will keep producing new objects and insert them into the BlockingQueue, until the queue reaches some upper bound on what it can contain. It's limit, in other words. If the blocking queue reaches its upper limit, the producing thread is blocked while trying to insert the new object. It remains blocked until a consuming thread takes an object out of the queue.
* The consuming thread keeps taking objects out of the BlockingQueue to processes them. If the consuming thread tries to take an object out of an empty queue, the consuming thread is blocked until a producing thread puts an object into the queue.

##### BlockingQueue Methods

The Java BlockingQueue interface has 4 different sets of methods for inserting, removing and examining the elements in the queue. Each set of methods behaves differently in case the requested operation cannot be carried out immediately. Here is a table of the methods:

| | Throws Exception | Special Value | Blocks | Times Out |
|---|---|---|---|---|
| Insert | add(o)	 | offer(o)	| put(o) | offer(o, timeout, timeunit)
| Remove | remove(o) | 	poll()	| take() | poll(timeout, timeunit)
| Examine | element() | peek() |	 

The 4 different sets of behaviour means this:

1. **Throws Exception**: If the attempted operation is not possible immediately, an exception is thrown.
2. **Special Value**: If the attempted operation is not possible immediately, a special value is returned (often true / false).
3. **Blocks**: If the attempted operation is not possible immedidately, the method call blocks until it is.
4. **Times Out**: If the attempted operation is not possible immedidately, the method call blocks until it is, but waits no longer than the given timeout. Returns a special value telling whether the operation succeeded or not (typically true / false).

> It is not possible to insert null into a BlockingQueue. If you try to insert null, the BlockingQueue will throw a NullPointerException.

It is also possible to access all the elements inside a BlockingQueue, and not just the elements at the start and end. For instance, say you have queued an object for processing, but your application decides to cancel it. You can then call e.g. remove(o) to remove a specific object in the queue. However, this is not done very efficiently, so you should not use these Collection methods unless you really have to.

##### Java BlockingQueue Example

Here is a Java BlockingQueue example. The example uses the ArrayBlockingQueue implementation of the BlockingQueue interface.

First, the BlockingQueueExample class which starts a Producer and a Consumer in separate threads. The Producer inserts strings into a shared BlockingQueue, and the Consumer takes them out.

```java
public class BlockingQueueExample {

    public static void main(String[] args) throws Exception {

        BlockingQueue queue = new ArrayBlockingQueue(1024);

        Producer producer = new Producer(queue);
        Consumer consumer = new Consumer(queue);

        new Thread(producer).start();
        new Thread(consumer).start();

        Thread.sleep(4000);
    }
}
```

Here is the Producer class. Notice how it sleeps a second between each put() call. This will cause the Consumer to block, while waiting for objects in the queue.

```java
public class Producer implements Runnable{

    protected BlockingQueue queue = null;

    public Producer(BlockingQueue queue) {
        this.queue = queue;
    }

    public void run() {
        try {
            queue.put("1");
            Thread.sleep(1000);
            queue.put("2");
            Thread.sleep(1000);
            queue.put("3");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
Here is the Consumer class. It just takes out the objects from the queue, and prints them to System.out.

```java
public class Consumer implements Runnable{

    protected BlockingQueue queue = null;

    public Consumer(BlockingQueue queue) {
        this.queue = queue;
    }

    public void run() {
        try {
            System.out.println(queue.take());
            System.out.println(queue.take());
            System.out.println(queue.take());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

Since BlockingQueue is an interface, you need to use one of its implementations to use it. The java.util.concurrent package has the following implementations of the BlockingQueue interface:

##### ArrayBlockingQueue

ArrayBlockingQueue is a bounded, blocking queue that stores the elements internally in an array. That it is bounded means that it cannot store unlimited amounts of elements. There is an upper bound on the number of elements it can store at the same time. You set the upper bound at instantiation time, and after that it cannot be changed.

The ArrayBlockingQueue stores the elements internally in ``FIFO (First In, First Out)`` order. The ``head`` of the queue is the element which has been in queue the ``longest time``, and the ``tail`` of the queue is the element which has been in the queue the ``shortest time``.

Here is how to instantiate and use an ArrayBlockingQueue:

```java
BlockingQueue queue = new ArrayBlockingQueue(1024);

queue.put("1");

Object object = queue.take();
Here is a BlockingQueue example that uses Java Generics. Notice how you can put and take String's instead of :

BlockingQueue<String> queue = new ArrayBlockingQueue<String>(1024);

queue.put("1");

String string = queue.take();
```

##### DelayQueue

The DelayQueue blocks the elements internally until a certain delay has expired. The elements must implement the interface java.util.concurrent.Delayed. Here is how the interface looks:

```java
public interface Delayed extends Comparable<Delayed< {

 public long getDelay(TimeUnit timeUnit);

}
```

The value returned by the ``getDelay()`` method should be the delay remaining before this element can be released. If 0 or a negative value is returned, the delay will be considered expired, and the element released at the next take() etc. call on the DelayQueue.

The TimeUnit instance passed to the getDelay() method is an Enum that tells which time unit the delay should be returned in. The TimeUnit enum can take these values:

    DAYS
    HOURS
    MINUTES
    SECONDS
    MILLISECONDS
    MICROSECONDS
    NANOSECONDS

The Delayed interface also extends the java.lang.Comparable interface, as you can see, which means that Delayed objects can be compared to each other. This is probably used internally in the DelayQueue to order the elements in the queue, so they are released ordered by their expiration time.

Here is an example of how to use the DelayQueue:

```java
public class DelayQueueExample {

    public static void main(String[] args) {
        DelayQueue queue = new DelayQueue();

        Delayed element1 = new DelayedElement();

        queue.put(element1);

        Delayed element2 = queue.take();
    }
}
```
The DelayedElement is an implementation of the Delayed interface that I have created. It is not part of the java.util.concurrent package. You will have to create your own implementation of the Delayed interface to use the DelayQueue class.

* LinkedBlockingQueue

The LinkedBlockingQueue keeps the elements internally in a linked structure (linked nodes). This linked structure can optionally have an upper bound if desired. If no upper bound is specified, *Integer.MAX_VALUE is used as the upper bound*.

The ``LinkedBlockingQueue stores`` the elements internally in ``FIFO`` (First In, First Out) order. The ``head`` of the queue is the element which has been in queue the ``longest time``, and the ``tail`` of the queue is the element which has been in the queue the ``shortest time``.

Here is how to instantiate and use a LinkedBlockingQueue:

```java
BlockingQueue<String> unbounded = new LinkedBlockingQueue<String>();
BlockingQueue<String> bounded   = new LinkedBlockingQueue<String>(1024);

bounded.put("Value");

String value = bounded.take();
```

* LinkedBlockingDeque

* LinkedTransferQueue

##### PriorityBlockingQueue

The PriorityBlockingQueue is an unbounded concurrent queue. It uses the same ordering rules as the java.util.PriorityQueue class. You cannot insert null into this queue.

**All elements inserted into the PriorityBlockingQueue must implement the ``java.lang.Comparable interface**. The elements thus order themselves according to whatever priority you decide in your Comparable implementation.

Notice that the PriorityBlockingQueue does not enforce any specific behaviour for elements that have equal priority (compare() == 0).

Also notice, that in case you obtain an Iterator from a PriorityBlockingQueue, the Iterator does not guarantee to iterate the elements in priority order.

Here is an example of how to use the PriorityBlockingQueue:

```java
BlockingQueue queue   = new PriorityBlockingQueue();

    //String implements java.lang.Comparable
    queue.put("Value");

    String value = queue.take();
```

##### SynchronousQueue

The SynchronousQueue is a queue that can be used to exchange a single element with another thread. A thread inserting an element into the queue is blocked until another thread takes that element from the queue. Likewise, if a thread tries to take an element and no element is currently present, that thread is blocked until a thread insert an element into the queue.

Calling this class a queue is a bit of an overstatement. It's more of a rendesvouz point.

#### What is Exchanger? How do exchanger work?

The ``java.util.concurrent.Exchanger`` class represents a kind of rendezvous point where two threads can exchange objects.

Exchanging objects is done via one of the two exchange() methods. Here is an example:

```java
Exchanger exchanger = new Exchanger();

ExchangerRunnable exchangerRunnable1 =
        new ExchangerRunnable(exchanger, "A");

ExchangerRunnable exchangerRunnable2 =
        new ExchangerRunnable(exchanger, "B");

new Thread(exchangerRunnable1).start();
new Thread(exchangerRunnable2).start();
```

Here is the ExchangerRunnable code:

```java
public class ExchangerRunnable implements Runnable{

    Exchanger exchanger = null;
    Object    object    = null;

    public ExchangerRunnable(Exchanger exchanger, Object object) {
        this.exchanger = exchanger;
        this.object = object;
    }

    public void run() {
        try {
            Object previous = this.object;

            this.object = this.exchanger.exchange(this.object);

            System.out.println(
                    Thread.currentThread().getName() +
                    " exchanged " + previous + " for " + this.object
            );
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
This example prints out this:

Thread-0 exchanged A for B
Thread-1 exchanged B for A
```

#### Briefly explain Semaphore.

The ``java.util.concurrent.Semaphore`` class is a counting semaphore. That means that it has two main methods:

* ``acquire()``
* ``release()``

The counting semaphore is initialized with a given number of "permits". For each call to acquire() a permit is taken by the calling thread. For each call to release() a permit is returned to the semaphore. Thus, at most N threads can pass the acquire() method without any release() calls, where N is the number of permits the semaphore was initialized with. The permits are just a simple counter. Nothing fancy here.

###### Semaphore Usage

As semaphore typically has two uses:

1. To guard a critical section against entry by more than N threads at a time.
2. To send signals between two threads.

###### Guarding Critical Sections

If you use a semaphore to guard a critical section, the thread trying to enter the critical section will typically first try to acquire a permit, enter the critical section, and then release the permit again after. Like this:

```java
Semaphore semaphore = new Semaphore(1);

//critical section
semaphore.acquire();

...

semaphore.release();
```

###### Sending Signals Between Threads

If you use a semaphore to send signals between threads, then you would typically have one thread call the ``acquire()`` method, and the other thread to call the ``release()`` method.

If no permits are available, the ``acquire()`` call will block until a permit is released by another thread. Similarly, a ``release()`` calls is blocked if no more permits can be released into this semaphore.

Thus it is possible to coordinate threads. For instance, if acquire was called after Thread 1 had inserted an object in a shared list, and Thread 2 had called release() just before taking an object from that list, you had essentially created a blocking queue. The number of permits available in the semaphore would correspond to the maximum number of elements the blocking queue could hold.

###### Fairness

No guarantees are made about fairness of the threads acquiring permits from the Semaphore. That is, there is no guarantee that the first thread to call acquire() is also the first thread to obtain a permit. If the first thread is blocked waiting for a permit, then a second thread checking for a permit just as a permit is released, may actually obtain the permit ahead of thread 1.

If you want to enforce fairness, the Semaphore class has a constructor that takes a boolean telling if the semaphore should enforce fairness. Enforcing fairness comes at a performance / concurrency penalty, so don't enable it unless you need it.

* Here is how to create a Semaphore in fair mode: ``Semaphore semaphore = new Semaphore(1, true);``

###### More Methods

The java.util.concurrent.Semaphore class has lots more methods. For instance:

availablePermits()
acquireUninterruptibly()
drainPermits()
hasQueuedThreads()
getQueuedThreads()
tryAcquire()

List the implementations of BlockingQueue.
    ArrayBlockingQueue,
    DelayQueue,
    LinkedBlockingQueue,
    PriorityBlockingQueue,
    and SynchronousQueue.
