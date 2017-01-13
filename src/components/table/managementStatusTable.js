import React, {
	Component,
	PropTypes
} from 'react';
import {
	Table,
	Icon
} from 'antd';


const Statustable = ({

}) => {
	const columns = [{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: text => <a href="#">{text}</a>,
	}, {
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	}, {
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	}, {
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<span>
		      <a href="#">Action 一 {record.name}</a>
		      <span className="ant-divider" />
		      <a href="#">Delete</a>
		      <span className="ant-divider" />
		      <a href="#" className="ant-dropdown-link">
		        More actions<Icon type="down" />
		      </a>
		    </span>
		),
	}];
	const data = [{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	}, {
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
	}, {
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
	}];
	return (
		<Table columns={columns} dataSource={data} showHeader={false} />
	)
}



Statustable.proptypes = {

};

export default Statustable