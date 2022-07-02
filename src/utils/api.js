/** 
 * api接口的统一封装
 */
import axios from './request.js';
import Qs from 'qs';
const urlApi = 'http://localhost:3000/';//本地测试


// 登录
export function GetUserLogin(query) {
	return axios({
		url: urlApi + 'loginData',//模拟数据接口
		method: 'post',
		data: Qs.stringify(query)
	})
}





//index/weborder/gongdanInfoNum
export function gongdanInfoNum(token) {
	return axios({
		url: urlApi + 'index/weborder/gongdanInfoNum',
		method: 'get',
		headers: {
			// 'Content-type': 'application/json;charset=UTF-8',
			'Authorization': token
		}
	})
}