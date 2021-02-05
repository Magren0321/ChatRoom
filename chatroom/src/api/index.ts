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
}

export default request;