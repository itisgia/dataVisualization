console.log('linked');
// google.charts.load('current', {packages: ['corechart']});
// google.charts.setOnLoadCallback(drawcharts);

function drawCharts() {
	$.ajax({
	    url: "data/survey.json",
	    dataType: "json",
	    type: "GET",
	    success: function functionName(data) {
	    	console.log(data);
			var data = new google.visualization.DataTable();
			data.addColumn('number', 'People');
			data.addColumn('string', 'Name');
			data.addColumn('string', 'Gender');
			data.addColumn('number', 'Age');
			data.addColumn('string', 'Hours');
			data.addColumn('number', 'Height');
			data.addColumn('number', 'Multilingual');
	    },
	    error : function functionName(error) {
	      console.log("ERROR");
	      console.log(error);
	    }
	});
}

drawCharts();
