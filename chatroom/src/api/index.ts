import axios from './request';
import * as config from './config';

const request  = {
    /**
     * 用户登录
     * @param name 用户名称
     */
    addUser(name: string){
        return axios({
            url: config.addUser+'?name='+name,
            method: 'post'
        })
    },
    /**
     * 获取房间列表
     */
    getRoomList(){
        return axios({
            url: config.getRoomList,
            method: 'get'
        })
    },
    /**
     * 创建房间
     * @param name 房间名称
     */
    createRoom(name: string){
        return axios({
            url: config.createRoom+'?name='+name,
            method: 'post'
        })
    },
}

export default request;