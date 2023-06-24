# Using java.nio.file.Files

* To check if a file or directory exists, we can leverage the ``Files.exists(Path)`` method. 
* As it's clear from the method signature, we should first obtain a Path to the intended file or directory. 
* Then we can pass that Path to the ``Files.exists(Path)`` method:

```java
Path path = Paths.get("does-not-exist.txt");
assertFalse(Files.exists(path));
```

* Since the file *doesn't exist*, it **returns false**. 
* It's also worth mentioning that if the ``Files.exists(Path)`` method encounters an ``IOException``, it'll **return false**, too.

On the other hand, when the given file exists, it'll return true as expected:

```java
Path tempFile = Files.createTempFile("baeldung", "exist-article");
assertTrue(Files.exists(tempFile));
```

* Here we're creating a temporary file and then calling the ``Files.exists(Path)`` method.

This even works for directories:

```java
Path tempDirectory = Files.createTempDirectory("baeldung-exists");
assertTrue(Files.exists(tempDirectory));
```
* If we specifically want to know if a file or directory exists, we can also use ``Files.isDirectory(Path)`` or ``Files.isRegularFile(Path)`` methods:

```java
assertTrue(Files.isDirectory(tempDirectory));
assertFalse(Files.isDirectory(tempFile));
assertTrue(Files.isRegularFile(tempFile));
```

* There is also a ``notExists(Path)`` method that returns *true* if the given **Path doesn't exist**:
```java
assertFalse(Files.notExists(tempDirectory));
```

* Sometimes the ``Files.exists(Path)`` returns *false* because we don't possess the required file permissions. 
* In such scenarios, we can use the ``Files.isReadable(Path)`` method to make sure the file is actually readable by the current user:
```java
assertTrue(Files.isReadable(tempFile));
assertFalse(Files.isReadable(Paths.get("/root/.bashrc")));
```