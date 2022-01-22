import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Grid, IconButton} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import {Delete} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import { FilterValuesType} from "../reducers/TodolistsReducer";
import { TasksStateType} from "../reducers/TasksReducer";
import {addTask, changeStatusTask, removeTask, renameTask} from '../action/taskAction';
import { changeFilterTodolist, removeTodolist, renameTodoList } from '../action/todolistAction';

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    todolistId: string
}

export function Todolist({
                             title,
                             filter,
                             todolistId,
                         }: TodoListPropsType) {

    let tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    let tasksForTodolist = tasks[todolistId];

    if (filter === "active") {
        tasksForTodolist = tasks[todolistId].filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks[todolistId].filter(t => t.isDone);
    }

    const addTaskHandler = (title: string) => dispatch(addTask(todolistId, title))
    const allClickHandler = () => dispatch(changeFilterTodolist(todolistId, "all"));
    const activeClickHandler = () => dispatch(changeFilterTodolist(todolistId, "active"));
    const completedClickHandler = () => dispatch(changeFilterTodolist(todolistId, "completed"));

    const deleteTodoList = () => {
        dispatch(removeTodolist(todolistId))
    }

    const renameTodoListHandler = (title: string) => {
        dispatch(renameTodoList(todolistId, title))
    }

    return <div>
        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
            <EditableSpan title={title} rename={renameTodoListHandler}/>
            <IconButton onClick={deleteTodoList} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm label={'Name task'} addTask={addTaskHandler}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const deleteTask = () => dispatch(removeTask(todolistId, t.id))
                    const isDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeStatusTask(todolistId, t.id, e.currentTarget.checked))
                    }
                    const renameTaskHandler = (title: string) => dispatch(renameTask(todolistId, t.id, title))


                    return <div style={{height: '60px'}} key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
                            <Grid item><Checkbox
                                inputProps={{'aria-label': 'controlled'}}
                                size={"small"}
                                onChange={isDoneTask}
                                checked={t.isDone}/>
                            </Grid>
                            <Grid item>
                                <EditableSpan rename={renameTaskHandler} title={t.title}/>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={deleteTask} aria-label="delete">
                                    <Delete/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                })
            }
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button style={{margin: '5px'}} onClick={allClickHandler}
                    variant={filter === 'all' ? "contained" : 'outlined'}
                    size={"small"}
            >All
            </Button>
            <Button style={{margin: '5px'}} onClick={activeClickHandler}
                    variant={filter === 'active' ? "contained" : 'outlined'}
                    size={"small"}
            >Active
            </Button>
            <Button style={{margin: '5px'}} onClick={completedClickHandler}
                    variant={filter === 'completed' ? "contained" : 'outlined'}
                    size={"small"}
            >Completed
            </Button>
        </div>
    </div>
}



