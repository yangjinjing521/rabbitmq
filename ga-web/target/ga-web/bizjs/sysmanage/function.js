var Resource = function() {

	return {
		initResourceList : function() {

			var grid = new Datatable();

			grid.init({
				src : $("#resource_list"),
				onSuccess : function(grid) {
					Metronic.unblockUI($("#resource_list"));
				},
				onError : function(grid) {
					Metronic.unblockUI($("#resource_list"));
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
						"url" : "/Action!ResourceAction_initResource.go", // ajax source
					},
					columns : [ {
						data : 'id',
						"render" : function(data, type, full, meta) {
							return '<input type="checkbox" uid="'+data+'" />';
						}
					}, {
						data : 'id',
						className:'text-center'
					}, {
						data : 'resourceCode',
						className:'text-center'
						
					}, {
						data : 'resourceName',
						className:'text-center'
					}, {
						data : 'parentCode',
							className:'text-center'
					}, {
						data : 'resourceSrc',
						className:'text-center'
					}, {
						data : 'memo',
						className:'text-center'
					} ],
					"order" : [ [ 0, "asc" ] ]
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
			//handleRegister();
			//handleRegisterModify();
			
			return grid;
		}
	}
}();


