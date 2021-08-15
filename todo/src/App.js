import React from "react";

import { Container, Box, Grid, TextField, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import ItemList from "./components/ItemList";
import AddTask from './components/AddTask';
import EditTask from "./components/EditTask";
import { useState } from "react";
import {Provider} from 'react-redux';
import store from './react-redux/store';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "550px",
    backgroundColor: "#fafafa",
    width: "80%",
    borderRadius: "20px",
    border: "2px solid #ffd600",
    padding: 30,
    marginTop:"50px"
  }
}));

export default function App() {
  const [edit,setEdit] = useState(false);
  const [edit_task,setEditTask] = useState('');
  const classes = useStyles();
  
  const openEdit = (item)=>{
   
    setEditTask(item);
    setEdit(true)
  }
  const closeEdit = ()=>{
    setEdit(false);
  }
  
  return (
    <React.Fragment>
      <Provider store={store}>
      <Container maxWidth="sm">
        <Box>
          <div className={classes.root}>

            {edit? <EditTask closeEdit={closeEdit} task={edit_task} />:
            <>
            <AddTask />
            <ItemList handleEdit={openEdit} />
            </>
            
            }
            

          </div>
        </Box>
      </Container>
      </Provider>
    </React.Fragment>
  );
}
