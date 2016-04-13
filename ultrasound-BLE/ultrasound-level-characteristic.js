var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  mraa = require('mraa'),
  us = require('microseconds'),
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

function getDistance(pin) {
    var pulseOn, pulseOff;
  	var floatValue, distance;
  	while (pin.read() == 1) {
  	}
  	while (pin.read() == 0) {
    	pulseOff = us.now();
  	}
  	while (pin.read() == 1) {
    	pulseOn = us.now();
  	}
  	console.log(pulseOff);
  	console.log(pulseOn);
  	floatValue = (pulseOn - pulseOff)/10;
  	console.log(floatValue);
  	distance = Math.round(floatValue);
  	return distance;
}

UltrasoundLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {
  /*
  var analogPin0 = new mraa.Aio(0)
  var analogPin1 = new mraa.Aio(1)
  var analogPin2 = new mraa.Aio(2)
  var leftValue = analogPin0.read();
  var rightValue = analogPin1.read();
  var frontValue = analogPin2.read();
  var leftDistance = leftValue*5;
  var rightDistance = rightValue*5;
  var frontDistance = frontValue*5;
  var ultrasound_string = leftValue+","+rightValue+","+frontValue;
  */
  /*
  var pwm11 = new mraa.Pwm(11);
  pwm11.enable(true);
  var value = pwm11.read();
  var ultrasound_string = value+",";
  */
  var pin3 = new mraa.Gpio(14);
  pin3.dir(mraa.DIR_IN);
  var distancePin3

  distancePin3 = getDistance(pin3);
  var ultrasound_string = distancePin3+",";
  console.log(ultrasound_string);
  callback(this.RESULT_SUCCESS, new Buffer(ultrasound_string));
};

module.exports = UltrasoundLevelCharacteristic;