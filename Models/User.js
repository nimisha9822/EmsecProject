const mongoose= require('mongoose')


const userSchema= new mongoose.Schema({
    task :{
        type: String,
        required : true
    },
    is_completed:{
        type : String,
        required : true
    },
    end_date:{
        type : String,
        required : true
    }
})
module.exports= new mongoose.model('User',userSchema);