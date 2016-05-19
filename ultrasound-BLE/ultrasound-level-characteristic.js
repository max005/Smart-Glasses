var util = require('util'),
  os = require('os'),
  exec = require('child_process').exec,
  bleno = require('bleno'),
  mraa = require('mraa'),
  us = require('microseconds'),
  Descriptor = bleno.Descriptor,
  Characteristic = bleno.Characteristic;

var pinF = new mraa.Gpio(47);
var pinL = new mraa.Gpio(48);
var pinR = new mraa.Gpio(36);
pinF.dir(mraa.DIR_IN);
pinL.dir(mraa.DIR_IN);
pinR.dir(mraa.DIR_IN);

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
  	//console.log(pulseOff);
  	//console.log(pulseOn);
  	floatValue = (pulseOn - pulseOff)/10;
  	//console.log(floatValue);
  	distance = Math.round(floatValue);
    if(distance < 30)
      distance = 30;
    else if(distance > 500)
      distance = 500;
  	return distance;
}

UltrasoundLevelCharacteristic.prototype.onReadRequest = function(offset, callback) {
  var distanceF;
  var distanceL;
  var distanceR;
  distanceF = getDistance(pinF);
  distanceL = getDistance(pinL);
  distanceR = getDistance(pinR);
  var ultrasound_string = distanceF+","+distanceL+","+distanceR;
  console.log(ultrasound_string);
  callback(this.RESULT_SUCCESS, new Buffer(ultrasound_string));
};

UltrasoundLevelCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  this._updateValueCallback = updateValueCallback;
  setInterval(function() {
    //poll sensor or get value or something
    var distance_front = getDistance(pinF);
    var distance_left = getDistance(pinL);
    var distance_right = getDistance(pinR);
    var ultrasound_string = distance_front+","+distance_left+","+distance_right;
    console.log(ultrasound_string);
    updateValueCallback(new Buffer(ultrasound_string));
  }, 1000);
};

UltrasoundLevelCharacteristic.prototype.onNotify = function() {
  //console.log('UltrasoundLevelCharacteristic - onNotify');
};

UltrasoundLevelCharacteristic.prototype.onUnsubscribe = function() {
  console.log('UltrasoundLevelCharacteristic - onUnsubscribe');
  this._updateValueCallback = null;
};

module.exports = UltrasoundLevelCharacteristic;

/*Analog
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