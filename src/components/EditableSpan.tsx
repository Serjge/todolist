import React, {useState} from "react";

type EditableSpanPropsType = {
    title: string
    rename: (title: string) => void
}
export const EditableSpan = ({title, rename}: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(true)
    const [newTitle, setNewTitle] = useState()
    const activeViewMode = () => {
        setEdit(true)
        rename(newTitle)
    }
    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

    }
    const onClickSpan = () => {
        setEdit(false)
        setNewTitle(title)
    }
    return (
        edit
            ? <span onDoubleClick={onClickSpan}>{title}</span>
            : <input value={newTitle} onChange={onChangeNameHandler} autoFocus onBlur={activeViewMode}/>
    )
}