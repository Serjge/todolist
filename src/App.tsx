import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

function App() {

    const tasks1 = [
        { id: 1, title: 'HTML&CSS', isDone: true},
        { id: 2, title: 'JS', isDone: true},
        { id: 3, title: 'React', isDone: false}
    ]

    const tasks2 = [
        { id: 1, title: 'Hello World!', isDone: false},
        { id: 2, title: 'I am happy', isDone: true},
        { id: 3, title: 'Yo', isDone: false}
    ]

    const tasks3 = [
        { id: 1, title: 'Hello World!', isDone: true},
        { id: 2, title: 'I am happy', isDone: false},
        { id: 3, title: 'Yo', isDone: true}
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks1}/>
            <Todolist title="Songs" tasks={tasks2}/>
            <Todolist title="Books" tasks={tasks3}/>
        </div>
    );
}

export default App;
