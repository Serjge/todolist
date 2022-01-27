import React, {useCallback} from 'react';
import {AddItemForm} from "../common/AddItemForm";
import {EditableSpan} from "../common/EditableSpan";

import {useDispatch} from "react-redux";
import {useAppSelector} from "../../store/store";
import {TodoListsType,} from "../../reducers/TodolistsReducer";
import {TaskType} from "../../reducers/TasksReducer";
import {Task} from "./Task/Task";
import {changeFilterTodolist, removeTodolist, renameTodoList} from "../../reducers/actions/todolistsActions";
import {addTask} from "../../reducers/actions/tasksActions";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {blue} from "@material-ui/core/colors";


type TodoListPropsType = {
    todolistId: string
}

export const Todolist = React.memo(({todolistId}: TodoListPropsType) => {
    console.log('render Todolist')

    let tasks = useAppSelector<TaskType[]>(state => state.tasks[todolistId])

    const {filter, title} = useAppSelector<TodoListsType>(state => state.todoList.filter(td => td.id === todolistId)[0])

    let dispatch = useDispatch()

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const addTaskHandler = useCallback((title: string) => dispatch(addTask(todolistId, title)), [todolistId, dispatch])

    const allClickHandler = useCallback(() => dispatch(changeFilterTodolist(todolistId, "all")), [todolistId, dispatch]);

    const activeClickHandler = useCallback(() => dispatch(changeFilterTodolist(todolistId, "active")), [todolistId, dispatch])

    const completedClickHandler = useCallback(() => dispatch(changeFilterTodolist(todolistId, "completed")), [todolistId, dispatch])

    const deleteTodoList = useCallback(() => {
        dispatch(removeTodolist(todolistId))
    }, [todolistId, dispatch])

    const renameTodoListHandler = useCallback(
        (title: string) => {
            dispatch(renameTodoList(todolistId, title))
        },
        [todolistId, dispatch])

    return <div>
        <h3 style={{display: 'flex', justifyContent: 'space-between'}}>
            <EditableSpan title={title} rename={renameTodoListHandler} label={'Name Todolist'}/>
            <IconButton onClick={deleteTodoList} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm label={'Name task'} addTask={addTaskHandler}/>
        <div>
            {
                tasks.map(t => {
                        return <Task
                            id={t.id}
                            todolistId={todolistId}
                            key={t.id}/>
                    }
                )
            }
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button style={{margin: '5px', backgroundColor: filter === 'all' ? blue[800] : ''}}
                    onClick={allClickHandler}
                    variant={filter === 'all' ? "contained" : 'outlined'}

                    size={"small"}
            >All
            </Button>
            <Button style={{margin: '5px', backgroundColor: filter === 'active' ? blue[800] : ''}}
                    onClick={activeClickHandler}

                    variant={filter === 'active' ? "contained" : 'outlined'}
                    size={"small"}
            >Active
            </Button>
            <Button style={{margin: '5px', backgroundColor: filter === 'completed' ? blue[800] : ''}}
                    onClick={completedClickHandler}
                    variant={filter === 'completed' ? "contained" : 'outlined'}
                    size={"small"}
            >Completed
            </Button>
        </div>
    </div>
})


