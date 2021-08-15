import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles";
import { DataUsageOutlined } from '@material-ui/icons';
import { useSelector,useDispatch } from "react-redux";
import { updateItem } from '../react-redux/todo/asyncActions';

const useStyles = makeStyles((theme) => ({
    root: {

        marginTop: "20px"
    },
    textField: {
        marginBottom: "15px"
    },
    btn:{
        marginRight:10
    }
}));

const EditTask = (params) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        setChecked(params.task.complete);

    }, [params.task.id])
    const dispatch = useDispatch();
    const tasks = useSelector(state=>state);
    const handleSubmit = e=>{
        e.preventDefault();
        
        const data = {
            title:e.target.title.value,
            time:e.target.time.value,
            complete:e.target.complete.checked
        }
        console.log(data)
        dispatch(updateItem(data,params.task.id));

      }
    
    return (
        <>
            <div className={classes.root}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        label="Task Title"
                        id="standard-required"
                        fullWidth
                        placeholder="enter task"
                        className={classes.textField}
                        name="title"
                        defaultValue={params.task.title}
                    />
                    <Grid container spacing={2}>
                        <Grid item sm={8}>
                            <TextField
                                id="time"
                                label="Task Time"
                                type="time"
                                defaultValue={params.task.time}
                                fullWidth
                                className={classes.textField}
                                name="time"
                                
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={e=>setChecked(!checked)}
                                        name="complete"
                                        color="primary"
                                    />
                                }

                                label="Complete"
                            />
                        </Grid>
                    </Grid>


                    <Button className={classes.btn} type="submit" variant="contained" color="primary">
                        Update
                    </Button>
                    <Button className={classes.btn} onClick={e=>params.closeEdit()} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <span>{tasks.loading?"sending ....":null}</span>
                </form>
            </div>
        </>
    )
}

export default EditTask;