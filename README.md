[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![NPM version][npm-image]][npm-url]
[![js-standard-style][standard-image]][standard-url]

***Patata*** is a project to help you to automate UI testing of native apps. It uses [Cucumber](https://cucumber.io/) and [Appium](http://appium.io/) to make the process as approachable as possible.

The goals of *Patata* are:

- Be able to set up your automation project in minutes
- Create a *standard* way to do things.
   - It is not possible to change the way it is structure. This avoid multiple discussions with you and your team.
   - Learning process is simple and quick. There are limited ways to do things.
   - It provides a scaffolding tool to create a detect problems before running tests.
- Common language for any platform.
- To be simple to understand and avoid the need for "*code*" as much as possible.

# Start your QA project

## Install Patata-CLI

```bash
npm install -g patata-cli
```

## Create a new project:
```bash
patata init "My Project"
cd my-project
patata install
```

## Create UI components:
```bash
# Using the content-description in an element in the UI for Android:
patata component "Login Button" "content-description" "login_button" --android

# Using the id in an element in the UI for iOS:
patata component "Login Button" "id" "loginButton" --ios
```

## Create a new feature:
```bash
patata feature "My Nice Feature"
```

Fill the ```my-nice-feature.feature``` file using the [Gherkin syntax](https://github.com/cucumber/cucumber/wiki/Gherkin)

And fill the features on the JavaScript files doing references to the previous components:

```javascript
//...

this.Given('.......', function() {
  return this.emu
      .LOGIN_BUTTON.tap()
})

//...
```

# Configurations for your tests

You can create set of configuration values for your tests.

## Defining configuration values

All configurations are inside the file ```/config/config.yml```. E.g:

```yml
common:
  invalidCredentials:
    username: banana
    password: 654321
  validCredentials:
    username: potato
    password: 456123
test-env:
  validCredentials:
    username: patata
    password: 123456
```

The configuration is based in two levels:

- The first level define the tags that will match. Use lowercase and dashes. E.g. ```common```, ```test-env```
- The second level define the values. Use camelCase. E.g. ```invalidCredentials```, ```validCredentials```

Configurations will match:

- the ```--tags``` options using all tags
- or ```--config-tags``` if used

E.g.

```bash
patata run myapp.apk --tags "@test-env"                                    # Will use tags inside --tags
patata run myapp.apk --tags "@test-env" --config-tags "@test-env,@common"  # Will use tags inside --config-tags
```

The configurations will merge the settings from the top to the bottom. 

E.g. if we pass ```--config-tags "@common,@test-env"``` the result will be:

```yml
invalidCredentials:
  username: banana
  password: 654321
validCredentials:
  username: patata
  password: 123456
```

## Using configuration in your tests

At any moment in your application, you can access to your configurations writing ```this.config.myConfigurationKey```. E.g.

```javascript
console.log(this.config.invalidCredentials.username) // Will print "banana"
```

As well, you can use an string to access to the configurations. This could be useful when passing arguments from the feature files:

```javascript
let mySetting = 'invalidCredentials'
console.log(this.config[mySetting].username) // Will print "banana"

mySetting = 'validCredentials'
console.log(this.config[mySetting].username) // Will print "patata"
```

# Run tests when you are ready

Run your tests on iOS or Android:

```bash
patata run "./bin/myApp.apk" --tags "@ci,@mybrand"
# or...
patata run "./bin/myApp.ipa"
```

## Tags

Use ```--tags <EXPRESSION>``` to run specific features or scenarios.

- ```--tags @dev```: tagged with @dev
- ```--tags ~@dev```: NOT tagged with @dev
- ```--tags @foo,@bar```: tagged with @foo OR bar
- ```--tags @foo --tags @bar```: tagged with @foo AND bar

# Using HockeyApp

Save the HockeyApp token key using the terminal:

```bash
patata setting "HockeyApp.Token" "aaaabbbbccccdddd0000111122223333"
```

Run *Patata* using the provider and the name of the app. It will take the latest version found:

```bash
patata run "hockeyapp://?app=My App" --tags "@ci,@mybrand"
```

You can use a regular expression to match a property of a HockeyApp app version:

```bash
patata run "hockeyapp://?app=My App&filterName=notes&filterValue=/.*My Note.*/gi"
```

Filters are based on the attribute names from the [HockeyApp API Versions](https://support.hockeyapp.net/kb/api/api-versions) documentation page.

# Help from terminal

```
Usage: patata <command> [options]

Commands:
  init       Create a new project
  install    Install all dependencies needed for the QA project
  feature    Create the needed files for a new feature
  component  Create a new component
  run        Run test based on a file, uri or HockeyApp
  setting    Get or set a global settings on the ".patata.yml"

Options:
  --ios, --pi          Used on "component". Add component only for iOS.                     [boolean]
  --android, --pa      Used on "component". Add component only for Android.                 [boolean]
  --common, --pc       Used on "component". Add component for all platforms.                [boolean]
  --on-done, -d        A path to a JavaScript file to execute when the test finish.         [string]
  --tags, -t           Used on "run".
                       Run scenarios with those tags.
                       Read "config.yml" using those tags (skip if --config-tags is used).  [string]
  --config-tags, --ct  Used on "run".
                       Read "config.yml" using those tags.                                  [string]
Examples:
  patata init "My New QA Project"                                             Create a new project
  patata install                                                              Install all dependencies needed for QA project
  patata component "Login Button" "content-description" "login_button" --ios  Create a new component for iOS
  patata feature "My Nice Feature"                                            Scaffolding: create the structure needed for a new feature
  patata setting HockeyApp.Token "123456"                                     Set the HockeyApp token key to fetch apps
  patata run ./myapp.apk --tags "@ci" --config-tags "@beta"                   Run test on Android with a APK file and tags
```

# File system structure

```
+ components
  - ui.ios.yml
  - ui.ios.js
  - ui.android.yml
  - ui.android.js
  - ui.common.yml
  - ui.common.js
+ config
  - config.yml
+ features
  + feature-a
    - feature-a.spec.feature
    - feature-a.ios.js
    - feature-a.android.js
    - feature-a.common.js
  + feature-b
    - feature-b.spec.feature
    - feature-b.ios.js
    - feature-b.android.js
    - feature-b.common.js
- .patata.yml
```

[travis-url]: https://travis-ci.org/eridem/patata-cli
[travis-image]: https://img.shields.io/travis/eridem/patata-cli/master.svg
[standard-url]: http://standardjs.com/
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[npm-url]: https://www.npmjs.com/package/patata-cli
[npm-image]: https://img.shields.io/npm/v/patata-cli.svg
[coveralls-url]: https://coveralls.io/github/eridem/patata-cli
[coveralls-image]: https://img.shields.io/coveralls/eridem/patata-cli.svg
[patata-image]: https://img.shields.io/badge/automation-patata-orange.svg
[patata-url]: https://github.com/eridem/patata

# Copyrights

Patata is based on the great work of other Open Source projects. 

To learn more about the other projects, their licenses and authors, you can use this website:

[https://www.npmjs.com](https://www.npmjs.com/)

Searching for each dependency listed on the file ```package.json``` under the section ```dependencies``` and ```devDependencies```.
