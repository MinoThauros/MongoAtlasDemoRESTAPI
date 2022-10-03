const express=require('express');
const colors=require('colors')
const dontenv=require('dotenv').config();
const connectDB=require('./config/db');

const port=process.env.PORT || 8000;
const app=express()
const {errorHandler}=require('./middleware/errorMiddleware');
connectDB()





//adding middleware to further specify express instance behavior

app.use(express.json())
app.use(express.urlencoded({extended:false}))


//linking a folder to a certain link
app.use('/api/goals',require('./routes/goalRoutes'))
app.use(errorHandler)



app.get('/',(req,res,next)=>{
    res.status(200).send('Welcome to the API tuto')

})





app.listen(port,()=>console.log(`server started on port ${port}`))