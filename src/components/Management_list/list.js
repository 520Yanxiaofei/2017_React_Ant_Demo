import React, {
	Component,
	PropTypes
} from 'react';

import {
	Tooltip,
	Input,
	Spin,
	Icon,
	Row,
	Col,
} from 'antd';
import {
	Link
} from 'react-router';
import QueueAnim from 'rc-queue-anim';
import styles from './list.less'
import Percentstatus from '../percent/managementPercentlist'



const ManageList = ({
	list,
	scrollstatus,
	edit_id,
	onAlarmMsg,
	onAlarmMsgDel,
	alarmlist,
	alarmloading,
	onEntername,
	onEditFocus,
	onEditBulr,
}) => {
	if (!list) return null;
	if (!alarmlist) return null;

	/*提示悬浮层*/
	const alarmMap = (
		<div>
			 {
			   	alarmlist.map((data,index)=>{
			   		return(
				   		<li key={index}>
		  					<Icon type="close-circle"/>
		  					<span>{data.warn_name}————{data.process_name}</span>
		  				</li>
			   		)
			   	})	
	  		}
		</div>
	);
	const alarmContent = (
		<Spin spinning={alarmloading}  tip="加载数据中...">	
			<ul className={styles.feimessage}>
			   {alarmMap}
	  		</ul>
  		</Spin>
	);

	/*高危提示*/
	function Gaoonvisible(id, e) {
		Alarmdata(id, e, 0)
	};
	/*中危提示*/
	function Zhongonvisible(id, e) {
		Alarmdata(id, e, 1)
	};
	/*低危提示*/
	function DIonvisible(id, e) {
		Alarmdata(id, e, 2)
	};
	/*触发告警数据*/
	function Alarmdata(id, e, level) {
		if (e) {
			const value = {
				host_id: id,
				level: level
			};
			onAlarmMsg(value)
		} else {
			onAlarmMsgDel()
		}
	}

	function Managetextchange(e) {
		e.preventDefault();
	};
	/*修改主机名*/
	function Managenamechange(id, e) {
		e.preventDefault()
		const value = {
			host_id: id,
			host_name: e.target.value
		}
		onEntername(value)
		MangeBulr()
	};
	/*获取焦点事件*/
	function MangeFocus(id, e) {
		e.preventDefault()
		onEditFocus(id)
	};
	/*失去焦点事件*/
	function MangeBulr() {
		onEditBulr()
	};
	return (
		<div className={styles.listheightauto}>
		<QueueAnim type="bottom" component="div">
		 {
           list.map((data,index)=>{
       		/*已防护*/
			const PercentBar = (
				<div>
		  	    {
		  	   	  data.total_goal>=0 && data.total_goal<=59?
		      		<div className={styles.feibaohu}>
		      			<Percentstatus percent={data.total_goal} style="#ff6969" percentBreak={true}/>
		      			<div className={styles.feiwords}>保护中</div>
		      		</div>
		      		:null
		      	}
		      	{
		  	   	  data.total_goal>=60 && data.total_goal<=80?
		      		<div className={styles.feibaohu}>
		      			<Percentstatus percent={data.total_goal} style="#f79945" percentBreak={true}/>
		      			<div className={styles.feiwords}>保护中</div>
		      		</div>
		      		:null
		      	}
		      	{
		  	   	  data.total_goal>=81 && data.total_goal<=100?
		      		<div className={styles.feibaohu}>
		      			<Percentstatus percent={data.total_goal} style="#38da46" percentBreak={true}/>
		      			<div className={styles.feiwords}>保护中</div>
		      		</div>
		      		:null
		      	}
		    </div>
			);
		    const PercentText=(
                <div className={styles.feiokBox}>
  					<Icon type="check-circle" className={styles.feisgreen}/>
                    <h2 className={styles.feisgreen}>安全运行中</h2>
  				</div>
		    );
			/*未防护-未提取*/
			const ProtectionBar=(
				 <div className={styles.feibaohu}>
					<Percentstatus percent='0' style="#f1d543" percentBreak={false}/>
					<Icon className={styles.weibaocolor} type="question" />
					<div className={styles.feiwords}>未保护</div>
				 </div>
		    );
		    const ProtectionText=(
                <div className={styles.feiokBox}>
  					<Icon type="question-circle" className={styles.feisyellow} />
                    <h2 className={styles.feisyellow}>未开启防护</h2>
  				</div>
		    );
		    /*未上线*/
		    const NotlineBar=(
		    	<div className={styles.feibaohu}>
	      			<Percentstatus percent="0" style="#666" percentBreak={false}/>
	      			<Icon className={styles.weilinecolor} type="exclamation" />
	      			<div className={styles.feiwords}>未上线</div>
	      		</div>
		    );
		    const NotlineText=(
                <div className={styles.feiokBox}>
  					<Icon type="exclamation-circle" className={styles.feisBlack} />
                    <h2 className={styles.feisBlack}>主机未上线</h2>
  				</div>
		    );
		    /*高危-中危-低危*/
		    const GaoZonDi=(
		    	 <div>
				 {
      				 data.high_num!==0?
      				<Col span={12} className={styles.feigaoweibox}>
      					<Icon type="exclamation-circle" className={styles.feigaowei}/>
      					<Tooltip onVisibleChange={Gaoonvisible.bind(this,data.host_id)} placement="bottom" title={alarmContent}>
	      					<dl className={styles.gaoweidl}>
	      						<dd>高危</dd>
	      						<dt style={{color:"red"}}>{data.high_num}个</dt>
	      					</dl>
      					</Tooltip>
      				</Col>
      				:null
      			  }
      			  {
      			  	data.mid_num!==0?
      				<Col span={12}  className={styles.feizhongweibox}>
      					<Icon type="exclamation-circle" className={styles.feizhongwei}/>
      					<Tooltip onVisibleChange={Zhongonvisible.bind(this,data.host_id)} placement="bottomRight" title={alarmContent}>
      					<dl className={styles.zhongweidl}>
      						<dd>中危</dd>
      						<dt style={{color:"darkorange"}}>{data.mid_num}个</dt>
      					</dl>
      					</Tooltip>
      				</Col>
      				:null
      			   }
      			   {
      			   	data.low_num!==0?
      				<Col span={12}  className={styles.feidiweibox}>
      					<Icon type="exclamation-circle" className={styles.feidiwei}/>
      					<Tooltip onVisibleChange={DIonvisible.bind(this,data.host_id)} placement="bottomRight" title={alarmContent}>
      					<dl className={styles.diweidl}>
      						<dd>低危</dd>
      						<dt style={{color:"darkgray"}}>{data.low_num}个</dt>
      					</dl>
      					</Tooltip>
      				</Col>
      				:null
      			   }
      			   </div>
		    );
		    const ipdata=data.host_ip.split(',');
		    /*多个ip*/
			const iplist=(
				<div>
				   {
                        ipdata?
				     	ipdata.map((dataip,index) => {
				          return (
				          	 <div key={index}>
                                <p>ip{index}：{dataip}</p>
				          	 </div>
				          	)
				        }):null
				    }
				   
				 </div>
			);
           	return  (
           		<div  key={index}>
				<Col sm={16} md={12} lg={8} className={styles.feicard}>
					   <div  key={index} className={styles.feicardAnimate}>
					    <Link  to={`/managedetai/${data.host_id}/1`} >
					    <Row className={styles.feiBlue}>
					      <Col span={6}>
					      		<Icon type="windows" className={styles.feiimg}/>
					      </Col>
					      <Col className={styles.feibiaoti} span={6}>
					      	<p>主机名称：</p>
					      	<p>IP地址：</p>
					      </Col>
					      <Col className={styles.feiinput} span={12}>
					        {
					        data.host_id==edit_id?
					      	<Input defaultValue={data.host_name} onClick={Managetextchange.bind()}  onPressEnter={Managenamechange.bind(this,data.host_id)} autoFocus onBlur={MangeBulr}/>
					      	:
					      	<span className={styles.feinametext}><Tooltip placement="bottomLeft" title={data.host_name} arrowPointAtCenter><h3 className={styles.feinameOverfl}>{data.host_name}</h3></Tooltip><Icon onClick={MangeFocus.bind(this,data.host_id)} type="edit" /></span>
					        }
					        <Tooltip placement="bottomRight" title={iplist} arrowPointAtCenter>
					          <span className={styles.feiiptext}>{ipdata[0]}</span>
							  {/*} <span className={styles.feiAgent}>Ip地址：{data.ip ==''?null:data.ip[0].ip}&nbsp;<Icon type="bars" /></span>*/}
							</Tooltip>
					      	
					      </Col>
					    </Row>
					    </Link>
					    <Row>
					      <Col span={24}>
					      	<div className={styles.feiprotect}>
					      	    {/*防护状态*/}
						      	{
						      		data.host_status==2?
						      		 PercentBar
								    :null
								}
							    {/*未防护状态-未提取状态*/}
								{
									data.host_status==0 || data.host_status==1?
								     ProtectionBar
								    :null
								}
							    {/*未上线*/}
								{
									data.host_status==3?
								     NotlineBar	
						      		:null
								}
					      		<div className={styles.feialert}>
						      		<Link  to=
						      			 {(()=>{
                                    		switch (data.host_status){
                                    		case 0:return `/managedetai/${data.host_id}/2`;
                                    		case 1:return `/managedetai/${data.host_id}/2`;
                                    		case 2:if(data.total_goal >= 80 ){return `/managedetai/${data.host_id}/1` }else{return `/managedetai/${data.host_id}/3`} ;
                                    		case 3:return `/managedetai/${data.host_id}/1`;
                                    		default :return null
		                                    }
		                                })()}
		                             >
					      			<div className={styles.feigaojing}>告警数量：
						      			<span className={styles.feispan}>
						      			  {data.host_status==2?data.total_num:0}个
						      			</span>
					      			</div>
					      			<Row className={styles.feiloudong}>
					      			    {/*已防护*/}
					      				{
					      					data.high_num==0 && data.mid_num==0 && data.low_num==0 && data.host_status==2?
					      					 PercentText
						      				:null
					      				}
						      			{/*高危-中危-低危状态*/}
						      			{
						      				data.host_status==2?
						      				 GaoZonDi
						      				:null
						      			}
						      			{/*未防护*/}
						      			{
						      				data.host_status==1 || data.host_status==0?
						      				ProtectionText
						      				:null
						      			}
						      		    {/*未上线*/}
						      			{
						      				data.host_status==3?
						      				NotlineText
						      				:null
						      			}
					      			</Row>
					      		   </Link>
					      		</div>
					      	</div>
					      </Col>
					    </Row>
					  </div>
				</Col>
				</div>
           		)
           })
         }
		</QueueAnim>
		{(()=>{
	    	switch (scrollstatus){
	    		case 0:return <div className={styles.scrollStyles}>继续滚动，加载更多...</div>
	    		case 1:return <div className={styles.scrollStyles}>正在加载中</div>
	    		case 2:return <div className={styles.scrollStyles}>没有更多数据了...</div>
	    		case 3:return null
	    		case 4:return <div className={styles.scrollStyles}>暂时没有主机</div>
	    	}
	    })()}
	    </div>
	)
};

ManageList.proptypes = {
	Managetext: PropTypes.func
};

export default ManageList;