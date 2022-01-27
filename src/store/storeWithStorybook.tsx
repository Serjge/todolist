import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../reducers/TasksReducer";
import {TodoListsReducer} from "../reducers/TodolistsReducer";
import {rootReducerType} from "./store";
import {Provider} from "react-redux";

let rootReducer = combineReducers({
    tasks: TasksReducer,
    todoList: TodoListsReducer
})
const initialStateGlobal = {
    tasks: {
        ['todolistID1']: [
            {id: '01', title: "HTML&CSS", isDone: true},
            {id: '02', title: "JS", isDone: true},
            {id: '03', title: "ReactJS", isDone: false},
            {id: '04', title: "Rest API", isDone: false},
            {id: '05', title: "GraphQL", isDone: false},
        ],
        ['todolistID2']: [
            {id: '01', title: "HTML&CSS2", isDone: true},
            {id: '02', title: "JS2", isDone: true},
            {id: '03', title: "ReactJS2", isDone: false},
            {id: '04', title: "Rest API2", isDone: false},
            {id: '05', title: "GraphQL2", isDone: false},
        ]
    },
    todoList: [
        {id: 'todolistID1', title: 'What to learn', filter: 'all'},
        {id: 'todolistID2', title: 'What to buy', filter: 'all'},
    ]
}

export let storyBookStore = createStore(rootReducer, initialStateGlobal as rootReducerType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
   return  <Provider store={storyBookStore}>{storyFn()} </Provider>
}
