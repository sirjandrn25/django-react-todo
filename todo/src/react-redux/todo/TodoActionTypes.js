import * as All from './TodoTypes';

export  const fetchTaskRequest = ()=>{
	return {
		type:All.FETCH_TASK_REQUEST
	}
}

export const fetchTaskSuccess = items=>{

	return {
		type:All.FETCH_TASK_SUCCESS,
		payload:items
	}
}

export const fetchTaskFailure = error=>{
	return {
		type:All.FETCH_TASK_FAILURE,
		payload:error
	}
}

export const addTaskItem = item=>{
	return {
		type:All.ADD_TASK_ITEM,
		payload:item
	}
}
export const deleteTaskItem = item_id=>{
	return {
		type:All.DELETE_TASK_ITEM,
		payload:item_id
	}
}

export const editTaskItem = item=>{
	return {
		type:All.EDIT_TASK_ITEM,
		payload:item
	}
}