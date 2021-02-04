import React, { Component } from 'react'
import { Input , Button , notification} from 'antd';
import './login.less'
import { connect } from 'react-redux';
import { saveUsername } from '../../store/login/action';


// 创建类型接口
interface IProps {
    saveUsername: (value: string) => void;
}

class login extends Component<IProps> {
     
    state = {
        name:''
    }
    //当前input的值改变，赋值给name
    inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name:e.target.value
        });
    }
    //登录
    handleClick= () =>{
        //正则表达式，只能是数字、字母、英文组成，不能包含空格以及特殊字符
        const nameRegex = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/)
        if(!nameRegex.test(this.state.name)){
            this.openNotification();
        }else{
           console.log(this.props);
           this.props.saveUsername(this.state.name);
        }
    }
    //弹出错误提醒
    openNotification= ()  => {
        notification['error']({
          message: 'UserName不可用',
          description:
            '用户名不可包含空格或者特殊字符',
        });
    };
    

    render() {
        return (
            <main className='wrap'>
                <div className='login'>
                    <h1>ChatRoom</h1>
                    <Input className='input' placeholder="UserName" size="large" onChange={(e)=>this.inputChange(e)}/>
                    <Button className='btn' onClick={this.handleClick}>Enter</Button>
                </div>
            </main>
        )
    }
}


export default connect(state => ({
    
  }), {
    saveUsername
  })(login);
  