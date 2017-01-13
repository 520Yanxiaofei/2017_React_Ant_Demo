import React, {
	Component,
	PropTypes
} from 'react';

const SecurityPie = React.createClass({
	componentWillReceiveProps: function(nextProps) {
		this.showChart(this.props)
	},
	showChart: function(dataSet) {
		const {
			loading,
			Data
		} = dataSet
		let myChart = echarts.init(document.getElementById('PieMain'));
		/*if (loading) {
			myChart.showLoading({
				text: '数据获取中',
				color: '#08beff',
				effect: 'whirling'
			});
		} else {
			myChart.hideLoading();
		}*/
		let option = {
			backgroundColor: "",
			title: {
				text: '事件级别',
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
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				right: '25%',
				y: 'center',
				data: ['高危', '中危', '低危'],
				itemGap: 30
			},
			series: [{
				name: '告警事件',
				type: 'pie',
				radius: '55%',
				center: ['30%', '50%'],
				roseType: 'angle',
				data: [{
					value: Data.high_count,
					name: '高危',
					itemStyle: {
						normal: {
							color: '#de5c42'
						}
					}
				}, {
					value: Data.mid_count,
					name: '中危',
					itemStyle: {
						normal: {
							color: '#ff9540'
						}
					}
				}, {
					value: Data.low_count,
					name: '低危',
					itemStyle: {
						normal: {
							color: '#30ca58'
						}
					}
				}, ],
				// itemStyle: {
				// 	normal: {
				// 		borderWidth: 3,
				// 		borderColor: '#fff'
				// 	}
				// }
			}]
		}

		myChart.setOption(option);
	},
	render: function() {
		return (
			<div id="PieMain" style={{ height:300}}></div>
		)
	}
})

export default SecurityPie