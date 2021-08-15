import * as All from './TodoActionTypes';
import axios from 'axios';

const url = 'http://localhost:8000/tasks/';

const getCsrfToken = ()=>{

	const data = document.cookie;
	const csrf_data = data.split('=');
	return csrf_data[1];
}


export const fetchItems = ()=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTaskRequest());
		
		axios(url).then(response=>{
			const data = response.data;
		
			dispatch(All.fetchTaskSuccess(data));

			}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			
			dispatch(All.fetchTaskFailure({status:status,data:data}));
		})

	}
}

export const addItem = item=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTaskRequest());
		const config = {
			method:'post',
			url:url,
			headers: {
				'x-CSRFToken': csrf
			},
			data:item

		}
		axios(config).then(res=>{
			const data = res.data;
			dispatch(All.addTaskItem(data));

		}).catch(error=>{
			const status = error.response.status;
			const data = error.response.data;
			
			dispatch(All.fetchTaskFailure({status:status,data:data}));
			// dispatch(All.fetchTodoFailure(error));


		})
		
	}
}

export const deleteItem = item_id=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTaskRequest());

	
		const config = {
			method:'delete',
			url:`${url}/${item_id}/`,
			headers: {
				'x-CSRFToken': csrf
			}

		}
		axios(config).then(res=>{
			dispatch(All.deleteTaskItem(item_id));
		}).catch(error=>{
			dispatch(All.fetchTaskFailure(error));
		});
	}
}

export const updateItem = item=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTaskRequest());


		const config = {
			method:'put',
			url:`${url}/${item.id}/`,
			headers: {
				'x-CSRFToken': csrf
			},
			data:item

		}
		axios(config).then(response=>{
			dispatch(All.editTaskItem(response.data));
		}).catch(error=>{
			dispatch(All.fetchTaskFailure(error));
		})

	}
}