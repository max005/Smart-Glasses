var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

  var UltrasoundLevelCharacteristic = function() {
  UltrasoundLevelCharacteristic.super_.call(this, {
      uuid: 'AAA1',
      properties: ['read'],
      descriptors: [
        new Descriptor({
            uuid: '2901',
            value: 'Ultrasound Level'
        })
      ]
  });
};

util.inherits(UltrasoundLevelCharacteristic, Characteristic);

function usleep(time) {
    start = us.now();
    while (true) {
        if (us.since(start) > time) {
            return;
        }
    }
}


UltrasoundLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {

  var ultrasound_string = "140,100,50";
  console.log(ultrasound_string);
  callback(this.RESULT_SUCCESS, new Buffer(ultrasound_string));
};

module.exports = UltrasoundLevelCharacteristic;
