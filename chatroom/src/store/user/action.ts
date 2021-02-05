import * as login from './action-type';

//接口
export interface saveUser {
    type: login.USER_TYPE;
    name: string;
    id: string;
}
//保存用户名称
export const saveUserinfo = (name: string,id: string): saveUser => ({
    type: login.USER,
    name,
    id
})