import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addTask: (title: string) => void

}
export const AddItemForm = ({addTask}: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string >('')

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            addTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}