import mongoose from 'mongoose';

//创建schema
const userSchema = new mongoose.Schema({
    name: String,
    roomId: String
})

const user = mongoose.model("userSchema",userSchema);

export default user;