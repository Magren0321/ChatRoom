import mongoose from 'mongoose';

//创建schema
const roomSchema = new mongoose.Schema({
    roomName: String, //聊天室名称
    num: Number, //聊天室在线人数
})

const room = mongoose.model("roomSchema",roomSchema);

export default room;