(function() {
	draw('code', 'myChart');
})()

function draw(code) {

	$.post("http://127.0.0.1:8080/finance/getMyData", {
		"code": 'day.java.sh.603500'
	}, function(result) {
		console.log(result)
		show('myChart', result.list_0, result.list_1, "价*换手");
		show('myChart2', result.list2_0, result.list2_1, "价/换手");
		show('myChart3', result.list3_0, result.list3_1, "原始");
	});

}

function show(tips, keys, data, title) {



	var ctx = window.document.getElementById(tips).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: keys,
			datasets: [{
				label: title,
				data: data,
				borderColor: 'red',
				borderWidth: 1,
				fill: false,
			}]
		},
		options: {
			tooltips: {
				intersect: false,
				mode: 'index'
			}
		}
	});

}
