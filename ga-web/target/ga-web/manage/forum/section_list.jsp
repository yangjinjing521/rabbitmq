<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<h3 class="page-title">论坛管理</h3>
<div class="page-bar">
	<ul class="page-breadcrumb" id="guideBar">
		<li><i class="fa fa-home"></i> <a href="/">首页</a> <i class="fa fa-angle-right"></i></li>
		<li><a href="javascript:void(0);">看台管理</a></li>
	</ul>
</div>
<div class="row">
	<div class="col-md-12">
		<div class="pull-right">
			<button id="add" type="button" class="btn btn-success" data-toggle="modal" data-target="#addModal">增加</button>
			<button id="mody" type="button" class="btn btn-success">修改</button>
			<button id="del" type="button" class="btn btn-success">删除</button>
		</div>
	</div>
</div>
<div class="clearfix"></div>
<div class="row">
	<div class="col-md-12">
		<!-- Begin: life time stats -->
		<div class="portlet light">
			<div class="portlet-body">
				<div class="table-container">
					<table class="table table-striped table-bordered table-hover"
						id="section_list">
						<thead>
							<tr role="row" class="heading">
								<th width="2%"><input type="checkbox"
									class="group-checkable"></th>
								<th width="20%">名称</th>
								<th width="20%">备注</th>
								<th width="20%">创建时间</th>
								<th width="20%">修改时间</th>
								<th width="18%">操作</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<!-- End: life time stats -->
	</div>
</div>
<!-- Modal -->
<form id="sectionAddForm" class="form-horizontal">
<div class="alert alert-danger display-hide" id="messageBox" style="display: none;">
				<button class="close" data-close="alert"></button>
				<span id="message"> </span>
			</div>
<div class="modal fade bs-example-modal-lg" id="addModal" tabindex="-1"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" >
    <div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">新建</h4>
      </div>
      <br>
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-3">看台名</label>
											<div class="col-md-9">
												<input type="hidden" id="sectionId" name="id" class="form-control input-circle-left" placeholder="">
												<input type="text" id="name" name="name" class="form-control input-circle" placeholder="Chee Kin">
												<span class="help-block">
												This is inline help </span>
											</div>
										</div>
									</div>
								</div>
								<div class="row">
									<!--/span-->
									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-3">备注</label>
											<div class="col-md-9">
												<input type="text" id="note" name="note" class="form-control input-circle" placeholder="Chee Kin">
												<span class="help-block">
												This is inline help </span>
											</div>
										</div>
									</div>
									<!--/span-->
								</div>
								
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label col-md-3">上级看台</label>
											<div class="col-md-9">
												<div class="input-group">
											<input type="text" disabled id="pSection" class="form-control input-circle-left" placeholder="">
											<input type="hidden" id="pId" name="PId" class="form-control input-circle-left" placeholder="">
											<span class="input-group-addon input-circle-right">
											<i class="fa fa-section"></i>
											</span>
										</div>
											</div>
										</div>
									</div>
								</div>
								
								<div class="modal-footer">
							        <button type="button" id="cancel" class="btn btn-default" data-dismiss="modal">取消</button>
							        <button type="button" id="savesection" class="btn btn-primary">提交</button>
							    </div>				
		</div>
    </div>
  </div>
  </form>
<link rel="stylesheet" type="text/css" href="../../resources/global/plugins/bootstrap-gtreetable/bootstrap-gtreetable.css" />
<script src="../../resources/global/scripts/datatable.js"></script>
<script src="../../resources/global/plugins/datatables/media/js/jquery.dataTables.js" type="text/javascript"></script>
<script src="../../resources/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js" type="text/javascript"></script>
<script src="../../resources/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="../../resources/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="../../resources/global/plugins/bootstrap-gtreetable/bootstrap-gtreetable.js" type="text/javascript"></script>
<script src="../../bizjs/forum/forum.js" type="text/javascript"></script>
<script>
	var grid;
	var guideBarHtml;
	var pname = <%=request.getParameter("pname")%>;
	jQuery(document).ready(function() {
		var pid = <%=request.getParameter("pid")%>;
		var barNames = <%=request.getParameter("barNames")%>;
		if(!pid){
			pid=0;
		}
		if(!pname){
			pname="";
		}
		if(barNames){
			var barNameArray = barNames.split(",");
			var barHtml = '';
			for(var i=0;i<barNameArray.length;i++){
				barHtml += '<li>';
				barHtml += '<i class="fa fa-angle-right"></i>';
				barHtml += '<a href="#">'+barNameArray[i]+'</a> ';
				barHtml += "</li>";
			}
			jQuery("#guideBar").append(barHtml);
		}
		jQuery("#pSection").val(pname);
		jQuery("#pId").val(pid);
		grid = Forum.initSectionList(pid);
	});
	
	$("#mody").bind("click", function() {
		//debugger;
		var table = $("#section_list")
        var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table);
		var sectionId = "";
		if(set.size()!=1){
			alert("至少和只能选择一条数据进行修改！");
			return false;
		}else{
			$('#addModal').modal();
         	$(set).each(function(i,v) {
            	var value = $(v).val();
            	sectionId=value;
         	});
	         $.ajax({
	 			type : "POST",
	 			url : "/Action!ForumAction_queryOnSection.go",
	 			data : {
	 				"id" : sectionId
	 			},
	 			dataType : "json",
	 			async : true,
	 			success : function(data) {
	 				$("#sectionId").val(data.id);
	 				$("#name").val(data.name);
	 				$("#note").val(data.note);
	 				$("#pSection").val(pname);
	 			},
	 			error : function(data) {
	 			}
	 		});
		}
	});
	
	$("#del").bind("click", function() {
		//debugger;
		var v = confirm("将删除该看台下所有子看台以及帖子,是否继续?")
		if(v){
			var table = $("#section_list")
	        var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table);
			var sectionIds = "";
	       	$(set).each(function(i,v) {
	       		if(i!=0){
	       			sectionIds += ",";
	       		}
	          	var value = $(v).val();
	          	sectionIds += value;
	       	});
	        $.ajax({
				type : "POST",
				url : "/Action!ForumAction_deleteSection.go",
				data : {
					"ids" : sectionIds
				},
				dataType : "json",
				async : true,
				success : function(data) {
					alert("删除成功");
					grid.getDataTable().ajax.reload();
				},
				error : function(data) {
				}
			});
		}
	});
	
	$("#savesection").bind("click", function() {
		var formArray = $("#sectionAddForm").serializeArray();
		var formData = new Object();
		$.each(formArray, function(index, value) {
			formData[value.name] = value.value;
		});
		$.ajax({
 			type : "POST",
 			url : "/Action!ForumAction_addSection.go",
 			data : {
 				"submit" : JSON.stringify(formData)
 			},
 			dataType : "json",
 			async : true,
 			success : function() {
 				alert("操作成功");
 				$("#addModal").modal("hide");
				grid.getDataTable().ajax.reload();
 			},
 			error : function(data) {
 				alert(data);
 			}
 		});
	});
</script>
<!-- END JAVASCRIPTS -->
