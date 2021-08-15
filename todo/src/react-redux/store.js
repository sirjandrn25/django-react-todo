import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import todoReducer from './todo/reducer';
// import userReducer from './user/UserReducer';


const store = createStore(todoReducer,applyMiddleware(thunkMiddleware));


export default store;