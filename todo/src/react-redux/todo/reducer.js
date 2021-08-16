import * as All from './TodoTypes';


const initialState = {
	loading:false,
	items:[],
	item_detail:{},
	error:{}
}



const todoReducer = (state=initialState,action)=>{

	switch (action.type){
		case All.FETCH_TASK_REQUEST:
			return {
				...state,
				loading:true
			}
		case All.FETCH_TASK_SUCCESS:
			return {
				loading:false,
				items:action.payload.data,
				item_detail:action.payload.detail,
				error:{}
			}
		case All.FETCH_TASK_FAILURE:
			// console.log(action.payload);
			return {
				...state,
				loading:false,
				error:action.payload
			}
		case All.ADD_TASK_ITEM:
			return {
				loading:false,
				items:[action.payload,...state.items],
				error:{}
			}
		case All.EDIT_TASK_ITEM:
			return {
				loading:false,
				items:editTaskItem(action.payload,state.items),
				error:{}
			}
		case All.DELETE_TASK_ITEM:
			return {
				loading:false,
				items:deleteTaskItem(action.payload,state.items),
				error:{}
			}
		
		
		default:
			return state
	}
}

const editTaskItem=(update_item,items)=>{
	let temp = [];
	
	for(let item of items){
		if(item.id!==update_item.id){
			temp.push(item)
		}
		else{
			temp.push(update_item)
		}
	}
	return temp;


}

const deleteTaskItem = (id,items)=>{
	let temp = []
	for(let item of items){
		if(item.id!==id){
			temp.push(item)
		}
	}
	return temp;
}	


export default todoReducer;