google.charts.load('current', { 'packages': ['corechart'] });
//Run the function drawDashboard
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
	$.ajax({
	    url: "data/survey.json",
	    dataType: "json",
	    type: "GET",
	    success: function functionName(surveyData) {
			// var data = new google.visualization.DataTable();
			// data.addColumn('number', 'People');
			// data.addColumn('string', 'Name');
			// data.addColumn('string', 'Gender');
			// data.addColumn('number', 'Age');
			// data.addColumn('string', 'Hours');
			// data.addColumn('number', 'Height');
			// data.addColumn('number', 'Multilingual');
			//
			// for (var i = 0; i < surveyData.length; i++) {
			// 	data.addRow([
			// 		surveyData[i].id,
			// 		surveyData[i].first_name + " " + surveyData[i].last_name,
			// 		surveyData[i].gender,
			// 		surveyData[i].age,
			// 		surveyData[i].height,
			// 		surveyData[i].socialmedia,
			// 		surveyData[i].hours,
			// 		surveyData[i].time
			// 	]);
			// } //for loop ENDS
		drawPie(surveyData);
		drawScatter(surveyData);
		drawBar(surveyData)
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

function drawScatter(data) {

	var dataHeight = new google.visualization.DataTable();

	dataHeight.addColumn('number', 'Age');
	dataHeight.addColumn('number', 'Height');

	for (var i = 0; i < data.length; i++) {
		dataHeight.addRow([
				data[i].age,data[i].height,
			]);
	}

	var options = {
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
		colors: ['#4e6487'],
		hAxis: {
			title: 'Age',
			minValue: 20,
			maxValue: 32,
			titleTextStyle: {
				color: '#d4d6d8',
				fontName: 'Dosis',
				fontSize: 3
			}
		},
		vAxis: {
			title: 'height',
			minValue: 150,
			maxValue: 193,
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
	};

	var scatter = new google.visualization.ScatterChart(document.getElementById('scatterChart'));
	scatter.draw(dataHeight, options);

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
		title: 'Social media usage',
		colors: ['#b27991'],
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
