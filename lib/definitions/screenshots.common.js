
module.exports = function () {
  this.Then(/^take a picture$/, function (callback) {
    console.log('this test', this.scenario)
    this.emu.takeScreenshot().then((screenShot) => {
      this.scenario.attach(new Buffer(screenShot, 'base64'), 'image/png')
      callback()
    })
  })
}
