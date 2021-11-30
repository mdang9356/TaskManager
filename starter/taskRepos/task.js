const Task = require("../db/model.js");
let taskRepos = {
    get: async function(resolve,reject){
        try{
            const allTask = await Task.find({});
            resolve(allTask);
        }
        catch(error){
            reject(error)
        }
    },

    createTask: async function(newTask,resolve,reject){
        try{
            const result = await Task.create(newTask);
            resolve(result);
    
        }
        catch(error){
            reject(error)
        }
    },
    
    getSingle: async function(id,resolve,reject){
        try{
            const task = await Task.findOne({_id: id});
            resolve(task);
        }
        catch(error){
            reject(error)
        }
    },

    updateTask: async function(taskID,updatedTask,resolve,reject){
        try{
            const task = await Task.findOneAndUpdate({_id: taskID},updatedTask,{new: true,runValidators: true});
            resolve(task);
        }
        catch(error){
            reject(error)
        }    
    },

    deleteTask: async function(id,resolve,reject){
        try{
            const task = await Task.findOneAndDelete({_id: id});
            resolve(task);
        }
        catch(error){
            reject(error)
        }    
    },

}

module.exports = taskRepos;