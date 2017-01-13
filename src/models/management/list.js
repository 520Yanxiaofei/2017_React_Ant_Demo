import {
	ManageAllHost,
	ManageWarning,
	ManageSearch,
	ManageAlarmMsg,
	ManageHostName,
}
from '../../api/ManageApi'
import {
	message,
} from 'antd';
export default {
	namespace: 'ManageList',
	state: {
		/*唯一ID*/
		id: '',
		/*卡片数据*/
		list: [],
		/*卡片加载*/
		listloading: false,
		/*编辑ID*/
		eidt_id: '',
		/*第几页*/
		page_num: 0,
		/*默认一页6条*/
		page_size: 12,
		/*总条数*/
		total_num: 0,
		/*显示加载状态*****0更多，1请求，2无数据*，3少于分页数据，4数据为空*/
		scrollstatus: 0,
		/*卡片状态*/
		alarmstatus: '',
		/*卡片告警提示*/
		alarmloading: false,
		/*卡片告警数据*/
		alarmlist: [],
		/*提示加载*/
		warloading: false,
		/*提示数据*/
		warlist: [],
	},
	subscriptions: {
		pageBottom({
			dispatch,
			history,
		}) {}
	},
	effects: {
		/*******************************************/
		/*主机API*/
		/*******************************************/
		* ManageAllHost({
			payload
		}, {
			call,
			put,
			select,
		}) {
			yield put({
				type: 'showloading',
				payload: {
					listloading: payload.listloading,
				}

			});
			let total_num = yield select(state => state.ManageList.total_num); /*总条数*/
			let page_size = yield select(state => state.ManageList.page_size); /*默认一页6条*/
			let page_num = yield select(state => state.ManageList.page_num); /*当前页数*/
			let alarmstatus = yield select(state => state.ManageList.alarmstatus); /*卡片状态*/
			let scrollBottom = payload.scrollBottom; /*卡片分页*/
			/*滚动触发*/
			if (scrollBottom) {
				page_num++;
				/*分页page*/
				if (page_num <= (Math.ceil(total_num / page_size) || 1)) {
					yield put({
						type: 'showloading',
						payload: {
							scrollstatus: 1
						}
					})
					const {
						data
					} = yield call(ManageAllHost, {
						host_name: payload.host_name,
						ip: payload.ip,
						status: alarmstatus,
						page_num: page_num,
						page_size: page_size,
					});
					if (data && data.code == 200) {
						yield put({
							type: 'querySuccessPush',
							payload: {
								list: data.data.details,
								listloading: false,
								total_num: data.data.total_num,
								page_num: page_num,
								alarmstatus: payload.status,
							}
						});
						/*少于分页数据时*/
						if (data.data.total_num < page_size) {
							yield put({
								type: 'showloading',
								payload: {
									scrollstatus: 3
								}
							})
						}
						/*无数据时*/
						if (data.data.total_num == 0) {
							yield put({
								type: 'showloading',
								payload: {
									scrollstatus: 4
								}
							})
						}
					}
					if (data.code !== 200) {
						message.success(data.msg)
					}
				} else {
					yield put({
						type: 'showloading',
						payload: {
							scrollstatus: 2,
						}
					});
					message.warning('没有更多数据了！')

				}
			}
		},
		/*******************************************/
		/*修改主机名API*/
		/*******************************************/
		* ManageHostName({
			payload
		}, {
			call,
			put,
			select
		}) {
			const {
				data
			} = yield call(ManageHostName, payload);
			if (data && data.code == 200) {
				message.success('主机名修改成功！')
				yield put({
					type: 'ManageAllHostUpdate',
					payload: {
						host_id: payload.host_id,
						host_name: payload.host_name
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*告警API*/
		/*******************************************/
		* ManageAlarmMsg({
			payload
		}, {
			call,
			put,
		}) {

			yield put({
				type: 'showloading',
				payload: {
					alarmloading: true
				}
			});
			const {
				data
			} = yield call(ManageAlarmMsg, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						alarmlist: data.data.details,
						alarmloading: false
					}
				});
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},

		/*******************************************/
		/*提示API*/
		/*******************************************/
		* ManageWarning({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					warloading: true
				}
			});
			const {
				data
			} = yield call(ManageWarning, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						warlist: data.data,
						warloading: false
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		}
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
		},
		querySuccessPush(state, action) {
			const item = action.payload.list;
			const total = action.payload.total_num;
			const page = action.payload.page_num;
			const status = action.payload.alarmstatus;
			return {
				...state,
				list: [...state.list, ...item],
				listloading: false,
				page_num: page,
				total_num: total,
				alarmstatus: status,
				scrollstatus: 0
			}
		},
		ManageAllHostUpdate(state, action) {
			const hostid = action.payload.host_id;
			const hostname = action.payload.host_name;
			const item = state.list.map(data => {
				if (data.host_id == hostid) {
					data.host_name = hostname;
				}
				return data
			})
			return {
				...state,
				list: item,

			}
		},
		ManageAlarmMsgDel(state, action) {
			return {...state,
				...action.payload
			}
		},
	},
};