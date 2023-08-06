
## How many types of threads are there in Java?
    
Java offers two types of threads:
1. user threads
2. daemon threads.

# What is Daemon Thread in Java?

Daemon thread in Java is a low-priority thread that performs background operations such as garbage collection, finalizer, Action Listeners, Signal dispatches, etc.

Daemon thread in Java is also a service provider thread that helps the user thread. Its life is at the mercy of user threads; when all user threads expire, JVM immediately terminates this thread.

In simple words, we can say that it provides services to user threads for background-supporting tasks. Daemon thread in Java has no role in life other than to serve user threads.

## When There is No User Thread, Why Does JVM Stop the Daemon Thread in Java?

The daemon thread's main purpose is to provide services to the user thread for background task support.

Why should JVM keep running this thread if there is no user thread?

As a result, if there is no user thread, JVM stops the daemon thread.

## Properties of Daemon Thread in Java

* It's a thread with the lowest priority possible.
* They won't be able to stop the JVM from quitting once all of the user threads have completed their tasks.
* When all user threads have completed their execution, the JVM terminates.
* If JVM finds a running daemon thread, it terminates the thread and, after that, shutdown it.
* The JVM is unconcerned about whether the Daemon thread is active or not.
* The nature of a demon is passed down from parent to child. That is, if the parent is a Daemon, the child will be a Daemon as well, and if the parent is a non-daemon, the child will be a non-daemon as well.

## Methods for Daemon Thread in Java by Thread Class

| S.No.	| Method | Description |
|---|---|---|
| 1. | public void setDaemon(boolean status) | This method marks whether the current thread as a daemon thread or a user thread. |
| 2. | public final boolean isDaemon() | This method is used to determine whether or not the current thread is a daemon. If the thread is Daemon, it returns true. Otherwise, false is returned. |

## How to create Daemon Thread in Java

By default all threads are non daemon. We can make non daemon thread daemon using setDaemon() method. we call setDaemon() only before start() method. If we call setDaemon() after start() method an IllegalThreadStateException will be thrown.


1. ``SetDaemon()`` and ``isDaemon()`` methods are demonstrated in below Java program.

```java
public class DemoDaemonThread extends Thread
{
	String s;
	public DemoDaemonThread(String name){
		s=name;
	}

	public void run()
	{
		// Checking whether the thread is Daemon or not
		if(Thread.currentThread().isDaemon())
		{
			System.out.println(s + " is Daemon Thread");
		}
		
		else
		{
			System.out.println(s + " is User Thread");
		}
	}
	
	public static void main(String[] args)
	{
	
		DemoDaemonThread thread1 = new DemoDaemonThread("thread1");
		DemoDaemonThread thread2 = new DemoDaemonThread("thread2");
		DemoDaemonThread thread3 = new DemoDaemonThread("thread3");
	
		
		thread1.setDaemon(true);// set user thread1 to Daemon
			
		
		thread1.start();// starting thread1
		thread2.start();// starting thread2

		thread3.setDaemon(true);// set user thread1 to Daemon
		thread3.start();// starting thread3		
	}
}


Output:

thread3 is Daemon Thread
thread1 is Daemon Thread
thread2 is User Thread
```

2. Exception in Daemon() Thread is demonstrated in the below Java program.

```java
public class DemoDaemonThread extends Thread
{
	public void run()
	{
		System.out.println("Name of thread: " + Thread.currentThread().getName());
		System.out.println("Is it Daemon: "
						+ Thread.currentThread().isDaemon());
	}

	public static void main(String[] args)
	{
		DemoDaemonThread thread1 = new DemoDaemonThread();
		DemoDaemonThread thread2 = new DemoDaemonThread();
		
		thread1.start();//starting of thread1
		
		// will throw exception here because thread is already started
		thread1.setDaemon(true);
		
		thread2.start();//starting of thread2
	}
}


Runtime exception:

Exception in thread "main" java.lang.IllegalThreadStateException
at java.base/java.lang.Thread.setDaemon(Thread.java:1406)at DemoDaemonThread.main(DemoDaemonThread.java:18)

Output:

Name of thread: Thread-0
Is it Daemon: false
```

### Exceptions in a Daemon Thread in Java

| No. |	Exceptions |	Description |
| --- | --- | --- |
| 1.	| IllegalThreadStateException. |	If you call the setDaemon() method after the thread has started, it will throw an exception. |
| 2. |	SecurityException	| If the current thread is unable to change this thread |

### Daemon Thread vs User Thread

With the aid of the table below, learn more about the distinctions between Daemon and User threads:

| Daemon Threads |	User Threads (Non-daemon) |
| --- | --- |
| Low Priority threads |	High priority threads |
| The JVM does not wait for its execution to complete. |	The JVM waits till the execution is finished. |
| Life is dependent on user threads	| Life is independent |
| Daemon threads are created by JVM | 	An application creates its own user threads. |
| provides service to the user thread which runs in the background |	Used for foreground tasks |

## Can we make main() thread as daemon?

Main thread is always non daemon. We cannot make it daemon.

### Conclusion

We've seen what daemon threads in java are and how they may be utilised in a few real applications in this fast lesson.

* The threads which are executing in the background are called daemon threads.
* The main objective of daemon threadin Java is to provide support for non-daemon thread like main thread.
* Whenever the program runs with low memory, the JVM will execute Garbage collector to provide free memory. So that the main thread can continue it's execution.
* Daemon threads are Low Priority threads.
* A thread that executes main logic of the project is called non-daemon thread.
* Every user defined thread is created as non-daemon thread by default, because main thread is a non-daemon thread.