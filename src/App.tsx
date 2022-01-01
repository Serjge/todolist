import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar";
import {addTodolistTasksAC} from "./reducers/TasksReducer";
import {addTodoListAC, TodoListsType} from "./reducers/TodolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";

function App() {

    let todoLists = useSelector<rootReducerType, TodoListsType[]>(state => state.todoList)
    let dispatch = useDispatch()

    const addTodoList = (title: string) => {
        const newId = v1()
        dispatch(addTodoListAC(newId, title))
        dispatch(addTodolistTasksAC(newId))
    }

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container justifyContent={"center"} style={{padding: "20px"}}>
                    <AddItemForm label={'Name Todolist'} addTask={addTodoList}/>
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
