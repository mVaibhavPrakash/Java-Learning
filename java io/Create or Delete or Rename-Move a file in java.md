# Create Using NIO Files.createFile() 

Let's start by using the Files.createFile() method from the Java NIO package:
```java
@Test
public void givenUsingNio_whenCreatingFile_thenCorrect() throws IOException {
    Path newFilePath = Paths.get(FILE_NAME);
    Files.createFile(newFilePath);
}
```

As you can see the code is still very simple; we're now using the new Path interface instead of the old File.

One thing to note here is that the new API makes good use of exceptions. 
* If the file already exists, we no longer have to check a return code. Instead, we'll get a ``FileAlreadyExistsException``:
```java
java.nio.file.FileAlreadyExistsException: <code class="language-java">src/test/resources/fileToCreate.txt
 at sun.n.f.WindowsException.translateToIOException(WindowsException.java:81)Copy
```

# Delete With Java – JDK 7
```java
@Test
public void givenUsingJDK7nio2_whenDeletingAFile_thenCorrect() throws IOException {
    Files.createFile(Paths.get("src/test/resources/fileToDelete_jdk7.txt"));

    Path fileToDeletePath = Paths.get("src/test/resources/fileToDelete_jdk7.txt");
    Files.delete(fileToDeletePath);
}
```

Now – this will make better use of exceptions. 
* If the file doesn't exist when the delete operation is triggered – an NoSuchFileException will be thrown by the API:
```java
java.nio.file.NoSuchFileException: srctestresourcesfileToDelete_jdk7.txt
    at s.n.f.WindowsException.translateToIOException(WindowsException.java:79)
```

# Rename-Move Fles Using the NIO Paths and Files Classes

Let's start by using the ``Files.move()`` method from the Java NIO package:
```java
@Test
public void givenUsingNio_whenMovingFile_thenCorrect() throws IOException {
    Path fileToMovePath = Paths.get(FILE_TO_MOVE);
    Path targetPath = Paths.get(TARGET_FILE);
    Files.move(fileToMovePath, targetPath);
}
```

    In JDK7 the NIO package was significantly updated, and the Path class added. This provides methods for convenient manipulation of File System artifacts.

> Note that both the file and the target directory should exist.