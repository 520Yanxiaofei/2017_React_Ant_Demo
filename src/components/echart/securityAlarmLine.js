import React, {
	Component,
	PropTypes
} from 'react';

const SecurityLine = React.createClass({
	componentWillReceiveProps: function(nextProps) {
		this.showChart(this.props)
	},
	showChart: function(dataSet) {
		const {
			loading,
			Data
		} = dataSet
		let myChart = echarts.init(document.getElementById('LineMain'));
		/*if (loading) {
			myChart.showLoading({
				text: '数据获取中',
				color: '#08beff',
				effect: 'whirling'
			});
		} else {
			myChart.hideLoading();
		}*/
		let timeData = Data.time_line || [];
		let numData = Data.data_line || [];
		let option = {
			backgroundColor: "",
			title: {
				text: '事件数量',
				subtext: '——告警级别',
				top: '5%',
				right: '5%',
				textStyle: {
					color: '#2285b2'
				},
				subtextStyle: {
					color: '#1b6c90'
				}
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			xAxis: {
				type: 'category',
				splitLine: {
					show: false
				},
				data: timeData,
				axisLabel: {
					textStyle: {
						color: '#1b6c90'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#2285b2'
					}
				}
			},
			yAxis: [{
				type: 'value',
				name: '2016/12月',
				nameGap: 25,
				/*最大不超过*/
				boundaryGap: ['0%', '20%'],
				splitNumber: 4,
				splitLine: {
					show: false
				},
				nameTextStyle: {
					color: '#2285b2'
				},
				axisLabel: {
					formatter: '{value}',
					textStyle: {
						color: '#1b6c90'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#2285b2'
					}
				}
			}],
			series: [
				// {
				// 	name: '每日数量',
				// 	type: 'line',
				// 	itemStyle: {
				// 		/*渐变色*/
				// 		normal: {
				// 			color: '#fff'
				// 		},
				// 	},

				// 	showSymbol: false,
				// 	hoverAnimation: false,
				// 	data: [33, 59, 90, 264, 287, 707, 176, 122, 487, 188, 60, 23]
				// }, 
				{
					name: '每日数量',
					type: 'bar',
					itemStyle: {
						/*渐变色*/
						normal: {
							color: '#1b6c90'
						},
					},
					markPoint: {
						data: [{
							type: 'max',
							name: '最大值'
						}, {
							type: 'min',
							name: '最小值'
						}],
					},
					barGap: '-100%',
					barCategoryGap: '50%',
					data: numData
				},
			]
		}

		myChart.setOption(option);
	},
	render: function() {
		return (
			<div id="LineMain" style={{ height:300}}></div>
		)
	}
})

export default SecurityLine