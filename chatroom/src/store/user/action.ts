import * as type from './action-type';

//接口
export interface saveUser {
    type: type.USER_TYPE;
    name: string;
    id: string;
}

//保存用户名称
export const saveUserinfo = (name: string,id: string): saveUser => ({
    type: type.USER,
    name,
    id
})


//统一
export type typeAction = saveUser;