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
		drawScatter(surveyData)
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
        		color: 'black',
        		fontName: 'Bungee Hairline',
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

	var age = 0, height = 0;

	for (var i = 0; i < data.length; i++) {
		if(data[i].age){
			age++
		} else if (data[i].height){
			height++;
		}
	}

	var options = {
		title: 'Age vs. Weight comparison',
		hAxis: {title: 'Age', minValue: 0, maxValue: 32},
		vAxis: {title: 'height', minValue: 0, maxValue: 193},
		legend: 'none'
	};

	var scatter = new google.visualization.ScatterChart(document.getElementById('scatterChart'));

	scatter.draw(data, options);

}
