var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

  var UltrasoundLevelCharacteristic = function() {
  UltrasoundLevelCharacteristic.super_.call(this, {
      uuid: 'AAA1',
      properties: ['read', 'notify'],
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

function random(high, low){
	return Math.floor(Math.random()*(high - low)+low);
}


UltrasoundLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {

  var distance_front = random(500, 30);
  var distance_left = random(500, 30);
  var distance_right = random(500, 30);
  var ultrasound_string = distance_front+","+distance_left+","+distance_right;
  console.log(ultrasound_string);
  callback(this.RESULT_SUCCESS, new Buffer(ultrasound_string));
};

UltrasoundLevelCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('UltrasoundLevelCharacteristic - onSubscribe');
  this._updateValueCallback = updateValueCallback;
};

UltrasoundLevelCharacteristic.prototype.onUnsubscribe = function() {
  console.log('UltrasoundLevelCharacteristic - onUnsubscribe');
  this._updateValueCallback = null;
};

module.exports = UltrasoundLevelCharacteristic;
