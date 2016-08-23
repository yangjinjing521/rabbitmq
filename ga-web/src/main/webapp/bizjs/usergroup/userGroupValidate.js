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
	$('#userGroupAddForm').validate({
		
		errorElement : 'div',
		errorClass : 'help-block',
		focusInvalid : false,
		rules : {
			newGroupCode : {
				required : true,
				remote : "/Action!UserGroupAction_checkUserGroupCode.go"
			},
			newGroupName : {
				required : true,
			}
		},

		messages : {
			newGroupCode : {
				required : "请输入用户组代码",
				remote : "用户组代码已经存在！"
			},
			newGroupCode : {
				required : "请输入用户组名称",
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
	
	$("#save").bind("click", function() {
		if ($('#userGroupAddForm').valid()) {
			register($('#userGroupAddForm'));
		}
	});

	function register(form) {
		$("#messageBox").fadeOut();
		$("#save").attr("disabled", true);
		submit(form, "/Action!UserGroupAction_addOrUpdateGroup.go", function(data) {
			var error = data.error;
			if (error) {
				$("#message",$('.register-form')).empty().html(error).fadeIn();
				$('#messageBox', $('.register-form')).show();
				$("#save").attr("disabled", false);
			} else {
				$('#userGroupAddForm')[0].reset();
				$("#save").attr("disabled", false);
			}
			userGroupGrid.getDataTable().ajax.reload();
		}, function(data) {
			$("#messageBox").empty().removeClass("hidden").html("发生错误，请与系统管理员联系").fadeIn();
			$("#save").attr("disabled", false);
		}, true)
		
	}

	
	$("#del").bind("click",function() {
		//debugger;
		var table = $("#usergroup_list")
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
 			url : "/Action!UserGroupAction_deleteGroup.go",
 			data : {
 				"submit" : JSON.stringify(formData)
 			},
 			dataType : "json",
 			async : true,
 			success : function(data) {
 				userGroupGrid.getDataTable().ajax.reload();
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
	
		},

		messages : {
			
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
	$("#updateGroup").bind("click", function() {
		if ($('#modifyForm').valid()) {
			registerMod($('#modifyForm'));
		}
	});

	function registerMod(form) {
		$("#messageBox").fadeOut();
		$("#updateGroup").attr("disabled", true);
		submit(form, "/Action!UserGroupAction_addOrUpdateGroup.go", function(data) {
			var error = data.error;
			if (error) {
				$("#message",$('.register-form')).empty().html(error).fadeIn();
				$('#messageBox', $('.register-form')).show();
				$("#updateGroup").attr("disabled", false);
			} else {
				$('#modifyForm')[0].reset();
				$("#updateGroup").attr("disabled", false);
			}
			userGroupGrid.getDataTable().ajax.reload();
		}, function(data) {
			$("#messageBox").empty().removeClass("hidden").html("发生错误，请与系统管理员联系").fadeIn();
			$("#updateGroup").attr("disabled", false);
		}, true)
	}
	
	$("#mody").bind("click",function() {
		//debugger;
		var table = $("#usergroup_list")
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
 			url : "/Action!UserGroupAction_queryOneUserGroup.go",
 			data : {
 				"id" : uids,
 			},
 			dataType : "json",
 			async : true,
 			success : function(data) {
 				$("#id_mod").val(data.id);
 				$("#groupCode_mod").val(data.groupCode);
 				$("#groupName_mod").val(data.groupName);
 				$("#groupStatus").val(data.groupStatus);
 			},
 			error : function(data) {
 			}
 		});
		}
	});
	
}

