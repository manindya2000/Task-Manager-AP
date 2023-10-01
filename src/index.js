/* Importing required libraries */
const express=require('express');
const Graceful=require('@ladjs/graceful');
const taskData=require('../src/tasks.json');
const path=require('path');
const Validator=require('../src/helper/validator');
const fs=require('fs');


const PORT=8080;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* Get all task in the file */
app.get('/',(req,res)=>{
   return res.status(200).send('');
});

 /* This will work with query param for flag and sort 
    URL: localhost:8080/tasks?flag=Y&&sort=desc */
app.get('/tasks',(req,res)=>{
   let tasks=JSON.parse(JSON.stringify(taskData));
   let inputFlag=String(req.query.flag);
   let inputSort=String(req.query.sort);
   console.log(inputSort);
   console.log(inputFlag);

    /* This will work with query param for flag and sort 
    URL: localhost:8080/tasks?flag=Y&&sort=asc */
   if(inputFlag && inputSort.includes("asc")){
    let flagFilter=tasks.filter(val=>val.flag==inputFlag);
    let dateFilter=flagFilter.sort((a,b)=>
        new Date(b.createDate)-new Date(a.createDate)
     );
    return res.status(200).json(JSON.parse(JSON.stringify(dateFilter)));
   }
    /* This will work with query param for flag and sort 
    URL: localhost:8080/tasks?flag=Y&&sort=desc */
   else if(inputFlag && inputSort.includes("desc")){
    let flagFilter=tasks.filter(val=>val.flag==inputFlag);
    let dateFilter=flagFilter.sort((a,b)=>
        new Date(b.createDate)-new Date(a.createDate)
     );
    return res.status(200).json(JSON.parse(JSON.stringify(dateFilter)));
  }
   else{

    /* returning json with all tasks if no query parameter present
    URL: localhost:8080/tasks */
    return res.status(200).json(tasks);
   }
   
});

/*Get a specific task by passing task id in path parameter
  URL: localhost:8080/tasks/1 */
app.get('/tasks/:id',(req,res)=>{
    let id=req.params.id;
    let tasks=taskData;
    let filteredtask=tasks.filter(val=>val.ID==id);
    console.log(filteredtask);
    if(filteredtask.length==0){
        res.status(404).send(`No task found with the id: ${req.params.id}`);
    }
    else{
       return res.status(200).json(filteredtask);
    }
});

/*Get a list of tasks for a specific task level by passing priority in path parameter
  URL: localhost:8080/tasks/priority/high */

app.get('/tasks/priority/:level',(req,res)=>{
   const searchForPrioritry=req.params.level;
   console.log(searchForPrioritry);
   let tasks=taskData.filter(val=>val.Priority==searchForPrioritry);
   if(tasks.length==0){
    return res.status(404).send(`No such priority found in data`);
   }
   else{
     return res.status(200).json(tasks);
   }
});

/* Create a new task by proving following parameters in the body. It is POST call 
   {
            "title":"Attend live session",
            "description":"Node JS Exprees and API",
            "flag":"Y",
            "Priority":"High"
        
   } 
  URL: localhost:8080/tasks */
app.post('/tasks',(req,res)=>{
   const taskDetails=req.body;
   const writePath=path.join(__dirname,'..','/src/tasks.json');
   let responseValidator=Validator.taskInputValidator(taskDetails);
   if(responseValidator.status==true){
    let taskInfoDetails=JSON.parse(JSON.stringify(taskData));
    console.log(taskInfoDetails);
    const desturctID=taskInfoDetails.map(object=>object.ID);
    const maxTaskId=Math.max(...desturctID);
    taskDetails.ID=String(maxTaskId+1);
    let dateTime=new Date();
    taskDetails.createDate=dateTime.toISOString();
    const updatedTask=JSON.parse(JSON.stringify(taskDetails));
    console.log(maxTaskId);
    taskInfoDetails.push(taskDetails);
    console.log(writePath);

    fs.writeFile(writePath,JSON.stringify(taskInfoDetails),{encoding:'utf-8',flag:'w'},(err,data)=>{
        if(err){
            return res.status(500).send("Something went wrong when creating the task!!!");
        }
        else{
            return res.status(200).json(responseValidator);
        }
    });
   }
   else
      return res.status(400).json(responseValidator)

});

/* Update a task by passing task id as path parameter through PUT call
URL: localhost:8080/tasks/4*/

app.put('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const tasks=taskData;
    let filterTask=tasks.filter(val=>val.ID==id)[0];
    console.log(filterTask);
    const {title,description,flag,Priority}=req.body;
    console.log(description);
    const writePath=path.join(__dirname,'..','/src/tasks.json');
    if(filterTask.length==0){
        res.status(404).send(`No task found with the id: ${req.params.id}`);
    }
    else{
         let otherTask=tasks.filter(val=>val.ID!=id);
         console.log()
         filterTask.title=title;
         filterTask.description=description;
         filterTask.flag=flag;
         filterTask.Priority=Priority;
         filterTask.ID=id;
         console.log(otherTask);
       //  console.log(filterTask);
         let updatedObj=JSON.parse(JSON.stringify(filterTask));
         otherTask.push(updatedObj);
         
         fs.writeFile(writePath,JSON.stringify(otherTask),{encoding:'utf-8',flag:"w"},(err,data)=>{
            if(err){
                return res.status(500).send("Some problem occured during updation");
            }
            else{
                res.status(200).send("Property got updated");
            }
         });
    }
});

/* Delete a specific task by providing task id in the path parameter through DELETE call
  URL: localhost:8080/tasks/10 */

app.delete('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const tasks=taskData;
    const writePath=path.join(__dirname,'..','/src/tasks.json');
    let filterTask=tasks.filter(val=>val.ID==id);
    if(filterTask.length==0){
        res.status(404).send(`No task found with the id: ${req.params.id}`);
    }
    else{
         let otherTask=tasks.filter(val=>val.ID!=id);
         console.log(otherTask);
         let modifiedObj=JSON.parse(JSON.stringify(otherTask));
         fs.writeFile(writePath,JSON.stringify(modifiedObj),{encoding:'utf-8',flag:"w"},(err,data)=>{
            if(err){
                return res.status(500).send("Some problem occured during updation");
            }
            else{
                res.status(200).send("Task deleted successfully");
            }
         });
    }
});

app.listen(PORT, error =>{
    if (error){
        console.log("Something went wrong !!!");
    }
    else{
        console.log("Server is running on port no. 8080 successfully");
    }
});