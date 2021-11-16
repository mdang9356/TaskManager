const connectDB = require('./db/connect.js');
const express = require('express');
const app = express();
const task = express.Router();
const taskRepos = require('./taskRepos/task.js');
require('dotenv').config();
const port = 3000;

app.use(express.json());

// get all tasks
task.get('/',function(req,res,next){
    taskRepos.get(function(data){
        res.send(data);
    },
     next())
})

//creat new task
task.post('/',function(req,res,next){
    let newTask = {
        name: req.query.name,
        complete: req.query.complete
    };

    taskRepos.createTask(newTask,function(data){
        console.log(newTask);
        res.json(data)
    },
     function(error){
         console.log(error);
     })})

//get single task
task.get('/:id',function(req,res,next){
    taskRepos.getSingle(req.param.id, function(data){
        res.send(data);
    }, next())
})

//patch task
task.patch('/:id',function(req,res,next){
    taskRepos.updateTask(req.param.id, function(data){
        res.send(data);
    }, next())})


//delete task
task.delete('/:id',function(req,res,next){
    taskRepos.deleteTask(req.param.id, function(data){
        res.send(data);
    }, next())})

app.use('/api/v1/tasks', task)

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, ()=>{
            console.log(`Sever has started on port ${port}`);
        })

    } catch (error) {
        console.log(error);
    }
}

start();
