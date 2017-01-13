import {
	ManageShowMsg,
	ManageAlarmMsg,
	ManageAlarmDel,
	ManageProIntm,
	ManageShowProcessStd,
	ManageNetworkIntm,
	ManageShowWhiteList,
	ManageModifyWhiteList,
	ManageDelWhiteList,
	ManageAlarmWhiteAdd,
	ManageDelWhiteListById,
	ManageStraWhiteList,
	ManageMoveWhiteList,
	ManageValWhiteList,
	ManageProStd
}
from '../../api/ManageApi'
import {
	message,
} from 'antd';

export default {
	namespace: 'ManageDetai',
	state: {
		/*主机信息*/
		detai: [],
		/*加载*/
		loading: false,
		/*告警信息*/
		alertMsg: [],
		alarmloading: false,
		/*进程信息*/
		progressRun: [],
		Proloading: false,
		/*当前页数*/
		count: 1,
		/*总页数*/
		pagesize: '',
		/*页码数*/
		pagecurrent: 15,
		/*当前页数*/
		countalarm: 1,
		/*总页数*/
		pagesizealarm: '',
		/*页码数*/
		pagecurrentalarm: 15,
		/*网络信息*/
		Network: [],
		Netloading: false,
		/*当前页数*/
		countnet: 1,
		/*总页数*/
		pagesizenet: '',
		/*页码数*/
		pagecurrentnet: 15,
		/*进程策略*/
		progressStd: [],
		stdloading: false,
		/*多选名单*/
		selectedWhiteKeys: [],
		/*网络策略*/
		networkStd: [],
		/*白名单*/
		Whitelist: [],
		/*当前页数*/
		countwhite: 1,
		/*总页数*/
		pagesizewhite: '',
		/*页码数*/
		pagecurrentwhite: 15,
		/*提取步骤*/
		current: 0,
		/*提取指纹隐藏白名单*/
		fingCurrent: false,
		/*白名单加载*/
		Whiteloading: false,
		/*加入白名单*/
		ModalAlarmAdd: [],
		ModalcheckSelect: {},
		ModalCheckvisible: false,
		ModalCheckloading: false,
		/*新增白名单*/
		Modalvisible: false,
		/*新增加载*/
		Modalloading: false,
		/*多选删除*/
		selectedRowKeys: [],
		/*提取指纹*/
		protdMsg: [],
		/*提取状态*/
		ProstdStatus: 0,
	},
	effects: {
		/*******************************************/
		/*主机信息API*/
		/*******************************************/
		* ManageShowMsg({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					loading: payload.loading
				}
			})
			const {
				data
			} = yield call(ManageShowMsg, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						detai: data.data,
						loading: false
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
		* ManageAlarmMsg({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					alarmloading: true
				}
			})
			const {
				data
			} = yield call(ManageAlarmMsg, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						alertMsg: data.data.details,
						alarmloading: false,
						pagecurrentalarm: payload.page_size,
						pagesizealarm: data.data.total_num,
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*告警删除API*/
		/*******************************************/
		* ManageAlarmDel({
			payload
		}, {
			call,
			put
		}) {
			const {
				data
			} = yield call(ManageAlarmDel, payload);
			if (data && data.code == 200) {
				yield put({
					type: "ManageAlarmMsg",
					payload: {
						host_id: payload.host_id,
						page: 1,
						page_num: 1,
						page_size: 300
					}
				})
				message.success(data.msg)
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*即时进程展示API*/
		/*******************************************/
		* ManageProIntm({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					Proloading: true
				}
			})
			const {
				data
			} = yield call(ManageProIntm, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'ProintmSuccess',
					payload: {
						progressRun: data.data.details,
						pagecurrent: payload.page_size,
						pagesize: data.data.total_num,
						Proloading: false
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*网络进程展示API*/
		/*******************************************/
		* ManageNetworkIntm({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					Netloading: true
				}
			})
			const {
				data
			} = yield call(ManageNetworkIntm, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						Network: data.data.details,
						pagecurrentnet: payload.page_size,
						pagesizenet: data.data.total_num,
						Netloading: false,
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*进程策略API*/
		/*******************************************/
		* ManageShowProcessStd({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					stdloading: true
				}
			})
			const {
				data
			} = yield call(ManageShowProcessStd, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'ProcessSuccess',
					payload: {
						progressStd: data.data,
						stdloading: false,
					}
				});
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*网络策略API*/
		/*******************************************/
		* ManageShowNetworkStd({
			payload
		}, {
			call,
			put
		}) {
			const {
				data
			} = yield call(ManageShowNetworkStd, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						networkStd: data.data,
					}
				});
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*白名单API*/
		/*******************************************/
		* ManageShowWhiteList({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					Whiteloading: true
				}
			});
			const {
				data
			} = yield call(ManageShowWhiteList, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'WhitequerySuccess',
					payload: {
						Whitelist: data.data.details,
						Whiteloading: false,
						countwhite: payload.page_num,
						pagecurrentwhite: payload.page_size,
						pagesizewhite: data.data.total_num
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*白名单修改，新增API*/
		/*******************************************/
		* ManageModifyWhiteList({
			payload
		}, {
			call,
			put,
			select
		}) {
			const page_size = yield select((state) => state.ManageDetai.countwhite);
			const pagecurrent = yield select((state) => state.ManageDetai.pagecurrentwhite);
			yield put({
				type: 'showloading',
				payload: {
					Modalloading: true
				}
			})
			const {
				data
			} = yield call(ManageModifyWhiteList, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'ManageShowWhiteList',
					payload: {
						host_id: payload.host_id,
						page_num: page_size,
						page_size: pagecurrent
					}
				})
				yield put({
					type: 'showloading',
					payload: {
						Modalloading: false,
						Modalvisible: false,
					}
				})
				message.success(data.msg)
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*生成白名单API*/
		/*******************************************/
		* ManageStraWhiteList({
			payload
		}, {
			call,
			put
		}) {
			yield put({
				type: 'showloading',
				payload: {
					stdloading: true
				}
			})
			const {
				data
			} = yield call(ManageStraWhiteList, payload);
			if (data && data.code == 200) {
				message.success(data.msg)
				yield put({
					type: 'querySuccess',
					payload: {
						selectedWhiteKeys: [],
						stdloading: false,
						fingCurrent: false,
						current: 0,
					}
				})
				yield put({
					type: 'ManageShowMsg',
					payload: {
						host_id: payload.host_id,
						loading: false,
					}
				})
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*白名单删除API*/
		/*******************************************/
		* ManageDelWhiteList({
			payload
		}, {
			call,
			put,
			select,
		}) {
			const page_size = yield select((state) => state.ManageDetai.countwhite);
			const pagecurrent = yield select((state) => state.ManageDetai.pagecurrentwhite);
			const {
				data
			} = yield call(ManageDelWhiteList, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'ManageShowWhiteList',
					payload: {
						host_id: payload.host_id,
						page_num: page_size,
						page_size: pagecurrent

					}
				})
				yield put({
					type: 'ManageShowMsg',
					payload: {
						host_id: payload.host_id,
						loading: false,
					}
				})
				message.success(data.msg)

			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*加入白名单API*/
		/*******************************************/
		* ManageAlarmWhiteAdd({
			payload
		}, {
			call,
			put,
			select
		}) {
			yield put({
				type: 'showloading',
				payload: {
					ModalCheckloading: true
				}
			})
			const page_size = yield select((state) => state.ManageDetai.countalarm);
			const pagecurrent = yield select((state) => state.ManageDetai.pagecurrentalarm);
			const {
				data
			} = yield call(ManageAlarmWhiteAdd, payload);
			if (data && data.code == 200) {
				message.success(data.msg)
				yield put({
					type: 'showloading',
					payload: {
						ModalCheckvisible: false,
						ModalCheckloading: false,
					}
				})
				yield put({
					type: 'ManageAlarmMsg',
					payload: {
						page: 1,
						host_id: payload.host_id,
						page_num: page_size,
						page_size: pagecurrent,
					}
				})

			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*白名单批量删除API*/
		/*******************************************/
		* ManageDelWhiteListById({
			payload
		}, {
			call,
			put,
			select,
		}) {
			const page_size = yield select((state) => state.ManageDetai.countwhite);
			const pagecurrent = yield select((state) => state.ManageDetai.pagecurrentwhite);
			const {
				data
			} = yield call(ManageDelWhiteListById, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'ManageShowWhiteList',
					payload: {
						host_id: payload.host_id,
						page_num: page_size,
						page_size: pagecurrent
					}
				});
				yield put({
						type: 'ManageShowMsg',
						payload: {
							host_id: payload.host_id,
							loading: false,
						}
					})
					/*清除多选值*/
				yield put({
					type: 'showloading',
					payload: {
						selectedRowKeys: [],
					}
				})
				message.success(data.msg)
			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},
		/*******************************************/
		/*白名单排序API*/
		/*******************************************/
		* ManageMoveWhiteList({
			payload
		}, {
			call,
			put
		}) {
			const {
				data
			} = yield call(ManageMoveWhiteList, payload);
			if (data && data.code == 200) {
				message.success(data.msg)

			}
			if (data.code !== 200) {
				message.success(data.msg)
			}
		},

		/*******************************************/
		/*提取指纹API*/
		/*******************************************/
		* ManageProStd({
			payload
		}, {
			call,
			put,
			select
		}) {
			yield put({
				type: 'showloading',
				payload: {
					ProstdStatus: 100,
				}
			})
			const {
				data
			} = yield call(ManageProStd, payload);
			if (data && data.code == 200) {
				yield put({
					type: 'querySuccess',
					payload: {
						protdMsg: data,
						loading: false,
						ProstdStatus: 100
					}
				})
			}
			if (data.code !== 200) {
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
		checksKey(state, action) {
			return {
				...state,
				ModalcheckSelect: action.payload.ModalcheckSelect
			}
		},
		querySuccess(state, action) {
			return {...state,
				...action.payload,
			};
		},
		ProintmSuccess(state, action) {
			const item = action.payload.progressRun;
			const listItem = item == null ? [] : item;
			const list = listItem.map(data => {
				const datas = {
					key: data.no,
					task_mem: data.task_mem,
					task_name: data.task_name,
					task_param: data.task_param,
					task_pid: data.task_pid,
					task_processor: data.task_processor,
					task_state: data.task_state,
					task_type: data.task_type,
					task_url: data.task_url,
					task_user: data.task_user
				}
				return datas
			})
			return {
				...state,
				...action.payload,
				progressRun: list,
			}
		},
		ProcessSuccess(state, action) {
			const item = action.payload.progressStd;
			const list = item.map(data => {
				const datas = {
					key: data.id,
					process_pid: data.process_pid,
					process_type: data.process_type,
					process_name: data.process_name,
					process_url: data.process_url,
					process_user: data.process_user,
					process_param:data.process_param,
					process_port:data.process_port,
					process_type:data.process_type
				}
				return datas
			})
			return {
				...state,
				progressStd: list,
				stdloading: action.payload.stdloading
			}
		},
		WhitequerySuccess(state, action) {
			const item = action.payload.Whitelist;
			// const list = [];
			// for (let key in item) {

			// 	let name = item[key];
			// 	let listds = [];
			// 	for (let ke in name) {
			// 		let edit = {
			// 			editable: false,
			// 			value: name[ke],
			// 		}
			// 		listds[ke] = edit;
			// 	}
			// 	let keyId = {
			// 		...listds,
			// 		key: item[key].id,
			// 		host_id: item[key].host_id,

			// 	}
			// 	list[key] = keyId;
			// }
			// console.log(listd)
			const list = item.map(data => {
				const datas = {
					key: data.id,
					process_name: {
						editable: false,
						value: data.process_name
					},
					process_user: {
						editable: false,
						value: data.process_user
					},
					process_param: {
						editable: false,
						value: data.process_param
					},
					process_url: {
						editable: false,
						value: data.process_url
					},
					process_status: {
						editable: false,
						value: data.process_status,
					},
					process_port: {
						editable: false,
						value: data.process_port
					}
				}
				return datas;
			})
			return {
				...state,
				...action.payload,
				Whitelist: list,
			}
		}
	},
};