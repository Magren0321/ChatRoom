import  { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import { Input,Button } from 'antd';
import { saveUserinfo } from '../../store/user/action';
import './chatRoom.less';
const { TextArea } = Input;

// 创建类型接口
interface IProps extends RouteComponentProps{
    state: user,
    match: match
    saveUserinfo: (name: string,id: string) => void
}
//reducerd接口
interface user {
    name: string,
    id: string
}
//message接口
interface mesItem{
    name: string,
    id: string,
    message: string,
    status: number //0代表提示信息，1代表用户信息
}
interface match {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}
interface P{
    roomId: string;
}

const socket = require('socket.io-client')('ws://localhost:3001',{transports: ['websocket']})

class chatRoom extends Component<IProps> {
    
    state={
        message:[], //信息列表
        msg: '', //发送的信息
    }
    
    componentDidMount = () => {
        if(this.props.state.name!==''&&this.props.state.id!==''){
            this.socketOn();
            window.addEventListener("beforeunload", this.handleWindowBeforeUnload);
        }else{
            this.toPageLogin()
        }
    }
    //刷新页面或者关闭页面的时候触发，由于刷新页面会让redux的值重置，所以按照上面的componentDidMount会返回登录页面
    handleWindowBeforeUnload = () => {
        socket.emit('leave',{
            roomId:this.props.match.params.roomId,
            userName:this.props.state.name,
            userId:this.props.state.id,
        })
    }
    //跳转到登录页
    toPageLogin = () => {
        this.props.history.replace('/');
    }
    socketOn = () =>{
        //监听信息
        socket.on('chat_message',(data: mesItem)=>{
            this.setState({
                message:[data,...this.state.message]
            });
           
        })
        //发送加入群组
        socket.emit('join', {
            roomId:this.props.match.params.roomId,
            userName:this.props.state.name,
            userId:this.props.state.id
        })
    }
    //输入框内容
    inputChange = (e: { target: { value: string; }; }) => {
        this.setState({
            msg:e.target.value
        });
    }
    //监听是否是回车键
    handleMsg = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>{
        if(e.key==='Enter'){
            this.postMsg();
        }else{
            return;
        }
    }
    //发送信息
    postMsg = () => {
        if(this.state.msg.trim().length ===0){
            this.setState({
                msg:''
            })
            return;
        }
        socket.emit('mes',{
            roomId:this.props.match.params.roomId,
            userName:this.props.state.name,
            userId:this.props.state.id,
            mes:this.state.msg
        })
        //清空输入框
        this.setState({
            msg:''
        })
    }
    //离开聊天室
    leaveRoom = () => {
        window.location.reload(); //让页面刷新，达到跳转回选择房间页面的目的
    }

    render() {
        let model = 'other'
        return (
            <div className='chatWrap'>
                <div className='chatList'>
                    {
                        this.state.message.map((item: mesItem,index)=>{ 
                            if(item.status=== 1){
                                if(item.id===this.props.state.id){
                                    model='me'
                                }else{
                                    model='other'
                                }
                            }else{
                                model='toast'
                            }
                        return (
                            <div className={model} key={index}>
                                <p className='userName'>{item.name}:</p>
                                <p className='userMsg'>{item.message}</p>
                             </div>
                            )
                        })
                     }
                </div>
                <div className='postWrap'>
                    <div className ='inputWrap'>
                        <TextArea 
                         placeholder="说点什么吧"
                         autoSize={{ minRows: 3, maxRows: 3 }} 
                         onChange={(e)=>this.inputChange(e)}
                         onKeyUp={(e)=>this.handleMsg(e)}
                         value={this.state.msg}
                         /> 
                        <div className='control'>
                            <Button shape="round" size='small' className='postBtn' onClick={this.postMsg}>POST</Button>
                            <Button  size='small' danger={true} className='signUpBtn' onClick={this.leaveRoom}>登出</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state: {User: user}) => ({
    state:state.User
  }), {
    saveUserinfo
  })(chatRoom);