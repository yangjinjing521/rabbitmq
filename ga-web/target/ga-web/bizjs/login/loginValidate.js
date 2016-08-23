var handleLogin = function() {
	$('#loginMainForm').validate({
		errorElement : 'div',
		errorClass : 'help-block',
		focusInvalid : false,
		rules : {
			loginMainPassword : {
				required : true
			},
			loginMainUserName : {
				required : true
			}
		},

		messages : {
			loginMainUserName : "请输入用户名",
			loginMainPassword : "请输入密码"
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

		invalidHandler : function(event, validator) {
		},

		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error');
		},

		success : function(label) {
			label.closest('.form-group').removeClass('has-error');
			label.remove();
		},

		errorPlacement : function(error, element) {
			error.insertAfter(element.closest('.input-icon'));
		}
	});
	$('.login-form input').keypress(function(e) {
		if (e.which == 13) {
			login();
		} else {
			return;
		}
	});
	
	$("#loginSubmitButton").bind("click", function() {
		login();
	});
	
	function login() {
		if ($('#loginMainForm').valid()) {
			$("#loginSubmitButton").attr("disabled", true);
		} else {
			loginBtnBack();
			return;
		}
		var formArray = $('#loginMainForm').serializeArray();
		var formData = new Object();
		$.each(formArray, function(index, value) {
			formData[value.name] = value.value;
		});
		$.ajax({
			type : "POST",
			url : "/Action!LoginAction_doLogin.go",
			data : {
				"submit" : JSON.stringify(formData)
			},
			dataType : "json",
			async : true,
			success : function(data) {
				var error = data.error;
				if (error) {
					$("#message",$('.login-form')).empty().html(error).fadeIn();
					$('#messageBox', $('.login-form')).show();
					loginBtnBack();
				} else {
					loginBtnBack();
					if (top != this) {
						top.location.href = "Action_form!HomeAction_home.go";
					} else {
						window.location.href = "Action_form!HomeAction_home.go";
					}
				}
			},
			error : function(data) {
				loginBtnBack()
			}
		});
	}

	function loginBtnBack() {
		$("#loginSubmitButton").attr("disabled", false);
	}
}
var handleRegister = function() {
	$('#registNewForm').validate({
		errorElement : 'div',
		errorClass : 'help-block',
		focusInvalid : false,
		rules : {
			registerUsercode : {
				minlength : 4,
				maxlength : 10,
				required : true,
				remote : "/Action!LoginAction_checkUserCode.go"
			},
			registerEmail : {
				required : true,
				email : true
			},
			registerPassword : {
				required : true,
				minlength : 6,
				maxlength : 18
			},
			registerAgree : {
				required : true
			},
			registerPrePassword : {
				required : true,
				equalTo : "#registerPassword"
			}
		},

		messages : {
			registerUsercode : {
				required : "请输入用户名",
				minlength : "用于名必须大于{0}个字符",
				maxlength : "用于名必须小于{0}个字符",
				remote : "用户名已经存在！"
			},
			registerPassword : {
				required : "请输入密码",
				minlength : "密码必须大于{0}位",
				maxlength : "密码必须小于{0}位"
			},
			registerEmail : {
				required : "请输入邮箱地址",
				email : "请输入正确的邮箱地址"
			},
			registerPrePassword : {
				required : "请输入确认密码",
				equalTo : "两次输入的密码必须相同"
			},
			registerAgree : "您还没有同意注册条款"
		},
		invalidHandler : function(event, validator) {

		},

		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error'); 
		},

		success : function(label) {
			label.closest('.form-group').removeClass('has-error');
			label.remove();
		},

		errorPlacement : function(error, element) {
			if (element.attr("name") == "registerAgree") { 
				error.insertAfter($('#register_tnc_error'));
			} else if (element.closest('.input-icon').size() === 1) {
				error.insertAfter(element.closest('.input-icon'));
			} else {
				error.insertAfter(element);
			}
		}
	});
	
	$("#registerButton").bind("click", function() {
		if ($('#registNewForm').valid()) {
			$("#registerButton").attr("disabled", true);
			register($('#registNewForm'));
		}
	});

	function register(form) {
		$("#registerMessageBox").fadeOut();
		submit(form, "/Action!LoginAction_register.go", function(data) {
			var error = data.error;
			if (error) {
				$("#message",$('.register-form')).empty().html(error).fadeIn();
				$('#messageBox', $('.register-form')).show();
				$("#registerButton").attr("disabled", false);
			} else {
				jQuery('.login-form').show();
				jQuery('.register-form').hide();
				$("#registerButton").attr("disabled", false);
			}
		}, function(data) {
			$("#registerMessageBox").empty().removeClass("hidden").html("发生错误，请与系统管理员联系").fadeIn();
			$("#registerButton").attr("disabled", false);
		}, true)
	}

	jQuery('#register-btn').click(function() {
		jQuery('.login-form').hide();
		jQuery('.register-form').show();
	});

	jQuery('#register-back-btn').click(function() {
		jQuery('.login-form').show();
		jQuery('.register-form').hide();
	});
}

var handleForgetPassword = function() {
	$('.forget-form').validate({
		errorElement : 'span', // default input error message container
		errorClass : 'help-block', // default input error message class
		focusInvalid : false, // do not focus the last invalid input
		ignore : "",
		rules : {
			email : {
				required : true,
				email : true
			}
		},

		messages : {
			email : {
				required : "Email is required."
			}
		},

		invalidHandler : function(event, validator) { // display error alert
			// on form submit

		},

		highlight : function(element) { // hightlight error inputs
			$(element).closest('.form-group').addClass('has-error'); // set
			// error
			// class
			// to
			// the
			// control
			// group
		},

		success : function(label) {
			label.closest('.form-group').removeClass('has-error');
			label.remove();
		},

		errorPlacement : function(error, element) {
			error.insertAfter(element.closest('.input-icon'));
		},

		submitHandler : function(form) {
			form.submit();
		}
	});

	$('.forget-form input').keypress(function(e) {
		if (e.which == 13) {
			if ($('.forget-form').validate().form()) {
				$('.forget-form').submit();
			}
			return false;
		}
	});

	jQuery('#forget-password').click(function() {
		jQuery('.login-form').hide();
		jQuery('.forget-form').show();
	});

	jQuery('#back-btn').click(function() {
		jQuery('.login-form').show();
		jQuery('.forget-form').hide();
	});

}