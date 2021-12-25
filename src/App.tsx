import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === taskId ? {...m, isDone} : m)})

    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(m => m.id === todolistId ? {...m, filter: value} : m))
    }

    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(f => f.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodoList = (title: string) => {
        const newTodoList: TodoListsType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }
    const renameTask = (todolistId: string, idTask: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === idTask ? {...m, title} : m)})
    }
    const renameTodoList = (todolistId: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }
    return (
        <div className="App">
            <AddItemForm addTask={addTodoList}/>
            {todoLists.map(m => {

                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                }

                return <Todolist title={m.title}
                                 todolistId={m.id}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={m.filter}
                                 key={m.id}
                                 removeTodolist={removeTodolist}
                                 renameTask={renameTask}
                                 renameTodoList={renameTodoList}
                />
            })}
        </div>
    );
}

export default App;
