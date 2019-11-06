(function() {
	$.ajax({
		//请求方式
		type: "GET",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		//请求地址
		url: "http://127.0.0.1:8080/analysis/getLine?name=World",
		//数据，json字符串
		// data: JSON.stringify(list),
		//请求成功
		success: function(result) {
			//java 二维list数组 转js list

			var jsArray = convert(result);

			draw(jsArray);
		},
		//请求失败，包含具体的错误信息
		error: function(e) {
			console.log(e.status);
			console.log(e.responseText);
		}
	});
})()

function convert(result) {
	
	

	//去掉前后两个括号边
	var arr1 = result.substring(1, result.length - 1).split('],');
	var listData = [];
	for (var i = 0; i < arr1.length; i++) {

		//去掉所有前后两个括号边
		var temp = arr1[i].replace('[', '');
		temp = temp.replace(']', '');
		var arr2 = temp.split(',')

		dataArry = [];
		dataArry.push(arr2[0]);

		for (var j = 1; j < arr2.length; j++) {

			dataArry.push(parseFloat(arr2[j]))
		}

		listData.push(dataArry)
	}
	return listData;
}

function draw(data) {
	/*基于准备好的dom，初始化echarts实例*/
	var myChart = echarts.init(document.getElementById('main'));

	// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
	var data0 = splitData(data);

	console.log(data0);

	//切割数组，把数组中的日期和数据分离，返回数组中的日期和数据
	function splitData(rawData) {
		var categoryData = [];
		var values = [];

		for (var i = 0; i < rawData.length; i++) {
			//splice 返回每组数组中被删除的第一项，即返回数组中被删除的日期 
			//alert(rawData[i].splice(0, 1)[0]);
			//categoryData  日期  把返回的日期放到categoryData[]数组中
			categoryData.push(rawData[i].splice(0, 1)[0]);
			//alert(categoryData);

			//数据数组，即数组中除日期外的数据
			// alert(rawData[i]);
			values.push(rawData[i])
		}
		return {
			categoryData: categoryData, //数组中的日期 x轴对应的日期
			values: values //数组中的数据 y轴对应的数据
		};
	}

	//计算MA平均线，N日移动平均线=N日收盘价之和/N  dayCount要计算的天数(5,10,20,30)
	function calculateMA(dayCount) {
		var result = [];
		for (var i = 0, len = data0.values.length; i < len; i++) {
			
			result.push(data0.values[i][0]);
			// alert(result);
		}
		return result;
	}

	option = {
		title: { //标题
			text: 'shangHai stock',
			left: 0
		},
		tooltip: { //提示框
			trigger: 'axis', //触发类型：坐标轴触发
			axisPointer: { //坐标轴指示器配置项
				type: 'cross' //指示器类型，十字准星
			}
		},
		legend: { //图例控件，点击图例控制哪些系列不现实
			data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
		},
		grid: { //直角坐标系
			show: true,
			left: '10%', //grid组件离容器左侧的距离
			right: '10%',
			bottom: '15%',
			//backgroundColor:'#ccc'
		},
		xAxis: {
			type: 'category', //坐标轴类型，类目轴
			data: data0.categoryData,
			//scale: true,  //只在数字轴中有效
			boundaryGap: false, //刻度作为分割线，标签和数据点会在两个刻度上
			axisLine: {
				onZero: false
			},
			splitLine: {
				show: false
			}, //是否显示坐标轴轴线
			//splitNumber: 20,    //坐标轴的分割段数，预估值，在类目轴中无效
			min: 'dataMin', //特殊值，数轴上的最小值作为最小刻度
			max: 'dataMax' //特殊值，数轴上的最大值作为最大刻度
		},
		yAxis: {
			scale: true, //坐标刻度不强制包含零刻度
			splitArea: {
				show: true //显示分割区域
			}
		},
		dataZoom: [ //用于区域缩放
			{
				filterMode: 'filter', //当前数据窗口外的数据被过滤掉来达到数据窗口缩放的效果  默认值filter
				type: 'inside', //内置型数据区域缩放组件
				start: 50, //数据窗口范围的起始百分比
				end: 100 //数据窗口范围的结束百分比
			},
			{
				show: true,
				type: 'slider', //滑动条型数据区域缩放组件
				y: '90%',
				start: 50,
				end: 100
			}
		],
		series: [ //图表类型
// 			{
// 				name: 'Day K',
// 				type: 'candlestick', //K线图
// 				data: data0.values, //y轴对应的数据
// 
// 				////////////////////////图标标注/////////////////////////////
// 
// 				markPoint: { //图表标注
// 					label: { //标注的文本
// 						normal: { //默认不显示标注
// 							show: true,
// 							//position:['20%','30%'],
// 							formatter: function(param) { //标签内容控制器
// 								return param != null ? Math.round(param.value) : '';
// 							}
// 						}
// 					},
// 					data: [ //标注的数据数组
// 						{
// 							name: 'XX标点',
// 							coord: ['2013/5/31', 2300], //指定数据的坐标位置
// 							value: 2300,
// 							itemStyle: { //图形样式
// 								normal: {
// 									color: 'rgb(41,60,85)'
// 								}
// 							}
// 						},
// 						{
// 							name: 'highest value',
// 							type: 'max', //最大值
// 							valueDim: 'highest' //在highest维度上的最大值 最高价
// 						},
// 						{
// 							name: 'lowest value',
// 							type: 'min',
// 							valueDim: 'lowest' //最低价
// 						},
// 						{
// 							name: 'average value on close',
// 							type: 'average',
// 							valueDim: 'close' //收盘价
// 						}
// 					],
// 					tooltip: { //提示框
// 						formatter: function(param) {
// 							return param.name + '<br>' + (param.data.coord || '');
// 						}
// 					}
// 				},
// 
// 				/////////////////////////////////图标标线///////////////////////////
// 			},

			{ //MA5 5天内的收盘价之和/5
				name: 'MA5',
				type: 'line',
				data: calculateMA(5),
				smooth: true,
				lineStyle: {
					normal: {
						opacity: 0.5
					}
				}
			}
		]
	};


	// 使用刚指定的配置项和数据显示图表
	myChart.setOption(option);
}
