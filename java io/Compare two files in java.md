# Byte by Byte Comparison

Let's start with a simple approach to reading the bytes from the two files to compare them sequentially.

To speed up reading the files, we'll use ``BufferedInputStream``. 

As we'll see, ``BufferedInputStream`` reads large chunks of bytes from the underlying ``InputStream`` into an *internal buffer*. When the client reads all the bytes in the chunk, the buffer reads another block of bytes from the stream.

> Obviously, using BufferedInputStream is much faster than reading one byte at a time from the underlying stream.

Let's write a method that uses BufferedInputStreams to compare two files:
```java
public static long filesCompareByByte(Path path1, Path path2) throws IOException {
    try (BufferedInputStream fis1 = new BufferedInputStream(new FileInputStream(path1.toFile()));
         BufferedInputStream fis2 = new BufferedInputStream(new FileInputStream(path2.toFile()))) {
        
        int ch = 0;
        long pos = 1;
        while ((ch = fis1.read()) != -1) {
            if (ch != fis2.read()) {
                return pos;
            }
            pos++;
        }
        if (fis2.read() == -1) {
            return -1;
        }
        else {
            return pos;
        }
    }
}
```

* We use the try-with-resources statement to ensure that the two BufferedInputStreams are closed at the end of the statement.
* With the while loop, we read each byte of the first file and compare it with the corresponding byte of the second file. If we find a discrepancy, we return the byte position of the mismatch. Otherwise, the files are identical and the method returns -1L.
* We can see that if the files are of different sizes but the bytes of the smaller file match the corresponding bytes of the larger file, then it returns the size in bytes of the smaller file.

# Line by Line Comparison

To compare text files, we can do an implementation that reads the files line by line and checks for equality between them.

Let's work with a ``BufferedReader`` that uses the same strategy as ``InputStreamBuffer``, copying chunks of data from the file to an internal buffer to speed up the reading process.

Let's review our implementation:
```java
public static long filesCompareByLine(Path path1, Path path2) throws IOException {
    try (BufferedReader bf1 = Files.newBufferedReader(path1);
         BufferedReader bf2 = Files.newBufferedReader(path2)) {
        
        long lineNumber = 1;
        String line1 = "", line2 = "";
        while ((line1 = bf1.readLine()) != null) {
            line2 = bf2.readLine();
            if (line2 == null || !line1.equals(line2)) {
                return lineNumber;
            }
            lineNumber++;
        }
        if (bf2.readLine() == null) {
            return -1;
        }
        else {
            return lineNumber;
        }
    }
}
```

* The code follows a similar strategy as the previous example. 
    * In the while loop, instead of reading bytes, we read a line of each file and check for equality. 
* If all the lines are identical for both files, then we return -1L, but if there's a discrepancy, we return the line number where the first mismatch is found.
* If the files are of different sizes but the smaller file matches the corresponding lines of the larger file, then it returns the number of lines of the smaller file.