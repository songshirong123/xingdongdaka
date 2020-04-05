// url路径
import xdConfig from './xdConfig.js';
const config = xdConfig.appConfig; // 配置
const serverBaseUrl = `${config.serverProtocal}://${config.serverIp}:${config.serverPort}/${config.serverName}`; // 基本路径
const serverUrls = { //根据接口具体配置
	xd_register: serverBaseUrl + '/xxx', // 注册
	xd_login: serverBaseUrl + '/xxx', // 登录
	xd_logout: serverBaseUrl + '/xxx',
	xd_change_pass: serverBaseUrl + '/xxxxx' // 修改密码
}
export default {
	serverUrls,
	serverBaseUrl
}
