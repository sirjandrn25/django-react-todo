import React,{useState,useEffect} from 'react';
import { Grid, TextField, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import { useSelector,useDispatch } from "react-redux";
import { addItem } from '../react-redux/todo/asyncActions';
const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: "10px"
  },
  btn:{
    marginRight:20
  }
}));

const AddTask = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector(state=>state);

  const handleSubmit = e=>{
    e.preventDefault();
    
    const data = {
      title:e.target.title.value,
      time:e.target.time.value
    }
    dispatch(addItem(data));
    

  }
  const currTime=()=>{
    const d = new Date();
    const time = d.getHours()+':'+d.getMinutes();

    return time
    
  }
  
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Task Title"
          id="standard-required"
          fullWidth
          placeholder="enter task"
          className={classes.textField}
          name="title"
          
         
        />
        <TextField
          id="time"
          label="Task Time"
          type="time"
          name="time"
          defaultValue={currTime()}
          fullWidth
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <Button className={classes.btn} type="submit" variant="contained" color="primary">
          Add
        </Button>
        {tasks.loading&&tasks.items?<span>{"sending......"}</span>:null}
        </form>
      </div>

    </>
  )
}

export default AddTask;