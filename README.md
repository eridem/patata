[![Build Status](https://travis-ci.org/eridem/patata-cli.svg?branch=master)](https://travis-ci.org/eridem/patata-cli)

# Start with your QA project easily

Install Patata-CLI

```bash
npm --install -g patata-cli

patata --init "My Project"

cd my-project

patata --install
```

Then, create a new feature...

```bash
npm --create-feature "My Nice Feature"
```

# Run tests when you are ready

Run your tests on iOS or Android:

```bash
patata --run-android myApp.apk

# or...

patata --run-ios myApp.ipa
```

# All commands

```
patata --init NAME
patata --install
patata --create-feature NAME
patata --create-component NAME [--byId=] [--byContentDescription=] [--byXPath=]
patata --run-android LALA [--tags=....] [--device=...]
```

# We do the file structure, you fill the test cases

+ components
  + android
  + common
  + ios
+ config
  + config.js
+ features
  + feature-a
    + feature-a.spec.feature
    + feature-a.ios.js
    + feature-a.android.js
  + feature-b
    + feature-a.spec.feature
    + feature-a.ios.js
    + feature-a.android.js

# Additional notes

- Moved to GitHub
- Add Travis CI