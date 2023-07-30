# POJO Class

Stands for Plain Old Java Object
* Contains variables and its getter and setter methods
* Class should be public
* Public default constructor
* No annotations like @Table, @Entity, @Id etc
* It should not extend any class or implement any interface.

Example :
```java
public class Employee
{
    // default field
    String name;
  
    // public field
    public String id;
  
    // private salary
    private double salary;
  
    //arg-constructor to initialize fields
    public Employee(String name, String id, 
                             double salary)
    {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
  
    // getter method for name
    public String getName()
    {
        return name;
    }
  
    // getter method for id
    public String getId()
    {
        return id;
    }
  
    // getter method for salary
    public Double getSalary()
    {
        return salary;
    }
}
```

* POJO is an object which encapsulates Business Logic. 
* The following image shows a working example of the POJO class. Controllers interact with your business logic which in turn interact with POJO to access the database. 
* In this example, a database entity is represented by POJO. This POJO has the same members as the database entity.POJO is an object which encapsulates Business Logic. The following image shows a working example of the POJO class. Controllers interact with your business logic which in turn interact with POJO to access the database. In this example, a database entity is represented by POJO. This POJO has the same members as the database entity.
![Hotspot JVM](Images/pojo.jpg)

# Java Beans

Beans are special type of Pojos. There are some restrictions on POJO to be a bean.

* All JavaBeans are POJOs but not all POJOs are JavaBeans.
* Serializable i.e. they should implement Serializable interface. Still, some POJOs who don’t implement a Serializable interface are called POJOs because Serializable is a marker interface and therefore not of many burdens.
* Fields should be private. This is to provide complete control on fields.
* Fields should have getters or setters or both.
* A no-arg constructor should be there in a bean.
* Fields are accessed only by constructor or getter setters.

## POJO vs Java Bean

| POJO | Java Bean |
| --- | --- |
| It doesn’t have special restrictions other than those forced by Java language. | It is a special POJO which have some restrictions.
| It doesn’t provide much control on members. | It provides complete control on members. |
| It can implement Serializable interface. | It should implement serializable interface. |
| Fields can be accessed by their names. | Fields are accessed only by getters and setters. |
| Fields can have any visibility. | Fields have only private visibility. |
| There may/may-not be a no-arg constructor. | It must have a no-arg constructor. |
| It is used when you don’t want to give restriction on your members and give user complete access of your entity. | It is used when you want to provide user your entity but only some part of your entity. |

# Enum

Enum is a special type in java that is used to define collection of constants.

Enum of colours:
```java
enum Color{
     Red,Green,Blue,White,Black;
}
```

This is how we declare enum.
* Semicolon is not mandatory if we are having only constants in enum.
* By using enum, we can create our own data type.
    * 👉🏻 Data type of Red is 'Color'.

## Where can we declare 'enum' type?

Enum can be declared outside the class, and also inside the class.
> Note: Inside method we cannot create enum.

## How to access Enum constants?
Every 'enum' constant is static, so We access 'enum' constants using the Enum name.
  ``System.out.println(Color.Red);``

### Whats difference between the enum, Enum, and Enumeration?

1. enum: It is a keyword to declare group of constants.
2. Enum: It is base Class for all enums.
    * 👉🏻 Every 'enum' is direct child Class of Enum class.
3. Enumeration: It is an Interface present in java.util Package.
    * It is a cursor that is used to get objects one by one from collection.

L1-05:33 Can an 'enum' be declared as final?
    No. enum is implicitly final. They can not be declared final explicitly.

L1-05:47 What modifiers are allowed to be used with enum?
    'enum' can be public, <default>, strictfp.
    If it is declared inside the class, then it can also be private, protected and static.

    👉🏻 'enum' can not be abstract as they are implicitly final.

L1-06:08 Can an 'enum' extend any class?
    No. Every 'enum' is direct subClass of java.lang.Enum class.
    -> Since java does not provide support for multiple inheritance hence,
    👉🏻 It is not possible to extend Class with enum.

L1-06:26 Can 'enum' have implementation classes?
    No. enum cannot have subclasses because they are final implicitly.

06:44 Can 'enum' implement interfaces?
    Yes. enum is a type just like Class and interfaces.
    👉🏻 'enum' can implement interfaces.

L1-07:03 Can we have Constructor & Methods in enum?
    Answer is yes! We can have Constructors as well as methods and variables inside the enum.

    Consider an enum Week, it can have constructor, other data members and methods:

    enum Size {

        // enum constants calling the enum constructors 
        SMALL("The size is small."),
        MEDIUM("The size is medium."),
        LARGE("The size is large."),
        EXTRALARGE("The size is extra large.");

        private final String pizzaSize;

        // private enum constructor
        private Size(String pizzaSize) {
            this.pizzaSize = pizzaSize;
        }

        public String getSize() {
            return pizzaSize;
        }
    }
    class Main {
        public static void main(String[] args) {
            Size size = Size.SMALL;
            System.out.println(size.getSize()); // Calling Methods
    }

    These enum constructors are either

    private - accessible within the class(even if access modifier is not mentioned) or,
    package-private - accessible within the package
    
L2-00:32 Can we create parameterised constructors in enum? If yes then how to pass value to constructor?
    Yes, we can create parameterised constructors in enum.
        Sun("Holiday")    

L1-07:38 How constructors are invoked in enum?
    Answer is, every time we load the enum, the constructor is invoked.

    Every 'enum' constant is considered as 'enum' object.
    Whenever 'enum' gets loaded, for every 'enum' Constant, constructor will be invoked.

L2-00:00 Can we create 'enum' object explicitly?
    No. We can not create 'enum' object with new keyword.
    Because if we want to create any new object w of type Week enum, then we can declare w as enum constant! So there is no need of creating enum object explicitly ..
    -> Week w:
                enum Week{
                  Sun,Mon,Tue,Wed,Thu,Fri,Sat,w;
                }

                Week w = new Week(); ❌

L2-04:18 Can 'enum' have abstract methods?
    No. Because Enum are final.

L2-04:37 Can we override toString() method for enum?
    Yes. We can override toString in Enum like any other class.
    -> But there is no need to overriding it, because Enum Class has already overridden the toString
    for every enum.

    Week w2 = Week.Wed;
    w2.toString();

    👉🏻 There is no need to call toString explicitly, because if we print any 'enum' constant,
       then by default it takes .toString() internally.

L2-05:43 Can we create 'enum' constant outside of enum?
    Answer is no, we can only create 'enum' constant inside its enum.

L2-06:08 Can constructors be public in enums?
    No constructors can not be public or protected either.

L2-06:18 What does ordinal() method do?
    Ordinal method returns order of the 'enum' constant.

L2-07:09 Can we use Enum with TreeSet or TreeMap in Java?
    Yes. We know we can use comparable types with treeSet or treeMap.
    👉🏻 Since Enum by default impalements Comparable interface, they can be used inside TreeSet or TreeMap.

L2-07:33 Can we use Enum in switch case in Java?
    Yes. Enum instances are constants so we can use them inside switch case.

      switch(Week){
                  case Sun:
                      System.out.println("Peaceful day");
                      break;
                  case Mon:
                      System.out.println("Back to work.");
                      break;
                  case Sat :
                      System.out.println("Party Time!");
                      break;
      	          default:
      		            System.out.println("Work Work Work.");
                  }

## Is Enum serializable in java?

Yes, Java enums are automatically serializable as Enum Class implements Serializable interface.

## How to convert a String to Enum in Java?

The String can be converted to 'enum' by using valueOf() method.
The 'enum' type provides valueOf() method which takes a String as an argument and returns
corresponding 'enum' object.

L2-10:03 What are benefits of using 'enum' in java?
    👉🏻 'enum' are type safe, We cannot assign anything else other than those predefined constants of enum.

    👉🏻 'enum' has its own namespace.

    👉🏻 We can use 'enum' with switch case..

## Methods in Enum

1. values()    -> Returns array of each enum
2. ordinals()  -> Returns values assigned to each enum( by defaults its index number of num)
3. valueOf()
4. name()
Our enum class inherites all these methods from java.lang.Enum; 

Example:
```java
public enum Week{
    SUN,
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT
}

public class Main{
    public static void main(String args[]){
        for(Week week : Week.values()){
            System.out.println(week.ordinals());
        }
        // OP : 0 1 2 3 4 5 6
    }
} 
```

### Override in Enum

```java
public enum myEnum{
    RED{
        @Override
        public void print(){
            System.out.println("I am Red");
        }
    },
    BLUE,
    BLACK;

    public void print(){
        System.out.println("I am color");
    }
}

public class Main{
    public static void main(String args[]){
        myEnum col1 = myEnum.BLUE;
        col1.print();
        myEnum col2 = myEnum.RED;
        col2.print();
        myEnum col3 = myEnum.BLACK;
        col3.print();
    }
}
OUTPUT:
I am color
I am Red
I am Color
```

### astract method in Enum

```java
public enum myEnum{
    RED{
        @Override
        public void print(){
            System.out.println("Red");
        }
    },
    BLUE{
        @Override
        public void print(){
            System.out.println("Blue");
        }
    },
    BLACK{
        @Override
        public void print(){
            System.out.println("Black");
        }
    };
    
    abstract public void print();
}
```

> NOTE: 
>> Every constant in Enum class has to override the abstract method
