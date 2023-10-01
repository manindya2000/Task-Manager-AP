class Validator{
  static taskInputValidator (taskInfo){
     if (taskInfo.hasOwnProperty('title') &&
     taskInfo.hasOwnProperty('description') &&
      taskInfo.hasOwnProperty('flag') &&
     taskInfo.hasOwnProperty('Priority') 
     ){
        return{
            "status":true,
            "message":"task has been added succesfully"
        }
     }
     else{
        if(taskInfo.hasOwnProperty('title')==false)
        return{
            "status":false,
            "mesage":"task details is malformed, please provide tile"
        }
        if(taskInfo.hasOwnProperty('description')==false)
        return{
            "status":false,
            "mesage":"task details is malformed, please provide description"
        }

        if(taskInfo.hasOwnProperty('flag')==false)
        return{
            "status":false,
            "mesage":"task details is malformed, please provide flag"
        }
        if(taskInfo.hasOwnProperty('Priority')==false)
        return{
            "status":false,
            "mesage":"task details is malformed, please provide flag"
        }
     }

  }
}

module.exports=Validator