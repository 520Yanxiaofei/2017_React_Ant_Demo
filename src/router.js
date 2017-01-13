import React, {
	PropTypes
} from 'react';
import {
	Router,
	Route,
	IndexRoute,
	IndexRedirect,
	Redirect
} from 'react-router';
/*入口*/
import Index from './view/Index';
/*安全态势*/
import Situation from './view/Security_situation/situation';
/*安全管理*/
import Management from './view/Security_management/management';
import ManageDetai from './view/Security_management/detai/detai';
import DetaiStatus from './view/Security_management/tab/detaistatus';
import DetaiSecurity from './view/Security_management/tab/detaisecurity';
import DetaiAlarm from './view/Security_management/tab/detaialarm';
import DetaiAudit from './view/Security_management/tab/detaiaudit';
/*安全告警*/
import Alarm from './view/Security_alarm/alarm';
/*系统管理*/
import System from './view/System_management/system';
/*系统登录*/
import LoginPage from './view/login/login';
import password from './view/login/updatepass';

export default function({
	history
}) {
	return (
		<Router history={history}>
	      <Route path="/login" component={LoginPage} />
	      <Route path="/" component={Index}>
	           <IndexRoute component={Management} />
	           <Route path="/situation" component={Situation}/>
	           <Route path="/management" component={Management}/>
	           <Route path="/managedetai/:id/:TabCurrent" component={ManageDetai}/>
	           <Route path="/alarm" component={Alarm}/>
	           <Route path="/system" component={System}/>
			   {/*<Route path="/audit" component={audit}>
			      <IndexRoute component={Atab} />
			      <Route path="/audit/Atab" component={Atab}/>
			       <Route path="/audit/Btab" component={Btab}/>
			   </Route>*/}
			   <Route path="/password" component={password} />
	      </Route>
	      <Redirect from="*" to="/" />
    </Router>
	);
};