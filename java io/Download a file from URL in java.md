# NIO Package

The Java NIO package offers the possibility to transfer bytes between two Channels without buffering them into the application memory.

To read the file from our URL, we'll create a new ``ReadableByteChannel`` from the URL stream:
```java
ReadableByteChannel readableByteChannel = Channels.newChannel(url.openStream());
```

The bytes read from the ``ReadableByteChannel`` will be transferred to a ``FileChannel`` corresponding to the file that will be downloaded:
```java
FileOutputStream fileOutputStream = new FileOutputStream(FILE_NAME);
FileChannel fileChannel = fileOutputStream.getChannel();
```

We'll use the ``transferFrom()`` method from the ``ReadableByteChannel`` class to download the bytes from the given URL to our FileChannel:
```java
fileOutputStream.getChannel()
  .transferFrom(readableByteChannel, 0, Long.MAX_VALUE);
```

* The ``transferTo()`` and ``transferFrom()`` methods are more efficient than simply reading from a stream using a buffer. 
* Depending on the underlying operating system, the data can be transferred directly from the filesystem cache to our file without copying any bytes into the application memory.
* On Linux and UNIX systems, these methods use the zero-copy technique that reduces the number of context switches between the kernel mode and user mode.