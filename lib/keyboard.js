var j5 = require("johnny-five");

var netEmitter = require("events").EventEmitter;
var util = require("util");
var debug = false;

var KeyBoard =  function(debug) {
	netEmitter.call(this);

	this.debug=debug;
	this.maininterval=0;
	this.keyMap;
	this.rows=0;

	// it will be changed in configuration withthe real matrix
	this.buttonPressed=255;

	var parent = this;

	this.configure = function(config) {
		if (debug === true)
			console.log('keyboard config', config);

		parent.keyMap=config;
		this.feedBack = new j5.Led({
			pin:parent.keyMap.feedBack
		});
		
		this.row1 = new j5.Led({
			pin:parent.keyMap.Row1
		});
		this.row2 = new j5.Led({
			pin:parent.keyMap.Row2
		});
		this.row3 = new j5.Led({
			pin:parent.keyMap.Row3
		});


		this.col1 = new j5.Button({
			pin:parent.keyMap.Col1,
			holdtime:parent.keyMap.buttonHoldTime,
			invert:false
		});
		this.col2 = new j5.Button({
			pin:parent.keyMap.Col2,
			holdtime:parent.keyMap.buttonHoldTime,
			invert:false
		});
		this.col3 = new j5.Button({
			pin:parent.keyMap.Col3,
			holdtime:parent.keyMap.buttonHoldTime,
			invert:false
		});
		this.col4 = new j5.Button({
			pin:parent.keyMap.Col4,
			holdtime:parent.keyMap.buttonHoldTime,
			invert:false
		});


		this.col1.on('hold', function(){
			if (parent.debug ===true) {
				console.log('hold col1');
			}
			parent.doAction(1, parent.rows, true);
		});

		this.col2.on('hold', function(){
			if (parent.debug ===true) {
				console.log('hold col2');
			}
			parent.doAction(2, parent.rows, true);
		});

		this.col3.on('hold', function(){
			if (parent.debug ===true) {
				console.log('hold col3');
			}
			parent.doAction(3, parent.rows, true);
		});

		this.col4.on('hold', function(){
			if (parent.debug ===true) {
				console.log('hold col4');
			}
			parent.doAction(4, parent.rows, true);
		});

		this.col1.on('release', function(){
			if (parent.debug ===true) {
				console.log('release col1');
			}
			parent.doAction(1, parent.rows, false);
		});

		this.col2.on('release', function(){
			if (parent.debug ===true) {
				console.log('release col2');
			}
			parent.doAction(2, parent.rows, false);
		});

		this.col3.on('release', function(){
			if (parent.debug ===true) {
				console.log('release col3');
			}
			parent.doAction(3, parent.rows, false);
		});

		this.col4.on('release', function(){
			if (parent.debug ===true) {
				console.log('release col4');
			}
			parent.doAction(4, parent.rows, false);
		});

		this.start();
	};	

	this.doAction = function(col, row, pressed){

		if (pressed!==true) {
			parent.feedBack.off();
		} else {
			parent.feedBack.on();
			var actualButton = parent.keyMap.keys[col-1][row];  //.....just for first test
			
			//avoid "undefined" detection
			if (actualButton){
				// map col & row to data
				if (debug === true){
					console.log('column=', col);
					console.log('row=', row);
					console.log('key ',pressed,' is', actualButton);
				}			

				//Send only if new button .... not already sent
				if ((actualButton !== parent.buttonPressed) && (pressed===true)){
					parent.buttonPressed = actualButton;
					this.emit('buttonPressed', actualButton);
				} if ((actualButton !== parent.buttonPressed) && (pressed===true)){
					parent.buttonPressed = 255;
					this.emit('buttonReleased', actualButton);
				}
			}
		}
	};



	this.start = function(){	

		parent.feedBack.off();
		
		parent.maininterval = setInterval(function() {

			parent.rows++;
			switch (parent.rows){
			case 1:
				if (debug === true)
					console.log('switch', parent.rows);
				parent.row2.off();
				parent.row3.off();
				parent.row1.on();
				break;

			case 2:
				if (debug === true)
					console.log('switch', parent.rows);
				parent.row1.off();
				parent.row3.off();
				parent.row2.on();
				break;

			case 3:
				if (debug === true)
					console.log('switch', parent.rows);
				parent.row1.off();
				parent.row2.off();
				parent.row3.on();
				parent.rows=0; // restart
				break;			
			};		
		}, parent.keyMap.ScanCompleted);
	};
};

//Inherit event api
util.inherits(KeyBoard, netEmitter);
module.exports = KeyBoard;