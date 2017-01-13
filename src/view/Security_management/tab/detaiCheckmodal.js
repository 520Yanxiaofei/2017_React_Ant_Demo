import React, {
	Component,
	PropTypes
} from 'react';
import {
	Modal,
	Button,
	Icon,
	Form,
	Input,
	Select,
	Col,
	Row,
	Checkbox
} from 'antd';
import styles from '../detai/detai.less'

const FormItem = Form.Item;
const Option = Select.Option;


const Detaimodal = ({
	ModalCheckvisible,
	ModalCheckloading,
	onCancel,
	handForm,
	processName,
	ModalcheckSelect,
	itemdata,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		getFieldError,
		resetFields
	},
}) => {
	if (!itemdata) return null;
	/*新增白名单*/
	let data = {
		...getFieldsValue()
	};
	//获取数据
	function handleOk() {
		// Function([fieldNames: string[]], [options: object], callback: Function(errors, values))
		validateFields((errors, values) => {
			if (errors) {
				return;
			}
			let item = {};
			for (let key in data) {
				if (ModalcheckSelect[key] == false) {
					item[key] = data[key]
				}
			}
			let dataSel = item || data;
			handForm(dataSel, 'subimt')
		});
	};
	const formItemLayout = {
		labelCol: {
			span: 5
		},
		wrapperCol: {
			span: 14
		},
	};
	const ModalList = {
		visible: ModalCheckvisible,
		confirmLoading: ModalCheckloading,
		title: "加入白名单",
		okText: "确定",
		cancelText: "取消",
		onOk: handleOk,
		onCancel: onCancel
	};

	/*事件告警——加入白名单*/
	function onChange(name, e) {
		const check = e.target.checked
		for (let key in ModalcheckSelect) {
			if (key == name) {
				ModalcheckSelect[key] = !check;
				handForm(ModalcheckSelect, 'checkbox');
			}
		}
		/*修改实时获取更新*/
		itemdata.process_name = getFieldsValue().process_name
		itemdata.process_user = getFieldsValue().process_user
		itemdata.process_param = getFieldsValue().process_param
		itemdata.process_url = getFieldsValue().process_url
		itemdata.process_status = getFieldsValue().process_status
		itemdata.process_port = getFieldsValue().process_port
	}
	return (
		<Modal {...ModalList}>
		    <Form horizontal >
                <FormItem  {...formItemLayout} label='进程名' hasFeedback>
                  {getFieldDecorator('process_name', {
                   initialValue:itemdata.process_name,
		           rules: [{ required: !ModalcheckSelect.process_name, message: '进程名不能为空!' },],
		          })(
                  <Input  placeholder="请输入进程名称" onBlur={()=>processName(data.process_name)} disabled={ModalcheckSelect.process_name}/>
                  )}
                  	<div className={styles.Alarmcheckbox}>
                     <Checkbox checked={!ModalcheckSelect.process_name} onChange={onChange.bind(this,'process_name')}> </Checkbox>
                    </div>
	            </FormItem>
	             <FormItem  {...formItemLayout} label='启动用户' hasFeedback>
	              {getFieldDecorator('process_user', {
	             	initialValue:itemdata.process_user,
		           rules: [
		              { required: !ModalcheckSelect.process_user, message: '启动用户不能为空!' },
		            ],
		          })(
                  <Input placeholder="请输入用户名" disabled={ModalcheckSelect.process_user}/>
                   )}
                   <div className={styles.Alarmcheckbox}>
                    <Checkbox checked={!ModalcheckSelect.process_user} onChange={onChange.bind(this,'process_user')}> </Checkbox>
                   </div>
	            </FormItem>
	             <FormItem  {...formItemLayout} label='启动参数' hasFeedback>
	             {getFieldDecorator('process_param', {
	               initialValue:itemdata.process_param,
		           rules: [
		              { required: !ModalcheckSelect.process_param, message: '启动参数不能为空!' },
		            ],
		          })(
                  <Input  placeholder="请输入参数" disabled={ModalcheckSelect.process_param}/>
                   )}
                   <div className={styles.Alarmcheckbox}>
                    <Checkbox checked={!ModalcheckSelect.process_param} onChange={onChange.bind(this,'process_param')}> </Checkbox>
                   </div>
	            </FormItem>
	            <FormItem  {...formItemLayout} label='路径' hasFeedback>
	            {getFieldDecorator('process_url', {
	            	initialValue:itemdata.process_url,
		           rules: [
		              { required: !ModalcheckSelect.process_url, message: '路径不能为空!' },
		            ],
		          })(
                  <Input  placeholder="路径：如D://windows/user" disabled={ModalcheckSelect.process_url}/>
                  )}
                   <div className={styles.Alarmcheckbox}>
                    <Checkbox checked={!ModalcheckSelect.process_url} onChange={onChange.bind(this,'process_url')}> </Checkbox>
                   </div>
	            </FormItem>
	             <FormItem   {...formItemLayout} label='状态' hasFeedback>
	             {getFieldDecorator('process_status', {
	             	initialValue:String(itemdata.process_status),
		           rules: [
		              { required:!ModalcheckSelect.process_status, message: '状态只能为数字!' },
		            ],
		          })(
                     <Select placeholder="请选择运行状态" disabled={ModalcheckSelect.process_status}>
				      <Option value="1">运行中</Option>
				      <Option value="0">无</Option>
				    </Select>
                  )}
                   <div className={styles.Alarmcheckbox}>
                    <Checkbox checked={!ModalcheckSelect.process_status} onChange={onChange.bind(this,'process_status')}> </Checkbox>
                   </div>
	            </FormItem>
	             <FormItem  {...formItemLayout} label='端口' hasFeedback>
	             {getFieldDecorator('process_port', {
	             	initialValue:itemdata.process_port,
		           rules: [
		              { required: !ModalcheckSelect.process_port, message: '端口只能为数字!' },
		            ],
		          })(
                  <Input  type="number" placeholder="端口号：8080" disabled={ModalcheckSelect.process_port}/>
                  )}
                   <div className={styles.Alarmcheckbox}>
                    <Checkbox checked={!ModalcheckSelect.process_port} onChange={onChange.bind(this,'process_port')}> </Checkbox>
                   </div>
	            </FormItem>
	        </Form>
        </Modal>
	)
}



// Detaimodal.proptypes = {
// 	Detaimodal: PropTypes.isRequired,
// 	Modalvisible: PropTypes.any,
// 	Modalloading: PropTypes.any,
// };

export default Form.create({
	mapPropsToFields(props) {
		return {}
	}
})(Detaimodal)