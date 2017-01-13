import {
	Managemodal,
}
from '../../api/ManageApi'
import {
	message,
} from 'antd';

export default {
	namespace: 'ManageModal',
	state: {
		/*弹窗*/
		visible: false,
		/*加载*/
		loading: false,
	},
	effects: {
		/*******************************************/
		/*添加资产API*/
		/*******************************************/
		* Managemodal({
			payload
		}, {
			call,
			put
		}) {},
	},
	reducers: {
		ShowModal: (state, {
			payload
		}) => {
			return {
				...state,
				...payload
			}
		},
		HideModal: (state, {
			payload
		}) => {
			return {
				...state,
				...payload
			}
		}
	},
};