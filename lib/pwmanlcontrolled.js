var five = require("johnny-five");

var PwmAnlControlled =  function(debug) {
	this.debug=debug;
	this.dimmer;
	this.active;
	var parent = this;
	this.test;

	this.configure = function(dimmerConf) {
		//set default values
		this.min=10, this.max=1045, this.sensor='A5';
		this.zeroX=11,this.dimmerPin=13;
		parent.active=false;
		parent.test=0;

		console.log('Dimmer config',dimmerConf);

		parent.dataInit(dimmerConf);

		// configure the PWM out
		this.led = new five.Led({
			pin: parent.dimmerPin,
			type: "PWM"
		});

		// configure the ADC input
		this.anl = new five.Sensor({
			pin: parent.sensor,
			freq: 250,
			threshold: 5
		});

		// scale the light for pwm with the configured value
		this.anl.scale(parent.min, parent.max).on("change", function() {
			
			// dimmer only if the service is active
			if (parent.isDimmerEnabled() === true){
				if (parent.dimmer.modal){
					if (parent.debug===true) {
						console.log( 'value = ', this.value,' raw = ', this.raw);
						console.log ('invert', 255-this.value);
					}
					parent.led.brightness(255-this.value);
				}else{
					if (parent.debug===true) {
						console.log( 'value = ', this.value,' raw = ', this.raw)
						console.log ('direct ',this.value);
					}
					parent.led.brightness(this.value);
				}
			} else { // keep off 
				if (parent.debug===true) {
					console.log ('Dimmer OFF!!!!!');
				}
				parent.led.brightness(0);				
			}
		});

	};
	
	this.isDimmerEnabled = function(){
		if (parent.debug===true) {
			console.log('dimmer Enable=', parent.active);
			console.log('test =', parent.test);
		}
		return parent.active;
	};
	
	this.enableDimmer = function(activate){		
		parent.active = activate
		parent.test++;
		if (parent.debug===true) {
			console.log('dimmer request Enable=', parent.active);
			console.log('test =', parent.test);
		}
	};

	this.dataInit = function(dimmerConf){
		parent.dimmer = dimmerConf;

		// set the min and max value for the dimmer
		if (parent.dimmer.light.luxMax){
			parent.max=parent.dimmer.light.luxMax;
			if (parent.debug===true) {
				console.log('max=',parent.max);
			}
		}
		if (parent.dimmer.light.luxMin){
			parent.min=parent.dimmer.light.luxMin;
			if (parent.debug===true) {
				console.log('min=',parent.min);
			}
		}

		// Set the light output pin
		if (parent.dimmer.light.pin){
			parent.dimmerPin=parent.dimmer.light.pin;
			if (parent.debug===true) {
				console.log('dimmerPin=',parent.dimmerPin);
			}
		}

		// set the analog port
		if (parent.dimmer.sensor){
			parent.sensor=parent.dimmer.sensor;
			if (parent.debug===true) {
				console.log('anl sensor=', parent.sensor);
			}
		}

		// set the zeroX port
		if (parent.dimmer.zeroX){
			parent.zeroX=parent.dimmer.zeroX;
			if (parent.debug===true) {
				console.log('zeroX=', parent.zeroX);
			}
		}
	};
};

module.exports = PwmAnlControlled;