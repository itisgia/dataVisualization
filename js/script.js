google.charts.load('current', { 'packages': ['corechart', 'controls'] });
//Run the function drawDashboard
google.charts.setOnLoadCallback( drawDashboard);

function  drawDashboard() {
	$.ajax({
	    url: "data/survey.json",
	    dataType: "json",
	    type: "GET",
	    success: function functionName(surveyData) {
			var data = new google.visualization.DataTable();
				data.addColumn('number', 'People')
				data.addColumn('string', 'Name');
				data.addColumn('string', 'Gender');
				data.addColumn('number', 'Age');
				data.addColumn('number', 'Height');
				data.addColumn('string', 'SNS');
				data.addColumn('string', 'Device');

				for (var i = 0; i < surveyData.length; i++) {
					data.addRow([
						surveyData[i].id,
						surveyData[i].first_name + " " + surveyData[i].last_name,
						surveyData[i].gender,
						surveyData[i].age,
						surveyData[i].height,
						surveyData[i].socialmedia,
						surveyData[i].device,
					]);
				};
				var dashboard = new google.visualization.Dashboard(document.getElementById('dashboards'));
				var scatterChart = new google.visualization.ChartWrapper({
					chartType: 'ScatterChart',
					containerId: 'scatterChartDiv',
					options : {
						title: 'Age and Height',
						titleTextStyle: {
							   color: '#d4d6d8',
							   fontName: 'Dosis',
							   fontSize: 20
						},
						backgroundColor: {
							fill: 'transparent'
						},
						width: 490,
						height: 300,
						colors: ['#8d9ca0'],
						hAxis: {
							title: 'Age',
							ticks: [20,25,30,35,40],
							titleTextStyle: {
								color: '#d4d6d8',
								fontName: 'Dosis',
								fontSize: 13
							}
						},
						vAxis: {
							title: 'height',
							ticks: [150, 160, 170, 180, 190],
							// minValue: 150,
							// maxValue: 193,
							titleTextStyle: {
								color: '#d4d6d8',
								fontName: 'Dosis',
								fontSize: 3
							}
						},
						chartArea: {
							backgroundColor: {
									stroke: "#d4d6d8"
							}
						},
						legend: {
							textStyle: {
								color: '#d4d6d8',
								fontName: 'Dosis',
								fontSize: 15
							}
						}
					},
					view: {
						columns: [3,4]
					},
				});


		//slider


			var ageSlider = new google.visualization.ControlWrapper({
				controlType: 'NumberRangeFilter',
				containerId: 'ageSlider',
				options:{
					filterColumnLabel: 'Age',
					ui: {
						labelStacking:'vertical'
					}
				}
			});

		dashboard.bind([ageSlider], [scatterChart]);
		dashboard.draw(data);
		drawPie(surveyData);
		drawBar(surveyData);
		drawDonut(surveyData);

	    },
	    error : function functionName(error) {
	      console.log("ERROR");
	      console.log(error);
	    }
	}); //ajax ENDS
} // drawCharts ENDS


function drawPie(data){

	var dataGender = new google.visualization.DataTable();
	dataGender.addColumn('string', 'Gender');
	dataGender.addColumn('number', 'Count');

	var male = 0,female = 0;

	for (var i = 0; i < data.length; i++) {
		if(data[i].gender == "Male"){
			male++;
		} else if (data[i].gender == "Female"){
			female++;
		}
	}

	dataGender.addRow(["Male", male]);
	dataGender.addRow(["Female", female]);

	var options = {
		title: "Gender Rate",
		width: 500,
		height: 300,
		backgroundColor: {
			fill: 'transparent'
		},
		titleTextStyle: {
               color: '#d4d6d8',
               fontName: 'Dosis',
               fontSize: 20
        },
        pieSliceTextStyle: {
            color: '#d4d6d8'
        },
        slices: {
        	0: {color: '#8c7b8b'},
            1: {color: '#8c6089'}
        },
        legend: {
        	textStyle: {
        		color: '#d4d6d8',
        		fontName: 'Dosis',
        		fontSize: 15
        	}
        }
	};

	var pie = new google.visualization.PieChart(document.getElementById('pieChart'));
	pie.draw(dataGender, options);
}



function drawBar(data) {
	var dataSNS = new google.visualization.DataTable();
	dataSNS.addColumn('string', 'SNS',);
	dataSNS.addColumn('number', 'amount');

	var tweet = 0, fb = 0, sc = 0, ig = 0, reddit = 0;

	for (var i = 0; i < data.length; i++) {
		if(data[i].socialmedia == "Twitter"){
	  		tweet++;
  		} else if (data[i].socialmedia == "Facebook"){
	  		fb++;
  		} else if (data[i].socialmedia == "Snapchat"){
	  		sc++;
  		} else if (data[i].socialmedia == "Instagram"){
	  		ig++;
  		} else if (data[i].socialmedia == "Reddit"){
	  		reddit++;
  		}
	}

	dataSNS.addRow(["Twitter", tweet]);
	dataSNS.addRow(["Facebook", fb]);
	dataSNS.addRow(["Snapchat", sc]);
	dataSNS.addRow(["Instagram", ig]);
	dataSNS.addRow(["Reddit", reddit]);

	var options = {
		title: 'Types of Social media',
		colors: ['#b279a5'],
		backgroundColor: {
			fill: 'transparent'
		},
		width: 490,
		height: 300,
		titleTextStyle: {
               color: '#d4d6d8',
               fontName: 'Dosis',
               fontSize: 20
        },
        chartArea: {
        	backgroundColor: {
        		stroke: 'd4d6d8'
        	}
        },
        legend: 'none',
	    hAxis: {
	    	title: 'Amount',
			textStyle: {
				color:'#d4d6d8',
			},
			titleTextStyle: {
				color: '#d4d6d8',
				fontName: 'Dosis',
				fontSize: 15
    		}
	    },
	    vAxis: {
	     	title: 'SNS',
        	textStyle: {
        		color: 'white'
        	},
        	titleTextStyle: {
				color: '#d4d6d8',
				fontName: 'Dosis',
				fontSize: 15
    		}
      	}
	};

	var Bar = new google.visualization.BarChart(document.getElementById('barChart'));
	Bar.draw(dataSNS, options);
}

function drawDonut(data) {
	var dataDevice = new google.visualization.DataTable();
	dataDevice.addColumn('string', 'SNS',);
	dataDevice.addColumn('number', 'amount');

	var phone = 0, desktop = 0, tablet = 0;

	for (var i = 0; i < data.length; i++) {
		if(data[i].device == "Phone"){
			phone++;
		} else if (data[i].device == "Desktop"){
			desktop++;
		} else if (data[i].device == "Tablet"){
			tablet++;
		}
	}

	dataDevice.addRow(["Phone", phone]);
	dataDevice.addRow(["Desktop", desktop]);
	dataDevice.addRow(["Tablet", tablet]);

	var options = {
		title: "Preferred Device",
		width: 500,
		height: 300,
		backgroundColor: {
			fill: 'transparent'
		},
		titleTextStyle: {
			color: '#d4d6d8',
			fontName: 'Dosis',
			fontSize: 20
		},
		pieHole: 0.5,
		slices: {
			0: {color: '#60afc4'},
			1: {color: '#618ba3'},
			2: {color: '#8f9fa8'},
		},
		legend: {
			textStyle: {
				color: '#d4d6d8',
				fontName: 'Dosis',
				fontSize: 14
			}
		}
	}

	var Donught = new google.visualization.PieChart(document.getElementById('doChart'));
	Donught.draw(dataDevice, options);
}
