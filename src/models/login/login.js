import {
	Userlogin,
	Userpwd,
	Userout
}
from '../../api/LoginUser'
import {
	routerRedux
} from 'dva/router';
import cookie from 'react-cookie';
import {
	message,
} from 'antd';

export default {
	namespace: 'LoginUser',
	state: {
		loading: false,
		loginData: [],
		UpdateLoading: false,
	},
	/*判断是否cookie*/
	subscriptions: {
		setup({
			dispatch,
			history,
		}) {
			// history.listen(({
			// 	pathname
			// }) => {
			// 	const cookieuser = cookie.load('userdata');
			// 	if (pathname == '/') {
			// 		dispatch({
			// 			type: 'UserIf'
			// 		});
			// 	}
			// })
		}
	},
	effects: {
		/*******************************************/
		/*登陆API*/
		/*******************************************/
		/*判断是否登录*/
		* UserIf({
			payload
		}, {
			put,
			call
		}) {
			const cookieuser = cookie.load('userdata');
			if (!cookieuser) {
				yield put(routerRedux.push('/login'));
			}
		},
		* Userlogin({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					loading: true
				}
			})
			const {
				data
			} = yield call(Userlogin, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'showloading',
					payload: {
						loading: false
					}
				});
				/*注册cookie*/
				const token = {
					sid: data.data.sid,
					username: payload.user_name
				};
				/*成功调转*/
				yield put(routerRedux.push('/'));
				cookie.save('userdata', token, {
					path: '/'
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
				yield put({
					type: 'showloading',
					payload: {
						loading: false
					}
				})
			}
		},
		/*退出*/
		* Userout({
			payload
		}, {
			put,
			call
		}) {
			const data = yield call(Userout, payload);
			/*请求返回200*/
			if (data) {
				message.success(data.data.msg)
			}
			/*强制清除cookie,跳转登录界面*/
			cookie.remove('userdata');
			yield put(routerRedux.push('/login'));
		},
		/*修改密码*/
		* PasswordUte({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					UpdateLoading: true
				}
			})
			const {
				data
			} = yield call(Userpwd, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'showloading',
					payload: {
						UpdateLoading: false
					}
				});
				/*成功调转*/
				message.success(data.msg)
				cookie.remove('userdata');
				yield put(routerRedux.push('/login'));
			}
			if (data.code !== 200) {
				yield put({
					type: 'showloading',
					payload: {
						UpdateLoading: false
					}
				});
				message.success(data.msg)
			}
		},
	},
	reducers: {
		showloading(state, action) {
			return {
				...state,
				...action.payload
			}
		},
		querySuccess(state, action) {
			return {...state,
				...action.payload,
			};
		}
	},
};