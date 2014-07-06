# linino-components
=================

This is a complementary library for the Linino boards used togheter with Johnny-five library
and Node.Js system.

It wants hide the required mechanims needed to handle specific sensors in order to use
that in an higher way.

## Components

<strong>keyboard</strong>          = A Matrix 12Keys Keypad<br>
<strong>magneticswitch</strong>    = A Magnetic switch<br> 
<strong>pwmanlcontrolled</strong>  = A digital PWM controlled by an analog input<br>


## Usage
### Configuration
All the components are fully configured about the pin tu be use
the configuration is done trought a JSON data 

<b><i>var exampleData={<br>
		"pinAlimentation":3,<br>
		"pinDetect":'A0',<br>
		"delayDetection":1000,<br>
		"threshold":100<br>
};<br>
exampleComponent.config(exampleData);<br></b></i>

#### Matrix Keypad
The configuration of the Keyboard is due by the following JSON:<br>
<b><i>var buttons = [['1','3','2'],['4','6','5'],['7','9','8'],['*','#','0']]; <br>
"keys": {<br>
                        "Row1":int,           // # of the Digital pin will be used for Row1 <br>
                        "Row2":int,           // # of the Digital pin will be used for Row2<br>
                        "Row3":int,           // # of the Digital pin will be used for Row3<br>
                        "Col4":int,           // # of the Digital pin will be used for Col4<br>
                        "Col3":int,           // # of the Digital pin will be used for Col3<br>
                        "Col2":int,    	      // # of the Digital pin will be used for Col2<br>
                        "Col1":int,           // # of the Digital pin will be used for Col1<br>
                        "keys": buttons,      // Matrix of char of the Keys <br>
                        "buttonHoldTime":int, // # of mSec. of the HoldOn Time used to detect the pressed Keyr Col1<br>
                        "ScanCompleted":int,  // # of mSec that remain HIGH the signal on each Row<br>
                        "feedBack":13}<br></b></i>
The component send an event <strong><i>''buttonPressed'</i></strong> when detect a key.<br>

#### Reed Switch
The configuration of the Reed Switch is due by the following JSON:<br>
<b><i>
var switchConf={<br>
                "pinAlimentation":int,     // # of the PWM pin will be used to send the signal <br>
                "pinDetect":int,           // # of the Analog pin used to detect the Reed status <br>
                "delayDetection":1000,     // NOT USED in this release
                "threshold":100	           // NOT USED in this release
};
</i></b><br>
The component could togle its enable status using:  <b><i>enableTogle();</b></i><br>
If the component is enable sends the event <strong><i>''SwitchOpen'</i></strong> or <strong><i>''SwitchClose'</i></strong><br>
according with its status.<br>


#### PWM controlled by Analog input (not completed in this release)
The configuration of the component is due by the following JSON:<br>
<b><i>var dimmerLight ={
                "sensor":'int,     // # of the Analog Pin <br>
                "zeroX":11,        // NOT USEDin this release<br>
                "light":{      <br>
                        'pin':int, // # of the PWM pin <br>
                        'luxMin':int, // # min PWM value that is used, it is mapped from the "sensor" read value <br>
                        'luxMax':int  // # max PWM value that is used, it is mapped from the "sensor" read value <br>
                },<br>
                "modal":'invert'      // used to invert the PWM, higer is the "sensor" value, lower is the PWM value<br>
                                      // no configuration meas  "direct" <br>
};</b></i><br>
 <br>
the component could be activated using:<b><i> enableDimmer(true);</i></b>

