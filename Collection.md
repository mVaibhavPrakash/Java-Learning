## What is Java Collection Framework?

A java collection framework is a collection of interfaces and classes which are used to store and
process data efficiently, as a Collection is something which is used to store Data objects.

This framework was introduced in Java version 1.2.
-> Reduced the development effort.
-> Code quality is enhanced.

## What are the basic interfaces of collection framework?

1. Collection
2. List
3. Set
4. Queue
5. Map

## Why Map Interface does not extend Collection interface?

The Map is way different than collection. In Map there are no elements, it has key-value pairs.
👉🏻 It does not fit into the Group of elements Paradigm.

However there are many methods to retrieve keys and values as collection.

## What is the difference between Collection and Collections?

* Collection is the interface where you group objects into a single unit. 
* Collections is a utility class that has some set of operations you perform on Collection.
* Collection does not have all static methods in it, but Collections consist of methods that are all static.

| Collection | Collections |
| --- | --- |
| It is an interface. | It is a utility class. |
| It is utilized to represent a group of individual objects in the form of a single unit.  | It specifies several utility methods that are used to work on the collection. |
| The Collection is an interface that includes a static method since the launch of Java8. The Interface can contain default and abstract methods. | It contains static methods only. |
| It extends the iterable interface. | It extends the Object class |

## Iterable interface Vs Iterator

* ``Iterable interface`` belongs to the java.lang package. It represents a data structure that can be iterated over.
* The Iterable interface provides a method that produces an Iterator. 

| Iterable	| Iterator |
| --- | --- |
| Represents a collection that can be iterated over using a for-each loop | Represents an interface that can be used to iterate over a collection |
| When implementing an Iterable, we need to override the iterator() method	| When implementing an Iterator, we need to override the hasNext() and next() methods |
| Doesn't store the iteration state |	Stores the iteration state |
| Removing elements during the iteration isn't allowed	| Removing elements during the iteration is allowed |

## Why Collection Interface does not extend Serializable and Cloneable interfaces?

'There is no need to do it!'
Collection is not supposed to do what Cloneable and Serializable interfaces do.

### What they do?

They are just the marker interfaces which are actually empty interfaces.
👉🏻 If Collection Interface implements these interfaces then it will mandate cloning and serialization in all implementation, which is less flexible and more restrictive.

## When we had Array, Why do we need collection?

We know Array is a group of primitives.. which holds homogeneous data.
It has also some limitations like, arrays are always fixed in size.
So to overcome these problems, collection were introduced.
Collection, which can also be called a container, is a group of individual objects.

#### How can it solve the problems that we had in array?

Collections are grow-able in Nature,
that means we aren't bound to declare size of any collection at declaration as we are with arrays.
Size of collections can be increased or decreased on the base of our programming requirement.
You can add or remove any number of elements in collection.

Hence collections solve the first limitation.
And next, we only can have homogeneous type of data elements in array,
But Collections can have any kind of data element. They can be homogeneous or heterogeneous.

## When we should use arrays and when collection?

* Array are recommended to use if we know the size in advance..
because Performance-wise Arrays are better to use than Collections.

* From Memory point of view, we should not use 'Arrays'..
    * Suppose we take an array of 100 size. And if we only have 10 elements in it, so, here the rest of the memory blocks get wasted. Thats why arrays are not recommended to use in memory point of view.
    * On the other hand, Collections are grow-able or resizable in nature, and it uses memory as per required only.

## What is the difference between Array and ArrayList?

The very first difference between Array and ArrayList is,

1. Array can contain primitive or Objects whereas ArrayList can only contain Objects.
2. Arrays are fixed in size whereas ArrayList size is dynamic.
3. ArrayList accepts duplicate objects unlike arrays..
4. Array does not provide a lot of features like ArrayList, such as add(), addAll(), removeAll() etc..

So ArrayList is the obvious choice when we work on list.. But if the size of list is fixed and if we are using the list of primitives then we should use Arrays.. Although collection use auto boxing to reduce the coding effort but still it makes them slow.. so would use array with primitives.
And if are working on multidimensional situation, then also using array [][] is way more easy than List<List<>>..

## How LinkedList is different from ArrayList?

* ArrayList and LinkedList both implement the List interface but there are some differences between them..
* ArrayList is an indexed based data structure.. The underlying data structure for ArrayList is a resizable or growable Array.
* ArrayList is good choice if retrieval is frequent while LinedlIst is better is deletion is frequent
* Next thing is, Insertion and removal of any element is faster in LinkedList compared to ArrayList. Because one insertion or deletion in middle requires n number of shifts.. So there is no concept of resizing array when element is added in middle..
* and in linkedList it requires only one change in the address pointer of the particular node to add or remove any element.
* LinkedList consumes more memory than ArrayList because every node in LinkedList stores reference of previous and next elements..'

## What are the different ways to iterate over a list?

To access or to get elements from collection there are many ways present in java.
1. Loops (classic for loop)
2. Cursors
    * In java these are the cursors available for collections:
        1. Iterator
        2. ListIterator
        3. Enumeration

## What is the difference between Iterator and ListIterator and Enumeration?

| Property | Enumeration | Iterator	| ListIterator |
| --- | --- | --- | --- |
| Where we can apply? | It can be applied only to the legacy classes. | It can be applied to any collection interface. | It can be applied to the only list interface. |
| Is it a legacy? | Yes (introduced in 1.0 V).	| No (introduced in 1.2 V).	| No (introduced in 1.2 V).|
| Allowed Movement | 	Single direction, i.e we can traverse elements present in the collection only in the forward direction.	| Single direction, i.e we can traverse elements present in the collection only in the forward direction. | Bidirectional, i.e we can traverse elements present in the collection both in forward and backward directions. |
| Allowed  Operation | We can only perform the read operation. | We can perform read and remove operation. | We can perform read, remove, add, and replace operations. |
| How can we get it? | By calling elements() method present in the vector class. | By calling iterator() method present in any collection interface. | By calling listIterator() method present in the list interface. |

## What are the legacy implementations?

Vector is a legacy class.

* Legacy class: The classes that were already there before introducing collection framework.
* Sub Class of Vector -> Stack, is also a legacy class.

Vector is implemented on a growable or a resizable array.
* It is an ordered collection
* allows duplicates.
``Vector v = new Vector();``

## What are the similarities and difference between ArrayList and Vector?

## Which collection classes provide random access of its elements?

These are the collection classes which provide random access: ``ArrayList``, ``Vector``, ``Stack``, ``HashMap``, ``TreeMap``, ``Hash-table``.

## How to make a collection read only?

We can create a read only collection by using unmodifiableCollection method of Collections class.
``Collections.unmodifiableCollection(Collection c)``

> if any operation occurs it will throw UnsupportedOperationException.

## How can we make a collection thread-safe?

There is a method in Collections class ->
``synchronizedCollection(Collection c)`` : used to get a synchronized or thread-safe collection.

## How can we make HashMap thread-safe?

You can make HashMap thread safe by wrapping it with ``Collections.synchronizedMap()``.

## Whats difference between TreeSet and LinkedHashSet and HashSet?

* These are the implementations of Set.
* Starting with TreeSet, the main feature of TreeSet is Sorting.
* Its the implementation class of sortedSet.
* So in TreeSet the insertion of elements is done on some sorting order. like we want to store all the Employee's object according to their EmployeeIds then we should go for SortedSet or TreeSet.
* Also in treeSet, we cannot put heterogeneous elements in it.
* Its about sorting as we cannot sort different type of objects so it is restricted to insert diff data types in treeSet. ``SortedSet<Integer> t = new TreeSet<>();``.It will creates an TreeSet object in which elements to be inserted in Default natural sorting order.
> If we are depending on the default natural sorting order, then our elemtns/object should be...
homogeneous and comparable, otherwise we will get classCastException.

* LinkedHashSet.. it was introduced in 1.4 version. 
* It is the sub class of Hashset (no insertion order) where insertion order is preserved. And that's the main difference between HashSet and LinkedHashSet.

* So all of the three, TreeSet, LinkedHashSet and HashSet doesn't allow to store duplicates. And none of these are thread-safe..
* But HashSet is the Fastest among them. LinkedHashSet comes second or can be similar to HashSet but TreeSet is slower because it performs sorting for each insertion.
* Next difference between these, is ordering.
    * HashSet doesn't maintain any order while LinkedHashSet maintains insertion order and treeSet maintains sorting order of elements.
* And talking about internal implementations,
    * HashSet is backed by HashMap..
    * whereas LinkedHashSet is implemented using HashSet and LinkedList.
    * And TreeSet, it is backed up by navigableMap and it internally uses TreeMap.
* Next difference is about way of comparing things,
    * like HashSet and LinkedHashSet uses equals() for comparison
    * and TreeSet uses compareTo() method for maintaining ordering.

## Properties class

The Java Properties class, ``java.util.Properties``, is like a Java Map of Java String key and value pairs. The Java Properties class can write the key, value pairs to a properties file on disk, and read the properties back in again. This is an often used mechanism for storing simple configuration properties for Java applications.

#### Create a Properties Instance

``Properties properties = new Properties();``

#### Set Properties

To set properties in a Java Properties instance you use the ``setProperty()`` method.

``properties.setProperty("email", "john@doe.com");``

This example sets the property with the key email to the value john@doe.com.

#### Get Properties

To get properties from a Java Properties object you use the ``getProperty()`` method, passing the key of the property to get as parameter. 

``String email = properties.getProperty("email");``

#### Remove Properties

You can remove a property from a Java Properties instance using its ``remove()`` method, passing as parameter to remove() the key for the property to remove. 

``properties.remove("email");``

#### Iterate Properties
You can iterate the keys of a Java Properties instance by obtaining the key set for the Properties instance, and iterating this key set.

```java
Properties properties = new Properties();

properties.setProperty("key1", "value1");
properties.setProperty("key2", "value2");
properties.setProperty("key3", "value3");

Iterator keyIterator = properties.keySet().iterator();

while(keyIterator.hasNext()){
    String key   = (String) keyIterator.next();
    String value = properties.getProperty(key);
    System.out.println(key + " = " + value );
}
This example will print out the following lines:

key1 = value1
key2 = value2
key3 = value3
```

#### Store Properties to File

You can store the property key, value pairs to a properties file which can be read again later on. You store the contents of a Properties object via its ``store()`` method.

```java
Properties properties = new Properties();

properties.setProperty("property1", "value1");
properties.setProperty("property2", "value2");
properties.setProperty("property3", "value3");

try(FileWriter output = new FileWriter("data/props.properties")){
    properties.store(output, "These are properties");
} catch (IOException e) {
    e.printStackTrace();
}
```

## Can we add a null element to TreeSet and HashSet?

We can add a null element in HashSet but not in treeSet.
👉🏻 TreeSet uses compareTo() method to compare objects with each other, if any element will be null by any chance, it will throw NullPointerException.

> Note : Any collection implementing sorting can't accept null values.

## What is difference between poll() and remove() methods of Queue?

Both of these methods are used to remove element and returns the head of the queue. 
The difference is,
-> if the queue is empty and we call the remove() method, then it will throw exception,
but if we call poll() method, it will return null.

## What is the difference between remove() method of Collection and remove() method of Iterator?

``Collection.remove()`` is used for removing object from collection, while not iterating.
-> When we use this remove() method to remove element at the time of iteration then it may throw
ConcurrentModificationException.

-> Iterator.remove() is advised to use for remove element while iterating.

## Can we use a Custom object as a key in HashMap? If yes then How?

Yes! we may create custom object key for HashMap.
-> for that we need to override the equals() and hashcode() method to the Class which we want to use as key.

## Why it is suggetsed to have immutable objects as keys in hashMap?why string is popular hasmap key in java?

if we want to use custom object as key, we need to ensure that the hashcode() of the key of hashMap does not change. If it happens then it is impossible to get object value from that key.

## What is the contract of equals() and hashCode() method?

👉🏻 If two objects are equal, then they must have the same hashcode.
👉🏻 if two objects have the same hash code, then they may or may not be equal.
> //Equal objects must produce same hashcode
   //a.equals(b) -> true    then  a.hashCode() = b.hashCode()
//unequal objects need not produce same hashcode
//a.equals(b) -> false    then  a.hashCode() = b.hashCode() -> true
//a.equals(b) -> false    then  a.hashCode() = b.hashCode() -> false

## What is the NavigableMap?

The ``NavigableMap interface`` is a member of the ``Java Collection Framework``. It belongs to ``java.util`` package and It is an extension of ``SortedMap`` which provides convenient navigation methods like ``lowerKey``, ``floorKey``, ``ceilingKey`` and ``higherKey``, and along with this popular navigation method. It also provide ways to create a Sub Map from existing Map in Java e.g. headMap whose keys are less than the specified key, tailMap whose keys are greater than the specified key, and a subMap which strictly contains keys which fall between toKey and fromKey. 
**An example class that implements NavigableMap is TreeMap.**

## What is the NavigableSet?

NavigableSet represents a navigable set in Java Collection Framework. The NavigableSet interface inherits from the ``SortedSet`` interface. It behaves like a SortedSet with the exception that we have navigation methods available in addition to the sorting mechanisms of the SortedSet. 
For example, the NavigableSet interface can navigate the set in reverse order compared to the order defined in SortedSet. A NavigableSet may be accessed and traversed in either ascending or descending order. 
**The classes that implement this interface are, TreeSet and ConcurrentSkipListSet**

## TreeSet

TreeSet is one of the most important implementations of the SortedSet interface in Java that uses a Tree for storage. The ordering of the elements is maintained by a set using their natural ordering whether or not an explicit comparator is provided. This must be consistent with equals if it is to correctly implement the Set interface. 

It can also be ordered by a Comparator provided at set creation time, depending on which constructor is used. The TreeSet implements a NavigableSet interface by inheriting AbstractSet class.

## What are IdentityHashMap, EnumMap and WeakHashMap? How they are different?

| PROPERTIES | IdentityHashMap | WeakHashMap | EnumMap |
| References | IdentityHashMap stores strong key reference.  | WeakHashMap stores the weak key reference. | EnumMap stores the strong key reference.|
| Search and get the values | It uses equality operator (==) to search and get the values. | It uses equals() method for that purpose. | It also uses equals() method for that purpose. |
| Keys	| It allows to store any type of keys. | It also allows to store any type of keys. | It allows to store only enum type keys. |
| Underlined data structure	| It uses the array as an underlined data structure.	| It uses the HashTable as an underlined data structure. | It uses the array as an underlined data structure. |
| Iterator	| Iterator used in IdentityHashMap is Fail-fast. | Iterator used in WeakHashMap is Fail-fast. | Iterator used in EnumMap is weakly consistent. |
| Null Values | It allows to store null values.	| It allows to store null values. | It doesn’t allow to store null values |

## When to use HashMap and when to use TreeMap?

* HashMap is the best implementation of Map for inserting, deleting, and locating elements.
* TreeMap is the better alternative if we need to traverse the keys in a sorted order.

> HashMap is faster than TreeMap; for sorted key traversal, it is faster way to add elements to a HashMap, and then convert the map to a TreeMap.

//Concurrent Collections
//java.util.concurrent v5

What is iterator's fail-fast property?

While iterating over any collection, we cannot perform any modification on elements.
Whenever we access the next element in collection, Iterator's fail fast property checks for any
modification in the structure of that collection.'

-> If any modifications found, it throws RuntimeException.
👉🏻 Almost all the implementations of the iterator, are fail-fast by design.
**Except the concurrent collection classes.**

**Here we have some java Concurrent collection classes:**
1. Immutable List in Java
2. CopyOnWriteArrayList in java
3. Immutable Set in Java
4. CopyOnWriteArraySet in java
5. ConcurrentHashMap in java

## What are Concurrent Collection classes? When does ConcurrentModificationException occur?

The Concurrent Package [java.util.concurrent] which introduced in java 1.5,
contains thread-safe collection classes called Concurrent Collection class:
-> that allows collections to be modified while iterating.

By design, iterator implementation are fail fast and throw the ConcurrentModificationException
whenever we modify element while iterating.-> Iterator implementations in Concurrent Package allows us to do the modifications at runtime too.

## What is the difference between fail-fast and fail safe?

Points about the Fail Safe iterators:

* We can perform the modification operations on a collection while iterating over it.
* They will not throw ConcurrentModificationException during the iteration.
* The Fail Safe iterators use a copy of the collection to traverse over the elements.
* Unlike the Fail Fast, they require more memory as they cloned the collection.
* The examples of Fail Safe iterators are ConcurrentHashMap, CopyOnWriteArrayList, etc.
* Difference Between Fail Fast and Fail Safe Iterators
* The Major difference between Fail Fast and Fail Safe iterator is that the Fail Safe does not throw any ConcurrentModificationException in modifying the object during the iteration process, contrary to fail fast, which throws an exception in such scenarios. This is because the Fail Safe iterator works on a cloned collection instead of the original collection.

There are several other comparisons between them on the basis of different parameters. Let's discuss them:

| Base of Comparison | Fail Fast Iterator | Fail Safe Iterator |
| --- | --- | --- |
| Exception	| It throws a ConcurrentModificationException in modifying the object during the iteration process. |	It does not throw Exception. |
| Clone Object |	No clone object is created during the iteration process. | A copy or clone object is created during the iteration process. |
| Memory utilization | It requires low memory during the process. | It requires more memory during the process. |
| Modification	| It does not allow modification during iteration. | It allows modification during the iteration process. |
| Performance |	It is fast.	| It is slightly slower than Fail Fast. |
| Examples | HashMap, ArrayList, Vector, HashSet, etc	| CopyOnWriteArrayList, ConcurrentHashMap, etc.|

## What is the difference between Synchronized Collection and concurrent collection?

* Synchronized collections classes, like Hashtable and Vector provides thread-safe implementation of Map and List.
* There are several factors which make them less suitable for use in highly concurrent applications.
* Performance: The synchronized collections are unsuitable because of their 'wide-locking mechanism'.
* They acquire lock on complete object whereas concurrent classes locks only a part.

## Hashtable Vs HashMap vs ConcurrentHashMap

[Hashtable Vs HashMap vs ConcurrentHashMap](https://medium.com/art-of-coding/hash-table-vs-concurrent-hashmap-and-its-internal-working-b28fc2725bdb)

## Can we replace HashTable with ConcurrentHashMap?

Yes, we can replace the HashTable with ConcurrentHashMap.
-> As the performance of ConcurrentHashMap is better than HashTable

We need to be careful with code which relies on locking behavior of Hashtable.
Since Hashtable locks whole Map instead of a portion of Map, compound operations like
if(Hashtable.get(key) == null) put(key, value) works in Hashtable but not in concurrentHashMap.

