import {
	SecurityAlarmMsg,
	SecurityAlarmPie,
	SecurityAlarmLine
}
from '../../api/SecurityApi'
import {
	message,
} from 'antd';

export default {
	namespace: 'SecurityAlarm',
	state: {
		/*饼图加载*/
		Pieloading: false,
		PieData: [],
		/*柱状图加载*/
		Lineloading: false,
		LineData: [],
		/*告警信息*/
		SecurityMsg: [],
		Msgloading: false,
		/*当前页数*/
		countalarm: 1,
		/*总页数*/
		pagesizealarm: '',
		/*页码数*/
		pagecurrentalarm: 15
	},
	effects: {
		/*******************************************/
		/*告警饼状图API*/
		/*******************************************/
		* SecurityAlarmPie({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					Pieloading: true
				}
			})
			const {
				data
			} = yield call(SecurityAlarmPie, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						PieData: data.data,
						Pieloading: false
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*告警柱状图API*/
		/*******************************************/
		* SecurityAlarmLine({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					Lineloading: true
				}
			})
			const {
				data
			} = yield call(SecurityAlarmLine, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						LineData: data.data,
						Lineloading: false
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*告警信息API*/
		/*******************************************/
		* SecurityAlarmMsg({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					Msgloading: true
				}
			})
			const {
				data
			} = yield call(SecurityAlarmMsg, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						SecurityMsg: data.data.details,
						Msgloading: false,
						pagecurrentalarm: payload.page_size,
						pagesizealarm: data.data.total_num,
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
		}
	},
};