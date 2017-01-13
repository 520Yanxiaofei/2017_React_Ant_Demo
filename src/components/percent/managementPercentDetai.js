import React, {
	Component,
	PropTypes
} from 'react';
import {
	Circle
} from 'rc-progress';
import styles from './managementPercent.less'
let tm;
export default React.createClass({
	getInitialState() {
		return {
			percent: 0,
		};
	},
	componentDidMount() {
		this.increase();
	},
	componentWillUnmount(){
		clearTimeout(tm);
	},
	increase() {
		let percent = this.state.percent + 1;
		if (percent > this.props.percent) {
			percent = 100;
			clearTimeout(tm);
			return;
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
			<div className={styles.percentDetai}>
				<Circle percent={this.state.percent}  strokeWidth="10" trailWidth="10" strokeLinecap="square" trailColor="#eee" strokeColor={this.props.style}/>
				{
				 this.props.percentBreak==true?
				 <h2 style={{color:this.props.style}}>{`${this.state.percent}`}</h2>
				 :null
				}
			</div>
		)
	},
})