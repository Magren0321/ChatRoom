import * as action from './action';
import * as type  from './action-type';

const user ={
    name:'',
    id:''
}

// 用户名称
export const saveUser = (state = user, action: action.saveUser) => {
    switch (action.type) {
        case type.USER:
            return {...state , name:action.name , id: action.id }
        default:
            return state
      }
}

