import * as All from './TodoActionTypes';
import axios from 'axios';

const url = 'http://localhost:8000/tasks/';

const getCsrfToken = ()=>{

	const data = document.cookie;
	const csrf_data = data.split('=');
	return csrf_data[1];
}


export const fetchItems = (filter_data={})=>{
	
	return dispatch=>{
		// console.log(filter_data);
		dispatch(All.fetchTaskRequest());
		let own_url = `${url}?`;
		for(let key of Object.keys(filter_data)){
			if(filter_data[key] !== ''){
				own_url +=`${key}=${filter_data[key]}&`;
			}
			
		}
		axios(own_url).then(response=>{
			const data = response.data;
			const items = data.results
			const detail = {
				count:data.count,
				next:data.next,
				previous:data.previous
			}
			dispatch(All.fetchTaskSuccess({data:items,detail:detail}));

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
			url:`${url}${item_id}/`,
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

export const updateItem = (data,id)=>{
	const csrf = getCsrfToken();
	return dispatch=>{
		dispatch(All.fetchTaskRequest());


		const config = {
			method:'put',
			url:`${url}${id}/`,
			headers: {
				'x-CSRFToken': csrf
			},
			data:data

		}
		axios(config).then(response=>{
			dispatch(All.editTaskItem(response.data));
		}).catch(error=>{
			dispatch(All.fetchTaskFailure(error));
		})

	}
}