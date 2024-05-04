import { Task } from "../models/tasks.models.js";
import asyncWrapper from "../middlewares/asyncError.js";
import { createCustomError } from "../errors/customError.js";

const getAllTasks =  asyncWrapper(async (req, res) => {
  
    const tasks = await Task.find({});

    res.status(201).json({ tasks,nbHits:tasks.length });
   
    
  
});

const getSingleTask = asyncWrapper( async (req, res,next) => {

    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
    return next(createCustomError(`No task with this id: ${taskID}`,404))

        return res.status(404).json(`No task with this id: ${taskID}`);
    }
    res.status(201).json({ task });

 

}); 
const createTask = asyncWrapper( async (req, res) => {

    const task = await Task.create(req.body);

    res.status(201).json({ task });


  
});


const deleteTask = asyncWrapper (async (req, res) => {
 
        const taskID = req.params.id;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json(`No task with this id: ${taskID}`);
        }
        res.status(201).json({ task });
        // res.status.send()
    
       
    
});


const updateTask = asyncWrapper(async (req, res) => {
 
  const {id:taskID} = req.params
const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
    new:true,runValidators:true
})
if (!task) {
    return res.status(404).json(`No task with this id: ${taskID}`);
}
  res.status(201).json({task})


    
    

})
export { getAllTasks, getSingleTask, updateTask, deleteTask, createTask };
