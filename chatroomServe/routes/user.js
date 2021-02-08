import express from 'express';
import user from '../models/user';

const router = express.Router();

//添加用户
router.post('/addUser?:name',(req,res) => {
    const userInfo = {};
    if(req.query.name){
        userInfo.name = req.query.name;
        userInfo.roomId = '';
    }
    new user(userInfo).save().then(user => {
      res.json(user);
    });
})

//删除用户
router.post('/deleteUser?:id',(req,res) => {
    user.findOneAndRemove({_id:req.query.id}).then(data => {
      res.json(data);
    });
})

module.exports = router;