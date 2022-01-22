import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import { TodoListsType} from "./reducers/TodolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";
import {addTodoList} from "./action/todolistAction";

function App() {

    let todoLists = useSelector<rootReducerType, TodoListsType[]>(state => state.todoList)
    let dispatch = useDispatch()

    const addTodoListHandler = (title: string) => {
           dispatch(addTodoList(title))
    }

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container justifyContent={"center"} style={{padding: "20px"}}>
                    <AddItemForm label={'Name Todolist'} addTask={addTodoListHandler}/>
                </Grid>
                <Grid container spacing={3}>

                    {todoLists.map(m => {

                        return (
                            <Grid key={m.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist title={m.title}
                                              todolistId={m.id}
                                              filter={m.filter}
                                              key={m.id}
                                    />

                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

            </Container>
        </div>
    );
}

export default App;
