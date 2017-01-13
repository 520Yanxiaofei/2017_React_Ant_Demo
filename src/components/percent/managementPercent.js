import React, {
	Component,
	PropTypes
} from 'react';
import styles from './managementPercent.less'

export default React.createClass({
	componentWillReceiveProps: function(nextProps) {
		this.showChart(this.props)
	},
	showChart: function(dataSet) {
		const {
			item,
			ID
		} = dataSet
		let myChart = echarts.init(document.getElementById(`PercentMain${ID}`));
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
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%"
			},
			toolbox: {
				show: false,
				feature: {
					restore: {},
					saveAsImage: {}
				}
			},
			series: [{
				name: item.percentText,
				type: 'gauge',
				radius: '100%',
				center: ['50%', '50%'],
				detail: {
					width: 80,
					height: 80,
					formatter: item.percentexts,
					offsetCenter: [0, '80%'],
					textStyle: {
						fontSize: 20
					}
				},
				title: {
					offsetCenter: ['-5%', '55%'], // x, y，单位px
					textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color: '#999',
					}
				},
				data: [{
					value: item.percent,
					name: item.percentText
				}],
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						// color: [
						// 	[0.29, '#50da3d'],
						// 	[0.86, '#ffb155'],
						// 	[1, '#f95c5c']
						// ],
						width: 4,
					}
				},
				axisTick: { // 坐标轴小标记
					length: 12, // 属性length控制线长
					lineStyle: { // 属性lineStyle控制线条样式
						color: 'auto',

					}
				},
				splitLine: { // 分隔线
					length: 20, // 属性length控制线长
					lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
						width: 2,
						color: '#ddd',
					}
				},

			}],
		}
		myChart.setOption(option);
	},
	render() {
		const {
			ID
		} = this.props
		let divStyle = {
			height: '200px',
			width: '200px',
			margin: '0 auto'
		}
		return (
			<div id={`PercentMain${ID}`} style={divStyle}></div>
		)
	},
})