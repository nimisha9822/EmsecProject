const express = require("express");
const cors = require("cors");
const connectDb = require("./connectDb");
const User = require("./Models/User");
connectDb();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.POR || 7000;

//CREATE
app.post("/create", async (req, res) => {
  try {
    const { task, end_date } = req.body;
    if (task && end_date) {
      const user = User({
        task: task,
        is_completed: "pending",
        end_date: end_date,
      });
      const result = await user.save();
      res.status(200).send({ message: "Task Created", result });
    } else {
      res.status(400).send({ message: "Enter all the fields" });
    }
  } catch (err) {
    res.status(400).send({ message: "Error Occured", err });
  }
});

//Update
app.post("/update", async (req, res) => {
  try {
    const { task } = req.body;
    if (task) {
      const result = await User.updateOne(
        { task: task },
        {
          $set: {
            is_completed: "completed",
          },
        }
 
      )
      res.status(200).send({message : "Updated",result});
    } else {
      res.status(400).send({ message: "Enter all the fields" });
    }
  } catch (err) {
    res.status(400).send({ message: "Error Occured", err });
  }
});


//Read
app.get('/read',(req,res)=>{
    
     User.find({},(err,user)=>{
        if(user){
            res.status(200).send({user});
        }else{
            res.status(400).send({message : "Error Occured",err});
        }
       })
    
})

// Delete
app.post('/delete',async(req,res)=>{
   try{
    const {task} = req.body;
      const result = await User.deleteOne({task : task});
      res.status(200).send({message : "Deleted",result})
   }catch(err){
    res.status(400).send({message : "Error Occured",err});
   }
})


//Pagination
app.get('/data',async(req,res)=>{
    try{
       let page = Number(req.query.page) || 1;
       let limit = Number(req.query.limit) || 10;
       let skip = (page-1)*limit;

       const result = await User.find().skip(skip).limit(limit);
       res.status(200).send({result});
    }catch(err){
        console.log(err);
    }
})



app.listen(PORT, () => {
  console.log("Server Connected");
});
