```
+ lib
  + modules
  + sdk
```

# SDK vs modules

- `SDK` folder was the initial project I started. You can see the difference on code style (OO) because I used `TypeScript` at that moment. The `SDK` has a concept called `Suite` which defines all the input needed to run a tests.
- The `Modules` are the new initiative to work better with the CLI tool. It makes use of the `SDK`.

The file `run-generic.js` is the bridge between the new and the old code and it is the one which initializes the `SDK`.

Eventually, the `SDK` will be refactored and split its functionality on the `Modules` section and remove duplicates such as `log.js`.
