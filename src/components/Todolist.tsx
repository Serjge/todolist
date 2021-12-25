import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    renameTask: (todolistId: string, idTask: string, title: string) => void
    renameTodoList: (todolistId: string, title: string) => void
}

export function Todolist({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             todolistId,
                             removeTodolist,
                             renameTask,
                             renameTodoList
                         }: PropsType) {

    const addTaskHandler = (title: string) => {
        addTask(todolistId, title);
    }
    const allClickHandler = () => changeFilter(todolistId, "all");
    const activeClickHandler = () => changeFilter(todolistId, "active");
    const completedClickHandler = () => changeFilter(todolistId, "completed");
    const deleteTodoList = () => removeTodolist(todolistId)
    const renameTodoListHandler = (title: string) => {
        renameTodoList(todolistId, title)
    }
    return <div>
        <h3>
            <EditableSpan title={title} rename={renameTodoListHandler}/>
            <button onClick={deleteTodoList}>x</button>
        </h3>
        <AddItemForm addTask={addTaskHandler}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
                    }
                    const renameTaskHandler = (title: string) => {
                        renameTask(todolistId, t.id, title)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan rename={renameTaskHandler} title={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={allClickHandler}>All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                    onClick={activeClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                    onClick={completedClickHandler}>Completed
            </button>
        </div>
    </div>
}

