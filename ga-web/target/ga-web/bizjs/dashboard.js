var Dashboard = function() {
	return {
		initCharts : function() {
			if (!jQuery.plot) {
				return;
			}

			function showChartTooltip(x, y, xValue, yValue) {
				$('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
					position : 'absolute',
					display : 'none',
					top : y - 40,
					left : x - 40,
					border : '0px solid #ccc',
					padding : '2px 6px',
					'background-color' : '#fff'
				}).appendTo("body").fadeIn(200);
			}

			var data = [];
			var totalPoints = 250;

			// random data generator for plot charts

			function getRandomData() {
				if (data.length > 0)
					data = data.slice(1);
				// do a random walk
				while (data.length < totalPoints) {
					var prev = data.length > 0 ? data[data.length - 1] : 50;
					var y = prev + Math.random() * 10 - 5;
					if (y < 0)
						y = 0;
					if (y > 100)
						y = 100;
					data.push(y);
				}
				// zip the generated y values with the x values
				var res = [];
				for (var i = 0; i < data.length; ++i)
					res.push([ i, data[i] ])
				return res;
			}

			function randValue() {
				return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
			}

			var visitors = [ [ '02/2013', 1500 ], [ '03/2013', 2500 ], [ '04/2013', 1700 ], [ '05/2013', 800 ], [ '06/2013', 1500 ],
					[ '07/2013', 2350 ], [ '08/2013', 1500 ], [ '09/2013', 1300 ], [ '10/2013', 4600 ] ];

			if ($('#site_statistics').size() != 0) {

				$('#site_statistics_loading').hide();
				$('#site_statistics_content').show();

				var plot_statistics = $.plot($("#site_statistics"), [ {
					data : visitors,
					lines : {
						fill : 0.6,
						lineWidth : 0
					},
					color : [ '#f89f9f' ]
				}, {
					data : visitors,
					points : {
						show : true,
						fill : true,
						radius : 5,
						fillColor : "#f89f9f",
						lineWidth : 3
					},
					color : '#fff',
					shadowSize : 0
				} ],

				{
					xaxis : {
						tickLength : 0,
						tickDecimals : 0,
						mode : "categories",
						min : 0,
						font : {
							lineHeight : 14,
							style : "normal",
							variant : "small-caps",
							color : "#6F7B8A"
						}
					},
					yaxis : {
						ticks : 5,
						tickDecimals : 0,
						tickColor : "#eee",
						font : {
							lineHeight : 14,
							style : "normal",
							variant : "small-caps",
							color : "#6F7B8A"
						}
					},
					grid : {
						hoverable : true,
						clickable : true,
						tickColor : "#eee",
						borderColor : "#eee",
						borderWidth : 1
					}
				});

				var previousPoint = null;
				$("#site_statistics").bind("plothover", function(event, pos, item) {
					$("#x").text(pos.x.toFixed(2));
					$("#y").text(pos.y.toFixed(2));
					if (item) {
						if (previousPoint != item.dataIndex) {
							previousPoint = item.dataIndex;

							$("#tooltip").remove();
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);

							showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' visits');
						}
					} else {
						$("#tooltip").remove();
						previousPoint = null;
					}
				});
			}

			if ($('#site_activities').size() != 0) {
				// site activities
				var previousPoint2 = null;
				$('#site_activities_loading').hide();
				$('#site_activities_content').show();

				var data1 = [ [ 'DEC', 300 ], [ 'JAN', 600 ], [ 'FEB', 1100 ], [ 'MAR', 1200 ], [ 'APR', 860 ], [ 'MAY', 1200 ], [ 'JUN', 1450 ],
						[ 'JUL', 1800 ], [ 'AUG', 1200 ], [ 'SEP', 600 ] ];

				var plot_statistics = $.plot($("#site_activities"),

				[ {
					data : data1,
					lines : {
						fill : 0.2,
						lineWidth : 0,
					},
					color : [ '#BAD9F5' ]
				}, {
					data : data1,
					points : {
						show : true,
						fill : true,
						radius : 4,
						fillColor : "#9ACAE6",
						lineWidth : 2
					},
					color : '#9ACAE6',
					shadowSize : 1
				}, {
					data : data1,
					lines : {
						show : true,
						fill : false,
						lineWidth : 3
					},
					color : '#9ACAE6',
					shadowSize : 0
				} ],

				{

					xaxis : {
						tickLength : 0,
						tickDecimals : 0,
						mode : "categories",
						min : 0,
						font : {
							lineHeight : 18,
							style : "normal",
							variant : "small-caps",
							color : "#6F7B8A"
						}
					},
					yaxis : {
						ticks : 5,
						tickDecimals : 0,
						tickColor : "#eee",
						font : {
							lineHeight : 14,
							style : "normal",
							variant : "small-caps",
							color : "#6F7B8A"
						}
					},
					grid : {
						hoverable : true,
						clickable : true,
						tickColor : "#eee",
						borderColor : "#eee",
						borderWidth : 1
					}
				});

				$("#site_activities").bind("plothover", function(event, pos, item) {
					$("#x").text(pos.x.toFixed(2));
					$("#y").text(pos.y.toFixed(2));
					if (item) {
						if (previousPoint2 != item.dataIndex) {
							previousPoint2 = item.dataIndex;
							$("#tooltip").remove();
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
							showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'M$');
						}
					}
				});

				$('#site_activities').bind("mouseleave", function() {
					$("#tooltip").remove();
				});

			}

			// ///////////////////user activity////////////////
			if ($('#user_activities').size() != 0) {
				// site activities
				var previousPoint2 = null;
				$('#user_activities_loading').hide();
				$('#user_activities_content').show();

				var data1 = [ [ '2015/01', 50 ], [ '2015/02', 200 ], [ '2015/03', 60 ], [ '2015/04', 10 ], [ '2015/05', 8 ], [ '2015/06', 150 ],
						[ '2015/07', 100 ], [ '2015/08', 40 ], [ '2015/09', 90 ], [ '2015/10', 120 ] ];

				var plot_statistics = $.plot($("#user_activities"),

				[ {
					data : data1,
					lines : {
						fill : 0.2,
						lineWidth : 0,
					},
					color : [ '#BAD9F5' ]
				}, {
					data : data1,
					points : {
						show : true,
						fill : true,
						radius : 4,
						fillColor : "#9ACAE6",
						lineWidth : 2
					},
					color : '#9ACAE6',
					shadowSize : 1
				}, {
					data : data1,
					lines : {
						show : true,
						fill : false,
						lineWidth : 3
					},
					color : '#9ACAE6',
					shadowSize : 0
				} ],

				{

					xaxis : {
						tickLength : 0,
						tickDecimals : 0,
						mode : "categories",
						min : 0,
						font : {
							lineHeight : 18,
							style : "normal",
							variant : "small-caps",
							color : "#6F7B8A"
						}
					},
					yaxis : {
						ticks : 5,
						tickDecimals : 0,
						tickColor : "#eee",
						font : {
							lineHeight : 14,
							style : "normal",
							variant : "small-caps",
							color : "#6F7B8A"
						}
					},
					grid : {
						hoverable : true,
						clickable : true,
						tickColor : "#eee",
						borderColor : "#eee",
						borderWidth : 1
					}
				});

				$("#user_activities").bind("plothover", function(event, pos, item) {
					$("#x").text(pos.x.toFixed(2));
					$("#y").text(pos.y.toFixed(2));
					if (item) {
						if (previousPoint2 != item.dataIndex) {
							previousPoint2 = item.dataIndex;
							$("#tooltip").remove();
							var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
							showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'M$');
						}
					}
				});

				$('#user_activities').bind("mouseleave", function() {
					$("#tooltip").remove();
				});
			}
		}

	}
}();
