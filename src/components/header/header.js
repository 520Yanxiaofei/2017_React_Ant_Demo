import React, {
	Component,
	PropTypes
} from 'react';
import styles from './header.less';
import {
	Icon
} from 'antd'

const HeaderCookie = ({
	logoutchange,
	cookieuser,
}) => {
	if (!cookieuser) return null;
	return (
		<div>
			<div className={styles.headerRight}>
			       <div className={styles.userImg}>
	                  <span><Icon type="user" /></span>
	                  欢迎您，
	                  {cookieuser.username}
			       </div>
			       <div className={styles.loginGout} onClick={logoutchange}>点此退出</div>
			 </div> 
		</div>
	)
}

export default HeaderCookie