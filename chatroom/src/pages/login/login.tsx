import React, { Component } from 'react'
import { Input , Button , notification} from 'antd';
import { connect, DefaultRootState } from 'react-redux';
import { saveUsername } from '../../store/login/action';
import './login.less'


// 创建类型接口
interface IProps {
    saveUsername: (value: string) => void;
    state: DefaultRootState
}

class login extends Component<IProps> {
     
    state = {
        name:'',
        loading:false,
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
    //让按钮进入加载模式，3s
    enterLoading = () => {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.handleClick();
            this.setState({
                loading: false
            })
        }, 3000);
    };
    

    render() {
        return (
            <main className='wrap'>
                <div className='login'>
                    <h1>ChatRoom</h1>
                    <Input className='input' placeholder="UserName" size="large" onChange={(e)=>this.inputChange(e)}/>
                    <Button className='btn' onClick={this.enterLoading} loading={this.state.loading}>Enter</Button>
                </div>
            </main>
        )
    }
}

export default connect(state => ({
    state:state //将reducer的state赋值给props的state，可通过this.props.state找到store中的值
  }), {
    saveUsername
  })(login);
  