## I/O Streams

There are two types of Streams you can use to interact with files:

1. Character Streams
2. Byte Streams

For each of the above stream types, there are several supporting classes shipped with Java, which we'll take a quick look at below.

### Character Streams

Character Streams are used to read or write the characters data type. 

Let's look at the most commonly used classes. All of these classes are defined under java.io package.

Here are some classes you should know that can be used to read character data:

* ``Reader:`` An abstract class to read a character stream.
* ``InputStreamReader``: Class used to read the byte stream and converts to character stream.
* ``FileReader``: A class to read the characters from a file.
* ``BufferedReader``: This is a wrapper over the Reader class that supports buffering capabilities. **In many cases this is most preferable class to read data because more data can been read from the file in one ``read()`` call, reducing the number of actual I/O operations with file system**.

And here are some classes you can use to write character data to a file:

* ``Writer``: This is an abstract class to write the character streams.
* ``OutputStreamWriter``: This class is used to write character streams and also convert them to byte streams.
* ``FileWriter``: A class to actually write characters to the file.
* ``BufferedWriter``: This is a wrapper over the Writer class, which also supports buffering capabilities. **This is most preferable class to write data to a file since more data can be written to the file in one write() call. And like the BufferedReader, this reduces the number of total I/O operations with file system**.

### Byte Streams

Byte Streams are used to read or write byte data with files. This is different from before in the way they treat the data. Here you work with raw bytes, which could be characters, image data, unicode data (which takes 2 bytes to represent a character), etc.

In this section we'll take a look at the most commonly used classes. All of these classes are defined under java.io package.

Here are the classes used to read the byte data:

* ``InputStream``: An abstract class to read the byte streams.
* ``FileInputStream``: A class to simply read bytes from a file.
* ``BufferedInputStream``: This is a wrapper over InputStream that supports buffering capabilities. As we saw in the character streams, this is a more efficient method than FileInputStream.

And here are the classes used to write the byte data:

* ``OutputStream``: An abstract class to write byte streams.
* ``FileOutputStream``: A class to write raw bytes to the file.
* ``ByteOutputStream``: This class is a wrapper over OutputStream to support buffering capabilities. And again, as we saw in the character streams, this is a more efficient method than FileOutputStream thanks to the buffering.

### Examples of Reading and Writing Text Files

In the previous sections, we have discussed the different APIs provided by Java and now it's time to use these API classes in some code.

The example code below handles reading and writing text files using the various classes we detailed above. To simplify things, and provide a better comparison of the actual methods being used, the input and output are going to remain the same between the examples.

Note: To avoid any confusion on the file path, the example code will read and write from a file on in user's home directory. The user's home directory can be found using System.getProperty("user.home");, which is what we use in our examples.

#### Reading and Writing with FileReader and FileWriter

Let's start by using the ``FileReader`` and ``FileWriter`` classes:

```java
String directory = System.getProperty("user.home");
String fileName = "sample.txt";
String absolutePath = directory + File.separator + fileName;

// Write the content in file 
try(FileWriter fileWriter = new FileWriter(absolutePath)) {
    String fileContent = "This is a sample text.";
    fileWriter.write(fileContent);
    fileWriter.close();
} catch (IOException e) {
    // Cxception handling
}

// Read the content from file
try(FileReader fileReader = new FileReader(absolutePath)) {
    int ch = fileReader.read();
    while(ch != -1) {
        System.out.print((char)ch);
        fileReader.close();
    }
} catch (FileNotFoundException e) {
    // Exception handling
} catch (IOException e) {
    // Exception handling
}
```

* Both classes accept a String, representing the path to the file in their constructors. You can also pass a File object as well as a FileDescriptor.
* The ``write()`` method writes a valid *character sequence - either a String, a char[]*. Additionally, it can write a single char represented as an int.
* The ``read()`` method reads and *returns character-by-character*, allowing us to use the read data in a while loop for example.

> Don't forget to close both of these classes after use!

#### Reading and Writing with BufferedReader and BufferedWriter

Using ``BufferedReader`` and ``BufferedWriter`` classes:
```java
String directory = System.getProperty("user.home");
String fileName = "sample.txt";
String absolutePath = directory + File.separator + fileName;

// Write the content in file 
try(BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(absolutePath))) {
    String fileContent = "This is a sample text.";
    bufferedWriter.write(fileContent);
} catch (IOException e) {
    // Exception handling
}

// Read the content from file
try(BufferedReader bufferedReader = new BufferedReader(new FileReader(absolutePath))) {
    String line = bufferedReader.readLine();
    while(line != null) {
        System.out.println(line);
        line = bufferedReader.readLine();
    }
} catch (FileNotFoundException e) {
    // Exception handling
} catch (IOException e) {
    // Exception handling
}
```
#### Reading and Writing with FileInputStream and FileOutputStream

Using ``FileInputStream`` and ``FileOutputStream`` classes:
```java
String directory = System.getProperty("user.home");
String fileName = "sample.txt";
String absolutePath = directory + File.separator + fileName;

// write the content in file 
try(FileOutputStream fileOutputStream = new FileOutputStream(absolutePath)) {
    String fileContent = "This is a sample text.";
    fileOutputStream.write(fileContent.getBytes());
} catch (FileNotFoundException e) {
    // exception handling
} catch (IOException e) {
    // exception handling
}

// reading the content of file
try(FileInputStream fileInputStream = new FileInputStream(absolutePath)) {
    int ch = fileInputStream.read();
    while(ch != -1) {
        System.out.print((char)ch);
        ch = fileInputStream.read();
    }
} catch (FileNotFoundException e) {
    // exception handling
} catch (IOException e) {
    // exception handling
}
```
#### Reading and Writing with BufferedInputStream and BufferedOutputStream

Using ``BufferedInputStream``and ``BufferedOutputStream`` classes:
```java
String directory = System.getProperty("user.home");
String fileName = "sample.txt";
String absolutePath = directory + File.separator + fileName;

// write the content in file 
try(BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(absolutePath))) {
    String fileContent = "This is a sample text.";
    bufferedOutputStream.write(fileContent.getBytes());
} catch (IOException e) {
    // exception handling
}

// read the content from file
try(BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream(absolutePath))) {
    int ch = bufferedInputStream.read();
    while(ch != -1) {
        System.out.print((char)ch);
        ch = bufferedInputStream.read();
    }
} catch (FileNotFoundException e) {
    // exception handling
} catch (IOException e) {
    // exception handling
}
```