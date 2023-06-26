# Using getFileNameMap()

A MIME type (now properly called "media type", but also sometimes "content type") is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg , or an image file image/png )

A faster way to obtain the MIME type using URLConnection is using the getFileNameMap() method:
```java
@Test
public void whenUsingGetFileNameMap_thenSuccess(){
    File file = new File("product.png");
    FileNameMap fileNameMap = URLConnection.getFileNameMap();
    String mimeType = fileNameMap.getContentTypeFor(file.getName());
 
    assertEquals(mimeType, "image/png");
}
```

The method returns the table of MIME types used by all instances of URLConnection. This table is then used to resolve the input file type.

The built-in table of MIME types is very limited when it comes to URLConnection.

By default, the class uses content-types.properties file in ``JRE_HOME/lib``. We can, however, extend it, by specifying a user-specific table using the ``content.types.user.table`` property:
```java
System.setProperty("content.types.user.table","<path-to-file>");
```