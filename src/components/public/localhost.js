import React, {
	Component,
	PropTypes
} from 'react';

import styles from './localhost.less';
import {
	Row,
	Col,
	Icon
} from 'antd';
import QueueAnim from 'rc-queue-anim';

export default React.createClass({
	render() {
		return (
			<QueueAnim type="top">
			   <div className={styles.containerTitle} key="1">
                   <Row>
                     <Col>
                     <h2>{this.props.name}</h2>
                     </Col>
                     {this.props.content}
                   </Row>
                 </div>
             </QueueAnim>
		);
	},
})