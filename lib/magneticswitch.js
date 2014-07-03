var j5 = require("johnny-five");
var netEmitter = require("events").EventEmitter;
var util = require("util");

var MagneticSwitch =  function(debug) {
	netEmitter.call(this);

	this.debug=debug;
	this.enabled=true;
	var parent = this;

	this.configure = function(config) {
		parent.enabled=true;
		this.switchPin = new j5.Sensor({
			pin: config.pinDetect, 
			freq: config.delayDetection, 
			threshold: config.threshold
		});

		// Set the digital in PWM to spend less power
		// it is not required to have full 5V for all the time
		this.alim = new j5.Led({
			pin:config.pinAlimentation, 
			  type: "PWM"
		});

		parent.alim.brightness(70);

		if (debug === true) {
			console.log('Magnetic config', config);
			console.log('pin', config.pinAlimentation,'activated');
		}

		this.switchPin.on('change', function(){
			if (debug === true) 
				console.log('change', this.value);
			
			// send event according with the Switch status
			// and if the notification is active
			if (parent.enabled === true){
				if (this.value===0) {
					if (debug === true) 
						console.log('sending SwitchOpen', this.value);
					parent.emit('SwitchOpen',this.value);
				} else {
					if (debug === true) 
						console.log('sending SwitchClose', this.value);
					parent.emit('SwitchClose', this.value);
				}				
			}
			
		});
				
	};	

	this.enableTogle = function() {
		parent.enable(!parent.enabled);
	}
	
	this.enable = function(ena) {
		parent.enabled = ena;

		if (ena === false) {
			parent.alim.off();
			if (debug === true) 
				console.log('Switch Disabled');
		}else{
			parent.alim.brightness(70);
			console.log(parent.switchPin.value)
			if (debug === true) 
				console.log('Switch Enabled');
		}
	}
};

//Inherit event api
util.inherits(MagneticSwitch, netEmitter);
module.exports = MagneticSwitch;