## String Pool
**String pool** is a storage space in the Java heap memory where string literals are stored. It is also known as **String Constant Pool or String Intern Pool**. It is privately maintained by the Java String class. By default, the String pool is empty. A pool of strings decreases the number of String objects created in the JVM, thereby reducing memory load and improving performance.

Strings are immutable in nature. Immutable means they have a constant value, and even if they are altered, instead of reflecting the alterations in the original string, a new object is created. This immutability is achieved through String Pool. Let us look at the concept of String Pool.

### What is String Pool in Java?
String Pool in Java is a special storage space in Java Heap memory where string literals are stored. It is also known by the names - String Constant Pool or String Intern Pool. Whenever a string literal is created, the JVM first checks the String Constant Pool before creating a new String object corresponding to it.

Let us first discuss the memory allocation methods used in Java - Stack Memory Allocation and Heap Memory Allocation.

    In stack memory, only the primitive data types like- int, char, byte, short, boolean, long, float and double are stored.
    Whereas, in the heap memory, non-primitive data types like strings are stored. A reference to this location is held by the stack memory.

Example:
![Hotspot JVM](Images/sp1.webp)

Explanation:

    Since int and double are primitive data types, they are stored in the stack memory itself.
    However, idName stores a String that is non-primitive in nature. Hence, the String object is created in the heap memory, and its reference is stored by idName in the stack memory.

#### Memory Allocation in the String Pool
    The String Pool is empty by default, and it is maintained privately by the String class.
    When we create a string literal, the JVM first checks that literal in the String Constant Pool. If the literal is already present in the pool, its reference is stored in the variable.
    However, if the string literal is not found, the JVM creates a new string object in the String Constant Pool and returns its reference.
    Need of String Constant Pool:

    When we create a String object, it uses some amount of space in the heap memory.
    Let's say we are creating n number of String objects with the same value, and distinct memory is allocated to each of these string objects (though they all contain the same string).
    This is an inefficient usage of heap memory. In order to escalate the performance of our code and reduce memory usage, JVM optimizes the way in which strings are stored with the help of a string constant pool.
    
#### Ways to Create Strings

There are three popular ways of creating strings in Java:

1. String literal
2. Using new keyword
3. Using String.intern() method
4. Let us understand each of these three methods and their impact on the String Pool.

1. String literal

This is the simplest and most direct way to declare a string. It is done using double quotes.

Syntax:

```java
String <variable name> = “<value of string>”;```

Example:

```java
String str = "Java";
String str1 = "Java";
String str2 = "Study";
```

#### Changes in the String Pool:

    The String Pool is empty by default. Hence, when the compiler executes the first line, it creates a string literal "Java" in the String Constant Pool.
    When the compiler executes the second line, it first checks the String Constant Pool. Since the string literal "Java" is already present in the String Pool, its reference is stored in str1.
    As a result of the execution of the third statement, a new string literal "Study" is created in the String Constant Pool (since it is not already present). Its reference is stored in str2.

The figure shows the memory allocation of the above code.

![Hotspot JVM](Images/sp2.webp)

    Whenever a string literal is created, the compiler checks the String Constant Pool first. If it encounters the same string, then instead of creating a new string, it returns the same instance of the existing string to the variable.

2. Using new keyword

    We can create new String objects using the new keyword. When we create new string literals using the new keyword, memory is allocated to those String objects in the Java heap memory outside the String Pool.

Syntax:

```java
String <variable name> = new String(“<value of the string>”);
```

Example:

```java
String str = "Java";
String str1 = new String("Java");
```

##### Changes in the Java heap memory:

    The first string gets stored in the String Constant Pool, but the second string object gets stored out of the string pool in the Java heap memory.

Here is the memory representation of the same.
![Hotspot JVM](Images/sp3.webp)

    However, we can stop this kind of memory allocation to String objects using the String.intern() method in Java.

3. Using String.intern() method

    Creating strings using the new keyword allocates memory to the string object in the heap but outside the string constant pool. When we use the String.intern() method, JVM puts the string literal in the String Pool (if not already present), and its reference is stored in the variable. However, if the String Constant Pool already contains a string equal to the String object to be created, its reference is returned.
    
Syntax:

```java
<String name>.intern(); 
```

or

```java
String <variable name> = new String(<"string value">).intern();  
```

Example:

```java
String str = "Java";

String str1 = new String("Java").intern();

String str2 = new String("Code");
str2.intern();
```

Explanation:

* The first statement creates a new string literal in the String Constant Pool.
* The second variable str1 holds a reference of the already existing "Java" literal in the String Constant Pool.
* The third statement creates a new string literal in the String Pool as "Code" is not initially present.

The following figure illustrates the memory allocation for the same-

![Hotspot JVM](Images/sp4.webp)

> Note:
>> For any two strings say str1 and str2, str1.intern() = = str2.intern() will be true if and only if the statement str1.equals(str2) will be true.

##### String Pool in Java Flow Diagram
Let us understand the working of a string pool with a basic diagram.

![Hotspot JVM](Images/sp5.webp)

Explanation:

* The first statement creates a new string in the String Constant Pool, and str1 holds its reference.
* The Second statement executes in a similar fashion, and variable str2 holds the reference of "USA" from String Constant Pool.
* String str3 has the same value as str1, and both variables hold the reference of the same String object stored in the String Pool.
* == operator is used to compare the addresses of the objects and check whether they refer to the same instance.
* Here, since str1 and str2 are two different strings or objects, after comparing them with the == operator, it returns false.
* Whereas, when str1 and str3 are compared using the == operator, it returns true since it is referring to the same object.

Example of String Pool in Java

```java
public class StringPoolExample {

  public static void main(String args[]) {
    // These strings are created in the String Pool
    String str1 = "Java";
    String str2 = "C++";

    // JVM returns the reference of the pooled instance, i.e., str1
    // str3 will not be created in the string pool
    String str3 = "Java";

    // stored in Java heap memory outside the String Pool
    String str4 = new String("Java");
    String str5 = new String("C++");

    // str6 it will not get stored in the Java heap
    // it will hold reference of the already-existing String object with the value "Java"
    // in the String Constant Pool
    String str6 = new String("Java").intern();

    // false
    System.out.println(str1 == str4);

    // false
    //str2 occupies space in the string pool, and str7 occupies space in the Java heap
    System.out.println(str2 == str5);

    // true
    // address of both strings are the same
    System.out.println(str1 == str3);

    // true
    // address of both strings are the same
    System.out.println(str1 == str6);
  }
}
```

```java
Output:

false
false
true
true
```

Explanation:

Let us look at the figure which illustrates the memory allocation used in the program above.
![Hotspot JVM](Images/sp6.webp)

#### Advantages of String Pool in Java
    
    Java String Pool allows caching of string. Caching here is the process of storing data in a cache. Cache improves performance and reduces memory usage.
    Provides reusability: It saves time to create a new string if there is already a string with the same value present in the pool. The old string is reused, and its reference is returned.

> Note:
>> String interning is a method of storing only one copy of each distinct string value, which must be immutable. In Java, String interning is achieved using the concept of String Pool.

#### Disadvantages of Using String Objects
    Strings have a constant value, and even if they are altered, instead of reflecting the changes in the original string, a new object is created.
    This causes a lot of objects to be created in the heap and wastes a lot of memory if the user keeps on updating the value of the string.

> Note:
>> In order to overcome the drawbacks of the String class, Java provides StringBuffer and StringBuilder classes. They are used to create mutable String objects.

#### Garbage Collection

   Before Java 7, the JVM placed the Java String Pool in the **PermGen space**, which has a fixed size — it can't be expanded at runtime and is not eligible for garbage collection.   
   The risk of interning Strings in the **PermGen** (instead of the Heap) is that we can get an **OutOfMemory** error from the JVM if we intern too many Strings.   
    From Java 7 onwards, the Java String Pool is stored in the Heap space, which is garbage collected by the JVM**. The advantage of this approach is the reduced risk of OutOfMemory error because unreferenced Strings will be removed from the pool, thereby releasing memory.   

#### Performance and Optimizations

   In Java 6, the only optimization we can perform is increasing the PermGen space during the program invocation with the **MaxPermSize** JVM option:
   ```java
   -XX:MaxPermSize=1G
   ```

   In Java 7, we have more detailed options to examine and expand/reduce the pool size. Let's see the two options for viewing the pool size:

   ```java
   -XX:+PrintFlagsFinal
   ```
   ```java
   -XX:+PrintStringTableStatistics
   ```

   If we want to increase the pool size in terms of buckets, we can use the **StringTableSize** JVM option:

   ```java
   -XX:StringTableSize=4901
   ```
   Prior to Java 7u40, the default pool size was 1009 buckets but this value was subject to a few changes in more recent Java versions. To be precise, the default pool size from Java 7u40 until Java 11 was 60013 and now it increased to 65536.

   Note that increasing the pool size will consume more memory but has the advantage of reducing the time required to insert the Strings into the table.

##   # A Note About Java 9

   Until Java 8, Strings were internally represented as an array of characters – **char[], encoded in UTF-16, so that every character uses two bytes of memory.**   
   With Java 9 a new representation is provided, called **Compact Strings**. This new format will choose the appropriate encoding between char[] and byte[] depending on the stored content.   
   Since the new String representation will use the UTF-16 encoding only when necessary, the amount of heap memory will be significantly lower, which in turn causes less Garbage Collector overhead on the JVM.  


> Strings in Java are internally represented by a char[] containing the characters of the String. And, every char is made up of 2 bytes because Java internally uses UTF-16.
>
> For instance, if a String contains a word in the English language, the leading 8 bits will all be 0 for every char, as an ASCII character can be represented using a single byte.
>
> Many characters require 16 bits to represent them but statistically most require only 8 bits — LATIN-1 character representation. So, there is a scope to improve the memory consumption and performance.
>
> What's also important is that Strings typically usually occupy a large proportion of the JVM heap space. And, because of the way they're stored by the JVM, in most cases, a String instance can take up double space it actually needs.

* #### Compressed String – Java 6
The JDK 6 update 21 Performance Release, introduced a new VM option:
```java
-XX:+UseCompressedStrings
```
> *When this option is enabled, Strings are stored as byte[], instead of char[] – thus, saving a lot of memory. However, this option was eventually removed in JDK 7, mainly because it had some unintended performance consequences.*

* #### Compact String – Java 9
Java 9 has brought the concept of compact Strings back.

This means that whenever we create a String if all the characters of the String can be represented using a byte — **LATIN-1** representation, a byte array will be used internally, such that one byte is given for one character.

> *In other cases, if any character requires more than 8-bits to represent it, all the characters are stored using two bytes for each — UTF-16 representation.*

So basically, whenever possible, it’ll just use a single byte for each character.

Now, the question is – how will all the String operations work? How will it distinguish between the LATIN-1 and UTF-16 representations?

Well, to tackle this issue, another change is made to the internal implementation of the String. We have a final field coder, that preserves this information.

##### String Implementation in Java 9

Until now, the String was stored as a char[]:
```java
private final char[] value;
```
From now on, it'll be a byte[]:
```java
private final byte[] value;
```
The variable coder:
```java
private final byte coder;
```
Where the coder can be:
```java
static final byte LATIN1 = 0;
static final byte UTF16 = 1;
```
Most of the String operations now check the coder and dispatch to the specific implementation:
```java
public int indexOf(int ch, int fromIndex) {
    return isLatin1() 
      ? StringLatin1.indexOf(value, ch, fromIndex) 
      : StringUTF16.indexOf(value, ch, fromIndex);
}  

private boolean isLatin1() {
    return COMPACT_STRINGS && coder == LATIN1;
}
```
With all the info the JVM needs ready and available, the **CompactString VM** option is enabled by default. To disable it, we can use:
```java
+XX:-CompactStrings
```
##### How coder Works
In Java 9 String class implementation, the length is calculated as:
```java
public int length() {
    return value.length >> coder;
}
```
* If the String contains only LATIN-1, the value of the coder will be 0 so the length of the String will be the same as the length of the byte array.

* In other cases, if the String is in UTF-16 representation, the value of coder will be 1, and hence the length will be half the size of the actual byte array.

> Note that all the changes made for Compact String, are in the internal implementation of the String class and are fully transparent for developers using String.

#### Compact Strings vs. Compressed Strings

* In case of JDK 6 Compressed Strings, a major problem faced was that the String constructor accepted only char[] as an argument. In addition to this, many String operations depended on char[] representation and not a byte array. Due to this, a lot of unpacking had to be done, which affected the performance.

* Whereas in case of Compact String, maintaining the extra field “coder” can also increase the overhead. To mitigate the cost of the coder and the unpacking of bytes to chars (in case of UTF-16 representation), some of the methods are intrinsified and the ASM code generated by the JIT compiler has also been improved.

* This change resulted in some counter-intuitive results. The LATIN-1 indexOf(String) calls an intrinsic method, whereas the indexOf(char) does not. In case of UTF-16, both of these methods call an intrinsic method. This issue affects only the LATIN-1 String and will be fixed in future releases.

Thus, Compact Strings are better than the Compressed Strings in terms of performance.

#### FAQs

1. What is meant by String Pool in Java?
String Pool in Java is a storage space in Java Heap memory where unique string literals are stored.

2. Where is the String Pool stored?
String Pool is stored in the Heap Memory.

3. Why do we need String Pool in Java?
It is created to decrease the number of string objects created in the memory. Whenever a new string is created, JVM first checks the string pool. If it encounters the same string, then instead of creating a new string, it returns a reference existing string to the variable.

4. Does string pool make Java more memory efficient?
Yes, a string pool helps to save memory by preserving immutable strings in a pool so that the instances can be reused.

Conclusion

* A string is a set of characters that are always enclosed in double-quotes.
* Strings in Java are immutable in nature.
* This immutability is achieved through String Pool.
* String Pool in Java is a special storage space in Java heap memory. It is also known as      String Constant Pool or String Intern Pool.
* Whenever a new string is created, JVM first checks the string pool. If it encounters the same string, then instead of creating a new string, it returns the same instance of the found string to the variable.
* The String.intern() method puts the string in the String pool or refers to another String object from the string pool having the same value.
* String Interning is a method that stores only a copy of each distinct string literal. String Pool is an implementation of the concept of String Interning.
* Java String Pool allows caching of string and reusability.

### Java StringBuffer class

It provides us with a way to use mutable strings in Java. These strings are safe to be used by multiple threads simultaneously. In order to give this advantage to the StringBuffer, the implementation of this class becomes less time efficient.

Syntax:

```java
StringBuffer a = new StringBuffer("Scaler");
```

Code:

```java
public class StringBufferExample {

  public static void main(String[] args) {
    // Empty StringBuffer object
    StringBuffer temp = new StringBuffer();
    // Initial size of object
    System.out.println(temp.capacity());

    StringBuffer sb = new StringBuffer("Scaler");
    System.out.println(sb);

    // Updating/Modifying the StringBuffer object value
    sb.append(" Articles");
    System.out.println(sb);
  }
}
```
Output:

```java
16
Scaler
Scaler Articles
```
### Java StringBuilder class

StringBuilder class also provides us with mutable strings but here we lack thread safety. It cannot be used by multiple threads simultaneously. Since StringBuilder class is not applying this extra feature like StringBuffer, it is faster than StringBuffer class.

Syntax:
```java
StringBuilder a = new StringBuilder("Scaler");
```
Code:
```java
public class StringBuilderExample {

  public static void main(String[] args) {
    StringBuilder temp = new StringBuilder();
    // Initial size of object
    System.out.println(temp.capacity());

    StringBuilder sb = new StringBuilder("Scaler");
    System.out.println(sb);

    // Updating/Modifying the value of sb
    sb.append(" Articles");
    System.out.println(sb);
  }
}
```
Output:
```java
16
String
String Articles
```

### StringBuffer and StringBuilder classes with multiple threads
In the code below:

* We have created three threads each to manipulate objects of StringBuffer and StringBuilder classes.
* For sbuilder (object of StringBuilder class), three threads are manipulating it simultaneously namely builderThread1, builderThread2, and builderThread3.
* Similarly, for sbuffer (object of StringBuffer class), three threads are manipulating it simultaneously namely bufferThread1, bufferThread2, and bufferThread3.
* Let us see the value of sbuilder and sbuffer objects when these threads are simultaneously operating on them.

Code:
```java
public class Main {

  public static void main(String[] args) throws InterruptedException {

    StringBuilder sbuilder = new StringBuilder();
    
    StringBuilderScaler builderThread1 = new StringBuilderScaler(sbuilder);
    StringBuilderScaler builderThread2 = new StringBuilderScaler(sbuilder);
    StringBuilderScaler builderThread3 = new StringBuilderScaler(sbuilder);

    builderThread1.start();
    builderThread2.start();
    builderThread3.start();
    builderThread1.join();
    builderThread2.join();
    builderThread3.join();

    System.out.println("StringBuilder: " + sbuilder.toString());

    StringBuffer sbuffer = new StringBuffer();

    StringBufferScaler bufferThread1 = new StringBufferScaler(sbuffer);
    StringBufferScaler bufferThread2 = new StringBufferScaler(sbuffer);
    StringBufferScaler bufferThread3 = new StringBufferScaler(sbuffer);

    bufferThread1.start();
    bufferThread2.start();
    bufferThread3.start();
    bufferThread1.join();
    bufferThread2.join();
    bufferThread3.join();

    System.out.println("StringBuffer: " + sbuffer.toString());
  }
}

class StringBuilderScaler extends Thread {

  StringBuilder sbuilder;

  public StringBuilderScaler(StringBuilder sb) {
    sbuilder = sb;
  }

  @Override
  public void run() {
    for (int i = 0; i < 10; i++) {
      sbuilder.append(i);
    }
  }
}

class StringBufferScaler extends Thread {

  StringBuffer sbuffer;

  public StringBufferScaler(StringBuffer sb) {
    sbuffer = sb;
  }

  @Override
  public void run() {
    for (int i = 0; i < 10; i++) {
      sbuffer.append(i);
    }
  }
}
```
Ouput on First Run:

```java
StringBuilder:012345678901234567890123456789
StringBuffer:012345678901234567890123456789
```
Output on Second Run:
```java
StringBuilder: 01234567890012346789
StringBuffer: 012345678901234567890123456789
```
Output on Third Run:
```java
StringBuilder: 01234567890123450123456789
StringBuffer: 012345678901234567890123456789
```
Explanation:

* The value of sbuilder is varying over different runs of the same program whereas sbuffer value remains the same.
* This implies when bufferThread1 is operating on sbuffer, then bufferThread2 and bufferThread3 do not try to access or manipulate its value. This holds true in the case of bufferThread2 and bufferThread3 as well.
* However, this is not the case with StringBuilder class. All the three threads simultaneously access try to access, manipulate and update the value of sbuilder object resulting in varying results.
* This shows the fact that StringBuilder is thread unsafe whereas StringBuffer is thread-safe.