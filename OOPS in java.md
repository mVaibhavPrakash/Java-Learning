
//Object Oriented Programming [OOP]

//Classes and Objects - Building Blocks of OOP

L1-00:45 What are classes and objects?
	
	A Class is a user-defined-blueprint from which objects are created, which has attributes and behavior.

How can we create class?

We can define a Class in java, using keyword "class"
	
```java
class <ClassName>
{
	//Variables
	//Methods...
}
```

For example
	
```java
class Fan{
	private boolean isOn

	public void turnOn(){
	isOn = true;
	

	public void turnOff(){
	isOn = false;
	}
```

Class members: isOn [Data member], turnOn() turnOff() [Member functions]

L1-09:07 How to create objects?
	
	We create objects with the keyword 'new'.

	<classname> ref = new <classname>();

L1-13:41 How many classes we can create in a java file?
	We can create any number of classes in a java file.
	👉🏻 We can have only one Public Class in a java file.


//modifiers

L2-00:22 There are two types of modifiers present in java
    
	1. Access modifiers
    2. Non-Access Modifiers.

L2-00:29 What are the Access modifiers in java?
    
	Access Modifiers are the keywords in object oriented language, which set the accessibility of classes
    or methods or any members
    -> Using public modifier we specify that the Class can be accessed everywhere.

L2-01:13 How many access modifiers are there in java?
    
	1. public
    2. private
    3. protected
    4. <default>

	public:
		public members can be accessed anywhere, in any class, present in any Package	
	default:
		When there is no modifier used, then the component has default accessibilities.
		-> Classes with no modifier said to be default classes. The scope for the default classes
		and default Class members is within their Package	
	private:
		Private members cannot be accessed anywhere except in the Class itself where they are declared	
	protected:
		Protected members can be accessed within the same Package and in its subclass,
		but it cannot be accessed in the other packages excepts its child classes	
		So their scope is limited to its Package and its subclasses	

L3-00:02 What is a Package?
    
	A Package is a mechanism to keep all classes, interfaces and sub-packages;
    which has similar functionalities, at the same place
    Packages provides a folder structure to organize our classes-interfaces, so that one can easily
    search and use them.

L3-01:12 How can we access a Class outside its Package?
    
	To use a Class outside its Package we must Import it, using the 'import' keyword.
    For example
    import com.basicsstrong.oops.<theclassname>;

L3-01:55 Can we declare a Top level Class private?

	Answer is no, A Class can be public or defaul
	Inner class: Class defined in a clas
	Inner classes can be declared as private or protected as they are the members of the class.
	-> Top level Class can not be private or protected.

L3-03:10 Which access modifier is the least restrictive and which is the most restrictive?
	
	Least Restrictive Modifier: Public access modifier
	-> It is also known as Universal Access Modifier.

Most Restrictive access modifier : private.

L4-00:04 What are non-access modifiers in java?
    
	1. Static :
    	If a member is defined static, then it is said to be Class member
    	static keyword is used to specify whether the member is a Class member or an instance member.
    2. Final :
    	final specifier is used to restrict further modifications on any class, any method or any
    	variable.
    	-> if any primitive variable is final, we cannot change its value in whole program
    3. Abstract :
    	abstract specifier is used to mark the method or Class to be incomplete and to must be
    	modified further by other classes
    4. Synchronized :
    	This is used to achieve thread safety in multithreaded environment which is about executing
    	tasks simultaneously with different threads.

L4-06:35 Can a Class or a method be abstract and final at the same time?
    
	A Class or a method cannot be abstract or final at the same time.
    -> Final restricts the component to be modified further.
    -> abstract make component available to be modified further.

L4-06:56 What do you mean by abstract classes?
    
	A Class with abstract specifier is a abstract class
    If a Class is abstract it is not fully implemented and if a method is abstract, it does not have
    any implementation
    👉🏻 abstract methods can only be defined in abstract class.

L4-07:32 what is abstract method?
    
	A method without any implementation or definition is an Abstract method.
    Abstract method are declared with the keyword abstract.

L4-09:33 Can we define an abstract method in a non-abstract class?
    
	We can not declare any abstract method in a non-abstract class.

L4-09:50 Can an abstract method be declared as private?
    
	No, abstract method cannot be declared as private, as they are meant to be used in other classes,
    so they must be public, or default or protected.

L4-10:48 Can we instantiate abstract classes?
    
	Answer is No, since abstract classes are not fully implemented that is why we cannot create objects
    of them.

L4-11:29 Can we define top level Class as static?
    
	Answer is No. static keyword is applicable only for Class members.

L4-12:09 Why do we define members as static?
    
	Static keyword is used to define the members independent from any instance.
    Static members exist independently of any instances created for the class
    -> Defining a method static will make it independent of any instance.
    We can call static members without creating objects, by just invoking them with the classname.

//variables, Methods, Constructors

L6-00:11 What is a variable? What are the types of variable in java?
    		
	Variable is a name which is given to a memory shell. It is a container that used to store data values.
	Variable can store primitives or object	
	Class can have these variable	
	Instance Variable [defined inside class, outside the method]
	Local Variable 		[defined inside a method or block or constructor]
	Class Variables		[defined in Class and outside any method but with static keywor	
	//What is the difference between Instance variables , Local variables and Static variable	

L6-04:33 When are static variables loaded in memory?
    
	Static variables are loaded in memory at the time of Class loading. i.e,
    When we load the class, the static members are the first to load.

L6-04:53 Are there any global variables in java?
    		
	Global variables are generally those variable which can be accessed by other part of program or
    outside the class
    Java does not allow to have global variables. As it does not fit good with the oops.

L6-05:32 Can we declare final variable without initialization?
    		
	Yes, we can declare final variable without initialisation.
    -> Such variables are called as Blank Final Variable.
    	 Blank final variable can be static or non-static.
    This is how we declare blank final variables
    		private static final int blank_final
    We have to initialize  blank final varables before any usage
    static blank final variables can be initialised in static block.

L6-08:45 Can we make the local variable final?
    
	Yes, we can define a local variable as final.
    👉🏻 It is the only modifier which is acceptable to a local variable.

L6-09:08 What is Constructor?

    Constructor is a special kind of method which is used to initialise objects.
    The name of constructor is same as of its class
    	
		class Fan{
    		Fan(){
    		    //this is constructor.
    		}
    	}

L6-09:38 What are the various types of constructors?

    There are three types of constructors..
    1. default Constructor: if we do not write constructor in program, then this constructor is called automatically.
    2. Non-Parameterised Constructor : the constructor with no-arguments
    3. Parameterised Constructor : the constructor with arguments is called as parameterised

L6:10:56 When constructors are called?
    
	Constructor are called at the time we create objects using 'new' keyword
    👉🏻 If we have not written any constructor in program then it takes default constructor automatically
    and initialise the data members with their default values.

L6-16:06 Can a constructor be final or static or abstract?
    
	No, Constructor cannot have any Non-access modifiers
    -> The constructor can not be final because once we create anything final, then that method cannot
    be modified by other class, and as the Constructor already can not be overridden or modified by any
    class, there is no need of final keyword
    -> abstract method does not have body. They have only declaration.
    But constructor cannot lack a body, thats why constructor can not be abstract
    -> static members always belong to class, not to any objects. Therefore constructor cannot be static
    as, they are invoked every time we create objects.

L6-16:57 Can we have return type or any return statement with constructor?
    
	No, we cannot have these.

L6-17:06 What is the use of private constructor in Java?
    
	private members can only be accessed inside the class, where they are defined. So if we define
    constructors private, then we can create objects of the Class only in inside that Class internally.
    No other classes can create object for that
    -> So using private constructor we can restrict the caller from creating objects.

L6-19:19 Can a Constructor return any value ?
    
	As we know constructors do not have any return type, So a constructor cannot return any explicit value.
    However constructor returns the instance of the Class implicitly

L6-19:47 Can an Abstract Class have a constructor?
    
	Yes, an abstract Class can have a constructor.

L6-20:01 How we define a method in java?
    
	Method is block of code which can be invoked by its name whenever required. In java we write method as    
	
	<modifier> <return type> <method name>(datatype args){
    	//method body
    }

L6-20:30 What is Method signature?
    
	The method name and the data type of parameters it have is called as method signature. Like:
    Method signature for method is,
	findSum(int a ,int b);

L6-21:06 Does return type of the method is a part of method signature?
    
	No, method signature only contain method name and type of arguments.

L6-22:02 What are Static methods?
    		
	We use static keyword to define static methods. Static methods are used to access static members
    	Public static int get(){
    	
    -> To call static method:
     				Addition.get();

L6-22:22 Can we access instance variables inside Static methods?
    		
	Answer is No, we cannot access instance variable inside static blocks, static methods.
    Static methods and static blocks can only access static members.

L6-23:24 What are method declarations?
    
	When we do not define the body of method, and end it with a semi-colon then that is called method
    declaration
    -> Method declarations are only used in abstract classes and interfaces.

# What are interfaces?
    
An Interface is actually blueprint of a class, which specifies what a Class must do. (not how)
i.e, Interfaces does not have implementations of methods, There are only method declarations
and all the methods are abstract and public by default. **Also interfcaes are public by default**
```java
interface InterfaceDemo{
	void method1();
	void method2();	//this is method declaration.
}
```

## Can interface implement other interfaces?

* An interface can't implement another interface because if any interface is implemented then its methods must be defined and interface never has the definition of any method.

* An interface can extend another interface in the same way that a class can extend another class.
The extends keyword is used to extend an interface, and the child interface inherits the methods of the parent interface.

Example- 
```java
interface A {
	public void test();
	public void test1();
}
interface B {
   public void test();
   public void test2();
}
interface C extends A,B {
   public void test3();
}
class D implements C {
   public void test() {
      System.out.println("Testing");
   }
   public void test1() {
      System.out.println("Testing1");
   }
   public void test2() {
      System.out.println("Testing2");
   }
   public void test3() {
      System.out.println("Testing3");
   }
}
public class Main {
   public static void main(String[] args) {
      D d=new D();
      d.test();
      d.test1();
      d.test2();
      d.test3();
   }
 }
 ```

## POINTS To REMEMBER ABOUT INTERFACE

### Why interface method can't be Protected

**In general, the protected members can be accessed in the same class or, the class inheriting it. But, we do not inherit an interface we will implement it.**

Therefore, the members of an interface cannot be protected. If you try to declare the members of an interface protected, a compile-time error is generated saying *modifier protected not allowed here*.

> Classes and interfaces themselves can have only two access modifiers when declared outside any other class. 
1. public 
2. default (when no access modifier is specified)
>> **Note**: Nested interfaces and classes can have all access modifiers.
>> **Note**: We cannot declare class/interface with private or protected access modifiers.

> The Java access modifiers private and protected cannot be assigned to a class. Only to constructors, methods and fields inside classes. Classes can only have the default (package) and public access modifier assigned to them.

### As of Java7 you can have only public, abstract as modifiers for the methods of an interface.

```java
interface MyInterface{
   public abstract void display();
   public abstract void setName(String name);
   public abstract void setAge(int age);
}
```

Using any other modifier with the methods of an interface would lead to a compile time error.

### From Java8 onwards interfaces allow default methods and static methods.

* ``Static methods`` − A static method is declared using the static keyword and it will be loaded into the memory along with the class. You can access static methods using class name without instantiation.
You need to call static method of an interface using the name of the interface.

* ``Default methods`` − A default method is a default implementation of a method of an interface, if you have default method in an interface, there is no need to implement it in the classes that already implement this interface.

A default method is also known as defender method or virtual extension method. You can define a default method using the default keyword as −
```java
default void display() {
   System.out.println("This is a default method");
}
```

### From Java9 onwards interfaces allow private and private static methods.

Example
```java
interface MyInterface {
   public abstract void demo();
   public default void defaultMethod() {
      privateMethod();
      staticPrivateMethod();
      System.out.println("This is a default method of the interface");
   }

   public static void staticMethod() {
      staticPrivateMethod();
      System.out.println("This is a static method of the interface");
   }

   private void privateMethod(){
      System.out.println("This is a private method of the interface");
   }

   private static void staticPrivateMethod(){
      System.out.println("This is a static private method of the interface");
   }
}

public class InterfaceMethodsExample implements MyInterface {
   public void demo() {
      System.out.println("Implementation of the demo method");
   }

   public static void main(String[] args){
      InterfaceMethodsExample obj = new InterfaceMethodsExample();
      obj.defaultMethod();
      obj.demo();
      MyInterface.staticMethod();
   }
}
Output
This is a private method of the interface
This is a static private method of the interface
This is a default method of the interface
Implementation of the demo method
This is a static private method of the interface
This is a static method of the interface
```

# What is a native method?

A native method is a method which is implemented in a non-java language, and is targeted for a
single machine type.

# Can we define any method as final?

Yes. Methods can be made as final.
-> You can define any method final if you want to restrict others to modify the implementation of the method.

L6-26:53 Can we create object for final class?
    Yes, we can definitely create an object for final class.
    Example is class:String. It is a final class.

//OOPS

L7-00:13 What is OOPS?
    OOPS stands for Object Orieted programming System.
    Object oriented programming is a Programming paradigm to write programs based on real world
    objects, in that world, the states and behaviour of an object are the variable and methods.

L7-01:15 What are the advantages of OOPS?
    These are the major advantages of OOPS:
    1. Simplicity:
    	   Since OOPS consists real world objects, so the program structure remains clear to everyone without
         any complexity.
    2. Modularity:
    	   In object oriented paradigm, each object forms a separate entity. For each object, their state,
         behaviour and other internal workings are decoupled from other parts of system.
    3. Modifiability:
    	   With OOPs programming it is easy to change the data representation and methods. Changes inside
         any particular Class do not affect any other part of the program.
    4. Extensibility:
    	   This is about adding New features by modifying some existing modules. OOPs allows to do that.
    5. Maintainability:
    	   The objects can be maintained by fixing problems easier.
    6. Reusability:
    	   Objects can be reused in different programs.

L7-02:37 What are the core concepts of oops?

    1. Data Hiding : hiding the internal data, Securing the internal data
    2. Abstraction : way to segregate implementations from other entities (Hiding internal implementation)
    3. Encapsulation : Grouping of data member and member functions together
    4. Inheritance : Inheritance is the process of creating a new Class from the existing class(Inheriting properties from a class)
    5. Association
    6. Composition
    7. Aggregation
    8. Polymorphism : a particular method that behaves different in different contexts

L8-00:02 What is the difference between Abstraction and Encapsulation?

    Abstraction is implemented using interfaces and abstract classes and Encapsulation is about wrapping
    data members and member functions. This is implemented using private, protected keywords.

    Encapsulation is a concept that is a mix of data hiding and Abstraction. We hide Data from
    unauthenticated access, and implementations from outside world.
    Abstraction is about not showing the internal implementations directly to any other class.

L8-01:04 What is difference between Abstract Class and Interface?

    1. In abstract class, we can have both abstract and concrete methods where as in Interface,
       we can only have abstract methods, they cannot have concrete methods.
       However we can have static, default and private methods in interface.

    2. We can extend only one Abstract Class at a time where as in case of interfaces, we can implement
       any number of interfaces at a time.

    3. In abstract class ‘abstract’ keyword is used to declare a method as abstract, where as in Interface
       all the methods are abstract by default, so no keyword is required to declare methods.

    4. Abstract Class can have static, final or static final variables with any access specifier
       where as in Interface, we can have only static final variable by default.

    So we can use interfaces, when we want to create a service requirement specification for any class.
    and we can use abstract classes to provide a base for subclasses to extend and implement the abstract
    methods and use the implemented methods which are defined in abstract class.

L8-04:09 How can we write static, private and default methods in interface?

L9-00:02 Can we have an abstract class without any abstract method?
    yes.

L9-00:02 Can we have default methods in abstract class and interface?
         yes.
		 1.) In abstract class if we don't use abstract keyword before method name then it's default method.
		 2.) In interface we have to use default keyword before default methods.
	Note : For default methods we have to declare method body in class/ interface itself. although we can modify it in 
	       implementation class.


L9-00:21 Can we have a non-abstract class with abstract methods?
    No.

L9-00:39 Can we create constructor in abstract class?
    Yes. We can create constructor in abstract class. It does not give any compilation error,
    but as we cannot instantiate an Abstract Class so there is no use of creating it.

L9-00:58 What are the various types of inheritance?

    These are the types of inheritance:

    1. Single Inheritance: a single Class extends another class.

        class A{}
        class B extends A{}

    2. Multilevel Inheritance: in this there are multiple level of inheritance.

        class A{}
        class B extends A{}
        class C extends B{}

    3. Multiple Inheritance: A single Class extends more than 1 class.

    👉🏻 Java does not support this type of inheritance, because if a class extends more than one class then there is chance of ambiguity problem if there is any method present with the same name.
	However we may implement more than one interfaces, so multiple inheritance is possible with
    interfaces.

    4. Hierarchical Inheritance: This is about having single base class, and multiple implementation classes. i.e, single parent multiple Child classes.

        class A{}
        class B extends A{}
        class C extends A{}

      Java allows this type of inheritance. We can extend a Class in more than one classes.

    5. Hybrid Inheritance: This is the combination of more than one type of inheritance. It is about having multiple base and multiple implementation classes.

       👉🏻 It is not supported in java, as we know multiple classes can extend a single Class but a
          single Class can not extend multiple classes.

    6. Cyclic inheritance: A Class extends itself. it is not available in java and not actually required.
       class A extends B{}
       class B extends A{}

       -> all the methods or attributes will be available for use to each other.
       Instead of doing this, one may merge these two classes. So Cyclic inheritance is not required.

L9-04:02 What is Diamond Problem in inheritance?

    In case of multiple inheritance, if a Class extends two classes, then there is chance of ambiguity
    problem. This ambiguity problem is called as Diamond Access problem.

L9-04:32 Why do not we have ambiguity problem with interfaces in case of multiple inheritance?

    We can implement more than one interface. So multiple inheritance is possible as interfaces
    only have declaration of methods, not implementation. If two interfaces have methods with same name,
    then these are only multiple declarations of that method. The implementation will be only one.
    So there is no chance of ambiguity problem.

L9-05:12 What happens when we have default methods of same signatures while implementing multiple interfaces?

    To resolve default method calls,
    We can explicitly specify which default method is to be used, in implementing class.

L9-07:21 What is the difference between Late Binding and Early Binding?

    Binding is the association of a method call with the method definition.
    i.e, when a method is called in java, the program control binds to the memory address where that
    method is defined.

    There are two types of binding in java,
    -> Early Binding | Static Binding
    -> Late Binding | Dynamic Binding

    👉🏻 The Early Binding happens at Compile time, and late binding at Runtime.

    👉🏻 In early binding the method definition and the method call are linked during compile time.
      And that can only happen when all information needed to call a method is available at the compile
      time only.
      -> private, static, and final methods - at compile time.

    👉🏻 In early binding, the Reference Type information is used to resolve method calls, whereas in
       Late binding object information is used.

    👉🏻 As method calls are resolved before run time, Static Binding results in faster execution of a
       program while Dynamic binding results in somewhat slower execution of code.

       However the major advantage of Dynamic binding or method overriding is its flexibility, as a single
       method can handle different type of objects at run time.
       This reduces the size of base code and makes code more readable.

L10-00:02 Can we overload and override static methods?

    Yes we can overload static methods. But we cannot override them. We can define same method with same
    method signature in other Class but that will not be Method overriding.
    Because static method calls are resolved statically, i.e, at compile time.
    And in method overriding, method calls are resolved dynamically.

L10-00:29 What is constructor overloading?

    Constructor overloading allows to have more than one constructor inside the class.
    So in Constructor overloading we have multiple constructors with different signatures, i.e,
    with different arguments.

L10-01:45 What is this keyword in java? ⭐️

    'this' Keyword in java is a reference variable that refers to the current object.
    It holds the current state and behaviour for an object.

L10-05:47 What is super keyword?

    Super keyword is used to refer to Parent Class objects.
    -> When a Derived Class and Base Class has same data members then we may use super keyword to access
       the parent classMembers. same with the methods, we use super keyword with method calls to specify
       that parent Class method will be invoked.

L10-06:24 What is Constructor Chaining in java? ⭐️

    In java, we can call one constructor from another. This is called Constructor Chaining.
    We have this and super keywords for that.
    -> this() is used to call another constructor from a constructor.
    -> super() is used to call the constructor of the super class from the constructor of base class.

L11-00:01 Can we overload main method?

    Apart from the fact that JVM always looks for the main method to launch the program, main method is
    just like other methods.
    We can overload main method too, But JVM never gonna call that overloaded method.
    -> To execute that method we need to call that from the main method only.

        public static void main(){
        //any implementation
        }

        public static void main(String[] args){
        	obj.main();
        }

L11-01:26 Can a final method be overloaded in java?
    Yes, final method can be overloaded but cannot be overridden.

L11-01:36 What is IS-A and HAS-A relationship?

    IS-A relationship implies inheritance. i.e, if class 'A' extends class 'B', then A is-a B.
    For example,

    -> There is a 'Teacher' Class which extends a 'Person'. So here a person is a teacher. and it is
    transitive, like if another class 'MathTeacher' extends 'Teacher' class, then also
    MathTeacher is-a Person.

    -> when a class 'A' has-a member reference variable of type 'B' then A has-a B. for Example,
    College has-a Teacher. This is also known as Aggregation.

L11-02:54 What is Stronger association: Composition or Aggregation?

    Composition is the stronger association than aggregation. Because in composition, the entities are
    highly dependent on each other.

L11-03:09 How OOPs is different than Procedural programming?

    -> Procedural language is based on functions but object oriented language is based on objects.

    -> Procedural language exposes the data for that program, whereas Object oriented language
    encapsulates the data.

    -> Procedural language follows top down programming paradigm, but OOp language follows bottom up
    programming paradigm.

    -> Procedural language is complex in nature, so it is difficult to modify, extend and maintain.
    but OOP language is less complex in nature so it is easier to modify, extend and maintain.

    -> Procedural language provides less scope of code reuse but object oriented language provides more
    scope of code reuse.

	\**/ What is Polymorphism?
	-> Polymorphism in Java is a concept by which we can perform a single action in different ways.
	-> There are two types of polymorphism in Java: compile-time polymorphism and runtime polymorphism.
	We can perform polymorphism in java by method overloading and method overriding. 
	-> If you overload a static method in Java, it is the example of compile time polymorphism.
	
	**Runtime Polymorphism in Java
	-> Runtime polymorphism or Dynamic Method Dispatch is a process in which a call to an overridden method
	 is resolved at runtime rather than compile-time.
	-> In this process, an overridden method is called through the reference variable of a superclass.
	 The determination of the method to be called is based on the object being referred to by the reference variable.

	**Upcasting
	-> If the reference variable of Parent class refers to the object of Child class, 
	it is known as upcasting. For example:
	class A{} // Parent Class 
	class B extends A{}  
	A a=new B();//upcasting  

	**Example of Runtime Polymorphism

	class Bike{  
  		void run(){
			System.out.println("running");
		}  
	}  
	class Splendor extends Bike{  
  		void run(){
			System.out.println("running safely with 60km");
		}  
  
  		public static void main(String args[]){  
    		Bike b = new Splendor();//upcasting  
    		b.run();  
  		}  
	}  

	**Java Runtime Polymorphism with Data Member
	-> Runtime polymorphism can't be achieved by data members as it's not overridden.
	-> Example :
		class Bike{  
 			int speedlimit=90;  
		}  
		class Honda3 extends Bike{  
 			int speedlimit=150;  
  
 			public static void main(String args[]){  
  				Bike obj=new Honda3();  
  				System.out.println(obj.speedlimit);//90  
			}  
		}

	** Java Runtime Polymorphism with Multilevel Inheritance
	class Animal{  
		void eat(){
			System.out.println("animal is eating...");
		}  
	}  
	class Dog extends Animal{  
		void eat(){
			System.out.println("dog is eating...");
		}  
	}  
	class BabyDog1 extends Dog{  
		public static void main(String args[]){  
			Animal a=new BabyDog1();  
			a.eat();  //Dog is eating
		}
	}  
	-> Since, BabyDog is not overriding the eat() method, so eat() method of Dog class is invoked.

### Encapsulation

Data Encapsulation can be defined as wrapping the code or methods(properties) and the related fields or variables together as a single unit,making the code more organized. Encapsulation helps to hide data by preventing unauthorized access to the implementation details.

#### How to implement Encapsulation in Java?

We need to perform two steps to achieve the purpose of Encapsulation in Java.

1. Use the private access modifier to declare all variables/fields of class as private.
2. Define public getter and setter methods to read and modify/set the values of the abovesaid fields.
	
#### Benefits of Encapsulation java
* Cleaner, more organized and less complex code.
* More flexible code as can modify a unit independently without changing any other unit.
* Makes the code more secure.
* The code can be maintained at any point without breaking the classes that use the code.
* Key Points to Remember about encapsulation in Java

#### What is the difference between abstraction and encapsulation?

Abstraction is a technique for hiding implementation details. Encapsulation, on the other hand, is a way of hiding data in a single entity or unit and protecting information from the outside.

### What is Association, Composition and Aggregation in Java?

#### Association in Java

-> Association in java is the relationship that can be established between any two classes. 
These relationships can be of four types:
	1.One-to-One relation
	2.One-to-many relation
	3.Many-to-one relation
	4.Many-to-many relation
-> To illustrate, let’s take two classes, Professor class, and Department class. 
* One professor can only be assigned to work in one department. This forms a one-to-one association between the two classes.
* One professor can be assigned to work in multiple departments. This is a one-to-many association between the two classes.
* Multiple professors can be assigned to work in one department. This forms a many-to-one association between the two classes.
* Multiple professors can be assigned to work in multiple departments. This is the many-to-many association between the two classes.
-> These associations in java help the objects of one class to communicate with the objects of the other class.

	So one object will be able to access the data of another object.
	->For example, A professor entity modeled as an object would be able to access/know the names of all the departments he works at. 
		And a department object can be able to access/know the names/details of all the professors that work in it.
	Functionality/Services of one object can be accessible to another object. 
	->For example, A professor who is trying to enroll in a department can be able to verify whether a department he wants to join has a vacancy. 
		This service(programmatic method/function) to find whether there’s a departmental vacancy can be provided 
		by the Department class which the Professor class can access.
Example to illustrate one-to-many Association between Department class and Professor class:

```java
class Professor {
 private String name;
	
 Professor(String name)
 {
   this.name = name;
 }
 
 public String getName()
 {
   return this.name;
 }
 
}

class Department {
 private String name;
 List<Professor> staff;

 Department(String name)
 {
   this.name = name;
 }
 
 public String getName()
 {
   return this.name;
 }
 
 public void setStaff(List<Professor> staff)
 {
   this.staff = staff;
 }
 
 public List<String> getStaff()
 {
   List<String> professor_names = new ArrayList<String>();
   for(Professor prof : this.staff)
   {
     professor_names.add(prof.getName()); 
   }
   return professor_names; /
 }
}

class Main {
 public static void main(String[] args) {
    Professor ak = new Professor("Arun Kumar");
    Professor ry = new Professor("Rahul Yadav");
    Department cse = new Department("CSE");
    List<Professor> staff_cse = new ArrayList<Professor>();
    staff_cse.add(ak);
    staff_cse.add(ry);
    cse.setStaff(staff_cse);
    System.out.println("The staff of department " + cse.getName() + " is: " + cse.getStaff());
 }
}
```

#### Forms of Association in Java
-> There can be two types of relationships in OOPs:
	IS-A
	HAS-A

1. IS-A (Inheritance)

-> A parrot is-a Bird. Here Bird is a base class, and Parrot is a derived class, 
Parrot class inherits all the properties and attributes & methods (other than those that are private) 
of base class Bird, thus establishing inheritance(IS-A) relation between the two classes.
	
The HAS-A association on the other hand is where the Instance variables of a class refer to objects of another class. 
In other words, one class stores the objects of another class as its instance variables thereby establishing 
a HAS-A association between the two classes.

2. HAS-A (association)
-> There are two forms of Association that are possible in Java:
* Aggregation
* Composition

#### Aggregation:

Aggregation in java is a form of HAS-A relationship between two classes.
It is a relatively more loosely coupled relation than composition in that, 
although both classes are associated with each other, one can exist without the other independently. 

So Aggregation in java is also called a weak association.

#### Example: 
Consider the association between a Country class and a Sportsperson class. Here’s how it is defined

* Country class is defined with a name and other attributes like size, population, capital, etc, and a list of all the Sportspersons that come from it.
* A Sportsperson class is defined with a name and other attributes like age, height, weight, etc.

* The Country object has-a Sportsperson object and not the other way around, meaning the Country object instance variables store the 
* Sportsperson objects, so the association is one-sided. 

* Thus Aggregation is also known as a unidirectional association.
```java
class Country{
	private String name;
	List<SportPerson> sportPersons;
  	public Country(String name)  //to assign Country name
  	{
    	this.name = name;
	  	}
	public void setSportPersons(List<SportPerson> sportPersons)  //To assign sportspeople
	{
	    this.sportPersons = sportPersons;
	}
	public List<String> getSportPersons()
	{
	  List<SportPerson> listOfSportPersons = this.sportPersons;
	  List<String> names = new ArrayList<String>();
	  for(SportPerson sportPerson : listOfSportPersons)
	  {
	      names.add(sportPerson.getName());
	  }
	  return names;
	}
	 public String getName()
	 {
	  return this.name;
	 }
}
//Sportsperson class
class SportPerson{
	private String name;
	public SportPerson(String name)  //to assign Sportsperson name
	{
	  this.name = name;
	}
	public String getName()
	{
	  return this.name;
	}
}
class Main {
	public static void main(String[] args) {
	  SportPerson macculum = new SportPerson("Mccullum");
	  SportPerson dhoni = new SportPerson("Dhoni");
	  SportPersonk kohli = new SportPerson("Kohli");
	  Country india = new Country("India");
	  List<SportPerson> listOfSportPersons = new ArrayList<SportPerson>();
	  sportPersons.add(macculum);
	  sportPersons.add(dhoni);
	  sportPersons.add(kohli);
	
	  india.setSportPersons(listOfSportPersons);
	  System.out.println("The sports people from country " + india.getName() + " are " + india.getSportPersons());
	
	}
}
```

#### Conclusion: 
* This is the logical idea behind Aggregation, Sportsperson Class objects can exist independently of the Country class object.
* if Country object is to be deleted, it has no effect on the SportPerson and vice-versa.
* Thus Aggregation helps in code reusability. Since classes exist independently, 
	The same classes can be reused to create associations with other classes, without having to modify an existing class, 
	or without causing any issues to existing associations.
#### Composition:

* Composition in java is a form of relation that is more tightly coupled. Composition in java is also called Strong association. 
This association is also known as Belongs-To association as one class, for all intents and purpose belongs to another class, and exists because of it

* Example: The association between College and Student. Below is how it is defined.
	* College class is defined with name and the list of students that are studying in it
	* A Student class is defined with name and the college he is studying at.
	* Here a student must be studying in at least one college if he is to be called Student. If the college class is removed, Student class cannot exist alone logically, because if a person is not studying in any college then he is not a student.

**Program:**
```java
class College{
	private String name;
	ArrayList<Student> studentList;
	public College(String name)  //to assign college name
	{
	   this.name = name;
	}
	public void setStudentList()  //To set Students list
	{
	    //Create three Student objects
	    Student student1 = new Student("Abe");
	    Student student2 = new Student("lincoln");
	    Student student3 = new Student("Abraham");
	    ArrayList<Student> students = new ArrayList<Student>();
	    students.add(student1);
	    students.add(student2);
	    students.add(student3);
	
	    this.studentList = students;
	}
	public String getName()
	{
	  return this.name;
	}
	public List<String> getStudentList() //To get students list
	{
		List<Student> students = this.studentList;
		List<String> names = new ArrayList<String>();
		for(Student student : students)
		{
			names.add(student.getName());
		}
		return names;
	}
}
class Student{
	private String name;
	 public Student(String name)  //to assign Student name
	{
	  this.name = name;
	}
	public String getName()
	{
	  return this.name;
	}
}
class Main {
	public static void main(String[] args) {
	College college1 = new College("MIB");
	college1.setStudentList();
	System.out.println("The students studying in " + college1.getName() + " college are " + college1.getStudentList());
	}
}
```
#### Conclusion :
* The method setStudentList is defined, which created three students’ objects inside the College class and assigned them to the college studentList.
So here, the Student class objects are created and stored internally in the College class, which creates a tightly bound association between the College and Student classes.
Because, if College class is removed, all student objects are removed as well.
* All the students are to be part of the class, no student can exist independently. And the result is outputted.
> Note here that no single student can exist without a college, but a college can exist without the student. Student is the dependent class.

Below are the primary differences between the forms of Association, Composition and Aggregation in java:
Aggregation															Composition
------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------
Weak Association													Strong Association
Classes in relation can exist independently							One class is dependent on Another Independent class. The Dependent class cannot exist independently 
																	in the event of the non-existence of an independent class.
One class has-a relationship with another class						Once class belongs-to another class
Helps with code reusability. Since classes exist independently, 	Code is not that reusable as the association is dependent. Such Associations once  
associations can be reassigned or new associations created      	established will create a dependency,and these associations cannot be reassigned or 
without any modifications to the existing class.					new associations like aggregation, etc cannot be created without changing the existing class.
	