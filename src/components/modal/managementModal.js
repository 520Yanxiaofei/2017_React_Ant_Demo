import React, {
	Component,
	PropTypes
} from 'react';
import {
	Modal,
	Button,
	Icon,
	Form,
	Input
} from 'antd';

const FormItem = Form.Item;

const Agentmodal = ({
	visible,
	loading,
	onCancel,
	// form: {
	// 	getFieldDecorator,
	// 	validateFields,
	// 	getFieldsValue,
	// },
}) => {
	function handleOk() {

	};

	function handleCancel() {

	};
	const formItemLayout = {
		labelCol: {
			span: 3
		},
		wrapperCol: {
			span: 14
		},
	};
	const ModalList = {
		visible: visible,
		title: "添加资产",
		okText: "确定",
		cancelText: "Agent下载",
		onOk: handleOk,
		onCancel
	};
	return (
		<Modal {...ModalList}>
		    <Form horizontal >
                <FormItem  {...formItemLayout} label='待定'>
                  <Input  placeholder="无"/>
	            </FormItem>
	             <FormItem  {...formItemLayout} label='待定'>
                  <Input placeholder="无"/>
	            </FormItem>
	             <FormItem  {...formItemLayout} label='待定'>
                  <Input  placeholder="无"/>
	            </FormItem>
	        </Form>
        </Modal>
	)
}



Agentmodal.proptypes = {
	Agentmodal: PropTypes.isRequired,
	loading: PropTypes.any,
};

export default Form.create({
	mapPropsToFields(props) {
		return {}
	}
})(Agentmodal)