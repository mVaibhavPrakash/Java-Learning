## Which objects are eligible for garbage collection?

Any object on the heap which unreachable through a reference from the stack is eligible for garbage collection.

## Is programmer responsible to destroy objects?⭐️

No! In java programmer need not to worry for this. Garbage collector destroys the objects which are no longer in use.
Before calling garbage collector, it is recommended to make the unused object available for garbage collection.

## How to make an object available for garbage collection?⭐️

There are 4 ways to do so,

1. Nullifying the reference variable: by doing so the object in heap will be unreachable from the stack.
2. Reassigning the reference variable: the variable gets assigned with new object and the older one gets unreferenced from stack..
3. Object inside method: we know for every method call the stack has a stack frame, which consists of all of its members. When a method is executed the stack frame is popped out from
stack and thus all of its members get unreferenced from the stack.
4. Creating anonymous object: we know an anonymous object is not referenced, so it is eligible for garbage collection.

## How to call garbage collector?

The most common way to invoke garbage collector is by invoking gc method of system class.
``System.gc();``

Other way is to invoke gc method with Runtime class.
``Runtime.getRuntime().gc()``;

This method suggests the JVM to recycle the unused objects in order to make the memory available for future allocation.

## Can you guarantee that invoking gc will definitely call garbage collector?⭐️

By invoking gc, we just request or suggest JVM to call garbage collector. But there is no guarantee that the Java virtual machine will do that. So answer is no!

## If an object reference is set to null, will the Garbage Collector immediately free the memory held by that object ?

No, the object will be available for garbage collection in the next cycle of the garbage collector.

## When should we call garbage collector to run?

When we are executing multiple blocks of code and after executing one block
-> if we want to free the memory so that the next block of code may execute more efficiently
-> if you are trying to get more accurate evaluation and want to start those code block with the same state as we started the very first block.... then we may call the gc.

## Why is it bad idea to run gc?

As we know we can not guarantee that the garbage collector will process when we call gc, so we should just do not bother to do it.
Because when we call gc, Garbage collection temporarily stops all threads in our application for running.
When garbage collection takes place our application is temporarily suspended.. and it would not resume until the gc process complete.
This 'stops the world!' That is, running garbage collection can cause an unacceptable freeze in
execution.

## Describing Garbage Collection

### What is Automatic Garbage Collection?

Automatic garbage collection is the process of looking at heap memory, identifying which objects are in use and which are not, and deleting the unused objects. An in use object, or a referenced object, means that some part of your program still maintains a pointer to that object. An unused object, or unreferenced object, is no longer referenced by any part of your program. So the memory used by an unreferenced object can be reclaimed.

In a programming language like C, allocating and deallocating memory is a manual process. In Java, process of deallocating memory is handled automatically by the garbage collector. The basic process can be described as follows.

#### Step 1: Marking
The first step in the process is called marking. This is where the garbage collector identifies which pieces of memory are in use and which are not.

![Hotspot JVM](Images/marking.PNG)
Referenced objects are shown in blue. Unreferenced objects are shown in gold. All objects are scanned in the marking phase to make this determination. This can be a very time consuming process if all objects in a system must be scanned.

#### Step 2: Normal Deletion
Normal deletion removes unreferenced objects leaving referenced objects and pointers to free space.

![Hotspot JVM](Images/normaldel.PNG)
The memory allocator holds references to blocks of free space where new object can be allocated.

**Step 2a: Deletion with Compacting**

To further improve performance, in addition to deleting unreferenced objects, you can also compact the remaining referenced objects. By moving referenced object together, this makes new memory allocation much easier and faster.

![Hotspot JVM](Images/delwithcompacting.PNG)
Why Generational Garbage Collection?
As stated earlier, having to mark and compact all the objects in a JVM is inefficient. As more and more objects are allocated, the list of objects grows and grows leading to longer and longer garbage collection time. However, empirical analysis of applications has shown that most objects are short lived.

Here is an example of such data. The Y axis shows the number of bytes allocated and the X access shows the number of bytes allocated over time.

![Hotspot JVM](Images/Byteallocated.gif)
As you can see, fewer and fewer objects remain allocated over time. In fact most objects have a very short life as shown by the higher values on the left side of the graph.

### Garbage collection and Java
In programming languages like C, developers have to take close care of memory by allocating and deallocating it accordingly.

Java, on the other hand, has its own automatic garbage collection with the idea that most developers don’t have to worry too much about such manual memory tasks, if at all.

In a nutshell, objects in Java are allocated in a heap (also known as heap memory). Java’s garbage collection algorithm then goes through the heap and marks objects that are in use by the JVM and then later on goes back and reclaims the memory of any object that was not marked.

The details of that algorithm is for another article, but what is important is the marking itself and the fact that the heap is allocated into smaller parts, called generations.

![Hotspot JVM](Images/hotheapstr.PNG)

In the above diagram, we finally see the terms “young generation”, “old generation”, and “permanent generation”. If it looks scary, don’t worry; the basic concepts are actually pretty intuitive.

#### The Young Generation
From a high level, the young generation is where all new objects start out. Once they’re allocated in the Java code, they go specifically to this subsection called the eden space.

Eventually, the eden space fills up with objects. At this point, a minor garbage collection event occurs.

That’s where the marking algorithm I described earlier comes into play. Some objects (those that are referenced) are marked, and some (those that are unreferenced) are not. Those that had been marked then move onto another subsection of the young generation called S0 of the survivor space (note that the survivor space itself is split into two parts, S0 and S1). Those left unmarked are cleared out by Java’s automatic garbage collection.

![Hotspot JVM](Images/copyingrefspace.PNG)

It stays this way until the eden space fills up again; at this point, a new cycle kicks off. The previous paragraph’s events happen again, but in this cycle, it’s a little different. S0 was populated, and so all marked objects that survive from both the eden space and S0 actually go to the second part of the survivor space called S1. In the below diagram, we see that they’re labeled the from survivor space and the to survivor space, respectively.

![Hotspot JVM](Images/objectaging.PNG)

One very important thing to note that any objects that make it to the survivor space gets tagged with an age counter. The algorithm will check this to see if it meets a threshold to go to the next stage: the old generation. More on that in a later section.

OK, let’s take a deep breath here, because during the next cycle of garbage collection, it gets a little strange, but it’s not too bad. Essentially, when the eden space fills up again and triggers another minor garbage collection, we’re not putting all the marked (referenced) objects into S1; rather, the from and to survivor spaces are switched.

![Hotspot JVM](Images/additionalaging.PNG)

Hopefully the above diagram illustrates the switching of the from and to survivor space. The thing that I personally take away from here is that objects don’t necessary go from S0 to S1 of the survivor space. Really, they just alternate to where they switch to with every minor garbage collection event.

And honestly, this is pretty into the nitty-gritty. It’s probably more than enough knowledge to just know that essentially all new objects start out in the eden space and then eventually make their way into a survivor space as they survive garbage collection cycles.

#### The Old Generation
The old generation can be thought of as where long-lived objects lie. Basically, if objects reach a certain age threshold after multiple garbage collection events in the young generation, then they can then be moved to the old generation.

When objects get garbage collected from the old generation, a major garbage collection event occurs.

Let’s see what a promotion from the survivor space of the young generation to the old generation looks like.

![Hotspot JVM](Images/promotion1.PNG)

In the above example, any surviving objects that have hit an age threshold of 8 cycles — and this is just an example, so don’t specifically memorize that number — is moved by the algorithm to the old generation.

The old generation is comprised of only one section called the tenured generation. This is why in conversation or in reading sometimes that the two terms have come to be mostly interchangeable.

The events that lead to a clearing of the old generation — again, a major garbage collection event — can vary, and it’s not particularly within the scope of this article to know them. Let’s move on.

#### The Permanent Generation
So here’s a big gotcha. The permanent generation is not populated when the old generation’s objects reach a certain threshold and then get moved (promoted) to the permanent generation. Again, it doesn’t work this way!

Rather, the permanent generation is immediately filled up by the JVM with the metadata that represents the applications’ classes and methods at runtime.

The JVM may sometimes follow certain rules to clean out the permanent generation, and when it does, it’s called a full garbage collection.

What is a “stop the world” event?
A “stop the world” event sounds pretty dramatic, but think of it in terms of the Java application being the world.

When there’s a minor garbage collection (remember: for the young generation) or a major garbage collection (for the old generation), then the world stops; in other words, all application threads are completely stopped and have to wait for the garbage collection event to complete.

 
### The Generational Garbage Collection Process
Now that you understand why the heap is separted into different generations, it is time to look at how exactly these spaces interact. The pictures that follow walks through the object allocation and aging process in the JVM.

First, any new objects are allocated to the eden space. Both survivor spaces start out empty.

![Hotspot JVM](Images/objectallocation.PNG)
When the eden space fills up, a minor garbage collection is triggered.

![Hotspot JVM](Images/fiilingedenspace.PNG)
Referenced objects are moved to the first survivor space. Unreferenced objects are deleted when the eden space is cleared.

![Hotspot JVM](Images/copyingrefspace.PNG)
At the next minor GC, the same thing happens for the eden space. Unreferenced objects are deleted and referenced objects are moved to a survivor space. However, in this case, they are moved to the second survivor space (S1). In addition, objects from the last minor GC on the first survivor space (S0) have their age incremented and get moved to S1. Once all surviving objects have been moved to S1, both S0 and eden are cleared. Notice we now have differently aged object in the survivor space.

![Hotspot JVM](Images/objectaging.PNG)
At the next minor GC, the same process repeats. However this time the survivor spaces switch. Referenced objects are moved to S0. Surviving objects are aged. Eden and S1 are cleared.

![Hotspot JVM](Images/additionalaging.PNG)
This slide demonstrates promotion. After a minor GC, when aged objects reach a certain age threshold (8 in this example) they are promoted from young generation to old generation.

![Hotspot JVM](Images/promotion1.PNG)
As minor GCs continue to occure objects will continue to be promoted to the old generation space.

![Hotspot JVM](Images/promotion2.PNG)
So that pretty much covers the entire process with the young generation. Eventually, a major GC will be performed on the old generation which cleans up and compacts that space.

![Hotspot JVM](Images/gcprocesssummary.PNG)

### GC Implementations
JVM has five types of GC implementations:

1. Serial Garbage Collector
2. Parallel Garbage Collector
3. CMS Garbage Collector
4. G1 Garbage Collector
5. Z Garbage Collector

#### Serial Garbage Collector
This is the simplest GC implementation.Serial Garbage collector is well-matched for single-threaded environments. It uses the only thread for garbage collection. It works by holding all the threads of an application. It means that threads of the application freeze by the serial garbage collector during the garbage collection process and the process is known as **stop the world event.**

The Serial GC is the garbage collector of choice for most applications that don't have small pause time requirements and run on client-style machines. To enable Serial Garbage Collector, we can use the following argument:

```java
java -XX:+UseSerialGC -jar Application.java
```
![Hotspot JVM](Images/gc1.png)

#### Parallel Garbage Collector 
It's the default GC of the JVM, and sometimes called Throughput Collectors. Unlike Serial Garbage Collector, it uses multiple threads for managing heap space, but it also freezes other application threads while performing GC.

If we use this GC, we can specify maximum garbage collection threads and pause time, throughput, and footprint (heap size).

The numbers of garbage collector threads can be controlled with the command-line option 
```java
-XX:ParallelGCThreads=<N>.
```

The maximum **pause time** goal (gap [in milliseconds] between two GC) is specified with the command-line option ```-XX:MaxGCPauseMillis=<N>.```

The time spent doing garbage collection versus the time spent outside of garbage collection is called the **maximum throughput target** and can be specified by the command-line option ```-XX:GCTimeRatio=<N>.```

The **maximum heap footprint** (the amount of heap memory that a program requires while running) is specified using the option ```-Xmx<N>.```

To enable Parallel Garbage Collector, we can use the following argument:

```java
java -XX:+UseParallelGC -jar Application.java
```
![Hotspot JVM](Images/gc2.png)

We can also use the following JVM arguments in parallel GC:

| JVM Argument   | Description |
| -------- | ------- |
| -XX:ParallelGCThreads=<n> | It controls the number of GC threads (n).    |
| -XX:MaxGCPauseMillis=<t> | It specifies the maximum pause time*.    |
| -XX:GCTimeRatio=<n>   | t specifies the maximum throughput target**.    |

#### CMS Garbage Collector
The Concurrent Mark Sweep (CMS) implementation uses multiple garbage collector threads for garbage collection. It's designed for applications that prefer shorter garbage collection pauses, and can afford to share processor resources with the garbage collector while the application is running.

Simply put, applications using this type of GC respond slower on average, but don't stop responding to perform garbage collection.

A quick point to note here is that since this GC is concurrent, an invocation of explicit garbage collection, such as using System.gc() while the concurrent process is working, will result in Concurrent Mode Failure / Interruption.

If more than 98% of the total time is spent in CMS garbage collection, and less than 2% of the heap is recovered, then an OutOfMemoryError is thrown by the CMS collector. If necessary, we can disable this feature by adding the option ```-XX:-UseGCOverheadLimit``` to the command line.

This collector also has a mode known as an incremental mode, which is being deprecated in Java SE 8 and may be removed in a future major release.

To enable the CMS Garbage Collector, we can use the following flag:

```java
java -XX:+UseParNewGC -jar Application.java
```

As of Java 9, the CMS garbage collector has been deprecated. Therefore, JVM prints a warning message if we try to use it:

```java
java -XX:+UseConcMarkSweepGC --version
Java HotSpot(TM) 64-Bit Server VM warning: Option UseConcMarkSweepGC was deprecated 
in version 9.0 and will likely be removed in a future release.
java version "9.0.1"
```

Moreover, Java 14 completely dropped the CMS support:

```java
java -XX:+UseConcMarkSweepGC --version
OpenJDK 64-Bit Server VM warning: Ignoring option UseConcMarkSweepGC; 
support was removed in 14.0
openjdk 14 2020-03-17
```
![Hotspot JVM](Images/gc3.png)

>> Note: The JVM argument -XX:+UseConcMarkSweepGC has been deprecated because a warning message is issued when it is requested on the command line.

#### G1 Garbage Collector
G1 (Garbage First) Garbage Collector is designed for applications running on multi-processor machines with large memory space. It's available from the JDK7 Update 4 and in later releases.

G1 collector will replace the CMS collector, since it's more performance efficient.

Unlike other collectors, the G1 collector partitions the heap into a set of equal-sized heap regions, each a contiguous range of virtual memory. When performing garbage collections, G1 shows a concurrent global marking phase (i.e. phase 1, known as Marking) to determine the liveness of objects throughout the heap.

After the mark phase is complete, G1 knows which regions are mostly empty. It collects in these areas first, which usually yields a significant amount of free space (i.e. phase 2, known as Sweeping). That's why this method of garbage collection is called Garbage-First.

To enable the G1 Garbage Collector, we can use the following argument:

```java
java -XX:+UseG1GC -jar Application.java
```
#### Stop the World Event
It is a situation when the garbage collector performs the garbage collection (GC) and stops all the application's threads until the GC process is not completed. The process is known as Stop the World (STW) events.

#### Java 8 Changes 
Java 8u20 has introduced one more JVM parameter for reducing the unnecessary use of memory by creating too many instances of the same String. This optimizes the heap memory by removing duplicate String values to a global single char[] array.

We can enable this parameter by adding ``-XX:+UseStringDeduplication`` as a JVM parameter.

#### Z Garbage Collector
ZGC (Z Garbage Collector) is a scalable low-latency garbage collector that debuted in Java 11 as an experimental option for Linux. JDK 14 introduced  ZGC under the Windows and macOS operating systems. ZGC has obtained the production status from Java 15 onwards.

ZGC performs all expensive work concurrently, without stopping the execution of application threads for more than 10 ms, which makes it suitable for applications that require low latency. It uses load barriers with colored pointers to perform concurrent operations when the threads are running, and they're used to keep track of heap usage.

Reference coloring (colored pointers) is the core concept of ZGC. It means that ZGC uses some bits (metadata bits) of reference to mark the state of the object. It also handles heaps ranging from 8MB to 16TB in size. Furthermore, pause times don't increase with the heap, live-set, or root-set size.

Similar to G1, Z Garbage Collector partitions the heap, except that heap regions can have different sizes.

To enable the Z Garbage Collector, we can use the following argument in JDK versions lower than 15:

```java
java -XX:+UnlockExperimentalVMOptions -XX:+UseZGC Application.java
```

From version 15 on, we don't need experimental mode on:

```java
java -XX:+UseZGC Application.java
```

We should note that ZGC isn't the default Garbage Collector.

### JVM Arguments
The table describes the arguments that can be used to instruct the JVM.

| Option | Description |
| -------- | ------- |
| -XX:+UseSerialGC	| Serial Garbage Collector |
| -XX:+UseParallelGC | Parallel Garbage Collector |
| -XX:+UseConcMarkSweepGC | CMS Garbage Collector |
| -XX:ParallelCMSThreads= |	CMS Collector - number of threads to use |
| -XX:+UseG1GC	 | G1 Garbage Collector |

#### Some Other Important Arguments

| Option | Description |
| -------- | ------- |
| -XX:InitiatingHeapOccupancyPercent=<n> | It controls the heap occupancy after starting the concurrent cycle. Here, n is the percentage of heap space. The default percentage is 45. |
| -XX:G1MixedGCLiveThresholdPercent=<t> |	If a live object in the OLD region exists with a value greater than or equal to this option, it is excluded from the GC object. Here, t is the time in milliseconds. The default value is 65. |
| -XX:G1HeapWastePercent=<r> | It specifies how many regions are allowed to be wasted. Here, r is the number of regions. The default value is 10. |

#### GC Optimization Options

| Option | Description |
| -------- | ------- |
| -Xms | It specifies the initial heap size. |
| -Xmx | It maximizes the heap size. |
| -Xmn | It is used to specify the size of the Young Generation. |
| -XX:PermSize | Initial Permanent Generation size |
| -XX:MaxPermSize	| It is used to specify the maximum size of Permanent Generation (PermGen). |