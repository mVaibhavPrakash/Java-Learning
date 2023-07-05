## What Is a Memory Leak

A Memory Leak is a situation where there are objects present in the heap that are no longer used, but the garbage collector is unable to remove them from memory, and therefore, they're unnecessarily maintained.

A memory leak is bad because it blocks memory resources and degrades system performance over time. If not dealt with, the application will eventually exhaust its resources, finally terminating with a fatal java.lang.OutOfMemoryError.

There are two different types of objects that reside in Heap memory, referenced and unreferenced. Referenced objects are those that still have active references within the application, whereas unreferenced objects don't have any active references.

The garbage collector removes unreferenced objects periodically, but it never collects the objects that are still being referenced. This is where memory leaks can occur:

 
#### Symptoms of a Memory Leak

* Severe performance degradation when the application is continuously running for a long time
* OutOfMemoryError heap error in the application
* Spontaneous and strange application crashes
* The application is occasionally running out of connection objects.
Let's have a closer look at some of these scenarios and how to deal with them.

### Types of Memory Leaks in Java
In any application, memory leaks can occur for numerous reasons. In this section, we'll discuss the most common ones.

#### Memory Leak Through static Fields
The first scenario that can cause a potential memory leak is heavy use of static variables.

In Java, static fields have a life that usually matches the entire lifetime of the running application (unless ClassLoader becomes eligible for garbage collection).

Let's create a simple Java program that populates a static List:
```java
public class StaticTest {
    public static List<Double> list = new ArrayList<>();

    public void populateList() {
        for (int i = 0; i < 10000000; i++) {
            list.add(Math.random());
        }
        Log.info("Debug Point 2");
    }

    public static void main(String[] args) {
        Log.info("Debug Point 1");
        new StaticTest().populateList();
        Log.info("Debug Point 3");
    }
}
```
* If we analyze the Heap memory during this program execution, then we'll see that between debug points 1 and 2, the heap memory increased as expected.

* But when we leave the populateList() method at the debug point 3, the heap memory isn't yet garbage collected.

* However, if we just drop the keyword static in line number 2 of the above program, then it'll bring a drastic change to the memory usage, as shown in this Visual VM response:

* The first part until the debug point is almost the same as what we obtained in the case of static. But this time, after we leave the populateList() method, all the memory of the list is garbage collected because we don't have any reference to it.

So we need to pay very close attention to our usage of static variables. If collections or large objects are declared as static, then they remain in the memory throughout the lifetime of the application, thus blocking vital memory that could otherwise be used elsewhere.

##### How to Prevent It?

* Minimize the use of static variables.
* When using singletons, rely upon an implementation that lazily loads the object, instead of eagerly loading.

#### Through Unclosed Resources
Whenever we make a new connection or open a stream, the JVM allocates memory for these resources. A few examples of this include database connections, input streams, and session objects.

Forgetting to close these resources can block the memory, thus keeping them out of the reach of the GC. This can even happen in case of an exception that prevents the program execution from reaching the statement that's handling the code to close these resources.

In either case, the open connection left from the resources consumes memory, and if we don't deal with them, they can deteriorate performance, and even result in an OutOfMemoryError.

How to Prevent It?

* Always use finally block to close resources.
* The code (even in the finally block) that closes the resources shouldn't have any exceptions itself.
* When using Java 7+, we can make use of the try-with-resources block.

#### Improper equals() and hashCode() Implementations
When defining new classes, a very common oversight is not writing proper overridden methods for the equals() and hashCode() methods.

HashSet and HashMap use these methods in many operations, and if they're not overridden correctly, they can become a source for potential memory leak problems.

Let's take an example of a trivial Person class, and use it as a key in a HashMap:
```java
public class Person {
    public String name;
    
    public Person(String name) {
        this.name = name;
    }
}
```

Now we'll insert duplicate Person objects into a Map that uses this key.

Remember that a Map can't contain duplicate keys:

```java
@Test
public void givenMap_whenEqualsAndHashCodeNotOverridden_thenMemoryLeak() {
    Map<Person, Integer> map = new HashMap<>();
    for(int i=0; i<100; i++) {
        map.put(new Person("jon"), 1);
    }
    Assert.assertFalse(map.size() == 1);
}
```

Here we're using Person as a key. Since Map doesn't allow duplicate keys, the numerous duplicate Person objects that we inserted as a key shouldn't increase the memory.

But since we haven't defined the proper equals() method, the duplicate objects pile up and increase the memory, which is why we see more than one object in the memory. 

However, if we'd overridden the equals() and hashCode() methods properly, then only one Person object would exist in this Map.

Let's take a look at the proper implementations of equals() and hashCode() for our Person class:
```java
public class Person {
    public String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    @Override
    public boolean equals(Object o) {
        if (o == this) return true;
        if (!(o instanceof Person)) {
            return false;
        }
        Person person = (Person) o;
        return person.name.equals(name);
    }
    
    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + name.hashCode();
        return result;
    }
}
```

And in this case, the following assertions would be true:

```java
@Test
public void givenMap_whenEqualsAndHashCodeNotOverridden_thenMemoryLeak() {
    Map<Person, Integer> map = new HashMap<>();
    for(int i=0; i<2; i++) {
        map.put(new Person("jon"), 1);
    }
    Assert.assertTrue(map.size() == 1);
}
```

Another option is using an ORM tool like Hibernate, which uses the equals() and hashCode() methods to analyze the objects and saves them in the cache.

The chance of memory leaks is quite high if these methods aren't overridden because Hibernate wouldn't be able to compare objects and would fill its cache with duplicate objects.

##### How to Prevent It?

* As a rule of thumb, when defining new entities, always override the equals() and hashCode() methods.
* It's not enough to just override, these methods must be overridden in an optimal way as well.

#### Through finalize() Methods

Use of finalizers is yet another source of potential memory leak issues. Whenever a class' finalize() method is overridden, then objects of that class aren't instantly garbage collected. Instead, the GC queues them for finalization, which occurs at a later point in time.

Additionally, if the code written in the finalize() method isn't optimal, and if the finalizer queue can't keep up with the Java garbage collector, then sooner or later our application is destined to meet an OutOfMemoryError.

##### How to Prevent It?

* We should always avoid finalizers.

#### Interned Strings

The Java String pool went through a major change in Java 7 when it was transferred from PermGen to HeapSpace. However, for applications operating on version 6 and below, we need to be more attentive when working with large Strings. 

If we read a massive String object, and call intern() on that object, it goes to the string pool, which is located in PermGen (permanent memory), and will stay there as long as our application runs. This blocks the memory and creates a major memory leak in our application.

How to Prevent It?

* The simplest way to resolve this issue is by upgrading to the latest Java version, as String pool moved to HeapSpace starting with Java version 7.
* If we're working on large Strings, we can increase the size of the PermGen space to avoid any potential OutOfMemoryErrors:
```java
-XX:MaxPermSize=512m
```

#### Using ThreadLocals

ThreadLocal (discussed in detail in the Introduction to ThreadLocal in Java tutorial) is a construct that gives us the ability to isolate state to a particular thread, and thus allows us to achieve thread safety.

When using this construct, each thread will hold an implicit reference to its copy of a ThreadLocal variable and will maintain its own copy, instead of sharing the resource across multiple threads, as long as the thread is alive.

Despite its advantages, the use of ThreadLocal variables is controversial, as they're infamous for introducing memory leaks if not used properly. Joshua Bloch once commented on thread local usage that:

“*Sloppy use of thread pools in combination with sloppy use of thread locals can cause unintended object retention, as has been noted in many places. But placing the blame on thread locals is unwarranted.*”

##### Memory Leaks with ThreadLocals

ThreadLocals are supposed to be garbage collected once the holding thread is no longer alive. But the problem arises when we use ThreadLocals along with modern application servers.

Modern application servers use a pool of threads to process requests, instead of creating new ones (for example, the Executor in the case of Apache Tomcat). Moreover, they also use a separate classloader.

Since Thread Pools in application servers work on the concept of thread reuse, they're never garbage collected; instead, they're reused to serve another request.

If any class creates a ThreadLocal variable, but doesn't explicitly remove it, then a copy of that object will remain with the worker Thread even after the web application is stopped, thus preventing the object from being garbage collected.

How to Prevent It?

* It's good practice to clean-up ThreadLocals when we're no longer using them. ThreadLocals provide the remove() method, which removes the current thread's value for this variable.
* Don't use ThreadLocal.set(null) to clear the value. It doesn't actually clear the value, but will instead look up the Map associated with the current thread and set the key-value pair as the current thread and null, respectively.
* It's best to consider ThreadLocal a resource that we need to close in a finally block, even in the case of an exception::
```java
try {
    threadLocal.set(System.nanoTime());
    //... further processing
}
finally {
    threadLocal.remove();
}
```
### Other Strategies for Dealing With Memory Leaks
Although there's no one-size-fits-all solution when dealing with memory leaks, there are some ways by which we can minimize these leaks.

#### Enable Profiling
Java profilers are tools that monitor and diagnose the memory leaks through the application. They analyze what's going on internally in our application, like how we allocate memory.

Using profilers, we can compare different approaches and find areas where we can optimally use our resources.

#### Verbose Garbage Collection
By enabling verbose garbage collection, we can track the detailed trace of the GC. To enable this, we need to add the following to our JVM configuration:
```java
-verbose:gc
```
By adding this parameter, we can see the details of what's happening inside the GC:
![Hotspot JVM](Images/vgc.jpg)

#### Use Reference Objects to Avoid Memory Leaks

We can also resort to reference objects in Java that come built-in with the java.lang.ref package to deal with memory leaks. Using the **java.lang.ref** package, instead of directly referencing objects, we use special references to objects that allow them to be easily garbage collected.

## Capture a Heap Dump Automatically

All the tools we've shown in the previous sections are intended to capture heap dumps manually at a specific time. In some cases, we want to get a heap dump when a **java.lang.OutOfMemoryError** occurs to help us investigate the error.

For these cases, Java provides the **HeapDumpOnOutOfMemoryError** command-line option, which generates a heap dump when a ```java.lang.OutOfMemoryError``` is thrown:
```java
java -XX:+HeapDumpOnOutOfMemoryError
```
By default, it stores the dump in a java_pid<pid>.hprof file in the directory where we're running the application. If we want to specify another file or directory, we can set it in the HeapDumpPath option:
```java
java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=<file-or-dir-path>
```
When our application runs out of memory using this option, we'll be able to find the created file that contains the heap dump in the logs:
```java
java.lang.OutOfMemoryError: Requested array size exceeds VM limit
Dumping heap to java_pid12587.hprof ...
Exception in thread "main" Heap dump file created [4744371 bytes in 0.029 secs]
java.lang.OutOfMemoryError: Requested array size exceeds VM limit
	at com.baeldung.heapdump.App.main(App.java:7)
```
In the above example, it was written to the **java_pid12587.hprof** file.

As we can see, this option is very useful, and there's no overhead when running an application with this option. Therefore, it's highly recommended to always use this option, especially in production.

Finally, this option can also be specified at runtime by using the HotSpotDiagnostic MBean. To do this, we can use JConsole and set the **HeapDumpOnOutOfMemoryError** VM option to true:
![Hotspot JVM](Images/mem1.webp)

We can find more information about MBeans and JMX in this article.

### JMX

The last approach we'll cover in this article is using JMX. We'll use the HotSpotDiagnostic MBean that we briefly introduced in the previous section. This MBean provides a dumpHeap method that accepts two parameters:

* *outputFile*: the path of the file for the dump. This file should have the hprof extension.
* *live*: if set to true, it dumps only the active objects in memory, as we saw before with jmap.

#### JConsole

The easiest way to use the HotSpotDiagnostic MBean is by using a JMX client, such as JConsole.

If we open JConsole and connect to a running Java process, we can navigate to the MBeans tab and find the HotSpotDiagnostic under com.sun.management. In operations, we can find the dumpHeap method that we previously described:
![Hotspot JVM](Images/mem2.webp)

As shown, we just need to introduce the parameters, outputFile and live, into the p0 and p1 text fields in order to perform the dumpHeap operation.

[VisualVM Documentation and Resources](https://htmlpreview.github.io/?https://raw.githubusercontent.com/visualvm/visualvm.java.net.backup/master/www/docindex.html)

[How to Monitor your Java Application’s JVM](https://marknienaber.medium.com/how-to-monitor-your-java-applications-jvm-70d7bddea668)

[Java Thread Deadlock Example and Thread Dump Analysis using VisualVM](https://avaldes.com/java-thread-deadlock-example-and-thread-dump-analysis-using-visualvm/)

[Realtime logs analysis using Splunk](https://www.youtube.com/watch?v=VO20SgiTTOU&list=PLVz2XdJiJQxz_55RIJL8mjO6nx_T87LVD&index=38)

[Spring Boot - Splunk Alerts !| Creating and Scheduling Alerts |](https://www.youtube.com/watch?v=eCAabhr5UNA&list=PLVz2XdJiJQxz_55RIJL8mjO6nx_T87LVD&index=39)

[JIRA Project Management with real-world example](https://www.youtube.com/watch?v=EzyA20UofkE&list=PLVz2XdJiJQxz_55RIJL8mjO6nx_T87LVD&index=17)