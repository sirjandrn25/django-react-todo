import React, { useState,useEffect } from "react";
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
import { useSelector,useDispatch } from "react-redux";
import { fetchItems } from "../react-redux/todo/asyncActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "20px"
  }
}));
const ItemList = (params) => {

  const classes = useStyles();
  const [items, setItem] = useState([])
  const tasks = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchItems());
    setItem(tasks.items);
    
    console.log("useEffect");
  
  },[dispatch]);
  
  const convertLocalTimeString = time=>{
    const time_list = time.split(':');
    const localTime = parseInt(time_list[0])>=12?time+' PM':time+'AM';
    return localTime;
  }

  const get_itemList = (item, index) => {
  
    return (
      <ListItem key={index} button>
        <ListItemText primary={item.complete?<del>{item.title}</del>:item.title} secondary={convertLocalTimeString(item.time)} />
        <ListItemSecondaryAction>
          <IconButton onClick={e=>params.handleDelete(item.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick = {e=>params.handleEdit(item)}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  const handleDelete = item_id=>{
    
  }
  return (
    <>
        
          <List className={classes.root}>
            {items.map((item, index) => {
              return get_itemList(item, index)
            })}
          </List>
       
    </>
  );
};
export default ItemList;
