import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "../App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>,
    removeTask: (taskID: string) => void,
    changeFilter: (Filter: FilterValueType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')


    const tasksJSX = props.tasks.map(t => {

        const onClickHandler = () => props.removeTask(t.id)

        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>X</button>
        </li>
    })

    const onClickAll = () => props.changeFilter("all")
    const onClickActive = () => props.changeFilter("active")
    const onClickCompleted = () => props.changeFilter("completed")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={onClickAll}>All</button>
                <button onClick={onClickActive}>Active</button>
                <button onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    )
}


