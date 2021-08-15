import React,{useState} from 'react';
import { Grid, TextField, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: "10px"
  }
}));

const AddTask = () => {
  const classes = useStyles();
  
  const handleSubmit = e=>{
    e.preventDefault();
    const title = e.target.title.value;
    const time = e.target.time.value;
    

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
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
        </form>
      </div>

    </>
  )
}

export default AddTask;