[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Coverity Scan Build Status][coverity-scan-image]][coverity-scan-url]
[![NPM version][npm-image]][npm-url]
[![js-standard-style][standard-image]][standard-url]

***Patata*** is a project to help you to automate UI testing of native apps. It uses [Cucumber](https://cucumber.io/) and [Appium](http://appium.io/) to make the process as approachable as possible.

# Collaboration guidelines

- Check that there are not errors or warnings executing `npm test`.
- Check that you have covered new code with tests. Tests are inside the `./test` folder.
- Check that the tool works on Linux/Mac/Windows.
- Before add new features, open an issue on GitHub to be sure this was accepted with the main developers.

# Start your QA project

## Install Patata-CLI

```bash
npm install -g patata-cli
# This may take a while due it install Cucumber and Appium
```

## Create a new project:
```bash
patata init "My Project"
cd my-project

patata install
```

# Main concepts

***Patata*** will create some folders for you, organizing your testing suites.

- ```components```: elements extracted from the user interface.
- ```features```: where the feature definitions and the implementations are.
- ```hooks```: *before* and *after* actions for your tests.
- ```config```: configurations and values you want to save for your tests.
- ```reports```: where the results of the tests are saved.
- ```patata.yml```: file that contains some settings for the framework.

# Platform files

All files, excepting ```.feature``` and ```config.yml```, contain the extension 

- ```*.ios.*```
- ```*.android.*```
- ```*.common.*```

The framework will load ```common``` files and later it will load the platform files depending of the platform currently running.

# Components

Components are the visual parts we can extract from the application.

## Yaml components

Using the ```ui.*.yml``` files, we can add components using easy tags that match with our views on the interface. It is divided in three parts: name of the component, fetch method and fetch value. For instance:

```yaml
# COMPONENT_NAME:
#    FETCH_METHOD: FETCH_VALUE

MY_BUTTON:
  content-description: my_content_description
```

- ***Component name***: the name we will use to reference this component in the implementation files. They need to be in uppercase, spaced by underscore.
- ***Fetch method***: way to extract the component. It is platform specific:
  - iOS: ```id```, ```name```, ```xpath```, ```class-name```
  - Android: ```id```, ```content-description```, ```xpath```
- ***Fetch value***: value that corresponde to the fetch method.

## Advance components

The Yaml file could be useful to extract most of the components, but we may want to go advance and create bigger implementations to extract a component. We can create a file called:

- ```components/ui.androd.js```
- ```components/ui.common.js```
- ```components/ui.ios.js```

The content is very similar to YAML components, but those are based on ```exports``` and ```functions```. Example:

```javascript
// components/ui.android.js
'use strict'

exports.MY_BUTTON: function() {
  return this.elementByAccessibilityId('my_content_description').should.eventually.exists
}
```

All exports need to return a promise. If you need to connect to the ```driver```, use ```this``` and chain your calls.

# Features

All features are inside the ```features``` folder. We can run the command:

```bash
patata feature "My nice feature"
```

To obtain an example of a feature to start working on it.

Features will contain four files:

- ```my-nice-feature.feature```: Gherkin definition of the feature, based on the [Gherkin syntax](https://github.com/cucumber/cucumber/wiki/Gherkin)
- ```my-nice-feature.*.js```: implementation of the feature, based on the platform and the [Cucumber Step definitions](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/step_definitions.md)

***Patata*** solves all the hard work initializing Appium, WebDriver and Cucumber.

In order to connect to the ```web driver```, we use:

```javascript
return this.emu
```

In order to access to our ```components```, we call them directly chained from the ```this.emu``` object:

```javascript
this.Given('.......', function() {
  return this.emu      
      .TOOLBAR_USER_BUTTON.tap()
      .LOGIN_BUTTON.tap()
})
```

# Hooks

We can find three files to define ***hooks***, which are *After* and *Before* actions.

```
hooks/hooks.*.js
```

The first hooks to load will be ```common```. Then, the platform specific.

Hooks works as ```features```. We can use ```this.emu``` to access to the driver and we can access to the components. More info on the ***features section***.

Example:

```javascript
var hooks = function () {
  this.Before(function (scenario) {
    return this.emu
  })

  this.After(function (scenario) {
    return this.emu
  })
}

module.exports = hooks
```

# Config

## Defining configuration values

All configurations are inside the file ```/config/config.yml```.

The configuration is based in two levels:

- The first level define the tags that will match. Use lowercase and dashes. E.g. ```common```, ```test-env```
- The second level define the values. Use camelCase. E.g. ```invalidCredentials```, ```validCredentials```

```yml
# Example: 

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

When we execute the tests, we will pass the first level tags. The settings will be merged from top to bottom if it match the tags defined.

For instance, if we fetch by ```@common``` and ```@test-env```, the result will be:

```yml
invalidCredentials:
  username: banana
  password: 654321
validCredentials:
  username: patata
  password: 123456
```

## Using configuration in your tests

We can access to the configuration object inside ```hooks```, ```compontents``` and ```features``` at any time using ```this.config.*```. E.g.

```javascript
console.log(this.config.invalidCredentials.username) // Will print "banana"
console.log(this.config['invalidCredentials'].username) // Will print "banana"
console.log(this.config['validCredentials'].username) // Will print "patata"
```

## Loading configurations

On running our tests, we can define two different ways to load the configurations based on the *first level* name.

- Using ```--tags```. E.g.

```bash
patata run <...> --tags "@test-env"    
```

- Using ```--config-tags``` if we do not want to use ```---tags```. This will discard the ```--tags``` values. E.g. 

```bash
patata run <...> --config-tags "@test-env,@common"
```

# Run tests

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

# Creating CLI profiles

If we want to execute the same kind of commands on ***patata***, we can save the command options in a profile that we can reuse everytime and share with our team.

- Open the file ```patata.yml```
- Add the following example:

```yaml
Profiles:
  MyTest: patata run "./bin/myApp.apk" --tags @mybrand
```

When you want to run that specific profile, you can call to:

```bash
patata profile MyTest
```

The profiles are not attached to the ```patata``` command, you can add any one you may need to automate your proccess.

# Using HockeyApp

We can connect our tests to HockeyApp to download the files from there.

- Open the file ```patata.yml```
- Add the following example:

```yaml
HockeyApp:
  Token: aaaabbbbccccdddd0000111122223333
```

Replace the value ```aaaabbbbccccdddd0000111122223333``` for your HockeyApp token. More info: [https://rink.hockeyapp.net/manage/auth_tokens](https://rink.hockeyapp.net/manage/auth_tokens)

## Running tests using HockeyApp

Run *Patata* using the provider and the name of the app. It will take the latest version found:

```bash
patata run "hockeyapp://?app=My App" --tags "@ci,@mybrand"
```

You can use a regular expression to match a property of a HockeyApp app version:

```bash
patata run "hockeyapp://?app=My App&filterName=notes&filterValue=/.*My Note.*/gi"
```

Filters are based on the attribute names from the [HockeyApp API Versions](https://support.hockeyapp.net/kb/api/api-versions) documentation page.


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
[coverity-scan-image]: https://scan.coverity.com/projects/10394/badge.svg
[coverity-scan-url]: https://scan.coverity.com/projects/eridem-patata-cli

# Copyrights

Patata is based on the great work of other Open Source projects. 

To learn more about the other projects, their licenses and authors, you can use this website:

[https://www.npmjs.com](https://www.npmjs.com/)

Searching for each dependency listed on the file ```package.json``` under the section ```dependencies``` and ```devDependencies```.
