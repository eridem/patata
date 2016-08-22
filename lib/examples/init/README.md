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

# Using HockeyApp

Fill the file ```providers/hockeyapp.json``` with the ```token``` from HockeyApp:

```json
{
    "token": "aaaabbbbccccdddd0000111122223333"
}
```

Run *Patata* using the provider and the name of the app. It will take the latest version found:

```
patata --run-android "hockeyapp:My App"

patata --run-ios "hockeyapp:My App"
```

Or use a regular expression to match the first version found:

```
patata --run-android "hockeyapp:My App:filter(notes=/.*My Note.*/gi)"
```

Filters are based on the attribute names from the [HockeyApp API Versions](https://support.hockeyapp.net/kb/api/api-versions) documentation page.

# All commands

```
patata --init NAME
patata --install
patata --create-feature NAME
patata --create-component NAME [--byId=] [--byContentDescription=] [--byXPath=]
patata --run-android URI [--tags=....] [--device=...]
patata --run-ios URI [--tags=....] [--device=...]
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