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
	Checkbox,
	message
} from 'antd';
import styles from '../detai/detai.less'

const FormItem = Form.Item;
const Option = Select.Option;


const Detaimodal = ({
	Modalvisible,
	Modalloading,
	onCancel,
	handForm,
	processName,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		getFieldError
	},
}) => {
	/*新增白名单*/
	var arr = new Array()
	let data = {
		...getFieldsValue()
	};
	//获取数据
	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return;
			}

			function getJsonLength(data) {
				var jsonLength = 0;
				for (var item in data) {
					if (data[item] !== undefined) {
						jsonLength++;
					}
				}
				return jsonLength;
			}
			let length = getJsonLength(data)
			if (length == 0) {
				message.warning('请填写至少一项！')
				return false;
			} else {
				handForm(data)
			}
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
		visible: Modalvisible,
		confirmLoading: Modalloading,
		title: "添加白名单",
		okText: "确定",
		cancelText: "取消",
		onOk: handleOk,
		onCancel
	};
	return (
		<Modal {...ModalList}>
		    <Form horizontal >
                <FormItem  {...formItemLayout} label='进程名' hasFeedback>
               
                  {getFieldDecorator('process_name', {
		           rules: [{ required:false, message: '进程名不能为空!' },],
		          })(
                  <Input  placeholder="请输入进程名称" onBlur={()=>processName(data.process_name)}/>
                  )}
                 
	            </FormItem>
	           
	             <FormItem  {...formItemLayout} label='启动用户' hasFeedback>
	              {getFieldDecorator('process_user', {
		           rules: [
		              { required:false, message: '启动用户不能为空!' },
		            ],
		          })(
                  <Input placeholder="请输入用户名" />
                   )}
		          
	            </FormItem>
	             <FormItem  {...formItemLayout} label='启动参数' hasFeedback>
	             {getFieldDecorator('process_param', {
		           rules: [
		              { required:false, message: '启动参数不能为空!' },
		            ],
		          })(
                  <Input  placeholder="请输入参数"/>
                   )}
		           
	            </FormItem>
	            <FormItem  {...formItemLayout} label='路径' hasFeedback>
	            {getFieldDecorator('process_url', {
		           rules: [
		              { required:false, message: '路径不能为空!' },
		            ],
		          })(
                  <Input  placeholder="路径：如D://windows/user"/>
                  )}
                   
	            </FormItem>
	             <FormItem   {...formItemLayout} label='状态' hasFeedback>
	             {getFieldDecorator('process_status', {
		           rules: [
		              { required:false, message: '状态只能为数字!' },
		            ],
		          })(
                     <Select placeholder="请选择运行状态">
				      <Option value="1">运行中</Option>
				      <Option value="0">无</Option>
				    </Select>
                  )}
                   
	            </FormItem>
	             <FormItem  {...formItemLayout} label='端口' hasFeedback>
	             {getFieldDecorator('process_port', {
		           rules: [
		              { required:false, message: '端口只能为数字!' },
		            ],
		          })(
                  <Input  type="number" placeholder="端口号：8080"/>
                  )}
                   
	            </FormItem>
	        </Form>
        </Modal>
	)
}



Detaimodal.proptypes = {
	Detaimodal: PropTypes.isRequired,
	Modalvisible: PropTypes.any,
	Modalloading: PropTypes.any,
};

export default Form.create({
	mapPropsToFields(props) {
		return {

		}
	}
})(Detaimodal)