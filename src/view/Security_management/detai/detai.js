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
	Input,
	Form,
	Breadcrumb
} from 'antd';
import {
	Link,
	IndexLink
} from 'react-router';
import styles from './detai.less';
import QueueAnim from 'rc-queue-anim';

import PercentRadius from '../../../components/percent/managementPercentDetai';
/*状态监控*/
import DetaiStatus from '../tab/detaistatus';
/*安全配置*/
import DetaiSecurity from '../tab/detaisecurity';
/*事件告警*/
import DetaiAlarm from '../tab/detaialarm';
/*审计对比*/
import DetaiAudit from '../tab/detaiaudit';


const FormItem = Form.Item;
const FromInput = ({
	host_name,
	UpName,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
	},
}) => {
	const names = {...getFieldsValue()
	};
	return (
		<Row>
		<Col span={5}>
		<Form horizontal >
                <FormItem>
                {
                	getFieldDecorator('host_name',{
                		initialValue:host_name,
                		rules: [{
			              required: true,
			              message: "名称不能为空",
			            }],
                	})(
                	   <Input autoFocus className={styles.detaiInputName}/>
                	)
                }
				</FormItem>
		</Form>
		</Col>
		<Col span={2}>&nbsp;&nbsp;<a onClick={()=>UpName(names)}>确定修改</a></Col>
		</Row>
	)
}
const FromInputName = Form.create({})(FromInput)

const Managedetaicontent = React.createClass({
	getInitialState: function() {
		return {
			/*卡片id*/
			id: this.props.params.id,
			/*选项卡*/
			TabCurrent: this.props.params.TabCurrent || '1',
			/*修改主机名称状态*/
			nameCurrent: false,
			/*主机名*/
			hostName: this.props.ManageDetai.detai.host_name,
		};
	},
	componentDidMount: function() {
		/*主机信息*/
		this.props.dispatch({
			type: 'ManageDetai/ManageShowMsg',
			payload: {
				host_id: this.state.id,
				loading: true
			}
		});
	},
	componentWillUnmount: function() {
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				detai: []
			}
		});
	},
	/*修改主机名*/
	render() {

		const self = this;
		/*state*/
		const {
			/*主机信息*/
			detai,
			/*主机加载*/
			loading,
			protdMsg

		} = self.props.ManageDetai;
		/*主机信息*/
		if (!detai) return null;
		const Namedata = {
			host_name: this.state.hostName || detai.host_name,
			UpName: (value) => {
				self.props.dispatch({
					type: 'ManageList/ManageHostName',
					payload: {
						host_id: this.state.id,
						host_name: value.host_name || detai.host_name,
					}
				})
				this.setState({
					hostName: value.host_name,
					nameCurrent: false
				})
			},
		};
		/*已防护*/
		const PercentBar = (
			<div>
			    {
	  	   	       detai.host_score>=0 && detai.host_score<=59?
	  	   	       <div>
	                   <PercentRadius percent={detai.host_score} style="#ff6969" percentBreak={true}/>
	                   <div className={styles.feiwords}>保护中</div>
                   </div>
			       :null
		      	}
		      	{
		  	   	  detai.host_score>=60 && detai.host_score<=80?
		  	   	  <div>
			  	   	  <PercentRadius percent={detai.host_score} style="#f79945" percentBreak={true}/>
			  	   	  <div className={styles.feiwords}>保护中</div>
		  	   	  </div>
		  	   	  :null
		      	}
		      	{
	      		  detai.host_score>=81 && detai.host_score<=100?
	      		  <div>
	      			<PercentRadius percent={detai.host_score} style="#38da46" percentBreak={true}/>
	      			<div className={styles.feiwords}>保护中</div>
	      		  </div>
	      		  :null
		      	}
			</div>
		);
		/*未防护-未提取*/
		const ProtectionBar = (
			<div className={styles.feibaohu}>
				<PercentRadius percent='0' style="#f1d543"/>
				<Icon className={styles.weibaocolor} type="question"/>
				<div className={styles.feiwords}>未保护</div>
			 </div>
		);
		/*未上线*/
		const NotlineBar = (
			<div className={styles.feibaohu}>
      			<PercentRadius percent="0" style="#666"/>
      			<Icon className={styles.weilinecolor} type="exclamation"/>
      			<div className={styles.feiwords}>未上线</div>
      		</div>
		);
		/*状态监控*/
		const SecurityData = {
			ids: this.state.id,
		};
		/*安全配置*/
		const ConfigureWhite = {
			ids: this.state.id,
			protdMsg,
			hostStatus: detai.host_status,
		};
		const alertMsgData = {
			ids: this.state.id,
		};
		/*审计对比*/

		return (
			<QueueAnim type="bottom" component="div">
			   <div key="1" className={styles.Detairow}>
			    <div className={styles.Returntext}>
                  <Breadcrumb>
                    <Breadcrumb.Item><Link to="/" >&nbsp;<Icon type="home" />&nbsp;</Link></Breadcrumb.Item>
				    <Breadcrumb.Item><Link to="/management" >&nbsp;安全管理&nbsp;</Link></Breadcrumb.Item>
				    <Breadcrumb.Item>
				    <Link to={`/managedetai/${this.state.id}/${this.state.TabCurrent}`} >
				         &nbsp;
                            {(()=>{
	                		switch (this.state.TabCurrent){
	                		case '1':return '状态监控';
	                		case '2':return '安全配置';
	                		case '3':return '事件告警';
	                		case '4':return '审计对比';
	                		default: return null
	                        }
	                     })()}
	                     &nbsp;
				    </Link>
				    </Breadcrumb.Item>
				    <Breadcrumb.Item>&nbsp;{detai.host_name}</Breadcrumb.Item>
				  </Breadcrumb>
                </div>
                <Spin spinning={loading}>	
	                <div className={styles.mangeTops} >
	                   <div className={styles.manageImag}>
	                            {/*防护状态*/}
						      	{
						      		detai.host_status==2?
						      		 PercentBar
								    :null
								}
							    {/*未防护状态-未提取状态*/}
								{
									detai.host_status==0 || detai.host_status==1?
								     ProtectionBar
								    :null
								}
							    {/*未上线*/}
								{
									detai.host_status==3?
								     NotlineBar	
						      		:null
								}
				                
	                   </div>
	                   <div className={styles.manageTextdetai}>
	                      <dl>
	                        <dt>主机名称：</dt>
	                        <dd>
		                        {
		                        	this.state.nameCurrent?
		                        	<FromInputName {...Namedata}/>
		                        	:
			                        <span>{this.state.hostName || detai.host_name}&nbsp;<a onClick={()=>this.setState({nameCurrent:true})}>修改名称</a></span>
			                    }			                        
	                        </dd>
	                      </dl>
	                      <dl>
	                        <dt>计算机名：</dt>
	                        <dd>{detai.pc_name}</dd>
	                      </dl>
	                      <dl>
	                        <dt>操作系统：</dt>
	                        <dd>{detai.os_name}</dd>
	                      </dl>
	                      <dl>
	                        <dt>主机IP：</dt>
	                        <dd>{detai.host_ip}</dd>
	                      </dl>
	                       <dl>
	                        <dt>运行时间：</dt>
	                        <dd>{detai.run_time}</dd>
	                      </dl>
	                       <dl>
	                        <dt>Agent信息：</dt>
	                        <dd> {detai.agent_version}
	                        </dd>
	                      </dl>
	                   </div>
	                </div>
                </Spin>
                </div>
                <div key="2">
                     <div  className={styles.manageContainer}>
                       <ul className={styles.mangeTablink}>
	                     <li className={this.state.TabCurrent=='1'?styles.active:''} onClick={()=>this.setState({TabCurrent:'1'})}>状态监控</li>
	                     <li className={this.state.TabCurrent=='2'?styles.active:''} onClick={()=>this.setState({TabCurrent:'2'})}>安全配置</li>
	                     <li className={this.state.TabCurrent=='3'?styles.active:''} onClick={()=>this.setState({TabCurrent:'3'})}>事件告警</li>
	                     {/*<li className={this.state.TabCurrent=='4'?styles.active:''} onClick={()=>this.setState({TabCurrent:'4'})}>审计对比</li>*/}
	                   </ul>
	                     {(()=>{
	                		switch (this.state.TabCurrent){
	                		case '1':return <DetaiStatus {...SecurityData}/>;
	                		case '2':return <DetaiSecurity {...ConfigureWhite}/>;
	                		case '3':return <DetaiAlarm {...alertMsgData}/>;
	                		case '4':return <DetaiAudit />;
	                		default: return null
	                        }
	                     })()}
                     </div>
                </div>
			</QueueAnim>
		);
	},
});


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
export default connect(mapStateToProps, mapDispatchToProps)(Managedetaicontent);