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
All the components are fully configured for the used Pin
the configuration is done trought a JSON data 

<b><i>var exampleData={
		"pinAlimentation":3,
		"pinDetect":'A0',
		"delayDetection":1000,
		"threshold":100
};
exampleComponent.config(exampleData);</b></i>



## Developing
