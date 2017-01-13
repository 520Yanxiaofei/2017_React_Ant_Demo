import React, {
	Component,
	PropTypes
} from 'react';
import {
	Line
} from 'rc-progress';
import styles from './managementPercent.less'
let tm;
export default React.createClass({
	getInitialState() {
		return {
			percent: 0,
			Linecolor: '#2db7f5',
		};
	},
	componentDidMount() {
		this.increase();
	},
	componentWillUnmount: function() {
		clearTimeout(tm);
	},
	increase() {
		let percent = this.state.percent + 1;
		if (percent > this.props.percent) {
			percent = 100;
			clearTimeout(tm);
			return;

		}
		if (percent == 100) {
			this.props.disabledonclick()
		}
		if (percent >= 90) {
			this.setState({
				Linecolor: '#18cf4e'
			})
		}
		this.setState({
			percent
		});
		tm = setTimeout(this.increase, 20);
	},
	restart() {
		clearTimeout(tm);
		this.setState({
			percent: 0
		}, () => {
			this.increase();
		});
	},
	render() {
		return (
			<div>
				<Line percent={this.state.percent}  strokeWidth="5" trailWidth="5"  trailColor="#eee" strokeColor={this.state.Linecolor}/>
				{
				this.state.percent==100?
				<div>
				 <h2 style={{color:'#18cf4e'}}>提取成功！</h2>
				</div>
				:
				<div>
				 <h2 style={{color:this.state.Linecolor}}>提取进度：{this.state.percent!=0?this.state.percent+'%':null}</h2>
				</div>
				}
			</div>
		)
	},
})