$(document).ready(function() {
	$("#loginSubmitButton").bind("click", function() {
		if ($('#loginMainForm').valid()) {
			$("#loginSubmitButton").attr("disabled", true);
			login($('#loginMainForm'));
		}
	});

	function login(form) {
		$("#loginMessageBox").fadeOut();
		var formArray = $(form).serializeArray();
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
					$("#loginMessageBox").empty().removeClass("hidden").html(error).fadeIn();
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
				$("#registerMessageBox").empty().removeClass("hidden").html(error).fadeIn();
				$("#registerButton").attr("disabled", false);
			} else {
				show_box('login-box');
			}
		}, function(data) {
			$("#registerMessageBox").empty().removeClass("hidden").html("发生错误，请与系统管理员联系").fadeIn();
			$("#registerButton").attr("disabled", false);
		}, true)
	}

});