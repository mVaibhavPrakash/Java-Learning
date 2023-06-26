# What is NIO?⭐️

**Non-Blocking I/O**: Java provides a different way to work with I/O than the standard I/O Apis.
* NIO supports buffer-oriented and channel based approach for I/O operations.
* NIO introduced in java 1.4 and with JDK 7, NIO system is expanded.
* NIO is widely used in the File handling.

## What are fundamental components of NIO?

Java NIO has these fundamental components:
    1. Channels
    2. Buffers
    3. Selectors
    4. Non-blocking I/O

1. **Channel and Buffers:** Data is written from a buffer to a channel and read from a channel to a buffer.

2. **Selectors:**
    * It is an object that can be used for monitoring the multiple channels for events like data arrived, connection opened etc. Therefore single thread can monitor the multiple channels for data.
    * It is used if the application has many Channels (connections) open, but has low traffic on each connection. For example: In a chat server.
    
Let's see the thread using a Selector to handle the 3 Channel's illustration shown below:
![Hotspot JVMImages/](/Images/nio-tutorial4.png)

3. **Non-Blocking I/O:** 
    * In NIO, Threads are allowed to go on and do something else in mean time of
                      performing any task.

## In which Package the NIO classes are present?
    
java.nio.*
  -> also there are sub-packages inside this Package.
        java.nio.charset
        java.nio.channels
        java.nio.file
        ..and many more

## What is Channel? How many channels are there in java?⭐️

* In NIO, channel is the medium to transport data efficiently.
* Channel in an Interface which provides access to low-level I/O services in a controlled way.
Methods:
    1. isOpen() : this Tells whether or not this channel is open.
    2. close() : closes the channel.

    Channels:
      DatagramChannel
      SocketChannel
      FileChannel
      ServerSocketChannel

## Which channel is used for reading data from files?
    
**FileChannel**. It is used for reading data from files.
    -> We cannot create its object directly as it is an abstract class.
        for object creation - getChannel() method is used.

## What other channels are used for?
    
1. DatagramChannel is used to read and write data over the network via User Datagram protocol (UDP).
2. SocketChannel can read write data over network via Transmission Control protocol (TCP).
3. ServerSocketChannel allows user to listen the incoming TCP connections, same as a web server.

> Note
>> for every incoming connection a socket channel is created.

## What are NIO Buffers?⭐️

NIO buffers are used to make interaction with NIO channels.

Block of memory into which we can write data, from which we can read data.
👉🏻 In NIO system this memory block is wrapped with an NIO buffer object.

## How many Buffers we have in java?
    
There is a buffer type for every primitive type.
1. CharBuffer
2. DoubleBuffer
3. IntBuffer
4. LongBuffer
5. ShortBuffer
6. FloatBuffer

There is ByteBuffer which is Mostly used buffer type.
7. ByteBuffer

## How to create ByteBuffer?

To create ByteBuffer, we have to allocate a buffer. For that we invoke allocate() method,
```java
ByteBuffer b = ByteBuffer.allocate(capacity);
```
to write data, we use put() method.

## How to transfer data between channels and buffers?

```java
public class Demo {
	public static void main(String[] args) throws IOException {
		FileInputStream input = new FileInputStream("File1.txt");
		ReadableByteChannel src = input.getChannel();
		FileOutputStream output = new FileOutputStream("File2.txt");
		WritableByteChannel dest = output.getChannel();
		copy(src,dest);
		input.close();
		output.close();
	}
	private static void copy(ReadableByteChannel src, WritableByteChannel dest) throws IOException {
		ByteBuffer b = ByteBuffer.allocate(1024*20);
		while (src.read(b) != -1)
        {
            // The buffer is used to drained
            b.flip();
            // keep sure that buffer was fully drained
            while (b.hasRemaining())
            {
                dest.write(b);
            }
            b.clear(); // Now the buffer is empty, ready for the filling
        }
	}
}
```
This will write file1 data to file2.

## Reading and Writing with Java.nio Classes

Using the java.nio classes:
```java
String directory = System.getProperty("user.home");
String fileName = "sample.txt";

String content = "This is a sample text.";
Path path = Paths.get(directory, fileName);

try {
    Files.write(path, content.getBytes(), StandardOpenOption.CREATE);
} catch (IOException e) {
    // exception handling
}

try {
    List<String> list = Files.readAllLines(path);
    list.forEach(line -> System.out.println(line));
} catch (IOException e) {
    // exception handling
}
```

Another way to retrieve the content via the Files class, which is more important if you're not reading text data, is to use the ``readAllBytes`` method to read the data in to a byte array:

```java
try { 
    byte[] data = Files.readAllBytes(path);
    System.out.println(new String(data));
} catch (IOException e) {
    // exception handling
}
```

* In case you are interested in using **streams** with ``java.nio``, you can also use the below methods provided by the Files class, which work just like the streams we covered earlier in the article:

```java
Files.newBufferedReader(path)
Files.newBufferedWriter(path, options)
Files.newInputStream(path, options)
Files.newOutputStream(path, options)
```
## Can we transfer data between channels?⭐️
    
Yes. In Java NIO we can directly transfer the data from one channel to another.

Methods present in FileChannel:
  1. FileChannel.transferTo() method
  2. FileChannel.transferFrom() method

* The transferTo(position, count, target) method allows the data transfer from a FileChannel
into some other channel.
* The transferFrom(src, position, count) method allows the data transfer from a source channel
into the FileChannel.

## What do you understand by Scattering reads and Gathering writes?⭐️

* **'Scattering read'** is reading the data from a single channel into multiple buffers.
* **'Gathering write'** is writing the data from a multiple buffers into a single channel.

* We have ScatteringByteChannel, and GatheringByteChannel channels for this.

## What is difference between IO and NIO?⭐️

The important distinction between IO and NIO is that,
* Original IO deals with data in streams, whereas NIO deals with data in blocks.
* IO is stream oriented and NIO is buffer oriented.
* IO streams are blocking whereas NIO can be blocking or non-blocking.

### Java IO vs. NIO

Let's see the table showing the main differences between Java IO and NIO:

| IO | NIO |
| --- | --- |
| It is based on the Blocking I/O operation | It is based on the Non-blocking I/O operation |
| It is Stream-oriented | It is Buffer-oriented |
| Channels are not available | Channels are available for Non-blocking I/O operation |
| Selectors are not available | Selectors are available for Non-blocking I/O operation |

### Blocking vs. Non-blocking I/O

* Blocking I/O
    * Blocking IO wait for the data to be write or read before returning. 
    * Java IO's various streams are blocking. It means when the thread invoke a write() or read(), then the thread is blocked until there is some data available for read, or the data is fully written.

* Non blocking I/O
    * Non blocking IO does not wait for the data to be read or write before returning. 
    * Java NIO non- blocking mode allows the thread to request writing data to a channel, but not wait for it to be fully written. The thread is allowed to go on and do something else in a mean time.

### Stream Oriented vs. Buffer Oriented

* Stream Oriented
    * Java IO is stream oriented I/O means we need to read one or more bytes at a time from a stream. 
    * It uses streams for transferring the data between a data source/sink and a java program. 
    * The I/O operation using this approach is slow.

Let's see the flow of data using an input/output stream in a java program:
![Hotspot JVMImages/](/Images/nio-tutorial6.png)

* Buffer Oriented
    * Java NIO is buffer oriented I/O approach. 
    * Data is read into a buffer from which it is further processed using a channel. 
    * In NIO we deal with the channel and buffer for I/O operation.

### The major difference between a channel and a stream is:

* A stream can be used for one-way data transfer.
* A channel provides a two-way data transfer facility.
Therefore with the introduction of channel in java NIO, the non-blocking I/O operation can be performed.

Let's see the interaction between channel, buffers, java program, data source and data sink:
![Hotspot JVMImages/](/Images/nio-tutorial7.png)

### Channels

* In Java NIO, the channel is a medium that transports the data efficiently between the entity and byte buffers. 
* It reads the data from an entity and places it inside buffer blocks for consumption.
* Channels act as gateway provided by java NIO to access the I/O mechanism. 
* Usually channels have one-to-one relationship with operating system file descriptor for providing the platform independence operational feature.

### NIO Channel Basics

* Channel implementation uses the native code to perform actual work. 
* The channel interface allows us to gain access to low-level I/O services in a portable and controlled way.

At the top of hierarchy, the Channel interface is used as given below:

```java
package java.nio.channels;  
 public interface Channel{  
    public boolean isclose();  
    public void Open() throws IOException;  
}
``` 

As we can see in above channel interface, the two operations common in all the channels are:
1. Checking to see if a channel is close (isclose())
2. Opening the close channel (close())

### Selectors

* In Java NIO the selector is a multiplexor of selectable channels, which is used as a special type of channel that can be put into non-blocking mode. 
* It can examine one or more NIO Channel's and determines which channel is ready for communication i.e. reading or writing.

### What is the use of Selector

The selector is used for handling the multiple channels using a single thread. Therefore it require less threads to handle the channels.

Switching between the threads is expensive for operating system. Therefore, for improving the system efficiency selector is use.

Let's see the illustration of a thread using Selector to handle 3 Channel's:

![Hotspot JVMImages/](/Images/nio-tutorial8.png)

### Creating a Selector

We can create a selector by calling ``Selector.open()`` method, as given below:

```java
Selector selector = Selector.open();
```
    invoke the register() method on various channels objects to register our interest in various
    I/O events.

## What do threads do in the mean time?

Threads spend their time performing IO on other channels.
* In NIO a single thread can manage multiple channels of input and output.
* NIO have Selectors for selecting or registering in different channels.

### you may also get asked some queries like,

* If you have three sockets, then how many threads you will need to handle that?
    So answer to this is, using NIO we can operate on multiple channels using the same thread.

## What is the byte order of ByteBuffer?

Byte order is the order in which a multi-byte quantity is stored into the memory.
There are two types of Byte order,
1. Big-Endian
2. Little-Endian

👉🏻 Byte Buffer has big-endian as its default byte order..

## What is the difference between Direct and Non-Direct buffer in java?⭐️
    
A byteBuffer is either direct or non-direct.
* If it is Direct byte buffer, then JVM will perform native I/O operations directly upon it.
* Direct byte buffer can be created:
    * by invoking the allocateDirect() factory method of this class.
    * by mapping a region of a file directly into memory.

    * 👉🏻 Non direct buffer is just a wrapper around byte array and it resides in Java heap memory,whereas Direct buffer resides outside of JVM and memory is not allocated from heap!

## What is the memory mapped buffer in Java?
    
* MappedByteBuffer is a subclass of ByteBuffer, which is actually a Direct Byte Buffer whose content is a memory mapped region of a file.
* It is created by ``FileChannel.map()`` method.

## What is the difference between ByteBuffer and CharBuffer in Java?

A ByteBuffer is a buffer that holds (8-bit) byte values and CharBuffer holds (16 bit) char values..

## The NIO classes are contained in the packages as given below:

| Package |	Purpose| 
| --- | --- |
| java.nio | It is top-level package for NIO system. The various types of buffers are encapsulated by this NIO system. |
| java.nio.charset | It encapsulates the character sets and also supports encoders and decoders operation that convert characters to bytes and bytes to characters, respectively. |
| java.nio.charset.spi | It supports the service provider for character sets. |
| java.nio.channels | It support the channel, which are essentially open the I/O connections. |
| java.nio.channels.spi | It supports the service providers for channels. |
| java.nio.file	| It provides the support for files. |
| java.nio.file.spi	| It supports the service providers for file system. |
| java.nio.file.attribute | It provides the support for file attributes. |

## Convert String to ByteBuffer
* ByteBuffer.wrap(str.getBytes("UTF-8"))
