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
	

var handleRegister = function() {
	$('#userAddForm').validate({
		
		errorElement : 'div',
		errorClass : 'help-block',
		focusInvalid : false,
		rules : {
			registerUserCode : {
				minlength : 4,
				maxlength : 12,
				required : true,
				remote : "/Action!UserAction_checkUserCode.go"
			},
			registerPassWord : {
				required : true,
				minlength : 6,
				maxlength : 18
			},
			eMail : {
				required : true,
				email : true
			},
			mp :{
				number : true
			},
			tel :{
				number : true
			},
			qq :{
				number : true
			}
	
		},

		messages : {
			registerUserCode : {
				required : "请输入用户名",
				minlength : "用于名必须大于4个字符",
				maxlength : "用于名必须小于12个字符",
				remote : "用户名已经存在！"
			},
			eMail : {
				required : "请输入正确的邮箱地址"
			},
			registerPassWord : {
				required : "请输入密码",
				minlength : "密码必须大于6个字符",
				maxlength : "密码必须不能超过18个字符"
			},
			mp :{
				number : "此项只能填写数字"
			},
			tel :{
				number : "此项只能填写数字"
			},
			qq :{
				number : "此项只能填写数字"
			}
			
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
	
	$("#saveUser").bind("click", function() {
		if ($('#userAddForm').valid()) {
			register($('#userAddForm'));
		}
	});

	function register(form) {
		$("#messageBox").fadeOut();
		$("#saveUser").attr("disabled", true);
		submit(form, "/Action!UserAction_userAddorUpdate.go", function(data) {
			var error = data.error;
			if (error) {
				$("#message",$('.register-form')).empty().html(error).fadeIn();
				$('#messageBox', $('.register-form')).show();
				$("#saveUser").attr("disabled", false);
			} else {
				$('#userAddForm')[0].reset();
				$("#saveUser").attr("disabled", false);
				//$('#addModal').modal();
				//$.uniform.update($('#userAddForm'));
			}
			userGrid.getDataTable().ajax.reload();
		}, function(data) {
			$("#messageBox").empty().removeClass("hidden").html("发生错误，请与系统管理员联系").fadeIn();
			$("#saveUser").attr("disabled", false);
		}, true)
	}

	
	$("#del").bind("click",function() {
		//debugger;
		var table = $("#user_list")
             var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table);
		var uids="";
         $(set).each(function(i,v) {
             var value = $(v).attr("uid");
            	uids+="'"+value+"',";
         });
         var formData = new Object();
         formData["ids"] = uids;
         $.ajax({
 			type : "POST",
 			url : "/Action!UserAction_deleteUser.go",
 			data : {
 				"submit" : JSON.stringify(formData)
 			},
 			dataType : "json",
 			async : true,
 			success : function(data) {
 				userGrid.getDataTable().ajax.reload();
 			},
 			error : function(data) {
 			}
 		});
	});
	
	
	
}
	
	
	var handleRegisterModify = function() {
		$('#modifyForm').validate({
			
			errorElement : 'div',
			errorClass : 'help-block',
			focusInvalid : false,
			rules : {
				registerPassWord : {
					required : true,
					minlength : 6,
					maxlength : 18
				},
				eMail : {
					required : true,
					email : true
				},
				mp :{
					number : true
				},
				tel :{
					number : true
				},
				qq :{
					number : true
				}
		
			},

			messages : {
				eMail : {
					required : "请输入正确的邮箱地址"
				},
				registerPassWord : {
					required : "请输入密码",
					minlength : "密码必须大于6个字符",
					maxlength : "密码必须不能超过18个字符"
				},
				mp :{
					number : "此项只能填写数字"
				},
				tel :{
					number : "此项只能填写数字"
				},
				qq :{
					number : "此项只能填写数字"
				}
				
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
		$("#updateUser").bind("click", function() {
			if ($('#modifyForm').valid()) {
				registerMod($('#modifyForm'));
			}
		});

		function registerMod(form) {
			$("#messageBox").fadeOut();
			$("#updateUser").attr("disabled", true);
			submit(form, "/Action!UserAction_userAddorUpdate.go", function(data) {
				var error = data.error;
				if (error) {
					$("#message",$('.register-form')).empty().html(error).fadeIn();
					$('#messageBox', $('.register-form')).show();
					$("#saveUser").attr("disabled", false);
				} else {
					$('#modifyForm')[0].reset();
					$("#updateUser").attr("disabled", false);
				}
				userGrid.getDataTable().ajax.reload();
			}, function(data) {
				$("#messageBox").empty().removeClass("hidden").html("发生错误，请与系统管理员联系").fadeIn();
				$("#updateUser").attr("disabled", false);
			}, true)
		}
		
$("#add").bind("click",function() {
			 $('#addModal').modal();
	         $.ajax({
		 			type : "POST",
		 			url : "/Action!UserAction_getUserGroupList.go",
		 			data : {
		 			},
		 			dataType : "json",
		 			async : true,
		 			success : function(data) {
		 				$('#userGroup_add option').remove();
		 				for(var i=0;i<data.length;i++){
		 					if($('#userGroup_temp').val()==data[i].groupCode){
		 						$('#userGroup_add').append("<option selected value='"+data[i].groupCode+"'>"+data[i].groupName+"</option>");
		 					}else{
		 					$('#userGroup_add').append("<option value='"+data[i].groupCode+"'>"+data[i].groupName+"</option>");
		 					}
		 				}
		 			},
		 			error : function(data) {
		 			}
		 		});
		});
		
		$("#mody").bind("click",function() {
			
			//debugger;
			var table = $("#user_list")
	        var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table);
			var uids="";
			if(set.size()!=1){
				alert("至少和只能选择一条数据进行修改！");
			}else{
				$('#modifyModal').modal();
	         $(set).each(function(i,v) {
	             var value = $(v).attr("uid");
	             uids=value;
	         });
	         $.ajax({
	 			type : "POST",
	 			url : "/Action!UserAction_queryOneUser.go",
	 			data : {
	 				"id" : uids,
	 			},
	 			dataType : "json",
	 			async : true,
	 			success : function(data) {
	 				$("#userId_mod").val(data.userId);
	 				$("#registerUserName_mod").val(data.userName);
	 				$("#registerUserCode_mod").val(data.userCode);
	 				$("#registerPassWord_mod").val(data.userPassword);
	 				$("#userGender_mod").val(data.userGender);
	 				$("#userStatus_mod").val(data.userStatus);
	 				$("#eMail_mod").val(data.userEmail);
	 				$('#userGroup_temp').val(data.userGroup);
	 				$("#mp_mod").val(data.userMp);
	 				$("#tel_mod").val(data.userTel);
	 				$("#qq_mod").val(data.userQq);
	 			},
	 			error : function(data) {
	 			}
	 		});
	         $.ajax({
		 			type : "POST",
		 			url : "/Action!UserAction_getUserGroupList.go",
		 			data : {
		 			},
		 			dataType : "json",
		 			async : true,
		 			success : function(data) {
		 				$('#userGroup_mod option').remove();
		 				for(var i=0;i<data.length;i++){
		 					if($('#userGroup_temp').val()==data[i].groupCode){
		 						$('#userGroup_mod').append("<option selected value='"+data[i].groupCode+"'>"+data[i].groupName+"</option>");
		 					}else{
		 					$('#userGroup_mod').append("<option value='"+data[i].groupCode+"'>"+data[i].groupName+"</option>");
		 					}
		 				}
		 			},
		 			error : function(data) {
		 			}
		 		});
			}
		});
	}
