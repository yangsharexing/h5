(function() {
	// draw('code');
	$('#formSearch').click(downDate);
})()
function downDate(){
	var code = $('#code').val();
	draw(code)
}
function draw(code) {
	if(code.length>6|| code.length<6){
		
		alert("股票代码至少有6位");
		return;
	}
	
	var codepre = '';
	
	if(code.substring(0,1)=='3'){
		alert("暂时不支持以3开头创业板");
		return;
	}else if(code.substring(0,1)=='6'){
		codepre = 'java.sh.';
	}else{
		codepre = 'java.sz.';
	}
	$.post("http://127.0.0.1:8080/finance/getData", {
		"code": 'java.sh.600061'
	}, function(result) {
		console.log(result)
		show('myChart', result.list_0, result.list_1, "原始");
		show('myChart2', result.list2_0, result.list2_1, "简化");
		show('myChart3', result.list3_0, result.list3_1, "分笔");
		show('myChart4', result.list4_0, result.list4_1, "线段");
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
