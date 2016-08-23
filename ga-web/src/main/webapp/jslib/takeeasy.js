function submit(form, url, callBack, error, async) {
	var formArray = $(form).serializeArray();
	var formData = new Object();
	$.each(formArray, function(index, value) {
		formData[value.name] = value.value;
	});
	$.ajax({
		type : "POST",
		url : url,
		data : {
			"submit" : JSON.stringify(formData)
		},
		dataType : "json",
		async : async,
		success : callBack,
		error : error
	});
}

var validate = {
	errorElement : 'div',
	errorClass : 'help-block',
	focusInvalid : false,
	rules : {

	},

	messages : {

	},

	invalidHandler : function(event, validator) {
		$('.alert-danger', $('.login-form')).show();
	},

	highlight : function(e) {
		$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	},

	success : function(e) {
		$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
		$(e).remove();
	},

	errorPlacement : function(error, element) {
		if (element.is(':checkbox') || element.is(':radio')) {
			var controls = element.closest('div[class*="col-"]');
			if (controls.find(':checkbox,:radio').length > 1)
				controls.append(error);
			else
				error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
		} else if (element.is('.select2')) {
			error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
		} else if (element.is('.chosen-select')) {
			error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
		} else
			error.insertAfter(element.parent());
	}
}

var tt = function() {
	return {
		submit : function(url,data,success,error,async) {
			$.ajax({
				type : "POST",
				url : url,
				data : data,
				dataType : "json",
				async : async,
				success : success,
				error : error
			});
		}
	}
}(jQuery);