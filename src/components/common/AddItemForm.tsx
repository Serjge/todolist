import { ChangeEvent, KeyboardEvent, memo, useState } from 'react';

import { Button, TextField } from '@material-ui/core';

type AddItemFormPropsType = {
  addTask: (title: string) => void;
  label: string;
};

export const AddItemForm = memo(({ addTask, label }: AddItemFormPropsType) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const addTaskHandler = (): void => {
    if (title.trim() !== '') {
      addTask(title.trim());
      setTitle('');
    } else {
      setError(true);
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error) {
      setError(false);
      if (e.key === 'Enter') {
        addTaskHandler();
      }
    }
  };
  return (
    <div>
      <TextField
        label={error ? 'Title is required' : label}
        error={error}
        variant="outlined"
        value={title}
        size="small"
        onChange={onChangeTitleHandler}
        onKeyPress={onKeyPressHandler}
      />
      <Button
        style={{
          marginLeft: '10px',
          maxWidth: '40px',
          maxHeight: '40px',
          minWidth: '40px',
          minHeight: '40px',
          backgroundColor: '#3f51b5',
        }}
        variant="contained"
        onClick={addTaskHandler}
        disabled={error}
      >
        +
      </Button>
    </div>
  );
});
