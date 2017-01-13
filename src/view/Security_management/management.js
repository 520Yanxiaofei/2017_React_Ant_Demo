import React, {
	Component,
	PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import {
	connect
} from 'dva';
import {
	Spin,
	Icon,
	Col,
	Row,
	Button,
	Alert,
	Affix,
} from 'antd';
import styles from './management.less';
/*动画组件:*/
import QueueAnim from 'rc-queue-anim';
/*添加资产*/
import ManagementModal from '../../components/modal/managementModal';
/*筛选组件*/
import ManageSearch from '../../components/search/manageSearch';
/*卡片组件:*/
import ManagementList from '../../components/Management_list/list';
/*分页组件:*/
import Localhostd from '../../components/public/localhost';

/******************************/
/*name:未提取主机*/
/******************************/

const Management = React.createClass({
	getInitialState() {
		return {}
	},
	componentDidMount: function() {
		/*提示*/
		this.props.dispatch({
			type: 'ManageList/ManageWarning',
		});
		/*卡片数据*/
		this.props.dispatch({
			type: 'ManageList/ManageAllHost',
			payload: {
				listloading: true,
				scrollBottom: true,
				page_num: 0,
			}
		});

		window.scrollTo(0, 0)
		document.addEventListener('scroll', this.onscollPage)
	},
	componentWillUnmount: function() {
		this.props.dispatch({
			type: 'ManageList/showloading',
			payload: {
				list: [],
				page_num: 0,
				alarmstatus: '',
			}
		});
		/*滚动关闭*/
		document.removeEventListener('scroll', this.onscollPage);
	},
	onscollPage: function(Event) {
		let scrollTop = Event.target.body.scrollTop; /*滚动距离*/
		let scrollbody = Event.target.body.scrollHeight; /*body高度*/
		let scrollDisplay = Event.target.body.clientHeight; /*可见区域高度*/
		let scrollBottom = (scrollDisplay + scrollTop) == scrollbody ? true : null;
		if (scrollBottom) {
			this.props.dispatch({
				type: 'ManageList/ManageAllHost',
				payload: {
					listloading: false,
					scrollBottom: true,
				}
			});
		}
	},
	/*添加资产*/
	Agentchange: function() {
		this.props.dispatch({
			type: 'ManageModal/ShowModal',
			payload: {
				visible: true,
			}
		});
	},
	/*展开搜索*/
	searchAntima: function() {
		this.setState({
			searShow: !this.state.searShow
		})
	},
	render: function() {
		const self = this;
		/*主机state*/
		const {
			id,
			list,
			edit_id,
			listloading,
			page_num,
			page_size,
			scrollstatus,
			alarmlist,
			alarmloading,
			warloading,
			warlist
		} = self.props.ManageList;
		/*资产state*/
		const {
			visible,
			loading
		} = self.props.ManageModal;
		/*******************/
		/*卡片数据*/
		/******************/
		const managelistmap = {
				list,
				scrollstatus,
				edit_id,
				listloading,
				alarmlist,
				alarmloading,
				/*鼠标移上显示告警信息*/
				onAlarmMsg: (value) => {
					self.props.dispatch({
						type: "ManageList/ManageAlarmMsg",
						payload: {
							...value,
							page: 0,
							page_size: 3
						}
					});
				},
				/*移开后清除数据*/
				onAlarmMsgDel: () => {
					self.props.dispatch({
						type: "ManageList/ManageAlarmMsgDel",
						payload: {
							alarmlist: []
						}
					});
				},
				/*修改主机名*/
				onEntername: (value) => {
					self.props.dispatch({
						type: 'ManageList/ManageHostName',
						payload: value
					})
				},
				/*获取焦点效果*/
				onEditFocus: (value) => {
					self.props.dispatch({
						type: 'ManageList/showloading',
						payload: {
							edit_id: value
						}
					})

				},
				/*失去焦点效果*/
				onEditBulr: () => {
					self.props.dispatch({
						type: 'ManageList/showloading',
						payload: {
							edit_id: ''
						}
					})
				}
			}
			/*******************/
			/*添加资产*/
			/******************/
		const modallist = {
			visible,
			loading,
			/*关闭*/
			onCancel: () => {
				self.props.dispatch({
					type: 'ManageModal/HideModal',
					payload: {
						visible: false,
					}
				});
			}
		};
		/*******************/
		/*搜索查询*/
		/******************/
		const searchForms = {
			//查询
			onSearch: (value) => {
				self.props.dispatch({
					type: 'ManageList/showloading',
					payload: {
						list: [],
						page_num: 0,
						alarmstatus: value.status,
					}
				})
				self.props.dispatch({
					type: 'ManageList/ManageAllHost',
					payload: {
						...value,
						listloading: false,
						scrollBottom: true,
					}
				})
			}
		};

		/*******************/
		/*提示*/
		/******************/
		const descritext = (
			<Spin spinning={warloading}>
				<ul className={styles.descrBox}>
				 <li onClick={()=>searchForms.onSearch({status:''})}><h3>资产总计：</h3><h2 className={styles.Acolor}>{warlist.all_num || 0}</h2>个</li>
				 <li onClick={()=>searchForms.onSearch({status:'2'})}><h3>危险主机：</h3><h2 className={styles.Bcolor}>{warlist.risk_num || 0}</h2>个</li>
				 <li onClick={()=>searchForms.onSearch({status:'4'})}><h3>未上线：</h3><h2 className={styles.Ccolor}>{warlist.offline_num || 0}</h2>个</li>
				 <li onClick={()=>searchForms.onSearch({status:'3'})}><h3>未保护：</h3><h2 className={styles.Dcolor}>{warlist.no_pro_num || 0}</h2>个</li>
				</ul>
			 </Spin>
		);
		return (
			<div> 
				  <QueueAnim type="top">
				     <div key="1">
	                   <Row className={styles.mangeTitleBtn}>
	                     <Col span={8}>
				             <Row type="flex" justify="start" className={styles.localRight}>
				                  <Button type="primary" icon="desktop" size="large" onClick={this.Agentchange} >添加资产</Button>
				                  <Button className={styles.Btnleft} type="primary" icon="filter" size="large" onClick={this.searchAntima} >筛选</Button>
				            </Row>
	                     </Col>
	                      <Col span={16}>
	                        <Alert key="2" message={descritext} type="warning" showIcon closable={true}/>
	                     </Col>
	                   </Row>
	                 </div>
	            </QueueAnim>
			    <QueueAnim type="top">
			    {
			      this.state.searShow ?
			      <div key="3">
			      <ManageSearch {...searchForms}/>
			      </div>
			      :null
			    }
			    </QueueAnim>
			    <Spin spinning={listloading}  size="large">
				    <ManagementList  {...managelistmap}/>
			    </Spin>
	            <ManagementModal {...modallist}/>
         </div>
		)
	}
});

function mapStateToProps(ManageModal, ManageList) {
	return {
		...ManageList,
		...ManageModal
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}
/*建立数据关联关系*/
export default connect(mapStateToProps, mapDispatchToProps)(Management);