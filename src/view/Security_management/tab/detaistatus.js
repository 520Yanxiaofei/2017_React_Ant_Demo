import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	Spin,
	Icon,
	Col,
	Row,
	Button,
	Table,
	Tabs,
	Tooltip
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from '../detai/detai.less'
import Percentstatus from '../../../components/percent/managementPercent'
import Page from '../../../components/page/managedetaiPage'

const TabPane = Tabs.TabPane;
const ManageStatus = React.createClass({
	componentDidMount: function() {
		/*进程信息*/
		const {
			count,
			pagecurrent
		} = this.props.ManageDetai;
		this.props.dispatch({
			type: 'ManageDetai/ManageProIntm',
			payload: {
				host_id: this.props.ids,
				page_num: count,
				page_size: pagecurrent
			}
		});
		/*网络链接展示*/
		const {
			countnet,
			pagecurrentnet
		} = this.props.ManageDetai;
		this.props.dispatch({
			type: 'ManageDetai/ManageNetworkIntm',
			payload: {
				host_id: this.props.ids,
				page_num: countnet,
				page_size: pagecurrentnet
			}
		});
	},
	componentWillUnmount: function() {
		/*销毁值*/
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				count: 1,
				countnet: 1,
			}
		})
	},
	render() {
		const self = this;
		const {
			detai,
			progressRun,
			Network,
			Proloading,
			Netloading,
			loading
		} = self.props.ManageDetai;
		/*进程*/
		const columns = [{
			title: 'PID',
			dataIndex: 'task_pid',
			key: 'task_pid',
			width: '5%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '类型',
			dataIndex: 'task_type',
			key: 'task_type',
			width: '5%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '进程名称',
			dataIndex: 'task_name',
			key: 'task_name',
			width: '10%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: 'CPU占用',
			dataIndex: 'task_processor',
			key: 'task_processor',
			width: '7%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '内存占用',
			dataIndex: 'task_mem',
			key: 'task_mem',
			width: '7%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '端口',
			dataIndex: 'task_port',
			key: 'task_port',
			width: '5%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '启动用户',
			dataIndex: 'task_user',
			key: 'task_user',
			width: '10%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '启动参数',
			dataIndex: 'task_param',
			key: 'task_param',
			width: '15%',
			render: (text) => {
				if (!text) return null
				return (
					<Tooltip placement="topLeft" title={text} arrowPointAtCenter><div className={styles.whiteTr}>{text}</div></Tooltip>
				)
			}
		}, {
			title: '进程路径',
			dataIndex: 'task_url',
			key: 'task_url',
			width: '28%',
			render: (text) => {
				if (!text) return null
				return (
					<Tooltip placement="topLeft" title={text} arrowPointAtCenter><div className={styles.whiteTr}>{text}</div></Tooltip>
				)
			}
		}];
		/*网络*/
		const columnsNet = [{
			title: 'PID',
			dataIndex: 'task_pid',
			key: 'task_pid'
		}, {
			title: '进程',
			dataIndex: 'task_name',
			key: 'task_name',
		}, {
			title: '协议',
			dataIndex: 'task_protocol',
			key: 'task_protocol',
		}, {
			title: '本地IP',
			dataIndex: 'task_ip',
			key: 'task_ip',
		}, {
			title: '本地端口',
			dataIndex: 'task_port',
			key: 'task_port',
		}, {
			title: '目标IP',
			dataIndex: 'target_ip',
			key: 'target_ip',
		}, {
			title: '目标端口',
			dataIndex: 'target_port',
			key: 'target_port',
		}, {
			title: '状态',
			dataIndex: 'task_status',
			key: 'task_status',
			render: (text) => (
				<div>{text==1?'运行中':'无'}</div>
			),
		}];
		/*******************/
		/*进程分页*/
		/******************/
		const {
			pagecurrent,
			pagesize,
		} = self.props.ManageDetai;
		const Pagerun = {
			pagesize: pagesize,
			pagechange: (current) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageProIntm',
					payload: {
						host_id: this.props.ids,
						page_num: current,
						page_size: pagecurrent
					}
				});
			},
			pagecurrentchange: (current, pagecurrent) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageProIntm',
					payload: {
						host_id: this.props.ids,
						page_num: current,
						page_size: pagecurrent
					}
				});
			}
		};
		/*******************/
		/*网络分页*/
		/******************/
		const {
			pagecurrentnet,
			pagesizenet,
		} = self.props.ManageDetai;
		const PageNet = {
			pagesize: pagesizenet,
			pagechange: (current) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageNetworkIntm',
					payload: {
						host_id: this.props.ids,
						page_num: current,
						page_size: pagecurrentnet
					}
				});
			},
			pagecurrentchange: (current, pagecurrentnet) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageNetworkIntm',
					payload: {
						host_id: this.props.ids,
						page_num: current,
						page_size: pagecurrentnet
					}
				});
			}
		}
		const PercentCPUData = {
			ID: 1,
			item: {
				text: 'CPU',
				percent: detai.cpu || 0,
				percentText: "CPU占用",
				percentexts: "CPU" + detai.cpu + "%" || 0
			},
		}
		const PercentMEUData = {
			ID: 2,
			item: {
				text: '内存',
				percent: parseInt(detai.mem_used / detai.mem_total * 100) || 0,
				percentText: '内存占用',
				percentexts: detai.mem_used + "G/" + detai.mem_total + "G" || 0,
			},
		}
		const PercentHeardData = {
			ID: 3,
			item: {
				text: '硬盘',
				percent: parseInt(detai.hard_used / detai.hard_total * 100) || 0,
				percentText: '硬盘占用',
				percentexts: detai.hard_used + "G/" + detai.hard_total + "G" || 0
			}
		}

		return (
			<QueueAnim type="bottom" component="div">
			    <div key="1" className={styles.Progresscontent}>
			       <Row type="flex" justify="space-between">
					     <Col span={8}>
					       <Percentstatus {...PercentCPUData}/>
					     </Col>
					     <Col span={8}>
					       <Percentstatus {...PercentMEUData}/>
					     </Col>
					     <Col span={8}>
					       <Percentstatus {...PercentHeardData}/>
					     </Col>
				    </Row>
			    </div>
			     <div key="2" className={styles.StatusTables}>
				  <Tabs defaultActiveKey="1" >
				    <TabPane tab="运行进程" key="1">
				       <Table columns={columns} 
				        dataSource={progressRun}
				        expandedRowRender={record => <p>{record.task_url}</p>}
				        loading={Proloading}
				        pagination={false}
				        />
				       <Page {...Pagerun}/>
				    </TabPane>
				    <TabPane tab="网络连接" key="2">
				       <Table columns={columnsNet} loading={Netloading} pagination={false} dataSource={Network}/>
				       <Page {...PageNet}/>
				    </TabPane>
				  </Tabs>
			    </div>
			</QueueAnim>
		);
	},
})


function mapStateToProps(ManageDetai) {
	return {
		...ManageDetai,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}
/*建立数据关联关系*/
export default connect(mapStateToProps, mapDispatchToProps)(ManageStatus);