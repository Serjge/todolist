import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";

export type FilterValueType = "all" | "active" | "completed"

export function App() {

    const title = "What to learn"

    let tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(tasks1)
    const [filter, setFilter] = useState<FilterValueType>("all")

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    let removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    let taskForRender = tasks

    if (filter === "active") {
        taskForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        taskForRender = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );
}


