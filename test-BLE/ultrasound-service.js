var util = require('util'),
  bleno = require('bleno'),
  BlenoPrimaryService = bleno.PrimaryService,
  UltrasoundLevelCharacteristic = require('./ultrasound-level-characteristic');

function UltrasoundService() {
  UltrasoundService.super_.call(this, {
      uuid: 'AAAF',
      characteristics: [
          new UltrasoundLevelCharacteristic()
      ]
  });
}

util.inherits(UltrasoundService, BlenoPrimaryService);

module.exports = UltrasoundService;