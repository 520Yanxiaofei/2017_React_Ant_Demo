import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	Table,
	Icon,
	message,
	Tooltip
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import Page from '../../../components/page/managedetaiPage'
import styles from '../detai/detai.less'
import Detaimodal from './detaiCheckmodal'

const ManageAlarm = React.createClass({
	componentDidMount: function() {
		const {
			countalarm,
			pagecurrentalarm
		} = this.props.ManageDetai;
		/*告警信息*/
		this.props.dispatch({
			type: 'ManageDetai/ManageAlarmMsg',
			payload: {
				page: 1,
				host_id: this.props.ids,
				page_num: countalarm,
				page_size: pagecurrentalarm
			}
		});
	},
	componentWillUnmount: function() {
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				ModalAlarmAdd: [],
				Modalcheckbox: false,
				ModalcheckSelect: {},
				countalarm: 1,
			}
		})
	},
	handleClick: function(id) {
		/*删除*/
		this.props.dispatch({
			type: 'ManageDetai/ManageAlarmDel',
			payload: {
				warn_id: id,
				host_id: this.props.ids,
			}
		})
	},
	addClick: function(alarmdata) {
		/*加入白名单*/
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				ModalCheckvisible: true,
				/*修改实时获取更新*/
				ModalAlarmAdd: {
					warn_id: alarmdata.warn_id,
					process_name: alarmdata.process_name,
					process_user: alarmdata.user_name,
					process_param: alarmdata.param,
					process_url: alarmdata.start_dir,
					process_status: alarmdata.run_status,
					process_port: alarmdata.port,
				},
				/*默认勾选状态*/
				ModalcheckSelect: {
					process_name: false,
					process_user: false,
					process_param: true,
					process_url: false,
					process_status: true,
					process_port: true,
				}
			}
		})
	},
	render() {
		const {
			alertMsg,
			alarmloading
		} = this.props.ManageDetai
		if (!alertMsg) return null;
		const columns = [{
			title: '序号',
			width: '5%',
			render(text, record, index) {
				return index + 1
			}
		}, {
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
			width: '8%',
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
			width: '12%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '启动参数',
			dataIndex: 'param',
			key: 'param',
			width: '12%',
			render: (text) => {
				if (!text) return null;
				return (
					<Tooltip placement="topLeft" title={text} arrowPointAtCenter><div className={styles.whiteTr}>{text}</div></Tooltip>
				)
			}
		}, {
			title: '路径',
			dataIndex: 'start_dir',
			key: 'start_dir',
			width: '20%',
			render: (text) => {
				if (!text) return null;
				return (
					<Tooltip placement="topLeft" title={text} arrowPointAtCenter><div className={styles.whiteTr}>{text}</div></Tooltip>
				)
			}
		}, {
			title: '状态',
			dataIndex: 'run_status',
			key: 'run_status',
			width: '5%',
			render: (text) => (
				<div>{text==1?'运行中':'无'}</div>
			),
		}, {
			title: '端口号',
			dataIndex: 'port',
			key: 'port',
			width: '5%',
		}, {
			title: '操作',
			key: 'warn_id',
			dataIndex: 'warn_id',
			render: (text, record) => (
				<span>
				  <a href="javascript:;" onClick={()=>this.addClick(record)}>加入白名单</a>
			      <span className="ant-divider" />
			      <a href="javascript:;" onClick={()=>this.handleClick(record.warn_id)}>删除</a>
			    </span>
			),
		}];
		const {
			ModalCheckvisible,
			ModalCheckloading,
			ModalAlarmAdd,
			ModalcheckSelect,
			pagecurrentalarm,
			pagesizealarm,
		} = this.props.ManageDetai;
		const detaimodals = {
			ModalCheckvisible,
			ModalCheckloading,
			ModalcheckSelect,
			itemdata: ModalAlarmAdd,
			onCancel: () => {
				this.props.dispatch({
					type: 'ManageDetai/showloading',
					payload: {
						ModalCheckvisible: false,
						ModalcheckSelect: {}
					}
				})
			},
			/*加入白名单*/
			handForm: (value, type) => {
				if (type == 'checkbox') {
					this.props.dispatch({
						type: 'ManageDetai/checksKey',
						payload: {
							ModalcheckSelect: value,
						}
					})
				}
				if (type == 'subimt') {
					this.props.dispatch({
						type: 'ManageDetai/ManageAlarmWhiteAdd',
						payload: {
							warn_id: ModalAlarmAdd.warn_id,
							host_id: this.props.ids,
							...value
						}
					})
				}
			},
			/*白名单进程验证*/
			processName: (value) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageValWhiteList',
					payload: {
						host_id: this.props.ids,
						process_name: value
					}
				})
			},

		};
		/*******************/
		/*告警分页*/
		/******************/
		const PageAlarmlist = {
			pagesize: pagesizealarm,
			pagechange: (current) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageAlarmMsg',
					payload: {
						page: 1,
						host_id: this.props.ids,
						page_num: current,
						page_size: pagecurrentalarm
					}
				});
			},
			pagecurrentchange: (current, pagecurrentalarm) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageAlarmMsg',
					payload: {
						page: 1,
						host_id: this.props.ids,
						page_num: current,
						page_size: pagecurrentalarm
					}
				});
			}
		};
		return (
			<QueueAnim type="bottom" component="div">
             <div key="1">
                <Table columns={columns} pagination={false} loading={alarmloading} dataSource={alertMsg} />
                <Page {...PageAlarmlist}/>
                 <Detaimodal {...detaimodals}/>
                <br/><br/><br/>
             </div>
		    </QueueAnim>
		);
	}
})


// export default Manageaudit
// const ManageAlarm = ({
// 	alertMsg,
// 	handleClick,
// 	addClick
// }) => {

// }
ManageAlarm.proptypes = {
	ManageAlarm: PropTypes.isRequired,
	alertMsg: PropTypes.object,

};

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
export default connect(mapStateToProps, mapDispatchToProps)(ManageAlarm);