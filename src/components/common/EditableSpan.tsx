import { ChangeEvent, memo, useState, KeyboardEvent } from 'react';

import { TextField } from '@mui/material';

type EditableSpanPropsType = {
  title: string;
  rename: (title: string) => void;
  label: string;
};

export const EditableSpan = memo(({ title, rename, label }: EditableSpanPropsType) => {
  const [edit, setEdit] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const activeViewMode = (): void => {
    if (newTitle.trim() !== '') {
      setEdit(true);
      rename(newTitle);
    } else {
      setError(true);
    }
  };

  const onTitleSaveChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (error) {
      setError(false);
    }
    setNewTitle(e.currentTarget.value);
  };

  const onRenameTitleClick = (): void => {
    setEdit(false);
    setNewTitle(title);
  };

  const onKeyPress = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      activeViewMode();
    }
  };

  if (edit) {
    return (
      <p
        style={{ whiteSpace: 'pre-wrap', maxWidth: '200px' }}
        onDoubleClick={onRenameTitleClick}
      >
        {title}
      </p>
    );
  }

  return (
    <TextField
      id="outlined-basic"
      label={error ? 'Title is required' : label}
      error={error}
      variant="outlined"
      value={newTitle}
      size="small"
      onChange={onTitleSaveChange}
      onBlur={activeViewMode}
      autoFocus
      onKeyPress={onKeyPress}
      style={{ width: '170px' }}
    />
  );
});
