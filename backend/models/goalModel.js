const mongoose=require('mongoose');
const {Schema}= mongoose;

const goalSchema=Schema({
    /**
     * 
     */
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'//associating a user wuth a goal
    }
    ,
    text:{
        type:String,
        required:[true,'Please add a text value']
    },
},{
    timestamps:true
})

module.exports=mongoose.model('Goal',goalSchema)