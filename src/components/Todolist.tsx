import React from "react";
import {Header} from "../../../social_network/social_network/src/components/Header/Header";
import {Navbar} from "../../../social_network/social_network/src/components/Navbar/Navbar";
import {Footer} from "../../../social_network/social_network/src/components/Footer/Footer";


type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
}


export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

// export default Todolist

