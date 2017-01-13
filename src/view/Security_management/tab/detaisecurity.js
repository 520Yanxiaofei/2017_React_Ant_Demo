import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	Steps,
	Button,
	message,
	Collapse,
	Slider,
	Progress,
	Tabs,
	Table
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from '../detai/detai.less'
import Detaiwhite from './detaiwhite'
import Detaimodal from './detaiAddmodal'
import PercentLine from '../../../components/percent/managementPercentFing';

const Detaisecurity = React.createClass({
	getInitialState() {
		return {
			getfinger: false,
			/*起始时间*/
			begintime: '',
			/*结束时间*/
			endtime: '',
			/*进度状态*/
			processStatus: '',
			disabledSwitch: false,
		}
	},
	componentDidMount: function() {

	},
	componentWillUnmount: function() {
		const {
			fingCurrent
		} = this.props.ManageDetai
		if (fingCurrent == true) {
			this.props.dispatch({
				type: 'ManageDetai/showloading',
				payload: {
					fingCurrent: false
				}
			})
		}
	},
	onAfterChange(value) {
		//获取系统时间
		var date = new Date()
		if (value == 0) {
			var date = date;
		}
		if (value == 33) {
			var datenew = new Date() - 60 * 10 * 1000;
			var date = new Date(datenew);
		}
		if (value == 66) {
			var datenew = new Date() - 60 * 60 * 1000;
			var date = new Date(datenew)
		}
		if (value == 100) {
			var datenew = new Date() - 60 * 60 * 24 * 1000;
			var date = new Date(datenew)
		}

		function gettime(date) {
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			var hours = date.getHours();
			var mintes = date.getMinutes();
			var seconds = date.getSeconds();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			if (hours >= 0 && hours <= 9) {
				hours = "0" + hours
			}
			if (mintes >= 0 && mintes <= 9) {
				mintes = "0" + mintes
			}
			if (seconds >= 0 && seconds <= 9) {
				seconds = "0" + seconds
			}
			var currenttime = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hours + seperator2 + mintes + seperator2 + seconds;
			return currenttime
		}
		var begintime = gettime(date)
		var endtime = gettime(new Date());
		this.setState({
			begintime,
			endtime
		})

	},
	/*提取指纹*/
	Fingerprint: function() {
		const {
			begintime,
			endtime
		} = this.state;
		this.props.dispatch({
			type: 'ManageDetai/ManageProStd',
			payload: {
				host_id: this.props.ids,
				start_time: begintime || new Date(),
				end_time: endtime || new Date()
			}
		})
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				current: this.props.ManageDetai.current + 1
			}
		})
	},
	/*成功并提取白名单*/
	FingerWhite: function() {
		this.props.dispatch({
				type: 'ManageDetai/showloading',
				payload: {
					current: this.props.ManageDetai.current + 1
				}
			})
			/*进程策略*/
		this.props.dispatch({
			type: 'ManageDetai/ManageShowProcessStd',
			payload: {
				host_id: this.props.ids
			}
		});
		/*网络策略*/
		this.props.dispatch({
			type: 'ManageDetai/ManageShowNetworkStd',
			payload: {
				host_id: this.props.ids
			}
		});
	},
	prev() {
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				current: 0
			}
		})
		this.setState({
			disabledSwitch: false
		})
		const {
			current
		} = this.props.ManageDetai
		console.log(current)
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				fingCurrent: false
			}
		})


	},
	/*生成白名单*/
	whiteOnclick: function() {
		const {
			selectedWhiteKeys
		} = this.props.ManageDetai;
		if (selectedWhiteKeys == '') {
			message.warning('请选择要生成的名单')
		} else {
			this.props.dispatch({
				type: 'ManageDetai/ManageStraWhiteList',
				payload: {
					host_id: this.props.ids,
					ids: selectedWhiteKeys.join(','),
				}
			})
		}
	},
	/*多选白名单生成*/
	onSelectChange: function(selectedRowKeys, selectedRows) {
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				selectedWhiteKeys: selectedRowKeys,
			}
		})
	},
	render() {
		const Step = Steps.Step;
		const Panel = Collapse.Panel;

		function callback(key) {
			console.log(key);
		}
		const marks = {
			0: '即时提取',
			33: '10分钟提取',
			66: '1小时提取',
			100: '一天提取',
		};

		/*策略*/
		const self = this;
		const {
			progressStd,
			stdloading,
			selectedWhiteKeys,
			networkStd,
			protdMsg,
			ProstdStatus,
			current,
		} = self.props.ManageDetai
		if (!progressStd) return null;
		if (!networkStd) return null;
		/*获取多选值*/
		const rowselectCheckbox = {
			type: 'checkbox',
			// selectedRowKeys,
			// onChange: this.onSelectChange,
		};
		/*进程策略*/
		const columns = [{
			title: 'PID',
			dataIndex: 'process_pid',
			key: 'process_pid',
			width: '8%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '类型',
			dataIndex: 'process_type',
			key: 'process_type',
			width: '8%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '进程名称',
			dataIndex: 'process_name',
			key: 'process_name',
			width: '10%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '端口',
			dataIndex: 'process_port',
			key: 'process_port',
			width: '8%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '启动用户',
			dataIndex: 'process_user',
			key: 'process_user',
			width: '10%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '启动参数',
			dataIndex: 'process_param',
			key: 'process_param',
			width: '10%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}, {
			title: '进程路径',
			dataIndex: 'process_url',
			key: 'process_url',
			width: '46%',
			render: (text) => {
				return (
					<div className={styles.whiteTr}>{text}</div>
				)
			}
		}];
		/*网络*/
		const columnsNet = [{
			title: '协议',
			dataIndex: 'process_protocol',
			key: 'process_protocol',
		}, {
			title: '端口',
			dataIndex: 'process_port',
			key: 'process_port',
		}, {
			title: '状态',
			dataIndex: 'process_status',
			key: 'process_status',
		}, {
			title: 'PID',
			dataIndex: 'process_pid',
			key: 'process_pid',
		}, {
			title: '进程',
			dataIndex: 'process_name',
			key: 'process_name',
		}, ];
		const TabPane = Tabs.TabPane;
		/*多选白名单*/
		const whiteselectCheckbox = {
			type: 'checkbox',
			selectedWhiteKeys,
			onChange: this.onSelectChange,
		}
		const protectsecurity = (
			<Tabs defaultActiveKey="1">
			   <TabPane tab="进程策略" key="1">
			      <div className={styles.whiteContent}>
			       <Table columns={columns} dataSource={progressStd} loading={stdloading} pagination={false}  rowSelection={whiteselectCheckbox} />
			       </div>
			    </TabPane>
			    <TabPane tab="网络策略" key="2">
			       <div className={styles.whiteContent}>
			       <Table columns={columnsNet} dataSource={networkStd} rowSelection={rowselectCheckbox}/>
			       </div>
			    </TabPane>
			</Tabs>
		)

		const getfingerprint = (
				<div className={styles.feisliper}>
			    <Slider marks={marks} step={null} defaultValue={0} width={50} onAfterChange={this.onAfterChange}/>
			 </div>
			)
			/*提取进度反馈*/
		const fingerprIng = (
			<div className={styles.feiprogress}>
			     <PercentLine percent={ProstdStatus} disabledonclick={()=>this.setState({disabledSwitch:true})} perText={protdMsg}/>
			     {/*<Progress percent={ProstdStatus} strokeWidth={30}/>
			     <span style={{display:(ProstdStatus==100?"block":"none")}} className={styles.feigetfingersuc}>{protdMsg.msg}</span>*/}
			 </div>
		)
		const {
			getfinger
		} = self.state;
		const steps = [{
			title: '提取指纹',
			content: getfingerprint,
		}, {
			title: '进行中',
			content: fingerprIng,
		}, {
			title: '生成白名单',
			content: protectsecurity,
		}];
		/*白名单*/
		const {
			Modalvisible,
			Modalloading,
			fingCurrent,
		} = self.props.ManageDetai;
		const detaimodals = {
			Modalvisible,
			Modalloading,
			onCancel: () => {
				self.props.dispatch({
					type: 'ManageDetai/showloading',
					payload: {
						Modalvisible: false
					}
				})
			},
			/*提交*/
			handForm: (value) => {
				self.props.dispatch({
					type: 'ManageDetai/ManageModifyWhiteList',
					payload: {
						host_id: this.props.ids,
						...value
					}
				})
			},
			/*进程验证*/
			processName: (value) => {
				self.props.dispatch({
					type: 'ManageDetai/ManageValWhiteList',
					payload: {
						host_id: this.props.ids,
						process_name: value
					}
				})
			}
		};
		const FingWhite = {
			ids: self.props.ids,
			fingCurrent: fingCurrent,
			fingOnclick: () => {
				self.props.dispatch({
					type: 'ManageDetai/showloading',
					payload: {
						fingCurrent: true,
						ModalAlarmAdd: [],
					}
				})
			},
			/*新增数据弹窗*/
			handleAdd: () => {
				switch (this.props.hostStatus) {
					case 0:
						return message.warning('请先提取指纹')
					case 1:
						return message.warning('请先提取指纹')
					case 2:
						this.props.dispatch({
							type: 'ManageDetai/showloading',
							payload: {
								Modalvisible: true
							}
						});
						return false
					case 3:
						return message.warning('请先提取指纹');
					default:
						return null
				}
			},
		}
		return (
			<QueueAnim type="bottom" component="div">
			    {/*白名单*/}
			    {
			    	fingCurrent==false?
		                <div key="1">
		                <Detaiwhite {...FingWhite}/>
		                <Detaimodal {...detaimodals}/>
		                </div>
		            :null
		        }
			    {/*提取指纹下一步*/}
			    {
			    	fingCurrent==true?
	                <div key="2">
				        <Steps current={current} key="3">
				          {steps.map(item => <Step key={item.title} title={item.title} />)}
				        </Steps>
				        <div key="4" className={styles.stepsContent}>{steps[current].content}</div>
				        <div key="5" className={styles.stepsAction}>
				          {
				            current ===0
				            &&
				            <Button type="primary" onClick={() => this.Fingerprint()}>提取</Button>
				          }
				          {
				            current ===1
				            &&
				            <Button type="primary" onClick={() => this.FingerWhite()} disabled={this.state.disabledSwitch?'':'disabled'}>下一步</Button>
				          }
				          {
				            current ===2
				            &&
				            <Button type="primary" onClick={() => this.whiteOnclick()}>生成白名单</Button>
				          }
				          {
				            current >=0
				            &&
				            <Button style={{ marginLeft: 8 }} type="ghost" onClick={() => this.prev()}>
				              取消
				            </Button>
				          }
				        </div>
			        </div>
			        :null
		      }
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
export default connect(mapStateToProps, mapDispatchToProps)(Detaisecurity);