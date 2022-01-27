import React, {useState} from "react";
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    title: string
    rename: (title: string) => void
    label: string
}

export const EditableSpan = React.memo( ({title, rename, label}: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(true)
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    console.log('EditableSpan ' + title)

    const activeViewMode = () => {
        if (newTitle.trim()!=='') {
            setEdit(true)
            rename(newTitle)

        }else {
            setError(true)
        }

    }
    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(error) {
            setError(false)
        }
        setNewTitle(e.currentTarget.value)

    }
    const onClickSpan = () => {
        setEdit(false)
        setNewTitle(title)
    }
    const onKeyPress= (e: React.KeyboardEvent<HTMLDivElement>)=> {
        if (e.key === 'Enter') {
            activeViewMode();
        }
    }

    return (
        edit
            ? <p style={{whiteSpace:'pre-wrap', maxWidth: '200px' }} onDoubleClick={onClickSpan}>{title}</p>
            : <TextField id="outlined-basic"
                         label={error ? "Title is required" : label}
                         error={error}
                         variant="outlined"
                         value={newTitle}
                         size="small"
                         onChange={onChangeNameHandler}
                         onBlur={activeViewMode}
                         autoFocus
                         onKeyPress={onKeyPress}
                         style={{ width: '170px' }}
            />

    )
})