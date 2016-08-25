'use strict'

module.exports = {
  jdk: 'You must install Java JDK: http://www.oracle.com/technetwork/java/javase/downloads/index.html',
  androidHome: 'You must setup ANDROID_HOME environment variable pointing to the Android SDK path: https://developer.android.com/studio/index.html#downloads',
  contentCommonArgumentsError: (current, fetchMethods) => {
    return `Wrong access type "${current}". It must be one of these "${fetchMethods}"`
  },
  notOnRootOrPatataConfigDoesNotExists: `You are not in the root directory or ".patata.yml" does not exists.`
}
