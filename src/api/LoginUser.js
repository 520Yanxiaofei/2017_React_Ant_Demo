import request from '../utils/request';

/*登陆*/
export async function Userlogin(params) {
	return request(`/user/login`, {
		method: 'POST',
		body: params
	});
}
/*修改密码*/
export async function Userpwd(params) {
	return request(`/user/upd_pwd`, {
		method: 'POST',
		body: params
	});
}
/*登出*/
export async function Userout(params) {
	return request(`/user/login_out`, {
		method: 'POST',
		body: params
	});
}