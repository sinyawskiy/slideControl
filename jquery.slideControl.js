/*
 * slideControl - jQuery Plugin
 * version: 1.2 October 2012
 * @requires jQuery v1.6 or later
 *
 * Examples at http://nikorablin.com/slideControl
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * update by Sinyawskiy at 21.04.2014
 */
(function($){

	 var methods = {
            'init': function(options){
                var defaults = {
                    findLabel: false,
                    fromMinMaxBounds: false,
                    speed: 400,
                    lowerBound: 1,
                    upperBound: 10,
                    step: 1
                };
                var settings = $.extend(defaults, options);

                return this.each(function() {
                    // set vars
                    // defaults override
                    if(settings.fromMinMaxBounds){
                        var attrMin = $(this).attr('min');
                        if(attrMin){
                            settings.lowerBound = parseInt(attrMin);
                        }
                        var attrMax = $(this).attr('max');
                        if(attrMax){
                            settings.upperBound = parseInt(attrMax);
                        }
                        var attrStep = $(this).attr('step');
                        if(attrStep){
                            settings.step = parseInt(attrStep);
                        }
                    }

                    var position = 0,
                        $this = $(this),
                        controlId= $this.attr('id');
                    $this.addClass('slideControlInput');

                    var label_html='';
                    if(settings.findLabel){
                        var labelHandler = $('label[for='+controlId+']');
                        if(labelHandler.length){
                            label_html = labelHandler[0].outerHTML;
                            labelHandler.remove();
                        }
                    }

                    $this.replaceWith('<span class="slideControl"><span class="slideControlInputContainer">'+$this[0].outerHTML+label_html+'</span><span class="slideControlContainer"><span class="slideControlFill" style="width:' + $this.val()*10 + '%"><span class="slideControlHandle"></span></span></span></span>');
                    $this = $('#'+controlId);

                    var container = $this.parent().parent().find('.slideControlContainer');
                    var fill = container.find('.slideControlFill');
                    var handle = fill.find('.slideControlHandle');
                    var containerWidth = container.outerWidth() + 1;
                    var handleWidth = handle.outerWidth();
                    var controlSettings =  $.extend({}, settings);

                    container.click(function(e) {
                        e.preventDefault();
                        var self = $(this);
                        var value = methods.getValue(e.pageX, self.offset().left, handleWidth, containerWidth, controlSettings);
                        value = methods.checkBoundaries(value, controlSettings);
                        methods.animate(fill, methods.getPosition(value, controlSettings), controlSettings);
                        $this.val(value);
                    });

                    $(document).mouseup(function(e) {
                        e.preventDefault();
                        $(this).unbind('mousemove.slidecontrol');
                    });

                    handle.mousedown(function(e) {
                        e.preventDefault();
                        var value = 0;
                        $(document).bind('mousemove.slidecontrol', function(e) {
                            e.preventDefault();
                            value = methods.getValue(e.pageX, container.offset().left, handleWidth, containerWidth, controlSettings);
                            value = methods.checkBoundaries(value, controlSettings);
                            position = methods.getPosition(value, controlSettings);
                            $(fill).width(position + "%");
                            $this.val(value);
                        });
                    });

                    var changeDelay;
                    $this.change(function() {
                        if(changeDelay){
                            clearTimeout(changeDelay);
                        }
                        changeDelay = setTimeout(function(){
                            methods.setSlider(fill, $this, controlSettings);
                            changeDelay = undefined;
                        }, 500);
                    });

                });
            },

            'setSlider': function(fill, input, options){
                var inputVal = parseInt(input.val()),
                    value = methods.checkBoundaries(inputVal, options);
                if (inputVal > options.upperBound){
                     input.val(options.upperBound);
                }else if (inputVal < options.lowerBound){
                     input.val(options.lowerBound);
                }
                methods.animate(fill, methods.getPosition(value, options), options);
            },

            'animate':function(fill, value, options){
                $(fill).animate({ width: value + "%"}, options.speed);
            },

            'checkBoundaries': function(value, options) {
                if (value < options.lowerBound){
                    return options.lowerBound;
                }else if (value > options.upperBound){
                    return options.upperBound;
                }else{
                    return value;
                }
            },

            // get value from page position
            'getValue': function (pageX, offset, handleWidth, containerWidth, options){
                var value = Math.round(((pageX - offset + handleWidth/2)/containerWidth) * options.upperBound);
                return value - value % options.step;
            },

            // get percent position slidefill from value
            'getPosition': function (value, options){
                return value/options.upperBound*100;
            }
        };

        $.fn.slideControl = function(options) {
              return methods.init.apply(this, arguments);
        };

})(jQuery);
