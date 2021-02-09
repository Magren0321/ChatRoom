import room from '../models/room';
import user from '../models/user';

export default app => {
    const server = require('http').Server(app);  
    const io = require('socket.io')(server);  

    server.listen(3001); //端口设置3001
    
    io.on('connection', socket => {
     /**
     * @parm data{
     *      roomId 加入的房间id
     *      userId 用户的id
     *      userName 用户名字
     * }
     */
        socket.on('join',data=>{
            //创建room
            socket.join(data.roomId);
            //更新用户所在的roomid
            user.updateOne({_id:data.userId},{roomId:data.roomId}).then(()=>{
                //让当前房间人数+1
                room.findOne({_id:data.roomId}).then(res=>{
                    room.updateOne({_id:data.roomId},{num:res.num+1}).then(()=>{
                        let message = {
                            name: data.userName,
                            id: data.userId,
                            message: `${data.userName}加入了聊天室`,
                            status: 0
                        }
                        io.sockets.in(data.roomId).emit('chat_message',message);
                    })
                })
            })
        });

        /**
         * @parm data{
         *      userName: 用户名称
         *      userId: 用户id
         *      mes: 发送的信息
         *      roomId : 房间id
         * }
         */
        socket.on('mes',data=>{
            let message = {
                name: data.userName,
                id: data.userId,
                message: data.mes,
                status: 1
            }
            io.sockets.in(data.roomId).emit('chat_message',message); //广播给所有人
        });
        /**
         * @parm data{
         *      userName: 用户名称
         *      userId: 用户id
         *      roomId : 房间id
         * }
         */
        socket.on('leave', data=>{
            room.findOne({_id:data.roomId}).then(res=>{
                room.updateOne({_id:data.roomId},{num:res.num-1}).then(()=>{
                    let message = {
                        name: data.userName,
                        id: data.userId,
                        message: `${data.userName}离开了聊天室`,
                        status: 0
                    }
                    //广播除了'我'以外的所有人
                    socket.broadcast.to(data.roomId).emit('chat_message',message);
                })
            })
            socket.leave(data.roomId);
        })
    })

}