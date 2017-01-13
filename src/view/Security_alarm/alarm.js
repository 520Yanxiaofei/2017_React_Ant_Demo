import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	Link,
	hashHistory,
} from 'react-router';
import {
	Tooltip,
	Spin,
	Icon,
	Row,
	Col,
	Table,
	Breadcrumb,
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './alarm.less';
import Localhostd from '../../components/public/localhost';
import AlarmPie from '../../components/echart/securityAlarmPie';
import AlarmLine from '../../components/echart/securityAlarmLine';
import DetaiAlarm from '../Security_management/tab/detaialarm';
import PageAlarmsd from '../../components/page/managedetaiPage'

const SecurityMain = React.createClass({
	getInitialState: function() {
		return {
			id: this.props.params.id
		};
	},
	componentDidMount: function() {
		/*饼状信息*/
		this.props.dispatch({
			type: 'SecurityAlarm/SecurityAlarmPie',
		});
		/*柱状图信息*/
		this.props.dispatch({
			type: 'SecurityAlarm/SecurityAlarmLine',
		});
		/*告警信息*/
		const {
			countalarm,
			pagecurrentalarm,
		} = this.props.SecurityAlarm;
		this.props.dispatch({
			type: 'SecurityAlarm/SecurityAlarmMsg',
			payload: {
				page_num: countalarm,
				page_size: pagecurrentalarm
			}
		});
	},
	componentWillUnmount: function() {
		/*销毁值*/
		this.props.dispatch({
			type: 'SecurityAlarm/showloading',
			payload: {
				countalarm: 1,
			}
		})
	},
	onRowClick(record, index) {
		var semsgs = this.props.SecurityAlarm.SecurityMsg
		var semsg = semsgs[index].host_id
		console.log(semsg)
		hashHistory.push(`/managedetai/${semsg}/3`);

	},
	render() {
		const self = this;
		const {
			/*饼状图*/
			PieData,
			Pieloading,
			/*柱状图*/
			LineData,
			Lineloading,
			/*事件告警*/
			Msgloading,
			SecurityMsg
		} = self.props.SecurityAlarm;
		if (!SecurityMsg) return null
		if (!PieData) return null
		if (!LineData) return null
			/*******************/
			/*告警分页*/
			/******************/
		const {
			pagecurrentalarm,
			pagesizealarm,
		} = this.props.SecurityAlarm;
		const PageAlarmlist = {
			pagesize: pagesizealarm,
			pagechange: (current) => {
				this.props.dispatch({
					type: 'SecurityAlarm/SecurityAlarmMsg',
					payload: {
						page_num: current,
						page_size: pagecurrentalarm
					}
				});
			},
			pagecurrentchange: (current, pagecurrentalarm) => {
				this.props.dispatch({
					type: 'SecurityAlarm/SecurityAlarmMsg',
					payload: {
						page_num: current,
						page_size: pagecurrentalarm
					}
				});
			}
		};
		const content = (
			<Col span={12}>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/" >&nbsp;<Icon type="home" />&nbsp;</Link></Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/alarm" >&nbsp;安全告警&nbsp;</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>&nbsp;详细</Breadcrumb.Item>
				  </Breadcrumb>
            </Col>
		);
		const columns = [{
			title: '告警时间',
			dataIndex: 'warn_time',
			key: 'warn_time',
			width: '12%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '主机名',
			dataIndex: 'host_name',
			key: 'host_name',
			width: '5%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '进程名',
			dataIndex: 'process_name',
			key: 'process_name',
			width: '10%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '启动用户',
			dataIndex: 'user_name',
			key: 'user_name',
			width: '15%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '启动参数',
			dataIndex: 'param',
			key: 'param',
			width: '24%',
			render: (text) => {
				if (!text) return null
				return (
					<Tooltip placement="topLeft" title={text} arrowPointAtCenter><div className={styles.whiteTr}>{text}</div></Tooltip>
				)
			}
		}, {
			title: '路径',
			dataIndex: 'start_dir',
			key: 'start_dir',
			width: '25%',
			render: (text) => {
				if (!text) return null
				return (
					<Tooltip placement="topLeft" title={text} arrowPointAtCenter><div className={styles.whiteTr}>{text}</div></Tooltip>
				)
			}
		}, {
			title: '状态',
			dataIndex: 'run_status',
			key: 'run_status',
			render: (text) => (
				<div>{text==1?'运行中':'无'}</div>
			),
		}, {
			title: '端口号',
			dataIndex: 'port',
			key: 'port',
		}];
		return (
			<div>
			   <Localhostd name="安全告警" content={content}/>
					<Row>
						  <Col span={12} >
						      <div className={styles.feipie}>
							      <Spin spinning={Pieloading}>
							        <AlarmPie Data={PieData} loading={Pieloading}/>
							      </Spin>
						      </div>
					      </Col>
					      <Col span={12} >
						      <div className={styles.feiline}>
							       <Spin spinning={Lineloading}>
							        <AlarmLine Data={LineData} loading={Lineloading}/>
							       </Spin>
						      </div>	   
					      </Col>
				    </Row>
				    <Row className={styles.AlarmBox}>
				      <Col>
				           <span className={styles.feialertword}>事件告警</span>
				           <Table columns={columns} pagination={false} loading={Msgloading} dataSource={SecurityMsg} onRowClick={this.onRowClick}/>
				      </Col>
				      <Col>
				           <PageAlarmsd {...PageAlarmlist}/>
				      </Col>
				    </Row>
			</div>
		)
	},
})

function mapStateToProps(SecurityAlarm) {
	return {
		// loading: SecurityAlarm.loading.global,
		...SecurityAlarm,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}
/*建立数据关联关系*/
export default connect(mapStateToProps, mapDispatchToProps)(SecurityMain);