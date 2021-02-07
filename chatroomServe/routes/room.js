import express from 'express';
import room from '../models/room';
const router = express.Router();

//创建房间
router.post('/createRoom?:name',(req,res) => {
    const roomInfo = {};
    if(req.query.name){
        roomInfo.roomName = req.query.name;
        roomInfo.num = 1;
    }
    new room(roomInfo).save().then(roomInfo => {
      res.json(roomInfo);
    });
});
//获取房间列表
router.get('/allRoom',(req,res) => {
    room.find().then(roomList => {
        const room = {}
        room.list = roomList;
        res.json(room);
    })
})

module.exports = router;