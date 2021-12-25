import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

export function App() {

    const titleTask = "What to learn"

    let tasks1 = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(tasks1)
    const [filter, setFilter] = useState<FilterValueType>("all")

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    function addTask(title:string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    let removeTask = (taskID: string) => {
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
                title={titleTask}
                tasks={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            addTask={addTask}/>
        </div>
    );
}


