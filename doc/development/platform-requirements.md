```
+ lib
  + modules
    + platform
      + requirements
```


# Platform Requirements

Platform Requirements are validations against the host computer. As better the framework become and as much automatic tools it install, as less requirements should be need to check.

E.g.:

- Check if JAVA exists and JAVA_HOME exists
- Check if running on Mac OSX when running iOS tests
- Check if XCode is installed
- ...

Each `platform` contains a series of validations.

Requirements has the following interface:

```typescript
    // Raises exception if any requirement is needed with a message
    verify(platform:string):void
```
