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

module.exports = router;