import request from '../utils/request';
import cookie from 'react-cookie';

/*告警饼状图*/
export async function SecurityAlarmPie(params) {
	return request(`/alarm/show_all_alarm_pie`, {
		method: 'POST',
		body: params
	});
}
/*告警柱状图*/
export async function SecurityAlarmLine(params) {
	return request(`/alarm/get_all_alarm_history`, {
		method: 'POST',
		body: params
	});
}
/*告警展示*/
export async function SecurityAlarmMsg(params) {
	return request(`/alarm/show_all_alarm_msg`, {
		method: 'POST',
		body: params
	});
}