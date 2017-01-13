import './index.html';
import './index.less';
import dva from 'dva';
// import { browserHistory } from 'dva/router';
// 1. Initialize
const app = dva({
	/*抛出错误异常*/
	onError(e) {
		console.log(e);
	},
	// history: browserHistory,上线发布html5模式
});

// 2. Plugins
//app.use({});

// 3. Model
//主机信息
app.model(require('./models/management/list'));
app.model(require('./models/management/modal'));
app.model(require('./models/management/detai'));
//登录
app.model(require('./models/login/login'));
//安全告警
app.model(require('./models/Security_alarm/alarm'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');