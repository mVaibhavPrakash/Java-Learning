Immutability means that something cannot be changed. In Java, an immutable class is one whose state cannot be changed once it has been created.

This shot aims to give a guideline of how to make a class immutable – it contains an example of how to create an immutable class.

# Creating an immutable class

To make a class immutable, follow these steps:

* Declare the class as final
* Make all its fields final and private
* For all mutable fields, make sure that the class creates a copy and only returns the copy to the calling code
* Do not provide any setter methods

## Why do we need to complete all the steps above to make a class immutable?

* We need to ensure that the subclasses do not override any of the class methods. Declaring the class as final ensures that the class cannot be overridden. A more sophisticated approach is to make the constructor private and use a factory method to create an instance of the class.
* Making all the fields private ensures that the fields cannot be changed outside the class. This way, we won’t be able to alter the field, even by mistake.
* For all the mutable fields, we are making sure that no other outside object could change the data by creating a defensive copy of the object and only returning this copy to the calling code.
* Setter methods are usually used to change the state of the object and, since the goal of an immutable class is to avoid state changes, we do not provide any setter methods.

## Lets look at an example of an immutable class:

```java
import java.util.Date;

/**
 * Steps for making a class immutable:
 * 1. Declare the class as final
 * 2. Make all its fields final
 * 3. For all mutable fields, class should make a defensive copy and only return the copy to the calling code
 * 4. Do not provide any setter methods.
 */
public final class ImmutableClass {
    /**
     * Integer and String classes are immutable whereas Date class is mutable
     */
    private final Integer immutableInteger;
    private final String immutableString;
    private final Date mutableDate;

    public ImmutableClass(Integer i, String s, Date d) {
        this.immutableInteger = i;
        this.immutableString = s;
        this.mutableDate = new Date(d.getTime());
    }

    public String getImmutableString() {
        return immutableString;
    }

    public Integer getImmutableInteger() {
        return immutableInteger;
    }

    public Date getMutableDate() {
        return new Date(mutableDate.getTime());
    }

    @Override
    public String toString() {
        return immutableInteger + ", " + immutableString + ", " + mutableDate;
    }
}
```
### We have three fields in the class:

* The first field is of Integer type
* The second field is of String type
* The third field is of Date type.

> The String and Integer classes are immutable, but the Date class is mutable. Thus, we created a new Date object when assigning the Date to the class field.```