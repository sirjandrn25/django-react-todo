import React, { useState, useEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, deleteItem } from "../react-redux/todo/asyncActions";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "20px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const ItemList = (params) => {

  const classes = useStyles();
  const [items, setItem] = useState([])
  const tasks = useSelector(state => state);
  const dispatch = useDispatch();
  const [complete,setComplete] = useState('');

  useEffect(() => {
    ((tasks.items.length === 0) && dispatch(fetchItems()));
    
    setItem(tasks.items)
    console.log(tasks);

  }, [dispatch, tasks.items]);
  

  const convertLocalTimeString = time => {
    const time_list = time.split(':');
    const localTime = parseInt(time_list[0]) >= 12 ? time + ' PM' : time + 'AM';
    return localTime;

  }

  const get_itemList = (item, index) => {

    return (
      <ListItem key={index} button>
        <ListItemText primary={item.complete ? <del>{item.title}</del> : item.title} secondary={`Time : ${convertLocalTimeString(item.time)} and Date ${item.created_date}`} />
        <ListItemSecondaryAction>
          <IconButton onClick={e => dispatch(deleteItem(item.id))}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={e => params.handleEdit(item)}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  const getItemList = () => {
    return (
      <List className={classes.root}>
        {items.map((item, index) => {
          return get_itemList(item, index)
        })}
      </List>
    )
  }
  const handleComplete = (event) => {
    const value = event.target.value;
    dispatch(fetchItems({complete:value}));
  };
  const handlePaging= e=>{
    const value = e.target.textContent;
    
    dispatch(fetchItems({page:value}))
  }

  
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={5}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label" >Complete</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={complete}
              onChange={handleComplete}
              fullWidth
            >
              <MenuItem value={null}>All</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
              
            </Select>
          </FormControl>
        </Grid>
        
      </Grid>
      {tasks.loading && tasks.items.length === 0 ? "loading......" : getItemList()}
      <Pagination count={Math.ceil(tasks.item_detail.count/4)} onClick={handlePaging} />

    </>
  );
};
export default ItemList;
