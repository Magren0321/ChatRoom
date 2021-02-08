import React, { Component } from 'react'
import { Input , Button , notification} from 'antd';
import { connect} from 'react-redux';
import { saveUserinfo } from '../../store/user/action';
import { RouteComponentProps } from 'react-router-dom';
import api from '../../api/index';
import './login.less'


// 创建类型接口
interface IProps extends RouteComponentProps{
    saveUserinfo: (name: string,id: string) => void;
    state: user;
}
interface user {
    name: string,
    id: string
}
class login extends Component<IProps> {
     
    state = {
        name:'',
        id:'',
        loading:false,
    }
    //当localStorage存储过用户名的时候直接跳转到选择房间页面
    constructor(props: IProps | Readonly<IProps>){
        super(props);
        const name = localStorage.getItem('name');
        const id = localStorage.getItem('id');
        if(name&&id){
            this.props.saveUserinfo(name,id);
            this.toPageSelect();
        }
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
            return;
        }else{
            if(this.state.name.length>10){
                this.openNotification();
                return;
            }
           api.addUser(this.state.name).then(res=>{
               this.props.saveUserinfo(res.data.name,res.data._id);
               localStorage.setItem('name',res.data.name);
               localStorage.setItem('id',res.data._id);
               this.toPageSelect();
           })
        }
    }
    //弹出错误提醒
    openNotification= ()  => {
        notification['error']({
          message: 'UserName不可用',
          description:
            '用户名不规范，可能包含空格或特殊字符',
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
    //跳转到房间选择页面
    toPageSelect = () => {
        this.props.history.replace('/selectroom');
    }

    render() {
        return (
            <main className='wrap'>
                <div className='login'>
                    <h1>ChatRoom</h1>
                    <Input className='input' placeholder="用户名（少于10个字符）" size="large" onChange={(e)=>this.inputChange(e)}/>
                    <Button className='btn' onClick={this.enterLoading} loading={this.state.loading}>Enter</Button>
                </div>
            </main>
        )
    }
}

export default connect((state: {User: user}) => ({
    state:state.User
  }), {
    saveUserinfo
  })(login);