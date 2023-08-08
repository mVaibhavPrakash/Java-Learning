
### What is MultiThreading and its Purpose?
  
Its a way to achieve multi-tasking in java.

### Multi-tasking is acheived in 2 ways:

1. Process Based
2. Thread Based is Multi-MultiThreading

### What is Thread? ⭐️

Thread is separate path of execution in program.
Threads are, Light weight,They share the same address space. creating thread is simple
when compared to process because creating thread requires less resources when compared to
process.

### How to create a Thread? How to acheive Multi-Threading programmatically using Threads?

1. By extending Thread Class
2. By implementing Runnable Interface

### Which approach is better? ⭐️

implementing Runnable is a better approach.

### What is Main Thread?

Thread responsible to execute the main method.

### Why we call start method? can't we directly call run method? ⭐️

If we directly call run method..
then we are calling a normal method without creating a new thread.
that is run method will behave as normal method and now child thread will not get started
and there will only be main thread that will execute this run method.

Start Method:
Registering the thread with Thread Scheduler
Perform all the mandatory activities
invoke run

### Can we overload the run method?

yes ,but that start method written in Thread class invokes the no argument run method.
so if you overload the run method, the run method that will get invoked by the start method will
only be the one with no arguments.

### Can we override the start method?

It will not execute the necessary steps that thread class start method is having.
Thats why you should not override the start method. 
Still if you want to override the start method, you can first call the super of Thread class using super.start() and then can give additional implementation.

### What is Thread Scheduler?

It is a part of JVM.
It is responsible for the order in which the threads get executed
and there is no assurity of the algorithm used by the scheduler to order
the threads. It varies from JVM to JVM

### Explain the life-cycle of a Thread?

A thread can be in any of the five states :
1. New : When the instance of thread is created it will be in New state.
Ex : ``Thread t= new Thread();``
In the above example t is in new state.
The thread is created but not in active state to make it active,
we need to call start() method on it

2. Runnable state : A thread can be in the runnable state in either of the following two ways :
 When the start method is invoked or
 A thread can also be in runnable state after coming back from blocked or sleeping
 or waiting state.

3. Running state : If thread scheduler allocates cpu time, then the thread will be in running state.

4. Blocking/ Waiting / sleeping states : In this state the thread can be made temprorily inactive for a short period of time, the above state in any of the following ways:
    1. The thread waits to acquire lock of an object.
    2. The thread waits for another thread to complete.
    3. The thread waits for notification of other thread.

5. Dead State : A thread is in dead state when thread’s run method execution is complete. It dies automatically when thread’'s run method execution is completed and the thread object will be garbage collected.

//sleep(), yield(), join(), Thread name, Thread Groups, Thread Priorities....

### What are thread priorities and importance of thread priorities in java?

Thread priorities determine which thread to run. Every thread has a priority.
* A thread inherits priority of its parent thread.
* By default thread has normal priority of 5.
* Thread scheduler uses thread priorities to decide when each thread is allowed to run.
* Thread scheduler runs higher priority threads first.

### Explain different types of thread priorities ?

* Every thread in java has priority in between 1 to 10.
* By default priority is 5 (Thread.NORM_PRIORITY).
* The maximum priority would be 10 and minimum is 1.
* Thread class defines the following constants(static final variables) to define properties.
* Thread. MIN_PRIORITY = 1;
* Thread.NORM_PRIORITY=5;
* Thread. MAX_PRIORITY=10;

### How to change the priority of thread or how to set priority of thread?

Thread class has a set method to set the priority of thread
Signature : ``final void setPriority(int value);``
The ``setPriority()`` method is a request to JVM to set the priority. JVM may or may not oblige the request.
We can get the priority of current thread by using getPriority() method of Thread class.
```java
final int getPriority() {

}
```

### If two threads have same priority which thread will be executed first ?

We are not guaranteed which thread will be executed first when there are threads with equal priorities. It depends on thread scheduler that which thread to execute.

### What all methods are used to prevent thread execution ?
    
There are three methods in Thread class which prevents execution of thread.
1. yield()
2. join()
3. sleep()

### Explain yield() method in thread class ?
    
* Yield() method makes the current running thread to move in to runnable state from running state
giving chance to remaining threads of equal priority which are in waiting state.
* yield() makes current thread to sleep for a specified amount of time.T here is no guarantee that moving a current running thread from runnable to running state. It all depends on thread scheduler it doesn’t guarantee anything.

### Explain how join method works?
    
* A thread can invoke the join() method on other thread to wait for other thread to complete its
execution. Assume we have two threads, t1 and t2 threads .
* A running thread t1 invokes join() on thread t2 then t1 thread will wait in to waiting state until t2 completes.
* Once t2 completes the execution, t1 will continue.
* join() method throws Interrupted Exception so when ever we use join() method
* We should handle Interrrupted Exception by throws or by using try catch block.

* ``public final void join()``: This java thread join method puts the current thread on wait until the thread on which it’s called is dead. If the thread is interrupted, it throws InterruptedException. 
* ``public final synchronized void join(long millis)``: This java thread join method is used to wait for the thread on which it’s called to be dead or wait for specified milliseconds. Since thread execution depends on OS implementation, it doesn’t guarantee that the current thread will wait only for given time. 
* ``public final synchronized void join(long millis, int nanos)``: This java thread join method is used to wait for thread to die for given milliseconds plus nanoseconds. Here is a simple example showing usage of Thread join methods.

```java
public class ThreadJoinExample {

    public static void main(String[] args) {
        Thread t1 = new Thread(new MyRunnable(), "t1");
        Thread t2 = new Thread(new MyRunnable(), "t2");
        Thread t3 = new Thread(new MyRunnable(), "t3");
        
        t1.start();
        
        //start second thread after waiting for 2 seconds or if it's dead
        try {
            t1.join(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        t2.start();
        
        //start third thread only when first thread is dead
        try {
            t1.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        t3.start();
        
        //let all threads finish execution before finishing main thread
        try {
            t1.join();
            t2.join();
            t3.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        System.out.println("All threads are dead, exiting main thread");
    }

}

class MyRunnable implements Runnable{

    @Override
    public void run() {
        System.out.println("Thread started:::"+Thread.currentThread().getName());
        try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Thread ended:::"+Thread.currentThread().getName());
    }
    
}
Output of the above program is:

Thread started:::t1
Thread started:::t2
Thread ended:::t1
Thread started:::t3
Thread ended:::t2
Thread ended:::t3
All threads are dead, exiting main thread
```

### Explain purpose of sleep() method in java?

sleep() method causes current running thread to sleep for specified amount of time .
Now lets see the syntaX:
1. First one: ``public static native void sleep(long ms)``. //its a native one not written in java
2. second one: ``public static void sleep(long ms,int ns)``
There is no sleep method with no argument..with sleep there must be the interval for which we want to make the thread sleep.

| Property |	yield()	| join()	| sleep() |
|---|---|---|---|
| Purpose |	We use yield(), if a thread is willing to pass its execution (set its status back to Ready state) to give a chance to other remaining threads in the ready state. |	We use join() method when a thread is willing to wait until the completion of a different thread. |	sleep() method is used if a thread does not want to perform operation for a definite amount of time.|
| Is it overloaded? |	No |	Yes	| Yes |
| Is it final? | No | Yes | No |
| Static method? | Yes	| No | Yes |
| Throws exception?	| No | Yes | Yes |

### Explain about interrupt() method of thread class ?

If any thread is in sleeping or waiting state (i.e. sleep() or wait() is invoked),
calling the interrupt() method on the thread, breaks out the sleeping or waiting state
throwing InterruptedException. This is reason we need to handle interrupted exception with throws
or try/ catch block

### What is Race Condition and when it occur?⭐️

When more than one thread operate on same object without proper synchronization
then the thread operations interleaves on each other. that is, one thread is modifying the object data and in some intermediate state where the updation is not yet completed some other thread performs modification on the intermediate data resulting to data inconsistency. and this condition is called race condition. this happens when the operations that the threads are performing are non-atomic and this is why thread operation interleaves on each other.

### What are atomic and non atomic operations? Can volatile make a non-atomic operation to atomic?
    
Atomic operations take place in one step. Where as non-atomic operations takes place in multiple steps internally. Java provides volatile keyword to make assignment or read or write operations atomic. We can use volatile before long and double and boolean to avoid data inconsistency. but you can't do anything compound such as incrementing it safely, because that's a read/modify/ write cycle.

### What is Synchronization?

we can guard the critical section to avoid data inconsistency so that only one thread have access or execute this section of the code at a time. that is only one thread enters this section at at a time and when it exits other thread can enter this section.

### What is critical section?
	
A critical section in java multithreading is a piece of code that access shared resources.
that is why there are chances of data inconsistency or race condition if multiple threads operate simultaneously.

### What are the ways to acheive synchronization?

Two ways:
1. Synchronized methods
2. Synchronized blocks

### Producer-Consumer solution using threads in Java

The problem describes two processes, the producer and the consumer, which share a common, fixed-size buffer used as a queue. 

The producer’s job is to generate data, put it into the buffer, and start again.
At the same time, the consumer is consuming the data (i.e. removing it from the buffer), one piece at a time.

#### Problem 

To make sure that the producer won’t try to add data into the buffer if it’s full and that the consumer won’t try to remove data from an empty buffer.

#### Solution 

The producer is to either go to sleep or discard data if the buffer is full. The next time the consumer removes an item from the buffer, it notifies the producer, who starts to fill the buffer again. In the same way, the consumer can go to sleep if it finds the buffer to be empty. The next time the producer puts data into the buffer, it wakes up the sleeping consumer. 
An inadequate solution could result in a deadlock where both processes are waiting to be awakened. 
Recommended Reading- Multithreading in JAVA, Synchronized in JAVA, Inter-thread Communication

Implementation of Producer Consumer Class 

* A LinkedList list – to store list of jobs in queue.
* A Variable Capacity – to check for if the list is full or not
* A mechanism to control the insertion and extraction from this list so that we do not insert into list if it is full or remove from it if it is empty.

> Note: It is recommended to test the below program on a offline IDE as infinite loops and sleep method may lead to it time out on any online IDE  

```java
// Java program to implement solution of producer
// consumer problem.
 
import java.util.LinkedList;
 
public class Threadexample {

    public static void main(String[] args) throws InterruptedException {

    // Object of a class that has both produce()
    // and consume() methods
    final PC pc = new PC();

    // Create producer thread
    Thread t1 = new Thread(new Runnable() {
        @Override
        public void run()
        {
            try {
                pc.produce();
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    });

    // Create consumer thread
    Thread t2 = new Thread(new Runnable() {
        @Override
        public void run()
        {
            try {
                pc.consume();
            }
            catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    });

        // Start both threads
        t1.start();
        t2.start();

        // t1 finishes before t2
        t1.join();
        t2.join();
    }

// This class has a list, producer (adds items to list
// and consumer (removes items).
    public static class PC {

        // Create a list shared by producer and consumer
        // Size of list is 2.
        LinkedList<Integer> list = new LinkedList<>();
        int capacity = 2;

        // Function called by producer thread
        public void produce() throws InterruptedException {
            int value = 0;
            while (true) {
                synchronized (this)
                {
                    // producer thread waits while list
                    // is full
                    while (list.size() == capacity)
                        wait();

                    System.out.println("Producer produced-"
                                    + value);

                    // to insert the jobs in the list
                    list.add(value++);

                    // notifies the consumer thread that
                    // now it can start consuming
                    notify();

                    // makes the working of program easier
                    // to  understand
                    Thread.sleep(1000);
                }
            }
        }

        // Function called by consumer thread
        public void consume() throws InterruptedException {
            while (true) {
                synchronized (this){
                    // consumer thread waits while list
                    // is empty
                    while (list.size() == 0)
                        wait();

                    // to retrieve the first job in the list
                    int val = list.removeFirst();

                    System.out.println("Consumer consumed-"
                                    + val);

                    // Wake up producer thread
                    notify();

                    // and sleep
                    Thread.sleep(1000);
                }
            }
        }
    }
}
```

### When a thread is executing synchronized methods , then is it possible to execute other synchronized methods simultaneously by other threads on the same object?

No it is not possible to execute synchronized methods by other threads on the same object when a thread is inside a synchronized method

Example:
```java

Student s = new Student()

class Student{
  synchronized public void method1(){    //can only be executed on s by the thread having the lock of s
  
  }

  synchronized public void method2(){   //can only be executed on s by the thread having the lock of s

  }

  public void method3(){                //any thread can execute this method on s.
  
  }
}
```

### When a thread is executing synchronized methods, then is it possible to execute other synchronized methods simultaneously by other threads on different objects?

yes, its is possible. Other threads are only restricted to execute the synchronized methods on the
object whose lock is already aquired by the thread.

### Can we synchronize static methods in java?

Every class in java has a unique lock associated with it.
If a thread wants to execute static synchronize method it need to acquire class level lock.
When a thread was executing static synchronized method no other thread can execute
static synchronized method of class since lock is acquired on class.

But it can execute the following methods simultaneously :
1. Normal static methods
2. Normal instance methods
3. Synchronized instance methods

```java 
class Student{
  
  synchronized public static void staticMethod1(){  /*can only be executed by the thread having the lock of class Student*/
  
  }
  public static void staticMethod2(){  //can be executed by any thread
  
  }
  synchronized public void method1(){    //can only be executed by any thread
  
  }
  synchronized public void method2(){   //can only be executed by any thread
  
  }
  public void method3(){               //can only be executed by any thread
  
  }
}
```

### Can we use synchronized block for primitives?

```java
Student s = new Student();

synchronized (s){

}

class Student{
  public static void staticMethod1(){
     //can only be executed by the thread having the lock of class Student
    synchronized(Student.class){
    
    }
  }
  public static void staticMethod2(){  //can be executed by any thread
  
  }
  public void method1(){
    //can be executed by any thread
    synchronized (this){

    }
  }
  synchronized public void method2(){   //can only be executed by any thread

  }
    public void method3(){               //can only be executed by any thread
  
  }
}
```

Synchronized blocks are applicable only for objects. If we try to use synchronized blocks for primitives we get compile time error.

### Why we use explicit lock?

### Explicit Locking

Explicit locking mechanism can be used to coordinate access to shared resources in a multi-threaded environment.

The ``Lock interface``, which is declared in the java.util.concurrent.locks package, defines the explicit locking operations.

The ``ReentrantLock class``, in the same package, is the concrete implementation of the Lock interface.

The Lock interface is declared as follows:

```java
public interface Lock {
  void lock();

  Condition newCondition();

  void lockInterruptibly() throws InterruptedException;

  boolean tryLock();

  boolean tryLock(long time, TimeUnit unit) throws InterruptedException;

  void unlock();
}
```

``lock()`` method acquires a lock behaves the same as the use of the synchronized keyword.

We must release the lock by calling the ``unlock()`` method of the Lock interface after we are done with the lock.

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
/*from w w  w.j  a v a  2s.c  om*/
public class Main {
  // Instantiate the lock object
  private Lock myLock = new ReentrantLock();

  public void updateResource() {

    try {
      // Acquire the lock
      myLock.lock();
    } finally {
      // Release the lock
      myLock.unlock();
    }
  }
}
```

#### Example

```java
import java.util.concurrent.locks.Lock; //import Lock interface 
 import java.util.concurrent.locks.ReentrantLock; // import ReentrantLock class 
 class Account 
 { 
      private double balance=5000; 
      private Lock lockObj = new ReentrantLock(); //Create a lock 
      public double getBalance() 
      { 
        return balance; 
      } 
      public void deposit(double amount ) 
      { 
        lockObj.lock(); //lock his object 
        try 
        { 
            System.out.println( Thread.currentThread().getName() +" Read Balance : " + balance); 
            double newBalance = balance + amount; 
            Thread.sleep(1000); 
            balance = newBalance; 
        } 
        catch(InterruptedException ex){
            
        } 
        finally 
        { 
             lockObj.unlock(); //unlock this 0bject 
        } 
      } 
 } 
  class AddAmountTask implements Runnable 
 {   
    Account acct; 
    AddAmountTask(Account ac) 
    { 
        acct = ac; 
    } 
    public void run() 
    { 
           acct.deposit(100); 
    } 
 } 
 class ExlicitLock 
 { 
    public static void main(String[] args) 
    { 
        Account a = new Account(); //shared resource 
        AddAmountTask t = new AddAmountTask(a); 
        Thread t1 = new Thread(t); 
        Thread t2 = new Thread(t); 
        Thread t3 = new Thread(t); 
        t1.start(); t2.start(); t3.start(); 
        try 
        { 
            t1.join(); t2.join(); t3.join(); 
        } 
        catch(InterruptedException ex){} 
        System.out.println("Total Balance in Account is : " + a.getBalance()); 
    } 
 }
```

### Explain about inter-thread communication and how it takes place in java?
    
Usually threads are created to perform different unrelated tasks but there may be situations where they may perform related tasks or they need to communicate to other threads.
One of the example of this is Producer Consumer problem. 
Inter-thread communication in java is done with the help of following three methods :
1. wait()
2. notify()
3. notifyAll()

### Explain wait(), notify() and notifyAll() methods of object class ?
  	
1. wait() : wait() method releases the lock on object until some other thread acquires the lock and calls notify().
2. notify() :notify() method wakes up the thread that called wait on the same object.
3. notfiyAll() :notifyAll() method wakes up all the threads that called wait() on the same object.
The highest priority threads will run first.
All the above three methods are in object class and are called only in synchronized context.
All the above three methods must handle InterruptedException by using throws clause or by using try
catch clause.

### Write code to solve the Produce consumer problem in Java? ⭐️

when wait(), notify(), notifyAll() methods are called does it releases the lock or holds the acquired lock? when the thread enter in synchronized context thread acquires the lock on current object. When wait(), notify(), notifyAll() methods are called lock is released on that object.

### Explain why wait(), notify() and notifyAll() methods are in Object class rather than in thread class?

wait() , notify(), notifyAll() methods are object level methods they are called on same object these methods are called on an shared object so they are kept in object class rather than thread class.

### Explain IllegalMonitorStateException and when it will be thrown?
  	
``IllegalMonitorStateException`` is thrown when wait(), notify() and notifyAll() are called in non
synchronized context. 
Wait(), notify(),notifyAll() must always be called in synchronized context other wise we get this run time exception. Whenever we call these methods lock is acquired or released on that object so they must be called from within synchronized area

//other

### Explain which of the following methods releases the lock when invoked?

1. yield()       No
2. join()        No
3. sleep()       No
4. wait()        Yes
5. notify()      Yes
6. notifyAll()   Yes


### Can we restart a dead thread in java?
  	 
If we try to restart a dead thread by using start method, we will get run time exception since the
thread is not alive.

### Can one thread block the other thread?

No, one thread cannot block the other thread in java. It can block the current thread that is running.
for example if we yield a thread..it blocks itself to give chance to other thread..but we can't
block other thread.

### Can we restart a thread already started in java?

We start a thread using start() method in java.
If we call start method second time once it is started it will cause RunTimeExceptio (IllegalThreadStateException).
A runnable thread cannot be restarted

//liveness problems, Daemon Threads, Immutable Objects (Thread Safety)

### What is liveness? What are liveness problems?

A concurrent application's ability to execute in a timely manner is known as its liveness.
Liveness problems include:
* Deadlock,
* Starvation,
* Livelock

### What is deadlock? ⭐️

If two threads are waiting for each other forever such type of infinite waiting is called deadlock in java. Synchronized keyword is the only reason for deadlock situation hence while using synchronized keyword we have to take special care. There is no resolution technique for deadlock, but several prevention techniques are available. 

#### Monitoring DeadLock using VisualVM

Whenever you run multithreaded applications it is a good idea to launch VisualVM and analyze how your multithreaded application is working. 

As soon as the application is launched and I activate the “Threads” tab I can see that blocking is occurring and we, in fact, have a deadlock condition. Please ensure the threads visualization checkbox is checked otherwise the tab will be mostly blank.

![deadlock_screenshot_VisualVm](Images/deadlock_screenshot.png)

As you can see from the screenshot, some of the threads are fine. Green means thread is running. Yellow means it is waiting from some resource to become available, or waiting for notify/notifyAll from another thread. **Finally, red means that the thread is waiting to gain access over a monitor (in other words, it has reached a synchronized block or is waiting for some kind of lock on a resource or object)**. As you can see from the screenshot, both Thread_1 and Thread_2 are waiting and in this case, blocking each other causing a deadlock condition.

**Additionally we can review the ``Thread Dump`` from Java VisualVM and search for deadlock**

#### Implementation: Deadlock occurs

Example 1:

```java
// Java program to illustrate Deadlock
// where deadlock occurs
// Importing required packages
import java.io.*;
import java.util.*;
// Class 1
// Helper class
class A {
    // Method 1 of this class
    // Synchronized method
    public synchronized void last()
    {
        // Print and display statement
        System.out.println("Inside A, last() method");
    }
    // Method 2 of this class
    // Synchronized method
    public synchronized void d1(B b)
    {
        System.out.println(
            "Thread1 start execution of d1() method");
        // Try block to check for exceptions
        try {
            // Putting the current thread to sleep for
            // specific time using sleep() method
            Thread.sleep(2000);
        }
        // Catch block to handle the exceptions
        catch (InterruptedException e) {
            // Display the exception on the console
            System.out.println(e);
        }
        // Display statement
        System.out.println(
            "Thread trying to call B's last() method");
        // Calling the method 1 of this class as created
        // above
        b.last();
    }
}
// Class 2
// Helper class B
class B {
    // Method 1 of this class
    public synchronized void last()
    {
        // Display statement only
        System.out.println("Inside B, last() method");
    }
    // Method 2 of this class
    // Synchronized the method d2
    public synchronized void d2(A a)
    {
        // Display message only
        System.out.println(
            "Thread2 start execution of d2() method");
        // Try block to check for exceptions
        try {
            // Putting the current thread to sleep for
            // certain time using sleep() method
            Thread.sleep(2000);
            // Catch block to handle the exceptions
        }
        catch (InterruptedException e) {
            // Display the exception on the console
            System.out.println(e);
        }
        // Display message only
        System.out.println(
            "Thread2  trying to call A's last method");
        // Again calling the last() method inside this class
        a.last();
    }
}
 
// Class 3
// Main class
// Deadlock class which is extending Thread class
class GFG extends Thread {
    // Creating object of type class A
    A a = new A();
    // Creating object of type class B
    B b = new B();
    // Method 1
    public void m1()
    {
        // Starting the thread
        this.start();
        // Calling d1 method of class A
        a.d1(b);
    }
    // Method 2
    // run() method for the thread
    public void run()
    {
        // Calling d2 method of class B
        b.d2(a);
    }
    // Method 3
    // Main driver method
    public static void main(String[] args)
    {
        // Creating object of this class
        GFG deadlock = new GFG();
        // Calling m1 method
        deadlock.m1();
    }
}
```
#### Output:

![Exception](/Images/deadlockoccurence.png)


#### Output explanation:

Here the cursor is showing forever because the threads enter into the deadlock situation. In the above program if we removed at least one synchronized keyword then the program won’t enter into the deadlock situation. Hence, synchronized keyword is one of the major reason for deadlock situation. Due to this while using synchronized keyword we have to take special care.

#### We can avoid Deadlock situation in the following ways:

1. **Using Thread.join() Method**: We can get a deadlock if two threads are waiting for each other to finish indefinitely using thread join. Then our thread has to wait for another thread to finish, it is always best to use Thread.join() method with the maximum time you want to wait for the thread to finish.
2. **Use Lock Ordering**: We have to always assign a numeric value to each lock and before acquiring the lock with a higher numeric value we have to acquire the locks with a lower numeric value.
3. **Avoiding unnecessary Locks**: We should use locks only for those members on which it is required, unnecessary use of locks leads to a deadlock situation. And it is recommended to use a lock-free data structure and If it is possible to keep your code free from locks. For example, instead of using synchronized ``ArrayList`` use the ``ConcurrentLinkedQueue``.

4. **Lock Order**– As you saw from my previous example, deadlocks occur when multiple threads accessed resources and obtained locks in different order. Ensuring the same lock ordering sequence will help avoid this common pitfall.
Corrected Snippet for proper Lock Order

```java
synchronized (ResourceA) {
  System.out.println("Worker1: Holding ResourceA...");
  doSomeWork();
  System.out.println("Worker1: Waiting for ResourceB...");
  synchronized (ResourceB) {
    System.out.println("Worker1: Holding ResourceA & ResourceB...");
    doSomeOtherWork();
  }
}
...
synchronized (ResourceA) {
  System.out.println("Worker2: Holding ResourceA...");
  doSomeWork();
  System.out.println("Worker2: Waiting for ResourceB...");
  synchronized (ResourceB) {
    System.out.println("Worker2: Holding ResourceA & ResourceB...");
    doSomeOtherWork();
  }
}
```

5. **Nested Locks** – A nested lock occurs when you obtain a lock on one resource and then attempt obtaining one or more additional locks without releasing current locks. This scenario also existed in my example as I was holding on to a lock on Resource A while trying to acquire a lock on Resource B without releasing Resource A.
```java
synchronized (ResourceA) {
  System.out.println("Worker1: Holding ResourceA...");
  doSomeWork();
}
System.out.println("Worker1: Waiting for ResourceB...");
synchronized (ResourceB) {
  System.out.println("Worker1: Holding ResourceB...");
  doSomeOtherWork();
}
...
 
synchronized (ResourceA) {
  System.out.println("Worker2: Holding ResourceA...");
  doSomeWork();
}
System.out.println("Worker2: Waiting for ResourceB...");
synchronized (ResourceB) {
  System.out.println("Worker2: Holding ResourceB...");
  doSomeOtherWork();
}
```

6. **Avoid Intrinsic Locks** – When locking multiple resources avoid using intrinsic locks, instead use explicit locks via timed tryLock. Using intrinsic locks will wait forever if the lock cannot be acquired. By using a timeout, you retain control when it fails for some unexpected reason. You are then at liberty to wait for some specified duration and try again at a later time.
Narrow Lock Scope – When locking resources always ensure you hold the lock on the critical resource for as brief a time as possible. Move all unnecessary code outside of the synchronized block of code.

#### Example 2: Deadlock is prevented

```java
// Java program to illustrate Deadlock
// where deadlock is prevented from occurring
// Importing required packages
import java.io.*;
import java.util.*;
 
// Class 1
// Helper class
class A {
    // Method 1 of this class
    // Synchronized method
    public synchronized void last()
    {
        // Print and display statement
        System.out.println("Inside A, last() method");
    }
    // Method 2 of this class
    // Synchronized method
    public synchronized void d1(B b)
    {
        System.out.println(
            "Thread1 start execution of d1() method");
        // Try block to check for exceptions
        try {
            // Putting the current thread to sleep for
            // specific time using sleep() method
            Thread.sleep(2000);
        }
        // Catch block to handle the exceptions
        catch (InterruptedException e) {
            // Display the exception on the console
            System.out.println(e);
        }
        // Display statement
        System.out.println(
            "Thread trying to call B's last() method");
        // Calling the method 1 of this class as created
        // above
        b.last();
    }
}
 
// Class 2
// Helper class B
class B {
 
    // Method 1 of this class
    public void last()
    {
 
        // Display statement only
        System.out.println("Inside B, last() method");
    }
 
    // Method 2 of this class
    // Non-synchronized the method d2
    public void d2(A a)
    {
 
        // Display message only
        System.out.println(
            "Thread2 start execution of d2() method");
 
        // Try block to check for exceptions
        try {
 
            // Putting the current thread to sleep for
            // certain time using sleep() method
            Thread.sleep(2000);
 
            // Catch block to handle the exceptions
        }
        catch (InterruptedException e) {
 
            // Display the exception on the console
            System.out.println(e);
        }
 
        // Display message only
        System.out.println(
            "Thread2  trying to call A's last method");
 
        // Again calling the last() method inside this class
        a.last();
    }
}
 
// Class 3
// Main class
// Deadlock class which is extending Thread class
class GFG extends Thread {
 
    // Creating object of type class A
    A a = new A();
 
    // Creating object of type class B
    B b = new B();
 
    // Method 1
    public void m1()
    {
 
        // Starting the thread
        this.start();
 
        // Calling d1 method of class A
        a.d1(b);
    }
 
    // Method 2
    // run() method for the thread
    public void run()
    {
 
        // Calling d2 method of class B
        b.d2(a);
    }
 
    // Method 3
    // Main driver method
    public static void main(String[] args)
    {
 
        // Creating object of this class
        GFG deadlock = new GFG();
 
        // Calling m1 method
        deadlock.m1();
    }
}
```
#### Output

![ExceptionHandling](/Images/deadlockprevention.png)

### How immutability simplify the concurrency?

Immutable objects are by default thread-safe because there state can not be modified once created.
So we do not have to take care of data inconsistency in case of immutable objects.
For example: All the Wrapper classes (Integer, Long, Byte, Double, Float, Short),String class