import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles";
import { DataUsageOutlined } from '@material-ui/icons';


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
    const handleSubmit = e=>{
        e.preventDefault();
        const task = e.target.task.value;
        const time = e.target.time.value;
        const complete = e.target.complete.checked;
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
                        name="task"
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
                    <Button type="submit" onClick={e=>params.closeEdit()} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </form>
            </div>
        </>
    )
}

export default EditTask;