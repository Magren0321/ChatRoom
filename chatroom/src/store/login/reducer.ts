import * as action from './action';
import * as type  from './action-type';

let user ={
    name:''
}

// 用户名称
export const userName = (state = user, action: action.saveUserName) => {
    switch (action.type) {
        case type.USERNAME:
            console.log(action.value)
            return {...state , name:action.value}
        default:
            return state
      }
}

