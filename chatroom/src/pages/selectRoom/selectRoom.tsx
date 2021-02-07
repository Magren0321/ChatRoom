import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button,Modal,Input,notification } from 'antd';
import { saveUserinfo } from '../../store/user/action';
import api from '../../api/index';
import './selectRoom.less'

interface IProps extends RouteComponentProps{
    saveUserinfo: (name: string,id: string) => void;
    state: user;
}
interface user {
    User:{
        name: string,
        id: string
    }
}
class selectRoom extends Component<IProps> {
    state = {
        roomNum: 0, //房间数
        userNum: 0, //在线人数
        isModalVisible: false, //创建房间
        roomName:'', //创建房间的名字
        roomList:[], //房间列表
        display: true, //是否显示“暂无房间”这句提示
        userName:'', //用户名字
    }

    componentDidMount() {
        const name = localStorage.getItem('name');
        const id = localStorage.getItem('id');
        if(name&&id){
            this.props.saveUserinfo(name,id);
            this.setState({userName:name});
            this.getRoom();
        }else{
            this.toPageLogin()
        }
    }
    //跳转到登录页
    toPageLogin = () => {
        this.props.history.replace('/');
    }
    //创建房间
    createRoom = () => {
        if(this.state.roomName.length>20){
            this.openNotification();
            return;
        }else{
            //正则表达式，只能是数字、字母、英文组成，不能包含空格以及特殊字符
            const nameRegex = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/)
            if(!nameRegex.test(this.state.roomName)){
                this.openNotification();
                return;
            }
            api.createRoom(this.state.roomName).then( res =>{
                console.log(res);
            })
            this.changeModal(false);
        }
    }
    //获取房间列表以及详情
    getRoom = () => {
        api.getRoomList().then( res =>{
            let num = 0;
            for(let i = 0 ; i < res.data.list.length; i++){
                num += res.data.list[i].num //计算当前所有房间人数和
            }
            this.setState({
                roomList: res.data.list,
                roomNum: res.data.list.length,
                userNUm: num
            })
        })
        if(this.state.roomList.length!==0){
            this.setState({
                display: false
            })
        }
    }
    //关闭/打开创建房间窗口
    changeModal = (isShow: boolean) => {
        console.log(this.props.state);
        this.setState({
            isModalVisible: isShow
        });
    }
    //创建房间的名字
    inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            roomName:e.target.value
        });
    }
    //弹出错误提醒
    openNotification= ()  => {
        notification['error']({
          message: '房间名称不可用',
          description:
            '名称不规范，可能包含空格或特殊字符',
        });
    };

    render() {
        return (
            <main className='selectWrap'>
               <Modal title="创建房间" visible={this.state.isModalVisible} onOk={this.createRoom} onCancel={()=>this.changeModal(false)}>
                    <Input className='input' placeholder="房名（最长长度20个字符）" size="large" onChange={(e)=>this.inputChange(e)}/>   
               </Modal>
               <div className='selectRoom'>
                   <div className = 'listWrap'>
                       <div className='detail'>
                         <Button  shape="round" onClick={()=>this.changeModal(true)}>创建房间</Button>
                         <p>{this.state.roomNum} rooms - {this.state.userNum} users</p>
                        </div>
                        <div className='roomlst'>
                            {this.state.display?(
                                <p>暂无房间</p>
                            ): null}
                        </div>
                   </div>
                    
               </div>
               <div className='userInfo'>
                   <p>{this.state.userName}</p>
                   <Button>登出</Button>
               </div>
            </main>
        )
    }
}
export default connect((state: {User: user}) => ({
    state:state.User
  }), {
    saveUserinfo
  })(selectRoom);
  
  