import TextField from "@material-ui/core/TextField";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

type AddItemFormPropsType = {
    addTask: (title: string) => void
    label: string
}

export const AddItemForm = React.memo(({addTask, label}: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)
    console.log(`AddItemForm ${label}`)
    const addTaskHandler = () => {
        if (title.trim() !== "") {
            addTask(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(false);
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }
    return (
        <div>
            <TextField
                       label={error ? "Title is required" : label}
                       error={error}
                       variant="outlined"
                       value={title}
                       size="small"
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />
            <Button style={{
                marginLeft: '10px', maxWidth: '40px',
                maxHeight: '40px', minWidth: '40px', minHeight: '40px',
                backgroundColor: blue[800]
            }}
                    variant="contained" onClick={addTaskHandler} disabled={error}>+</Button>
        </div>
    )
})