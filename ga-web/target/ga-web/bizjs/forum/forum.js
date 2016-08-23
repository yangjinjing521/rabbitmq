var Forum = function() {

	return {
		initSectionList : function(pid) {
			if(!pid){
				pid=0;
			}
			var bHtml = "";
			$("#guideBar a:gt(1)").each(function(){
				bHtml += $(this).text()+",";
			});
			var grid = new Datatable();
			grid.init({
				src : $("#section_list"),
				onSuccess : function(grid) {
					Metronic.unblockUI($("#section_list"));
				},
				onError : function(grid) {
					Metronic.unblockUI($("#section_list"));
				},
				onDataLoad : function(grid) {
					// execute some code on ajax data load
				},
				loadingMessage : '正在加载...',
				dataTable : { 
					"bStateSave" : false, 
					"bServerSide":true,
					"lengthMenu" : [ [ 10, 20, 50, 100, 150, -1 ], [ 10, 20, 50, 100, 150, "All" ] 
					],
					"pageLength" : 10, // default record count per page
					"ajax" : {
						"url" : "/Action!ForumAction_initSectionList.go?pid="+pid, // ajax source
					},
					columns : [ {
						data : 'id',
						"render" : function(data, type, full, meta) {
							return '<input type="checkbox" value="'+data+'" />';
						}
					}, {
						data : 'name',
						className:'text-center'
					}, {
						data : 'note',
						className:'text-center'
						
					}, {
						data : 'createTime',
						render: function(data, type, full, meta){
							var d = new Date();
							d.setTime(data);
							return d.toDateString();
						},
						className:'text-center'
					}, {
						data : 'modifyTime',
						render: function(data, type, full, meta){
							var d = new Date();
							d.setTime(data);
							return d.toDateString();
						},
						className:'text-center'
					}, {
						render: function(data, type, full, meta){
							return "<a class='ajaxify' href='/Action_ajax.page!ForumAction_toSectionManagePage.go?pid="+full.id+"&pname=\""+full.name+"\"&barNames=\""+bHtml+full.name+"\"'>查看子看台</a>";
						},
						className:'text-center'
					} ],
					"order" : [ [ 1, "asc" ] ]
				// set first column as a default sort by asc
				}
			});

			// handle group actionsubmit button click
			grid.getTableWrapper().on('click', '.table-group-action-submit', function(e) {
				e.preventDefault();
				var action = $(".table-group-action-input", grid.getTableWrapper());
				if (action.val() != "" && grid.getSelectedRowsCount() > 0) {
					grid.setAjaxParam("customActionType", "group_action");
					grid.setAjaxParam("customActionName", action.val());
					grid.setAjaxParam("id", grid.getSelectedRows());
					grid.getDataTable().ajax.reload();
					grid.clearAjaxParams();
				} else if (action.val() == "") {
					Metronic.alert({
						type : 'danger',
						icon : 'warning',
						message : 'Please select an action',
						container : grid.getTableWrapper(),
						place : 'prepend'
					});
				} else if (grid.getSelectedRowsCount() === 0) {
					Metronic.alert({
						type : 'danger',
						icon : 'warning',
						message : 'No record selected',
						container : grid.getTableWrapper(),
						place : 'prepend'
					});
				}
			});
			return grid;
		}
	}
}();


