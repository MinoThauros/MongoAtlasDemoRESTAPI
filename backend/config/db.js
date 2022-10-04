const mongoose=require('mongoose');

var mongoOptions =
{
    db: {safe: true},
    server: {
        socketOptions: {
            keepAlive: 1
        }
    },
    replset: {
        rs_name: 'myReplSet',
        socketOptions: {
            keepAlive: 1
        }
    }
};


const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.log(err)
        process.exit(1)

    }
};

module.exports=connectDB