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
	$('#addFrom').validate({
		
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
	
	
	
	$("#add").bind("click",function() {
		 $('#addModal').modal();
	});
	
	$("#mody").bind("click",function() {
		
		//debugger;
		var table = $("#resource_list")
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
 			url : "/Action!ResourceAction_queryOne.go",
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
		}
	});
	
}


