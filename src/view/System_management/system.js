import React, {
	Component,
	PropTypes
} from 'react';
import {
	Tabs,
	Col,
	Breadcrumb,
	Icon
} from 'antd';
import {
	Link,
} from 'react-router';
import styles from './system.less';
import UpDataPass from '../login/updatepass';
import Localhostd from '../../components/public/localhost';

const TabPane = Tabs.TabPane;
export default React.createClass({
	getInitialState: function() {
		return {
			/*选项卡*/
			TabCurrent: '1',
		};
	},
	onChange(activeKey) {
		this.setState({
			TabCurrent: activeKey
		});
	},
	render() {
		const content = (
			<Col span={12}>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/" >&nbsp;<Icon type="home" />&nbsp;</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>				    
					    <Link to='/system' >
					         &nbsp;
	                            {(()=>{
		                		switch (this.state.TabCurrent){
		                		case '1':return '修改密码';
		                		case '2':return '暂无待定1';
		                		case '3':return '暂无待定2';
		                		default: return null
		                        }
		                     })()}
		                     &nbsp;
					    </Link>
                    </Breadcrumb.Item>
				  </Breadcrumb>
            </Col>
		);
		return (
			<div>
			  	<Localhostd name="系统管理" content={content}/>
			  	<div className={styles.SystemBox}>
			     <Tabs onChange={this.onChange}>
			      <TabPane tab="修改密码" key="1">
			      	<div className={styles.SystemMar}><UpDataPass/></div>
			      </TabPane>
			      <TabPane tab="暂无待定1" key="2">暂无待定1</TabPane>
			      <TabPane tab="暂无待定2" key="3">暂无待定2</TabPane>
			    </Tabs>
			    </div>
			  </div>
		);
	},
})