"use strict";

var Liftoff = require('liftoff');

var Patata = new Liftoff({
  name: 'patata',
  processTitle: 'patata',
  moduleName: 'patata',
  configName: 'patatafile'
});

Patata.launch({}, function(result) {
    // Require patatafile
    require(result.configPath);
    var patata = require(result.modulePath);

    var cli = patata.cli;
    cli(result, patata);
});