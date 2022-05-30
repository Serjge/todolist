import { KeyboardEvent, memo, useCallback, useRef, useState } from 'react';

import { Button, TextField } from '@mui/material';

type AddItemFormPropsType = {
  addTask: (title: string) => void;
  label: string;
};

export const AddItemForm = memo(({ addTask, label }: AddItemFormPropsType) => {
  const refTitle = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);

  const addTaskHandler = useCallback((): void => {
    const { value } = refTitle.current!;

    if (value.trim() !== '') {
      addTask(value.trim());
      refTitle.current!.value = '';
    } else {
      setError(true);
    }
  }, [error]);

  const addTitleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (error) {
      setError(false);
    }
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };

  return (
    <div>
      <TextField
        inputRef={refTitle}
        onKeyPress={addTitleOnKeyPress}
        label={error ? 'Title is required' : label}
        error={error}
        variant="outlined"
        size="small"
      />
      <Button
        style={{
          marginLeft: '10px',
          maxWidth: '40px',
          maxHeight: '40px',
          minWidth: '40px',
          minHeight: '40px',
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
