### What is serialization?⭐️

Serialization is a mechanism of converting the state of an object into a byte stream.

### What is Deserialization?⭐️
  
Deserialization is reverse of serialization. The reverse process of creating object from sequence of bytes is called deserialization.

### How to make a Java class Serializable?

By implementing Serializable interface.

### How many methods Serializable has? If no method then what is the purpose of Serializable interface?
  
It is a marker interface.The main purpose of using marker interface is to tell the compiler that treat differently the  object of the class which implemented marker interface.they are used to indicate something to compiler or JVM.

### Which methods are used during Serialization and DeSerialization process in Java?

We call ``ObjectOutputStream.writeObject(saveThisobject)`` and to deserialize that object we call ``ObjectInputStream.readObject()`` method. 

Call to ``writeObject()`` method trigger serialization process in java. 

One important thing to note about ``readObject()`` method is that it is used to read bytes from the persistence and to create object from those bytes and its return an Object which needs to be type cast to correct type.

### What if we want to serialize or deserialize primitives?

For every primitive corresponding method is there like writeInt(), readInt(), writeFloat() etc.

### Write a program to serialize and deserialize an object.⭐️

```java
// Java code for serialization and deserialization
// of a Java object
import java.io.*;
 
class Demo implements java.io.Serializable{
  public int a;
  public String b;

  // Default constructor
  public Demo(int a, String b){
      this.a = a;
      this.b = b;
  }
}
 
class Test{
  public static void main(String[] args){  

    Demo object = new Demo(1, "geeksforgeeks");
    String filename = "file.ser";
     
    // Serialization
    try{  
      //Saving of object in a file
      FileOutputStream file = new FileOutputStream(filename);
      ObjectOutputStream out = new ObjectOutputStream(file);
       
      // Method for serialization of object
      out.writeObject(object);
       
      out.close();
      file.close();
       
      System.out.println("Object has been serialized");
    }
     
    catch(IOException ex){
        System.out.println("IOException is caught");
    }

    Demo object1 = null;
    // Deserialization
    try{  
      // Reading the object from a file
      FileInputStream file = new FileInputStream(filename);
      ObjectInputStream in = new ObjectInputStream(file);
       
      // Method for deserialization of object
      object1 = (Demo)in.readObject();
       
      in.close();
      file.close();
       
      System.out.println("Object has been deserialized ");
      System.out.println("a = " + object1.a);
      System.out.println("b = " + object1.b);
    }
     
    catch(IOException ex){
      System.out.println("IOException is caught");
    }
     
    catch(ClassNotFoundException ex){
      System.out.println("ClassNotFoundException is caught");
    }
  }
}
```

### Can we serialize more than one object and write on same File?

Yes

### What does transient mean? why we use transient keyword?

//While serializing you want some of the members not to serialize? How do you achieve it?
Transient mean not to serialize.

### What if we make static variable transient?

Static variables are not part of object state.
Serialization is for objects.So static variables are not serialized.Thus no use of using transient.

### Which kind of variables is not serialized during Java Serialization?⭐️

transient and static variables.

### What if we make final variable transient?⭐️

* It is useless to make a final variable transient.
* final variables participate in serialization directly by the value hence declaring a final variable as transient has no meaning.They will anyhow participate.

### What do you have to take care if file to read is having more than one object?

* The order in which they were serialized.
* It should be same while deserializing. Otherwise we will get ClassCastException.

### What if a member of class doesn't implement Serializable interface?

//what is object graph?⭐️

If you try to serialize an object of a class which implements Serializable,
but the object includes a reference to a non- Serializable class then a ‘NotSerializableException’ will be thrown at runtime whenever we are serializing an object, set of all objects which are reachable from that object will be serialized automatically. this gp of objects is called object graph.

In object graph every object should be serializable. otherwise we will get ‘NotSerializableException’.

### Can we customize Serialization process in Java?⭐️

Yes. We can customize behavior of object in serialization and deserialization
by implementing two methods in serializable class:

1. private void ``writeObject(ObjectOutputStream os)`` throws Exception
2. private void ``readObject(ObjectInputStream is)`` throws Exception

We can do any kind of pre or post processing task inside these methods.

These methods are callback methods, we can not call these methods as you can see
they are private to avoid being inherited, overridden or overloaded, these are automatically called by jvm.

### What is the need of customized serialization?

To do any kind of pre or post processing task like encryption and decryption of fields which should be secured. or we can say to recover loss of information because of transient fields.

### What if the child of serializable does not implement serializable and we try to serialize or deserialize object of that class?

All the child of serializable are by default serializable. Its inherited in child.

### If a class is Serializable but its super class is not, what will be the state of the instance variables inherited from super class after deserialization?

If any variable is inherited from parent then jvm ignores the value and write the default value on file.Deserialization:
jvm checks is the parent is serializable or not, if not then
Jvm executes instance control flow and for that jvm always calls the no argument constructor.
(can be default generated by compiler or provided by us)

### What if the parent is not serializable and is not having no arg constructor?

If no arg constructor is not there we will get InvalidClassException.

### Suppose super class of a new class implement Serializable interface, how can we avoid new class to being serialized?

To avoid Java serialization you can implement writeObject() and readObject() method in our serializable Class and throw NotSerializableException from those method.

//externalization

### What is Externalizable? the difference between Serializable and Externalizable interface in Java?⭐️

* Externalizable is an interface.(Not Marker)
* In serialization everything a taken care by jvm and programmer does not have any control..
  * With serialization its not possible to save a part of file which can create performance problems so we have externalization.
* With externalization programmer have control instead of jvm, based on our requirement we can save a part or the full object.

### In externalization interface there are 2 methods:

1. ``public void writeExternal(ObjectOutput oo) throws IOException``   //ObjectOutput : Parent of ObjectOutputStream
2. ``public void ReadExternal(ObjectInput io) throws IOException``

at the time of deserialization jvm again needs to create the object since the file only has a part of object it does not have the object and for that it needs no arg constructor
thus externalizable class should contain public no arg constructor

### Can we use transient keyword with externalization?

Yes, but it has no affect.
Its not required.

### What is serialVersionUID and use of serialVersionUID?⭐️

* JVM saves a unique identifier with every object based on the class file of the object while serializing.
* On receiver's machine while deserializing the jvm again generates the unique identifier for the same local class.
* If both does not match we will get InvaliClassException.else object will be deserialized.
* This unique identifier is serialVersion UID.

### What are the drawbacks of using default serialVersion UID generated by jvm?

The both machines which are serializing and deserializing the object have to use same machine that is same operating system, same java version, same vendor as to generate same serialVersion UID.
Both sender and receiver have to use same version of class file, after serialization any change in
that file at receiver side will lead to creation of different ID.Thus deserialization will not be performed.

JVM uses complex process to generate serialVersionUID , which may affect performance.
so we can have our own serialVersionUID:
``private static final long serialVersionUID = 1L;``


### Question 2. How do we Serialize object, write a program to serialize and deSerialize object and persist it in file (Important)?

**Answer.** You must be able to write Serialization code to impress interviewer. In order to serialize object our class needs to implement java.io.Serializable interface. Serializable interface is Marker interface i.e. it does not have any methods of its own, but it tells Jvm that object has to converted into byte stream.

SERIALIZATION>
Create object of ObjectOutput and give it’s reference variable name oout and call writeObject() method and pass our employee object as parameter [oout.writeObject(object1) ]

```java
OutputStream fout = new FileOutputStream("ser.txt");
ObjectOutput oout = new ObjectOutputStream(fout);
System.out.println("Serialization process has started, serializing employee objects...");
oout.writeObject(object1);
```

DESERIALIZATION>
Create object of ObjectInput and give it’s reference variable name oin and call readObject() method [oin.readObject() ]
```java
InputStream fin=new FileInputStream("ser.txt");
ObjectInput oin=new ObjectInputStream(fin);
System.out.println("DeSerialization process has started, displaying employee objects...");
Employee emp;
emp=(Employee)oin.readObject();
```

### Question 3 . Difference between Externalizable and Serialization interface (Important)?

**Answer.** Here comes the time to impress interviewer by differentiating Serializable and Externalizable use.

| | SERIALIZABLE | EXTERNALIZABLE |
|---|---|---|
| Methods | It is a marker interface it doesn’t have any method. | It’s not a marker interface. It has method’s called writeExternal() and readExternal()| 
| Default Serialization process | YES, Serializable provides its own default serialization process, we just need to implement Serializable interface. | NO, we need to override writeExternal() and readExternal() for serialization process to happen.  |
| Customize serialization process | We can customize default serialization process by defining following methods in our class >readObject() and writeObject() . Note: We are not overriding these methods, we are defining them in our class. | Serialization process is completely customized. We need to override Externalizable interface’s writeExternal() and readExternal() methods. |
| Control over Serialization | It provides less control over Serialization as it’s not mandatory to define readObject() and writeObject() methods. | Externalizable provides you great control over serialization process as it is important to override  writeExternal() and readExternal() methods. |
| Constructor call during deSerialization | Constructor is not called during deSerialization | Constructor is called during deSerialization. |

### Question 4. How can you customize Serialization and DeSerialization process when you have implemented Serializable interface (Important)?

**Answer.**  We can customize Serialization process by defining writeObject()  method & DeSerialization process by defining readObject() method.

Let’s customize Serialization process by defining writeObject()  method :

```java
private void writeObject(ObjectOutputStream os) {

  System.out.println("In, writeObject() method."); 

  try {
    os.writeInt(this.id);
    os.writeObject(this.name);
  } catch (Exception e) {
    e.printStackTrace();
  }
}
```

We have serialized id and name manually by writing them in file.
   
Let’s customize DeSerialization process by defining readObject()  method :

```java
private void readObject(ObjectInputStream ois) {

  System.out.println("In, readObject() method.");

  try {
    id=ois.readInt();
    name=(String)ois.readObject();
  } catch (Exception e) {
    e.printStackTrace();
  }

} 
```

We have DeSerialized id and name manually by reading them from file.

### Question 5. WAP to explain how can we Serialize and DeSerialize object by implementing Externalizable interface (Important)?

**Answer.** For serializing object by implementing **Externalizable interface, we need to override ``writeExternal()`` and ``readExternal()`` for serialization/deserialization process to happen. 

For **Serialization** process override ``writeExternal()``  method & for **DeSerialization** process by override ``readExternal()`` method.

Let’s customize Serialization process by overriding writeExternal() method :
```java
public void writeExternal(ObjectOutput oo) throws IOException {
        System.out.println("in writeExternal()");
        oo.writeInt(id);
        oo.writeObject(name);
}
```
We have serialized id and name manually by writing them in file.
   
Let’s customize DeSerialization process by overriding readExternal()  method :

```java
public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
        System.out.println("in readExternal()");
        this.id=in.readInt();
        this.name=(String)in.readObject();
}
```

We have DeSerialized id and name manually by reading them from file.

### Question 6. How can you avoid certain member variables of class from getting Serialized?

**Answer.** Mark member variables as static or transient, and those member variables will no more be a part of Serialization.

### Question 7. What is serialVersionUID?

**Answer.** The serialization at runtime associates with each serializable class a version number, called a serialVersionUID, which is used during deserialization to verify that the sender and receiver of a serialized object have loaded classes for that object that are compatible with respect to serialization. 

How to avoid warning ‘The serializable class Employee does not declare a static final serialVersionUID field of type long’ ? 
Again answer is we can use eclipse to generate serialVersionUID for our class.


### Question 8. What will be impact of not defining serialVersionUID in class (Important)?

**Answer.**  SerialVersionUID is used for version control of object.
If we  don’t define serialVersionUID in the class, and any modification is made in class, then we won’t be able to deSerialize our class because serialVersionUID generated by java compiler for modified class will be different from old serialized object. And deserialization process will end up throwing java.io.InvalidClassException  (because of serialVersionUID mismatch) 

Let’s frame another question by twisting few words in it.

If you have serialized a class & then added few fields in it and then deserialize already serialized version of class, how can you ensure that you don’t end up throwing InvalidClassException?
> Simply we need to define serialVersionUID in class. 

When we Deserialize class ( class which has been modified after Serialization and also class doesn’t declare SerialVersionUID) InvalidClassException is thrown.

When we Deserialize class ( class which has been modified after Serialization and also class declare SerialVersionUID) its gets DeSerialized successfully.

Let’s discuss this interesting topic in detail - Impact of not defining serialVersionUID in class and  avoiding InvalidClassException

### Question 9. What are compatible and incompatible changes in Serialization process?

**Answer.**

**Compatible Changes :**  Compatible changes are those changes which does not affect deSerialization process even if class was updated after being serialized (provided serialVersionUID has been declared)
 * Adding new fields - We can add new member variables in class.
 * Adding writeObject()/readObject()  methods - We may add these methods to customize serialization process.
 * Removing writeObject()/readObject() methods - We may remove these methods and then default customization process will be used.
 * Changing access modifier of a field - The change to access modifiers i.e. public, default, protected, and private have no effect on the ability of serialization to assign values to the fields.
 * Changing a field from static to non static OR changing transient filed to non transient field. - it’s like addition of fields.

**InCompatible Changes** :  InCompatible changes are those changes which affect deSerialization process if class was updated after being serialized (provided serialVersionUID has been declared)
 * Deletion of fields.
 * Changing a nonstatic field to static or  non transient field to transient field. - it’s equal to deletion of fields.
 * Modifying the writeObject() / readObject() method - we must not modify these method, though adding or removing them completely is compatible change.



### Question 10. What if Serialization is not available, is any any other alternative way to transfer object over network?

**Answer.**
>We can can convert JSON to transfer the object. JSON is helpful in stringifying and de stringifying object.
>Hibernate (ORM tool) helps in persisting object as it in database and later we can read persisted object.
>We can convert object into XML (as done in web services) and transfer object over network.



### Question 11. Why static member variables are not part of java serialization process (Important)?

**Answer.** Serialization is applicable on objects or primitive data types only, but static members are class level variables, therefore, different object’s of same class have same value for static member. 
So, serializing static member will consume unnecessary space and time.
Also, if modification is made in static member by any of the object, it won’t be in sync with other serialized object’s value.

### Question 12. If a class is Serializable but its super class in not, what will be the state of the instance variables inherited from super class after deserialization?

Java serialization process only continues in object hierarchy till the class is Serializable i.e. implements Serializable interface in Java and values of the instance variables inherited from super class will be initialized by calling the constructor of Non-Serializable Super class during deserialization process. 

Once the constructor chaining will start it wouldn't be possible to stop that, hence even if classes higher in hierarchy implements a Serializable interface, their constructor will be executed. As you see from the statement this Serialization interview question looks very tricky and tough but if you are familiar with key concepts it's not that difficult.

### Question 13. What will happen if one the member of class does not implement Serializable interface (Important)?

**Answer.**  If any of the member does not implement Serializable than  NotSerializableException is thrown.

### Question 14. What will happen if we have used List, Set and Map as member of class?

**Answer.** ArrayList, HashSet and HashMap implements Serializable interface, so if we will use them as member of class they will get Serialized and DeSerialized as well.  Now, let’s see a program.

### Question 15. Is constructor of class called during DeSerialization process?

**Answer.** This question which will check your in depth knowledge of Serialization and constructor chaining concepts. It depends on whether our object has implemented Serializable or Externalizable.
If **Serializable** has been implemented - constructor is **not called** during DeSerialization process.
But, if **Externalizable** has been implemented - constructor **is called** during DeSerialization process.

### Question 16 . Are primitive types part of serialization process? 

**Answer.** Yes, primitive types are part of serialization process.



### Question 17. Is constructor of super class called during DeSerialization process of subclass (Important)?

**Answer.**  If superclass has *implemented Serializable* - constructor is **not called** during DeSerialization process.
If superclass has *not implemented Serializable* - constructor **is called** during DeSerialization process.

### Question 18. What values will int and Integer will be initialized to during DeSerialization process if they were not part of Serialization?

**Answer.**  int will be initialized to 0 and Integer will be initialized to null during DeSerialization (if they were not part of Serialization process).

### Question 19. How you can avoid Deserialization process creating another instance of Singleton class (Important)?

**Answer.** We can simply use ``readResove()`` method to return same instance of class, rather than creating a new one.

Defining ``readResolve()`` method ensures that we don't break singleton pattern during DeSerialization process.
```java
  private Object readResolve() throws ObjectStreamException {
       return INSTANCE;
  }
```

Also define readObject() method, rather than creating new instance, assign current object to INSTANCE like done below :
```java
private void readObject(ObjectInputStream ois) throws IOException,ClassNotFoundException{
  ois.defaultReadObject();
  synchronized (SingletonClass.class) {
   
   if (INSTANCE == null) {
     INSTANCE = this;
   }
  
  }
}
```

### Question 20. Can you Serialize Singleton class such that object returned by Deserialization process  is in same state as it was during Serialization time (regardless of any change made to it after Serialization)  (Important)?

**Answer**. **YES**, we can Serialize Singleton class such that object returned by Deserialization process is in same state as it was during Serialization time (regardless of any change made to it after Serialization) 


Defining ``readResolve()`` method ensures that we don't break singleton pattern during DeSerialization process.

```java   
  private Object readResolve() throws ObjectStreamException {
       return INSTANCE;
  }
```

Also define readObject() method, rather than creating new instance, assign current object to INSTANCE like done below :
```java
  private void readObject(ObjectInputStream ois) throws IOException,ClassNotFoundException{
        ois.defaultReadObject();
        synchronized (SingletonClass.class) {
         if (INSTANCE == null) {
               INSTANCE = this;
         }
        }
  }
  ```

### **Question 21**. Purpose of serializing Singleton class OR  purpose of saving singleton state?

**Answer**. Let’s take example of our laptop, daily eod we need to shut it down, but rather than shutting it down hibernate (save state of  laptop) is better option because it enables us to resume at same point where we leaved it, like wise serializing singleton OR saving state of Singleton can be very handy.


### **Question 22**. How can subclass avoid Serialization if its superClass has implemented Serialization interface (Important)?

**Answer.** If superClass has implemented Serializable that means subclass is also Serializable (as subclass always inherits all features from its parent class), for avoiding Serialization in sub-class we can define writeObject() method and throw NotSerializableException() from there as done below.

```java
private void writeObject(ObjectOutputStream os) throws NotSerializableException {
  throw new NotSerializableException("This class cannot be Serialized");
} 
```

## The Externalizable Interface

Externalizable extends from the ``java.io.Serializable`` marker interface. Any class that implements Externalizable interface should override the ``writeExternal()``, ``readExternal()`` methods. That way we can change the JVM's default serialization behavior.

#### Serialization

Let's have a look at this simple example:

```java
public class Country implements Externalizable {
  
    private static final long serialVersionUID = 1L;
  
    private String name;
    private int code;
  
    // getters, setters
  
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeUTF(name);
        out.writeInt(code);
    }
  
    @Override
    public void readExternal(ObjectInput in) 
      throws IOException, ClassNotFoundException {
        this.name = in.readUTF();
        this.code = in.readInt();
    }
}
```

Here, we've defined a class Country that implements the Externalizable interface and implements the two methods mentioned above.

In the ``writeExternal()`` method, we're adding the object's properties to the ObjectOutput stream. This has standard methods like ``writeUTF()`` for String and ``writeInt()`` for the int values.

Next, for deserializing the object, we're reading from the ObjectInput stream using the ``readUTF()``, ``readInt()`` methods to read the properties in the same exact order in which they were written.

It's a good practice to add the serialVersionUID manually. If this is absent, the JVM will automatically add one.

The automatically generated number is compiler dependent. This means it may cause an unlikely InvalidClassException.

Let's test the behavior we implemented above:

```java
@Test
public void whenSerializing_thenUseExternalizable() 
  throws IOException, ClassNotFoundException {
       
    Country c = new Country();
    c.setCode(374);
    c.setName("Armenia");
   
    FileOutputStream fileOutputStream
     = new FileOutputStream(OUTPUT_FILE);
    ObjectOutputStream objectOutputStream
     = new ObjectOutputStream(fileOutputStream);
    c.writeExternal(objectOutputStream);
   
    objectOutputStream.flush();
    objectOutputStream.close();
    fileOutputStream.close();
   
    FileInputStream fileInputStream
     = new FileInputStream(OUTPUT_FILE);
    ObjectInputStream objectInputStream
     = new ObjectInputStream(fileInputStream);
   
    Country c2 = new Country();
    c2.readExternal(objectInputStream);
   
    objectInputStream.close();
    fileInputStream.close();
   
    assertTrue(c2.getCode() == c.getCode());
    assertTrue(c2.getName().equals(c.getName()));
}
```

In this example, we're first creating a Country object and writing it to a file. Then, we're deserializing the object from the file and verifying the values are correct.

```java
The output of the printed c2 object:

Country{name='Armenia', code=374}
```

This shows we've successfully deserialized the object.

#### Inheritance

When a class inherits from the Serializable interface, the JVM automatically collects all the fields from sub-classes as well and makes them serializable.

Keep in mind that we can apply this to Externalizable as well. We just need to implement the read/write methods for every sub-class of the inheritance hierarchy.

Let's look at the Region class below which extends our Country class from the previous section:

```java
public class Region extends Country implements Externalizable {
 
    private static final long serialVersionUID = 1L;
 
    private String climate;
    private Double population;
 
    // getters, setters
 
    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        super.writeExternal(out);
        out.writeUTF(climate);
    }
 
    @Override
    public void readExternal(ObjectInput in) 
      throws IOException, ClassNotFoundException {
 
        super.readExternal(in);
        this.climate = in.readUTF();
    }
}
```

Here, we added two additional properties and serialized the first one.

Note that we also called super.writeExternal(out), super.readExternal(in) within serializer methods to save/restore the parent class fields as well.

Let's run the unit test with the following data:
```java
Region r = new Region();
r.setCode(374);
r.setName("Armenia");
r.setClimate("Mediterranean");
r.setPopulation(120.000);
```

Here's the deserialized object:

```java
Region{
  country='Country{
    name='Armenia',
    code=374}'
  climate='Mediterranean', 
  population=null
}
```

Notice that since we didn't serialize the population field in Region class, the value of that property is null.

### Externalizable vs Serializable

Let's go through the key differences between the two interfaces:

* **Serialization Responsibility**
The key difference here is how we handle the serialization process. When a class implements the java.io.Serializable interface, the JVM takes full responsibility for serializing the class instance. In case of Externalizable, it's the programmer who should take care of the whole serialization and also deserialization process.

* **Use Case**
If we need to serialize the entire object, the Serializable interface is a better fit. On the other hand, for custom serialization, we can control the process using Externalizable.

* **Performance**
The java.io.Serializable interface uses reflection and metadata which causes relatively slow performance. By comparison, the Externalizable interface gives you full control over the serialization process.

* **Reading Order**
While using Externalizable, it's mandatory to read all the field states in the exact order as they were written. Otherwise, we'll get an exception.

For example, if we change the reading order of the code and name properties in the Country class, a java.io.EOFException will be thrown.

Meanwhile, the Serializable interface doesn't have that requirement.

#### Custom Serialization

We can achieve custom serialization with the Serializable interface by marking the field with transient keyword. The JVM won't serialize the particular field but it'll add up the field to file storage with the default value. That's why it's a good practice to use Externalizable in case of custom serialization.

