import request from '../utils/request';

/*卡片数据-搜索-筛选*/
export async function ManageAllHost(params) {
	return request(`/host/search`, {
		method: 'POST',
		body: params
	});
}
/*卡片提示*/
export async function ManageWarning(params) {
	return request(`/host/warning`, {
		method: 'GET',
	});
}
/*添加资产*/
// export async function Managemodal(params) {
// 	return request(`/interfaceData.do?takenHost&id=${(params.ids)}&takenType=${(params.takenType)}`, {
// 		method: 'post',
// 		headers: headeCookie(),
// 	});
// }
/*修改主机名*/
export async function ManageHostName(params) {
	return request(`/host/upd_host_name`, {
		method: 'POST',
		body: params
	});
}
/*告警信息展示*/
export async function ManageAlarmMsg(params) {
	return request(`/alarm/show_alarm_msg`, {
		method: 'POST',
		body: params
	});
}
/*主机信息*/
export async function ManageShowMsg(params) {
	return request(`/host/show_host_msg`, {
		method: 'POST',
		body: params
	});
}
/*即时进程展示*/
export async function ManageProIntm(params) {
	return request(`/process/show_pro_intm`, {
		method: 'POST',
		body: params
	});
}
/*进程策略*/
export async function ManageShowProcessStd(params) {
	return request(`/process/show_process_std`, {
		method: 'POST',
		body: params
	});
}
/*网络链接展示*/
export async function ManageNetworkIntm(params) {
	return request(`/process/show_network_intm`, {
		method: 'POST',
		body: params
	});
}
/*网络策略*/
export async function ManageShowNetworkStd(params) {
	return request(`/process/show_network_std`, {
		method: 'POST',
		body: params
	});
}
/*提取指纹*/
export async function ManageProStd(params) {
	return request(`/host/get_pro_std`, {
		method: 'POST',
		body: params
	});
}
/*一键防护*/
export async function ManageProtect(params) {
	return request(`/host/protect`, {
		method: 'POST',
		headers: headeCookie(),
		body: params
	});
}
/*告警信息删除*/
export async function ManageAlarmDel(params) {
	return request(`/alarm/del_alarm_msg`, {
		method: 'POST',
		body: params
	});
}
/*策略展示*/
export async function ManageShowStrategy(params) {
	return request(`/host/show_strategy`, {
		method: 'POST',
		headers: headeCookie(),
		body: params
	});
}
/*策略信息保存*/
export async function ManageSaveStrategy(params) {
	return request(`/host/save_strategy`, {
		method: 'POST',
		headers: headeCookie(),
		body: params
	});
}
/*白名单列表*/
export async function ManageShowWhiteList(params) {
	return request(`/process/show_white_list`, {
		method: 'POST',
		body: params
	});
}
/*生成白名单*/
export async function ManageStraWhiteList(params) {
	return request(`/host/stra_to_white_list`, {
		method: 'POST',
		body: params
	});
}
/*加入白名单*/
export async function ManageAlarmWhiteAdd(params) {
	return request(`/alarm/alarm_to_white_list`, {
		method: 'POST',
		body: params
	});
}
/*白名单修改，新增*/
export async function ManageModifyWhiteList(params) {
	return request(`/process/modify_white_list`, {
		method: 'POST',
		body: params
	});
}
/*白名单删除*/
export async function ManageDelWhiteList(params) {
	return request(`/process/del_white_list`, {
		method: 'POST',
		body: params
	});
}
/*白名单批量删除*/
export async function ManageDelWhiteListById(params) {
	return request(`/process/del_white_list_by_id`, {
		method: 'POST',
		body: params
	});
}
/*白名单排序*/
export async function ManageMoveWhiteList(params) {
	return request(`/process/move_white_list`, {
		method: 'POST',
		body: params
	});
}
/*白名单进程验证*/
export async function ManageValWhiteList(params) {
	return request(`/process/val_white_list`, {
		method: 'POST',
		body: params
	});
}