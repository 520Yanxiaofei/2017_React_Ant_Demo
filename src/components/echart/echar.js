import React, {
	Component,
	PropTypes
} from 'react';



var Charts = React.createClass({
	getInitialState: function() {
		// console.log(this)
		// this.token = this.onChangeData.bind(this.onChangeData);
		return {
			data: [30, 44, 345, 454, 345, 54, 32]
		}
	},
	componentDidMount: function() {
		var data = [30, 44, 345, 454, 345, 54, 32]
		this.showChart(data)
	},
	/*在插入真实DOM之前发起Action，向后端请求数据*/
	componentWillMount: function() {
		var info = this.props.data;
		// console.log(this.props['data-info'])
		// Action.getInfo(info);
	},
	componentDidUpdate: function() {
		var data = [30, 44, 345, 454, 345, 54, 32]
		this.showChart(data)
	},
	// componentWillUnmount: function() {
	// 	this.token.remove();
	// },
	onChangeData: function() {
		// var data = Store.getData();
		// this.setState({
		// 	data: data['info']['data']
		// })
	},
	showChart: function(dataSet) {
		console.log(dataSet)
		var myChart = echarts.init(document.getElementById('main'));
		var option = {
			title: {
				text: 'ECharts 入门示例'
			},
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: '你好',
				type: 'bar',
				barWidth: '60%',
				data: dataSet
			}]
		};
		myChart.setOption(option);

	},
	render: function() {
		return (
			<div id="main" style={{width: 500, height:500}}></div>
		)
	}
})



export default Charts