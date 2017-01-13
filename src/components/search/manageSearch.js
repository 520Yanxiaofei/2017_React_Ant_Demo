import React, {
	Component,
	PropTypes
} from 'react';
import {
	Button,
	Form,
	Input,
	Icon,
	Row,
	Col,
	Select
} from 'antd';
import styles from './manageSearch.less'
const FormItem = Form.Item;
const Option = Select.Option;

const Searchform = ({
	onSearch,
	item = {},
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
	},
}) => {

	const data = {...getFieldsValue()
	};

	function handleSubmit(e) {
		e.preventDefault();
		validateFields((errors) => {
			if (errors) {
				return;
			}
			onSearch(data);
		});

	};
	const formItemLayout = {
		labelCol: {
			span: 9
		},
		wrapperCol: {
			span: 14
		},
	};
	return (
		<Form inline className={styles.searchForm} onSubmit={handleSubmit}>
		   <Row>
		       <Col span={6}>
		         <FormItem className={styles.searchItem} {...formItemLayout} label='主机名称'>
			          {getFieldDecorator('host_name')(
			           <Input type="text"  placeholder="请输入主机名称"/>
			          )}
		        </FormItem>
		        </Col>
		         <Col span={6}>
		        <FormItem className={styles.searchItem}  {...formItemLayout} label='IP地址'>
		             {getFieldDecorator('ip')(
			             <Input placeholder="请输入主机IP"/>
				      )}
				      {/*<IPut className={styles.formIps} placeholder="请输入主机名称"/>*/}
			    </FormItem>
			    </Col>
			     <Col span={6}>
			    <FormItem className={styles.searchItem}  {...formItemLayout} label='状态'>
				     {getFieldDecorator('status')(
				        <Select  placeholder="请选择" style={{ width: 120 }}>
					      <Option value="0">安全（80-100）</Option>
					      <Option value="1">一般（60-80）</Option>
					      <Option value="2">危险（0-59）</Option>
					      <Option value="3">未保护</Option>
					      <Option value="4">未上线</Option>
					    </Select>
					    )}
		        </FormItem>
		        </Col>
		         <Col span={6}>
			    <FormItem  className={styles.searchSubmit}>
		          	    <Button type="primary" htmlType="submit" onClick={handleSubmit} >查询</Button>
		        </FormItem>
		        </Col>
	        </Row>
	      </Form>
	)
}

Searchform.proptypes = {
	// Searchform: PropTypes.isRequired,
	// form: PropTypes.object,
};

export default Form.create({})(Searchform)