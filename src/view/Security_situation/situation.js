import React, {
	Component,
	PropTypes
} from 'react';
import {
	Spin,
	Icon,
	Pagination,
	Col,
	Row,
} from 'antd';
import styles from './situation.less';
import Localhostd from '../../components/public/localhost';

export default React.createClass({
	render() {
		const content = (
			<Col span={12}>
                     安全态势功能
            </Col>
		);
		return (
			<Localhostd name="安全态势" content={content}/>
		);
	},
})