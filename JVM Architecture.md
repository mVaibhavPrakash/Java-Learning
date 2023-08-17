## What do you mean by Virtual Machine?

A software program that simulates behaviour of a physical machine, which can perform operations
like any other physical machine. For example,
-> VMWare is the system based virtual machine
-> JVM is the Application based virtual machine

## What is JVM?

"Java Virtual Machine"
Basically JVM provides runtime environment in which Java programs are executed.
First the java programs get compiled and converted into byte code.
JVM is responsible for loading Class files and executing that byte code.

## What makes Java platform independent? Or what you mean by 'write once, run anywhere'?⭐️

JVM converts the byte code to the machine specific code i.e,
one java program can be executed on any type operating system because of JVM.
That is why we need different kinds of JVM for different Operating systems.

## Is JVM, a compiler or interpreter ?⭐️

JVM is an interpreter.

## What are JRE, JDK? how these are different from JVM?⭐️
    
JRE: JRE stands for Java runtime environment and JVM is actually an implementation of JRE.
It consists of set of libraries like jar files and other files that JVM uses at runtime.
so it is different from JVM as it only contains the environment to execute java program.

JDK: The Java development kit consists more than JRE, as it provides all the tools which
are used to develop java applications along with tools and executable required to compile,
debug and execute java program.

## Difference Between JDK, JRE, and JVM

| Parameter |	JDK	| JRE |	JVM |
| --- | --- | --- | --- |
| Full-Form	The JDK is an abbreviation for Java Development Kit. |	The JRE is an abbreviation for Java Runtime Environment. | The JVM is an abbreviation for Java Virtual Machine. |
| Definition | The JDK (Java Development Kit) is a software development kit that develops applications in Java. Along with JRE, the JDK also consists of various development tools (Java Debugger, JavaDoc, compilers, etc.)	 | The Java Runtime Environment (JRE) is an implementation of JVM. It is a type of software package that provides class libraries of Java, JVM, and various other components for running the applications written in Java programming.	| The Java Virtual Machine (JVM) is a platform-independent abstract machine that has three notions in the form of specifications. This document describes the requirement of JVM implementation. |
| Functionality	The JDK primarily assists in executing codes. It primarily functions in development. | JRE has a major responsibility for creating an environment for the execution of code.| JVM specifies all of the implementations. It is responsible for providing all of these implementations to the JRE. |
| Platform Dependency | The JDK is platform-dependent. It means that for every different platform, you require a different JDK.	| JRE, just like JDK, is also platform-dependent. It means that for every different platform, you require a different JRE. | The JVM is platform-independent. It means that you won’t require a different JVM for every different platform. |
| Tools |	Since JDK is primarily responsible for the development, it consists of various tools for debugging, monitoring, and developing java applications. | JRE, on the other hand, does not consist of any tool- like a debugger, compiler, etc. It rather contains various supporting files for JVM, and the class libraries that help JVM in running the program. | JVM does not consist of any tools for software development. |
| Implementation |	JDK = Development Tools + JRE (Java Runtime Environment)	| JRE = Libraries for running the application + JVM (Java Virtual Machine) |	JVM = Only the runtime environment that helps in executing the Java bytecode. |
| Why Use It? | Why use JDK? </br> Some crucial reasons to use JDK are: <ul> <li>It consists of various tools required for writing Java programs. </li><li> JDK also contains JRE for executing Java programs. </li><li> It includes an Appletviewer, Java application launcher, compiler, etc. </li><li> The compiler helps in converting the code written in Java into bytecodes. </li><li> The Java application launcher helps in opening a JRE. It then loads all of the necessary details and then executes all of its main methods.</li></ul> | Why use JRE? </br>Some crucial reasons to use JRE are: <ul></li><li> If a user wants to run the Java applets, then they must install JRE on their system. </li><li> The JRE consists of class libraries along with JVM and its supporting files. It has no other tools like a compiler or a debugger for Java development. </li><li> JRE uses crucial package classes like util, math, awt, lang, and various runtime libraries.</li></ul> | Why use JVM? </br> Some crucial reasons to use JVM are: <ul><li> It provides its users with a platform-independent way for executing the Java source code.</li><li> JVM consists of various tools, libraries, and multiple frameworks.</li><li> The JVM also comes with a Just-in-Time (JIT) compiler for converting the Java source code into a low-level machine language. Thus, it ultimately runs faster than any regular application.</li><li> Once you run the Java program, you can run JVM on any given platform to save your time.</li></ul> |
| Features | Features of JDK </br>Here are a few crucial features of JDK: <ul><li> It has all the features that JRE does.</li><li> JDK enables a user to handle multiple extensions in only one catch block.</li><li> It basically provides an environment for developing and executing the Java source code.</li><li> It has various development tools like the debugger, compiler, etc.</li><li> One can use the Diamond operator to specify a generic interface in place of writing the exact one.</li><li> Any user can easily install JDK on Unix, Mac, and Windows OS (Operating Systems).</li></ul> | Features of JRE </br> Here are a few crucial features of JRE: <ul><li> It is a set of tools that actually helps the JVM to run.</li><li> The JRE also consists of deployment technology. It includes Java Plug-in and Java Web Start as well.</li><li> A developer can easily run a source code in JRE. But it does not allow them to write and compile the concerned Java program.</li><li> JRE also contains various integration libraries like the JDBC (Java Database Connectivity), JNDI (Java Naming and Directory Interface), RMI (Remote Method Invocation), and many more.</li><li> It consists of the JVM and virtual machine client for Java HotSpot. </li></ul> | Features of JVM </br>Here are a few crucial features of JVM: <ul><li> The JVM enables a user to run applications on their device or in a cloud environment.</li><li> It helps in converting the bytecode into machine-specific code.</li><li> JVM also provides some basic Java functions, such as garbage collection, security, memory management, and many more.</li><li> It uses a library along with the files given by JRE (Java Runtime Environment) for running the program.</li><li> Both JRE and JDK contain JVM.</li><li> It is easily customizable. For instance, a user can feasibly allocate a maximum and minimum memory to it.</li><li> JVM can also execute a Java program line by line. It is thus also known as an interpreter.</li><li> JVM is also independent of the OS and hardware. It means that once a user writes a Java program, they can easily run it anywhere</li></ul> |

## How JVM works?⭐️
   
We know, JVM is a runtime engine to run the java applications.. when we write a java file..
the compiler creates the Class file having the byte code.. This .class file goes into various steps.

## What is Classloader?⭐️
    
Class loader is a set of components which loads the classes during runtime into JVM.
These classes are not loaded all at once, when the application requires that particular class or we can say when we try to use a Class, Java ClassLoader loads that class into memory.

L2-00:43 What activities are performed by the classloader subsystem?
    
    Class loader subsystem is responsible to perform these three activities:
	     1.Loading
	     2.Linking
	     3.Initialization

       Loading: The classloader reads the class and generates the binary data.
       This binary data get stored inside method area.
                Method area - class related data gets stored.
       With all the class info, JVM creates an object of Type : java.lang.Class for that loaded class in
       heap area.
       This 'java.lang.Class' class object provides complete information for that class.

02:30  -> If we call a class more than once, will there be more than one java.lang.Class object for that class?

            NO. Even though we call the class multiple times but in the heap area there will be only one
            Class class object, because one Class class object for that particular class is enough to
            provide information for that class. For any new object the class information will remain same.

        Linking: It consists of three activities..
                Verify
                Prepare
                Resolve

            Verification: Bytecode verifier ensures that code passed to java interpreter is in a fit state
            to be executed.
            This is also a reason why JAVA is secure..

            Preparation: JVM allocates memory to class level variables and assign default values to them.

            Resolution: JVM replaces symbolic names with original memory references from method area.
                        class Demo{
                          public static void public static void main(String[] args) {
                            String s = ...
                            Student s1 = new Student();
                          }
                        }

                    Constant Pool of Demo : Demo, String, Student
              In resolution, these names will get replaced with memory level references from method area.

        Initialization: -> Original value get assigned to the static variables.
                        -> Static blocks get executed from parent to child and top to bottom in this phase.

        Note: While loading linking initialisation any error occurs,
        then we will get runtime exception saying java.lang.linkage error.

## What are the different class loaders used by JVM?

There are three diff class loaders, each of them has a predefined location from where they loads class.

### Bootstrap Class Loader

Java classes are loaded by an instance of java.lang.ClassLoader. However, class loaders are classes themselves. So the question is, who loads the java.lang.ClassLoader itself?

This is where the bootstrap or primordial class loader comes into play.

It's mainly responsible for loading JDK internal classes, typically rt.jar and other core libraries located in the $JAVA_HOME/jre/lib directory. Additionally, the Bootstrap class loader serves as the parent of all the other ClassLoader instances.

This bootstrap class loader is part of the core JVM and is written in native code, as pointed out in the above example. Different platforms might have different implementations of this particular class loader.

### Extension Class Loader

The extension class loader is a child of the bootstrap class loader, and takes care of loading the extensions of the standard core Java classes so that they're available to all applications running on the platform.

The extension class loader loads from the JDK extensions directory, usually the $JAVA_HOME/lib/ext directory, or any other directory mentioned in the java.ext.dirs system property.

### System Class Loader

The system or application class loader, on the other hand, takes care of loading all the application level classes into the JVM. It loads files found in the classpath environment variable, -classpath, or -cp command line option. It's also a child of the extensions class loader.

> **Note:** Except the bootstrap classloader which is only implemented in native languages not in java, all the classloader are implemented using java.lang.ClassLoader.

## How Do Class Loaders Work?

Class loaders are part of the Java Runtime Environment. When the JVM requests a class, the class loader tries to locate the class and load the class definition into the runtime using the fully qualified class name.

The ``java.lang.ClassLoader.loadClass()`` method is responsible for loading the class definition into runtime. It tries to load the class based on a fully qualified name.

If the class isn't already loaded, it delegates the request to the parent class loader. This process happens recursively.

Eventually, if the parent class loader doesn’t find the class, then the child class will call the java.net.URLClassLoader.findClass() method to look for classes in the file system itself. 

If the last child class loader isn't able to load the class either, it throws ``java.lang.NoClassDefFoundError`` or ``java.lang.ClassNotFoundException``.

Let's look at an example of the output when ClassNotFoundException is thrown:
```java
java.lang.ClassNotFoundException: com.baeldung.classloader.SampleClassLoader    
    at java.net.URLClassLoader.findClass(URLClassLoader.java:381)    
    at java.lang.ClassLoader.loadClass(ClassLoader.java:424)    
    at java.lang.ClassLoader.loadClass(ClassLoader.java:357)    
    at java.lang.Class.forName0(Native Method)    
    at java.lang.Class.forName(Class.java:348)
```
If we go through the sequence of events right from calling java.lang.Class.forName(), we can see that it first tries to load the class through the parent class loader, and then java.net.URLClassLoader.findClass() to look for the class itself.

When it still doesn't find the class, it throws a ClassNotFoundException.

Now let's examine three important features of class loaders.

### Delegation Model

Class loaders follow the delegation model, where on request to find a class or resource, a ClassLoader instance will delegate the search of the class or resource to the parent class loader.

Let's say we have a request to load an application class into the JVM. The system class loader first delegates the loading of that class to its parent extension class loader, which in turn delegates it to the bootstrap class loader.

Only if the bootstrap and then the extension class loader are unsuccessful in loading the class, the system class loader tries to load the class itself.

### Unique Classes

As a consequence of the delegation model, it's easy to ensure unique classes, as we always try to delegate upwards.

If the parent class loader isn't able to find the class, only then will the current instance attempt to do so itself.

### Visibility

In addition, children class loaders are visible to classes loaded by their parent class loaders.

For instance, classes loaded by the system class loader have visibility into classes loaded by the extension and bootstrap class loaders, but not vice-versa.

To illustrate this, if Class A is loaded by the application class loader, and class B is loaded by the extensions class loader, then both A and B classes are visible as far as other classes loaded by the application class loader are concerned.

Class B, however, is the only class visible to other classes loaded by the extension class loader.


 What is the difference between static and dynamic class loading?⭐️

## What is difference between Class.forName() and ClassLoader.loadClass()?⭐️

* Both methods try to load classes dynamically.
* The most common method is Class.forName(). By default the classes get initialised using this method.
* loadClass() is an instance method and requires a particular ClassLoader to load the class.

By default the classes does not get initialised in this.

//Memory Areas
L3-00:12 What are the various memory areas present in JVM?⭐️

    JVM has 5 different memory areas ..
    1. Method area
    2. Stack area
    3. Heap area
    4. PC Registers
    5. Native method area

L3-00:30 Which memory area is used to store Static variables?

    JVM stores the Class level information in the Method area.
    Class level information consists Class name, parent Class name, Method info, Variables info,
    Constructors, Modifiers info, Constant pool info etc.

    Whenever we start JVM, a method area gets created,
    👉🏻 and that will be shared among all JVM threads.

L3-01:14 When are the static variables loaded in memory?

    Static variables get loaded at the time of Class loading and gets stored in the method area.

L3-01:31 What is Heap space in Java?⭐️

    Heap memory in JVM is used to store objects and corresponding instance variables.
    👉🏻 Whenever we create objects, it is always created in Heap space.

    Heap area gets created when we start JVM
    👉🏻 Heap area is shared among all the threads.

    Method and heap area need not be continuous.

L3-02:10 What is String pool?⭐️

    String pool or string intern pool is a special storage area in Heap space.
    When we create a string, it gets stored to the string pool, so that if any other string will get
    created which exists in the pool then instead of creating new object,
    the reference of existing string will be returned.

L3-03:04 What is Stack? What it stores?⭐️

    Stack is a part of memory that stores each method call performed by that thread including primitives
    and local variables.

    👉🏻 For every thread, a new runtime stack gets created..

L3-05:42 What is stack frame? What does it consist?

    Each entry in stack is called stack frame.
    1. Local Variable Array
            -> Which store local variables and corresponding values related to any method.
    2. Operand Stack
            -> It is a runtime workspace for JVM, to perform any intermediate operations.
    3. Frame data
            -> All symbols corresponding to any method are stored here.

    👉🏻 For every method call one stack frame is created.

How stack and heap are interrelated?⭐️

    We know Local variables are stored on the stack, and all the objects in java are stored on the
    Heap area.
    👉🏻 For every object on the heap, there is a pointer which is the reference to that object.
    This reference variable is also stored on the stack. This is how Stack and heap are interrelated..

How to get information about heap memory?

    We know the java application can communicate directly with JVM via runtime class.
    Runtime Class provides various methods from which we can get information about memory.

    We create Runtime instance via method getInstance(), because this Class is Singleton class.

    Runtime r = Runtime.getInstance();
    r.maxMemory();
    //this method returns the maximum amount of memory that the Java virtual machine will attempt to use.

    r.totalMemory()		//this returns the total amount of memory in the Java virtual machine.

    r.freeMemory();		//this returns the amount of free memory in the Java Virtual Machine.

What happens when there is not enough Heap Space for storing new objects?⭐️

    JVM tries to free up space but if it fails then JVM throws java.lang.OutOfMemoryError.

How to set minimum and maximum heap size??

    By using -Xmx we can specify the maximum heap size for any program..
    And -Xms to set the minimum heap size..

    $ java -Xms512m -Xmx1024m <classname>

Why do member variables have default values whereas local variables do not have any default value ?

    In java, ClassLoader is responsible to load the Class and while loading the Class they initialize
    the static variable and blocks.

    JVM does not have any idea about local variables at the time of Class loading, therefore
    local variables do not have any default values.

What PC registers are for?

    👉🏻 Every thread has separate PC register.
    PC registers is used to hold the address of current executing instruction. when the instruction gets
    executed the PC register will be updated with the next one.

What is Native Method Stack?

    It is another memory space of JVM which stores the native method information.
    👉🏻 for every thread, there will be a separated native method stack.

//Execution Engine

What is Execution engine? What it does?

    Execution engine is the component in JVM which is responsible to execute the byte code which is
    assigned to the runtime data area.

    It has following sub-components:
    1. Interpreter
    2. JIT compiler
    3. Garbage collector

What is Interpreter?

    Interpreter is a program that reads byte code in the sequential manner (line by line).
      it runs the application by accepting file name argument from the command line,

      java <compiled file name>

What are the limitations interpreter has?

    Interpreter interprets fast but executes slow!
    The limitation is, when a code of block or one method is called multiple times,
    every time a new interpretation is required.

What is JIT compiler?⭐️

    It stands for Just-in-time compiler.
    It compiles those byte code parts which are having similar functionality at the same time.

Sub components of JIT compiler:

    1. Intermediate code generator: it produces intermediate code.
    2. Code Optimizer: Responsible for optimizing that intermediate code.
    3. Target code generator: Responsible for generating native code!
    4. Profiler: Responsible for finding the hot code! It finds which method is called multiple times.

What is Garbage collector?

    It is the component of Execution engine which frees up the memory by collecting and removing
    the unreferenced objects.

//

What is garbage collection?

    Garbage is unused and unreferenced objects, and Garbage collection is the process inside JVM which
    identifies and discards those objects which are no longer required in the application.

    ->It is a mechanism of JVM to reclaim heap space from objects which are eligible for garbage collection.

Which objects are eligible for garbage collection?

    Any object on the heap which unreachable through a reference from the stack is eligible for garbage collection.

Is programmer responsible to destroy objects?⭐️

    No! In java programmer need not to worry for this. Garbage collector destroys the objects which are no longer in use.
    Before calling garbage collector, it is recommended to make the unused object available for garbage collection.

How to make an object available for garbage collection?⭐️

    There are 4 ways to do so,

    1. Nullifying the reference variable: by doing so the object in heap will be unreachable from the stack.

    2. Reassigning the reference variable: the variable gets assigned with new object and the older one gets unreferenced from stack..

    3. Object inside method: we know for every method call the stack has a stack frame, which consists of all of its members. When a method is executed the stack frame is popped out from
    stack and thus all of its members get unreferenced from the stack.

    4. Creating anonymous object: we know an anonymous object is not referenced, so it is eligible for garbage collection.

How to call garbage collector?

    The most common way to invoke garbage collector is by invoking gc method of system class.
          System.gc();

    Other way is to invoke gc method with Runtime class.
          Runtime.getRuntime().gc();

    This method suggests the JVM to recycle the unused objects in order to make the memory available for
    future allocation.

Can you guarantee that invoking gc will definitely call garbage collector?⭐️

    By invoking gc, we just request or suggest JVM to call garbage collector. But there is no guarantee
    that the Java virtual machine will do that. So answer is no!

If an object reference is set to null, will the Garbage Collector immediately free the memory held by that object ?

    No, the object will be available for garbage collection in the next cycle of the garbage collector.

When should we call garbage collector to run?

    When we are executing multiple blocks of code and after executing one block
    -> if we want to free the memory so that the next block of code may execute more efficiently
    -> if you are trying to get more accurate evaluation and want to start those code block with the same
    state as we started the very first block..
    .. then we may call the gc.

Why is it bad idea to run gc?

    As we know we can not guarantee that the garbage collector will process when we call gc, so we should
    just do not bother to do it.
    Because when we call gc, Garbage collection temporarily stops all threads in our application for running.
    When garbage collection takes place our application is temporarily suspended.. and it would not resume
    until the gc process complete.
    This 'stops the world!' That is, running garbage collection can cause an unacceptable freeze in
    execution.

When is the finalize() method gets called? What is the purpose of calling it?

    Finalise method is a special method present in object class. That means every class can override this
    method.
    when we call the gc, it calls the finalise method before performing the clean up activity. This allows
    programmer to perform other clean up activities too
    -> like releasing any system resource, closing connections..

    So when it is called? It is called before performing garbage collection.

    However we can not be assured that the finalise method will be called when we call the gc..
    We don't have any idea that the method is going to be called or not or when this method will going to
    be called.

Why we should not use finalize() method?⭐️

    There is no assurance that finalize method will get called. Therefore it gets useless sometimes to put
    any clean up code in the finalise method.

So there is no use of finalize method?

    We can use this method to check that are the rosaries are closed or not?
    So you may not use finalize method to correct the problem but at least send out a warning that
    something could be wrong.

What are memory leaks? What are soft references?

    memory leak is a scenario that occurs when objects are no longer being used by the application,
    but the Garbage Collector is unable to remove them from working memory – because they’re still being referenced.
     As a result, the application consumes more and more resources – which eventually leads to OutOfMemoryError.

    Soft leaks: it may be possible that any objects are not being used for years but any third party API or
    any other thing is there for keeping it live.. these kind of objects should be garbaged but they are
    not because they are somehow referenced from stack.⭐️

    # Java Overview
 Java is a programming language and computing platform first released by Sun Microsystems in 1995. It is the underlying technology that powers Java programs including utilities, games, and business applications. Java runs on more than 850 million personal computers worldwide, and on billions of devices worldwide, including mobile and TV devices. Java is composed of a number of key components that, as a whole, create the Java platform.

## Java Runtime Edition
When you download Java, you get the Java Runtime Environment (JRE). The JRE consists of the Java Virtual Machine (JVM), Java platform core classes, and supporting Java platform libraries. All three are required to run Java applications on your computer. With Java 7, Java applications run as desktop applications from the operating system, as a desktop application but installed from the Web using Java Web Start, or as a Web Embedded application in a browser (using JavaFX).

## Java Programming Language
Java is an object-oriented programming language that includes the following features.

**Platform Independence** - Java applications are compiled into bytecode which is stored in class files and loaded in a JVM. Since applications run in a JVM, they can be run on many different operating systems and devices.
**Object-Oriented** - Java is an object-oriented language that take many of the features of C and C++ and improves upon them.
**Automatic Garbage Collection** - Java automatically allocates and deallocates memory so programs are not burdened with that task.
**Rich Standard Library** - Java includes a vast number of premade objects that can be used to perform such tasks as input/output, networking, and date manipulation.
Java Development Kit
**The Java Development Kit (JDK)** is a collection of tools for developing Java applications. With the JDK, you can compile programs written in the Java Programming language and run them in a JVM. In addition, the JDK provides tools for packaging and distributing your applications.

The JDK and the JRE share the Java Application Programming Interfaces (Java API). The Java API is a collection of prepackaged libraries developers use to create Java applications. The Java API makes development easier by providing the tools to complete many common programming tasks including string manipulation, date/time processing, networking, and implementing data structures (e.g., lists, maps, stacks, and queues).

## Java Virtual Machine
The Java Virtual Machine (JVM) is an abstract computing machine. The JVM is a program that looks like a machine to the programs written to execute in it. This way, Java programs are written to the same set of interfaces and libraries. Each JVM implementation for a specific operating system, translates the Java programming instructions into instructions and commands that run on the local operating system. This way, Java programs achieve platform independence.

The first prototype implementation of the Java virtual machine, done at Sun Microsystems, Inc., emulated the Java virtual machine instruction set in software hosted by a handheld device that resembled a contemporary Personal Digital Assistant (PDA). Oracle's current implementations emulate the Java virtual machine on mobile, desktop and server devices, but the Java virtual machine does not assume any particular implementation technology, host hardware, or host operating system. It is not inherently interpreted, but can just as well be implemented by compiling its instruction set to that of a silicon CPU. It may also be implemented in microcode or directly in silicon.

The Java virtual machine knows nothing of the Java programming language, only of a particular binary format, the class file format. A class file contains Java virtual machine instructions (or bytecodes) and a symbol table, as well as other ancillary information.

For the sake of security, the Java virtual machine imposes strong syntactic and structural constraints on the code in a class file. However, any language with functionality that can be expressed in terms of a valid class file can be hosted by the Java virtual machine. Attracted by a generally available, machine-independent platform, implementors of other languages can turn to the Java virtual machine as a delivery vehicle for their languages. (1) The Java Virtual Machine

 
## Exploring the JVM Architecture
### Hotspot Architecture
The HotSpot JVM possesses an architecture that supports a strong foundation of features and capabilities and supports the ability to realize high performance and massive scalability. For example, the HotSpot JVM JIT compilers generate dynamic optimizations. In other words, they make optimization decisions while the Java application is running and generate high-performing native machine instructions targeted for the underlying system architecture. In addition, through the maturing evolution and continuous engineering of its runtime environment and multithreaded garbage collector, the HotSpot JVM yields high scalability on even the largest available computer systems.

![Hotspot JVMImages/](./Images/jvm.PNG)
The main components of the JVM include the classloader, the runtime data areas, and the execution engine.

Key Hotspot Components
The key components of the JVM that relate to performance are highlighted in the following image.

![Hotspot JVM](Images/keyhotjvm.PNG)
There are three components of the JVM that are focused on when tuning performance. The heap is where your object data is stored. This area is then managed by the garbage collector selected at startup. Most tuning options relate to sizing the heap and choosing the most appropriate garbage collector for your situation. The JIT compiler also has a big impact on performance but rarely requires tuning with the newer versions of the JVM.

 
**Performance Basics** : 
Typically, when tuning a Java application, the focus is on one of two main goals: responsiveness or throughput. We will refer back to these concepts as the tutorial progresses.

**Responsiveness** : 
Responsiveness refers to how quickly an application or system responds with a requested piece of data. Examples include:

How quickly a desktop UI responds to an event
How fast a website returns a page
How fast a database query is returned
For applications that focus on responsiveness, large pause times are not acceptable. The focus is on responding in short periods of time.

**Throughput** : 
Throughput focuses on maximizing the amount of work by an application in a specific period of time. Examples of how throughput might be measured include:

The number of transactions completed in a given time.
The number of jobs that a batch program can complete in an hour.
The number of database queries that can be completed in an hour.
High pause times are acceptable for applications that focus on throughput. Since high throughput applications focus on benchmarks over longer periods of time, quick response time is not a consideration.