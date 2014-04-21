slideControl
================

jQuery plugin that allows you to easily make sliders for range inputs

![Example](https://raw.githubusercontent.com/sinyawskiy/slideControl/master/img/example.png)

Default settings is:
findLabel (false)
-----------------
slideControl find input label and use it in self template


fromMinMaxBounds (false)
------------------------
slideControl find number input min, max and step properties and override with them default settings lowerBound, upperBound and step

speed(400)
----------
slideControl fill speed

lowerBound (1)
--------------
slider minimum value 

upperBound (10)
---------------
slider maximum value 

step (1)
--------
slider step value 


Simple example
==============

jQuerySelector.find('manySlideNumberInputs').slideControl({
    fromMinMaxBounds: true,
    findLabel:true,
    step: 1
});

This script was rewritten for my personal projects. slideControl is fast, easy and simple.


