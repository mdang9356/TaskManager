const connectDB = require('./db/connect.js');
const express = require('express');
const app = express();
const task = express.Router();
const taskRepos = require('./taskRepos/task.js');
require('dotenv').config();
const port = 3000;

// middleware
app.use(express.static('./public'))
app.use(express.json());

// get all tasks
task.get('/',function(req,res,next){
    taskRepos.get(function(data){
        res.status(200).json(data)
    },
     function(error){
        res.status(500).json(error);
     })
})

//creat new task
task.post('/',function(req,res,next){
    let newTask = req.body;

    taskRepos.createTask(newTask,function(data){
        console.log(newTask);
        res.status(200).json(data);
    },
     function(error){
        res.status(500).json(error);
     })
})

//get single task
task.get('/:id',function(req,res,next){
    taskRepos.getSingle(req.params.id, function(data){
        if(!data){
            res.status(404).json({errorMessage: 'Task not found!'}); 
        }
        else{
            res.status(200).json(data);
        }
    }, function(error){
        res.json(error)
    })
})

//patch task
task.patch('/:id/',function(req,res,next){
    let taskID = req.params.id;
    let updatedTask = req.body;
    
    taskRepos.updateTask(taskID,updatedTask, function(data){
        if(!data){
            res.status(404).json({errorMessage: 'Task not found!'}); 
        }
        else{
            res.status(200).json(data);
        }    
    }, function(error){
        res.json(error);
    })
})


//delete task
task.delete('/:id',function(req,res,next){
    taskRepos.deleteTask(req.params.id, function(data){
        if(!data){
            res.status(404).json({errorMessage: 'Task not found!'}); 
        }
        else{
            res.status(200).json(data);
        }    
    }, function(error){
        res.json(error)
    })
})

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
