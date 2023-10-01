# Task Manager API

This a RESTful API for a simple task manager application. 

## Start Guide

### Clone the Repo

```bash
https://github.com/manindya2000/Task-Manager-AP.git
```

## APIs


| Sl No 	| Http Verbs 	| URL                      	| Description                                                                           	|
|-------	|------------	|--------------------------	|---------------------------------------------------------------------------------------	|
| 1.    	| GET        	| /tasks                   	| Get all tasks                                                                         	|
| 2.    	| GET        	| /tasks/:id               	| Get a specific task by passing task id in path parameter                              	|
| 3.    	| GET        	| /tasks?flag=Y&&sort=desc 	| Get list of tasks filtered by flag and sorted                                         	|
| 4.    	| GET        	| /tasks/priority/:level   	| Get a list of tasks for a specific task level by passing priority in path parameter   	|
| 5.    	| POST       	| /tasks                   	| Create a new task by proving parameters in the body.                                  	|
| 6.    	| PUT        	| /tasks/:id               	| Update a task by passing task id as path parameter through PUT call                   	|
| 7.    	| DELETE     	| /tasks/:id               	| Delete a specific task by providing task id in the path parameter through DELETE call 	|
