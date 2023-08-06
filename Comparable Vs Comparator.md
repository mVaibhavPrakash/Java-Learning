# Difference between Comparable and Comparator

Comparable and Comparator both are interfaces and can be used to sort collection elements.

However, there are many differences between Comparable and Comparator interfaces that are given below.

| Comparable | Comparator |
| --- | --- |
| Comparable provides a single sorting sequence. In other words, we can sort the collection on the basis of a single element such as id, name, and price. | The Comparator provides multiple sorting sequences. In other words, we can sort the collection on the basis of multiple elements such as id, name, and price etc. |
| Comparable affects the original class, i.e., the actual class is modified. | Comparator doesn't affect the original class, i.e., the actual class is not modified. |
| Comparable provides compareTo() method to sort elements. | Comparator provides compare() method to sort elements. |
| Comparable is present in java.lang package. | A Comparator is present in the java.util package. |
| We can sort the list elements of Comparable type by Collections.sort(List) method. | We can sort the list elements of Comparator type by Collections.sort(List, Comparator) method. |

## Java Comparable Example

Let's see the example of a Comparable interface that sorts the list elements on the basis of age.

File: TestSort3.java

```java
//Java Program to demonstrate the use of Java Comparable.  
//Creating a class which implements Comparable Interface  
import java.util.*;  
import java.io.*;  
class Student implements Comparable<Student>{  
    int rollno;  
    String name;  
    int age;  
    Student(int rollno,String name,int age){  
        this.rollno=rollno;  
        this.name=name;  
        this.age=age;  
    }  
    public int compareTo(Student st){  
        if(age==st.age)  
            return 0;  
        else if(age>st.age)  
            return 1;  
        else  
            return -1;  
    }  
}  
//Creating a test class to sort the elements  
public class TestSort3{  
    public static void main(String args[]){  
        ArrayList<Student> al=new ArrayList<Student>();  
        al.add(new Student(101,"Vijay",23));  
        al.add(new Student(106,"Ajay",27));  
        al.add(new Student(105,"Jai",21));  

        Collections.sort(al);  
        for(Student st:al){  
            System.out.println(st.rollno+" "+st.name+" "+st.age);  
        }  
    }  
}  

Output:

105 Jai 21
101 Vijay 23
106 Ajay 27
```

## Java Comparator Example

Let's see an example of the Java Comparator interface where we are sorting the elements of a list using different comparators.

Student.java
```java
class Student{  
    int rollno;  
    String name;  
    int age;  
    Student(int rollno,String name,int age){  
        this.rollno=rollno;  
        this.name=name;  
        this.age=age;  
    }  
}
```

### AgeComparator.java
```java
import java.util.*;  
class AgeComparator implements Comparator<Student>{  
    public int compare(Student s1,Student s2){  
        if(s1.age==s2.age)  
            return 0;  
        else if(s1.age>s2.age)  
            return 1;  
        else  
            return -1;  
    }  
}  
```

### NameComparator.java

This class provides comparison logic based on the name. In such case, we are using the compareTo() method of String class, which internally provides the comparison logic.

```java
import java.util.*;  
class NameComparator implements Comparator<Student>{  
    public int compare(Student s1,Student s2){  
        return s1.name.compareTo(s2.name);  
    }  
}  
```
### TestComparator.java

In this class, we are printing the values of the object by sorting on the basis of name and age.

```java
//Java Program to demonstrate the use of Java Comparator  
import java.util.*;  
import java.io.*;  
class TestComparator{  
    public static void main(String args[]){  
        //Creating a list of students  
        ArrayList<Student> al=new ArrayList<Student>();  
        al.add(new Student(101,"Vijay",23));  
        al.add(new Student(106,"Ajay",27));  
        al.add(new Student(105,"Jai",21));  

        System.out.println("Sorting by Name");  
        //Using NameComparator to sort the elements  
        Collections.sort(al,new NameComparator());  
        //Traversing the elements of list  
        for(Student st: al){  
            System.out.println(st.rollno+" "+st.name+" "+st.age);  
        }  
    
        System.out.println("sorting by Age");  
        //Using AgeComparator to sort the elements  
        Collections.sort(al,new AgeComparator());  
        //Travering the list again  
        for(Student st: al){  
            System.out.println(st.rollno+" "+st.name+" "+st.age);  
        }  
    }  
}  
Output:

Sorting by Name
106 Ajay 27
105 Jai 21
101 Vijay 23

Sorting by Age       
105 Jai 21
101 Vijay 23
106 Ajay 27
```