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
	render() {
		return (
			<div className={styles.percentAuto}>
			<Circle percent={this.props.percent}  strokeWidth="10" trailWidth="10" trailColor="#eee" strokeColor={this.props.style} className={styles.percentbar}/>
			<div className={styles.percentFont}>
			 {
			 this.props.percentBreak?
			  <h2>{`${this.props.percent}`}</h2>
			  :null
			 }
			</div>
			</div>

		)
	},
})