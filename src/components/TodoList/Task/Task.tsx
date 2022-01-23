import React, {ChangeEvent, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TaskType} from "../../../reducers/TasksReducer";
import {Grid, IconButton} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../common/EditableSpan";
import {Delete} from "@mui/icons-material";
import {rootReducerType, useAppSelector} from "../../../store/store";
import {changeStatus, removeTask, renameTask} from "../../../reducers/actions/tasksActions";


type TaskPropsType = {
    id: string
    todolistId: string
}
export const Task = React.memo(({id, todolistId}: TaskPropsType) => {

    const {title, isDone} = useAppSelector<TaskType>(state => state.tasks[todolistId]
        .filter(t => t.id === id)[0])

    const dispatch = useDispatch()

    console.log('task ' + title)

    const deleteTask = useCallback(() => dispatch(removeTask(todolistId, id)),
        [todolistId, id, dispatch])

    const isDoneTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatus(todolistId, id, e.currentTarget.checked))
    }, [dispatch, todolistId, id])

    const renameTaskHandler = useCallback((title: string) => dispatch(renameTask(todolistId, id, title)), [todolistId, id, dispatch])

    return (
        <div style={{height: '60px'}} key={id} className={isDone ? "is-done" : ""}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
                <Grid item>
                    <Checkbox
                        inputProps={{'aria-label': 'controlled'}}
                        size={"small"}
                        onChange={isDoneTask}
                        checked={isDone}/>
                </Grid>
                <Grid item>
                    <EditableSpan rename={renameTaskHandler} title={title} label={'Name Task'}/>
                </Grid>
                <Grid item>
                    <IconButton onClick={deleteTask} aria-label="delete">
                        <Delete/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
})