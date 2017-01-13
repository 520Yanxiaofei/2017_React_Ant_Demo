import React, {
	Component,
	PropTypes
} from 'react';
import {
	Pagination
} from 'antd';
import styles from './managedetaiPage.less'

const pageList = ({
	pagechange,
	pagesize,
	pagecurrentchange
}) => {
	if (!pagesize) return null;
	const pagelist = {
		total: pagesize,
		showSizeChanger: false,
		defaultPageSize: 15,
		pageSizeOptions: ["15"],
		onShowSizeChange(current, pageSize) {
			pagecurrentchange(current, pageSize)
		},
		onChange(current) {
			pagechange(current)
		},
	};
	return (
		<div className={styles.pageMargin}>
		  <Pagination {...pagelist}></Pagination>
		</div>
	)
}

pageList.propTypes = {
	// listDetai: PropTypes.array.isRequired,
};

export default pageList;