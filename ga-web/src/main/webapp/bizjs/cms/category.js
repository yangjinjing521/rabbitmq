var Category = function() {
	return {
		initCategoryList : function() {
			var grid = new Datatable();

			grid.init({
				src : $("#category_list"),
				onSuccess : function(grid) {
					Metronic.unblockUI($("#category_list"));
				},
				onError : function(grid) {
					Metronic.unblockUI($("#category_list"));
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
						"url" : "/Action!CategoryAction_categoryList.go", // ajax source
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
						data : 'description',
						className:'text-center'
					}, {
						data : 'keywords',
						className:'text-center'
					},{
						data : 'isMenu',
						className:'text-center'
					}, {
						data : 'createTime',
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
