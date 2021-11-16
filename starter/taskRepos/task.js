const Task = require("../db/model.js");
let taskRepos = {
    get: function(resolve,reject){
        resolve('this is get');
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
    
    getSingle: function(id,resolve,reject){
        resolve('this is get single');
    },

    updateTask: function(id,resolve,reject){
        resolve('this is update task');
    },

    deleteTask: function(id,resolve,reject){
        resolve('this is delete');
    },

}

module.exports = taskRepos;