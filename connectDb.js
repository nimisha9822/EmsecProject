const mongoose = require('mongoose')


const connectDb=async()=>{
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect('mongodb+srv://root:root@cluster0.4kn8iyh.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser : true
        },()=>{
            console.log('Database connected');
        })
    }catch(err){
        console.log(err);
    }
}
connectDb();


module.exports=connectDb;