import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/common/AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import {TodoListsType} from "./reducers/TodolistsReducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./store/store";
import { addTodoList } from './reducers/actions/todolistsActions';


export const App = React.memo(() => {

    const todoLists =  useAppSelector<TodoListsType[]>(state => state.todoList)
    let dispatch = useDispatch()

    console.log('App')

    const addTodoListHandler = useCallback((title: string) => {
        const newId = v1()
        dispatch(addTodoList(newId, title))
    }, [dispatch])

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container justifyContent={"center"} style={{padding: "20px"}}>
                    <AddItemForm label={'Name Todolist'} addTask={addTodoListHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {

                        return (
                            <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist todolistId={tl.id}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
})

