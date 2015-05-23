// this function sets the value to the web instantly and starts a timer to send the value delayed to the server
function deviceHmTc_setDelayed(uid, item, val) {
    widget.update(item, val);
    
    obj = $('#' + uid);
    
    // check if there is still a timer
    if (obj.prop("setDelayTimer") != undefined ){
        clearTimeout(obj.prop("setDelayTimer"));
        obj.removeProp("setDelayTimer");
    }
    
    // set timer to send the value delayed
    obj.prop("setDelayTimer", setTimeout(function(){ 
                                           io.write(item, val);
                                           $('#' + uid).removeProp("setDelayTimer");
                                         }, 1500));
                                         
}

$(document).delegate('div[data-widget="device.hmtc"] > div > a[data-icon="minus"]', {
    'click': function (event, response) {
        var uid = $(this).parent().parent().attr('id');
        var step = $('#' + uid).attr('data-step');
        var item = $('#' + uid + 'set').attr('data-item');
		var val = widget.get(item);

		var temp = 17.0;
		if ($.isNumeric(val)) {
			temp = (Math.round((val - step) * 10) / 10).toFixed(1);
			temp = Math.max($('#' + uid).attr('min_temp'), temp);
		}  
        deviceHmTc_setDelayed(uid, item, temp);
    }
});

$(document).delegate('div[data-widget="device.hmtc"] > div > a[data-icon="plus"]', {
    'click': function (event, response) {
        var uid = $(this).parent().parent().attr('id');
        var step = $('#' + uid).attr('data-step');
        var item = $('#' + uid + 'set').attr('data-item');
		var val = widget.get(item);
		
		var temp = 17.0;
		if ($.isNumeric(val)) {
			temp = (Math.round((widget.get(item) * 1 + step * 1) * 10) / 10).toFixed(1);
			temp = Math.min($('#' + uid).attr('max_temp'), temp);
		}
        deviceHmTc_setDelayed(uid, item, temp);
    }
});
