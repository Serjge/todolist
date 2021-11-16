import React from "react";
import {FilterValueType} from "../App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>,
    removeTask: (taskID: number) => void,
    changeFilter: (Filter: FilterValueType) => void
}

export function Todolist(props: PropsType) {

    const tasksJSX = props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={() => props.removeTask(t.id)}>X</button>
    </li>)

    const onClickAll = () => props.changeFilter("all")
    const onClickActive = () => props.changeFilter("active")
    const onClickCompleted = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={onClickAll}>All</button>
                <button onClick={onClickActive}>All</button>
                <button onClick={onClickCompleted}>All</button>
            </div>
        </div>
    )
}


