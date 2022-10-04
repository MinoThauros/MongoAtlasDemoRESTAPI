const mongoose=require('mongoose');
const {Schema}= mongoose;

const userSchema=Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String,
        required:[true,'Please add a email value'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please add a password value']
    },

},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)