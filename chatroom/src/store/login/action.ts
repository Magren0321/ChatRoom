import * as login from './action-type';

//接口
export interface saveUserName {
    type: login.USERNAME_TYPE;
    value: string;
}
//保存用户名称
export const saveUsername = (value: string): saveUserName => ({
    type: login.USERNAME,
    value
})