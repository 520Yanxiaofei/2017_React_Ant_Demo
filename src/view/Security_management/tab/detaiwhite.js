import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import QueueAnim from 'rc-queue-anim';
import {
	Table,
	Input,
	Icon,
	Button,
	Popconfirm,
	Form,
	Row,
	Col,
	message,
	Select
} from 'antd';
import styles from '../detai/detai.less'
import Page from '../../../components/page/managedetaiPage'

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;

/*编辑模板-yxf*/
class EditableCell extends React.Component {
	state = {
		value: this.props.value,
		editable: this.props.editable || false,
		ietmkey: this.props.ietmkey,
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.editable !== this.state.editable) {
			this.setState({
				editable: nextProps.editable
			});
			if (nextProps.editable) {
				this.cacheValue = this.state.value;
			}
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.editable !== this.state.editable ||
			nextState.value !== this.state.value;
	}
	handleChange(e) {
		const value = e.target.value;
		this.setState({
			value
		});
	}
	render() {
		const {
			value,
			editable,
			ietmkey,
		} = this.state;
		return (
			<div>
		      {
		        editable?
		        <FormItem className={styles.editFormInput} >
		         {this.props.getFieldDecorator(`${ietmkey}`, {
                        initialValue:value,
			            rules: [{
			              required: true,
			              message: "不能为空",
			            }],
			          })(
			          <Input onChange={e => this.handleChange(e)}/>
		              )}
		        </FormItem>
		        :
		        <div className={styles.whiteTr}>
		          {value || '' }
		        </div>
		      }
		      
		      
		    </div>
		);
	}
}

const EditableTable = React.createClass({
	getInitialState: function() {
		return {
			/*编辑状态*/
			itemsd: '',
			hostState: this.props.ManageDetai.detai.host_status,
			buttonState: false
		};
	},
	componentDidMount: function() {
		const {
			countwhite,
			pagecurrentwhite
		} = this.props.ManageDetai
			/*白名单*/
		this.props.dispatch({
			type: 'ManageDetai/ManageShowWhiteList',
			payload: {
				host_id: this.props.ids,
				page_num: countwhite,
				page_size: pagecurrentwhite
			}
		});
		if (this.state.hostState == 3) {
			this.setState({
				buttonState: true
			});
		}
	},
	componentWillUnmount: function() {
		/*销毁值*/
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				countwhite: 1,
			}
		})
	},
	renderColumns: function(data, index, key, text) {
		const {
			getFieldDecorator
		} = this.props.form;
		const {
			editable,
		} = data[index][key];

		if (typeof editable === 'undefined') {
			return text;
		}
		if (typeof key === 'undefined') {
			return key
		}
		// if(typeof )
		return (
			<EditableCell
		      editable={editable}
		      value={text}
		      ietmkey={key}
		      getFieldDecorator={getFieldDecorator}
		      status={status}
		    />
		);
	},
	renderColumnSelect: function(data, index, key, text) {
		const {
			getFieldDecorator
		} = this.props.form;
		const {
			editable,
		} = data[index][key];

		if (typeof editable === 'undefined') {
			return text;
		}
		return (
			<div>
			{
				editable ?
				<FormItem className={styles.editFormInput}>
		             {getFieldDecorator('process_status', {
		             	initialValue:text==1?'运行中':'无',
			            rules: [
			              { required: true, message: '请选择状态!' },
			            ],
			          })(
	                     <Select>
					      <Option value="1">运行中</Option>
					      <Option value="0">无</Option>
					    </Select>
	                  )}
		         </FormItem> : <div>{text==1?'运行中':'无' || ''}</div>
			}
		    </div>
		)
	},
	/*点击编辑获取*/
	onClickEdit: function(index) {
		this.setState({
			itemsd: index
		});
		const ids = this.state.itemsd || 0; /*编辑时隐藏修改状态*/
		const {
			Whitelist
		} = this.props.ManageDetai;
		if (index !== ids) {
			Object.keys(Whitelist[ids]).forEach((item) => {
				if (Whitelist[ids][item] && typeof Whitelist[ids][item].editable !== 'undefined') {
					Whitelist[ids][item].editable = false;
				}
			});
		}
		Object.keys(Whitelist[index]).forEach((item) => {
			if (Whitelist[index][item] && typeof Whitelist[index][item].editable !== 'undefined') {
				Whitelist[index][item].editable = true;
			}
		});
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				Whitelist: Whitelist
			}
		})

	},
	/*提交修改,假动态*/
	editDone: function(index, type, whiteData, updaId) {
		/*编辑*/
		this.props.dispatch({
			type: 'ManageDetai/ManageModifyWhiteList',
			payload: {
				host_id: this.props.ids,
				id: updaId,
				...whiteData
			}
		})
		const {
			Whitelist
		} = this.props.ManageDetai;
		/*隐藏编辑*/
		Object.keys(Whitelist[index]).forEach((item) => {
			if (Whitelist[index][item] && typeof Whitelist[index][item].editable !== 'undefined') {
				Whitelist[index][item].editable = false
			}
		});
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				Whitelist: Whitelist
			}
		})
	},
	/*取消*/
	editcolse: function(index) {
		const {
			Whitelist
		} = this.props.ManageDetai;
		/*隐藏编辑*/
		Object.keys(Whitelist[index]).forEach((item) => {
			if (Whitelist[index][item] && typeof Whitelist[index][item].editable !== 'undefined') {
				Whitelist[index][item].editable = false
			}
		});
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				Whitelist: Whitelist
			}
		})
	},

	/*删除一行*/
	onDelete: function(index, type, delId) {
		const {
			Whitelist
		} = this.props.ManageDetai;
		const data = [...Whitelist];
		/*静态删除*/
		data.splice(index, 1);
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				Whitelist: Whitelist
			}
		})
		this.onDeleteForm(delId)
	},
	onDeleteForm: function(delId) {
		/*删除*/
		this.props.dispatch({
			type: 'ManageDetai/ManageDelWhiteList',
			payload: {
				host_id: this.props.ids,
				id: delId
			}
		})
	},
	/*多选删除*/
	onSelectChange: function(selectedRowKeys, selectedRows) {
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				selectedRowKeys: selectedRowKeys,
			}
		})
	},
	rowselectDel: function() {
		const {
			selectedRowKeys
		} = this.props.ManageDetai;
		if (selectedRowKeys == '') {
			message.warning('请选择要删除的进程')
		} else {
			this.props.dispatch({
				type: 'ManageDetai/ManageDelWhiteListById',
				payload: {
					host_id: this.props.ids,
					ids: selectedRowKeys.join(','),
				}
			})
		}
	},
	/*上移排序*/
	onClickUp: function(index) {
		let moveIndex = Number.parseInt(index - 1);
		this.onMovelist(index, moveIndex, 'Up')
	},
	/*下移排序*/
	onClickDown: function(index) {
		let moveIndex = Number.parseInt(index + 1);
		this.onMovelist(index, moveIndex, 'Down')
	},
	/*排序*/
	onMovelist: function(index, moveIndex, move) {
		const {
			Whitelist
		} = this.props.ManageDetai;
		if (index == 0) {
			second = Whitelist[index].key /*超过最前为0,不能上移*/
		}
		if (Number.parseInt(index + 1) == Whitelist.length) {
			second = Whitelist[index].key /*超过最后为0,不能下移*/
		}
		/*后台传值*/
		let filrst = Whitelist[moveIndex].key; /*前一行*/
		let second = Whitelist[index].key; /*后一行*/
		/*静态改变*/
		let arry = Whitelist[moveIndex];
		Whitelist[moveIndex] = Whitelist[index];
		Whitelist[index] = arry;
		this.props.dispatch({
			type: 'ManageDetai/ManageMoveWhiteList',
			payload: {
				host_id: this.props.ids,
				id1: second,
				id2: filrst
			}
		})
		this.props.dispatch({
			type: 'ManageDetai/showloading',
			payload: {
				Whitelist: Whitelist
			}
		})
	},
	render() {
		const {
			Whitelist,
			Whiteloading,
			selectedRowKeys
		} = this.props.ManageDetai;
		if (!Whitelist) return null;
		const dataSource = Whitelist.map((item) => {
			const obj = {};
			Object.keys(item).forEach((key) => {
				obj[key] = key === 'key' ? item[key] : item[key].value;
			});
			return obj;
		});
		const selectStatus = true;
		const columns = [{
			title: '进程名',
			dataIndex: 'process_name',
			width: '15%',
			render: (text, record, index) => this.renderColumns(Whitelist, index, 'process_name', text),
		}, {
			title: '启动用户',
			dataIndex: 'process_user',
			width: '15%',
			render: (text, record, index) => this.renderColumns(Whitelist, index, 'process_user', text),
		}, {
			title: '启动参数',
			dataIndex: 'process_param',
			width: '15%',
			render: (text, record, index) => this.renderColumns(Whitelist, index, 'process_param', text),
		}, {
			title: '路径',
			dataIndex: 'process_url',
			width: '23%',
			render: (text, record, index) => this.renderColumns(Whitelist, index, 'process_url', text),
		}, {
			title: '状态',
			dataIndex: 'process_status',
			width: '8%',
			render: (text, record, index) => this.renderColumnSelect(Whitelist, index, 'process_status', text),
		}, {
			title: '端口号',
			dataIndex: 'process_port',
			width: '6%',
			render: (text, record, index) => this.renderColumns(Whitelist, index, 'process_port', text),
		}, {
			title: '操作',
			dataIndex: 'operation',
			render: (text, record, index) => {
				const {
					editable
				} = Whitelist[index].process_name;
				const {
					getFieldsValue,
					validateFields
				} = this.props.form;
				const whiteData = {...getFieldsValue()
				}

				function handleOk() {
					// validateFields((errors) => {
					// 	if (errors) {
					// 		return;
					// 	}
					// 	handForm(data)
					// });
				};
				return (
					<div className={styles.operation}>
					
			          {
			            editable?
			            <ButtonGroup className={styles.editAddbtn}>
			              <Button icon="close" size="small" onClick={() => this.editcolse(index, '取消')}/>
			              <Popconfirm title="确定修改?" onConfirm={() => this.editDone(index, '确定', whiteData,record.key)}>
			                <Button size="small" icon="check" type="primary"/>
			              </Popconfirm>
			            </ButtonGroup>
			            :
			            <span>
				          	<ButtonGroup>
				          	<Button onClick={()=>this.onClickUp(index)} size="small" icon="up" />
				          	<Button onClick={()=>this.onClickDown(index)} size="small" icon="down" />
			             	</ButtonGroup>
				          	<ButtonGroup className={styles.editDisplay}>
						      <Button size="small" type="primary" icon="edit" onClick={() => this.onClickEdit(index)}/>
						      <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(index,'确定',record.key)}>
						      <Button size="small" icon="delete" />
						      </Popconfirm>
						    </ButtonGroup>
					    </span>
			          }
                </div>);
			},
		}];
		/*获取多选值*/
		const rowselectCheckbox = {
			type: 'checkbox',
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		/*******************/
		/*白名单分页*/
		/******************/
		const {
			pagecurrentwhite,
			pagesizewhite,
		} = this.props.ManageDetai;
		const Pagewhite = {
			pagesize: pagesizewhite,
			pagechange: (current) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageShowWhiteList',
					payload: {
						host_id: this.props.ids,
						page_num: current,
						page_size: pagecurrentwhite
					}
				});
			},
			pagecurrentchange: (current, pagecurrentwhite) => {
				this.props.dispatch({
					type: 'ManageDetai/ManageShowWhiteList',
					payload: {
						host_id: this.props.ids,
						page_num: current,
						page_size: pagecurrentwhite
					}
				});
			}
		};
		return (
			<div>
			    <Row className={styles.StatusBox}>
			      <Col span={8}>
			        <Button size="large" className="editable-add-btn" type="primary" onClick={()=>this.props.fingOnclick()} disabled={this.state.buttonState}>提取指纹</Button>
			      </Col>
			      <Col span={8} offset={8} className={styles.StatusRight}>
			       <ButtonGroup size="large">
				      <Button  onClick={()=>this.props.handleAdd()}>
				        新增
				      </Button>
				      <Popconfirm title="确定删除多个?" onConfirm={()=>this.rowselectDel()}>
				      <Button>
				       <Icon type="delete" />删除多选
				      </Button>
				      </Popconfirm>
				      <Popconfirm title="确定清空全部进程?" onConfirm={()=>this.onDeleteForm()}>
				       <Button type="primary">
				        清空
				       </Button>
				       </Popconfirm>
				    </ButtonGroup>
			      </Col>
			    </Row>
				<Form horizontal>
				  <Table dataSource={dataSource} loading={Whiteloading} columns={columns} pagination={false} rowClassName={(record) => styles.auditTabletr} rowSelection={rowselectCheckbox}/>
				</Form>
				<Page {...Pagewhite}/>
			</div>
		);
	}
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

const CustomizedForm = Form.create({})(EditableTable);
/*建立数据关联关系*/
export default connect(mapStateToProps, mapDispatchToProps)(CustomizedForm);