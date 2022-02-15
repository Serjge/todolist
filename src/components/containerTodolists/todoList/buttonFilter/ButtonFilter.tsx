import { memo, ReactElement, useCallback } from 'react';

import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { rootReducerType } from 'store';
import { changeFilterTodolist } from 'store/actions';
import { selectTodoListFilter } from 'store/selectors';
import { FilterValuesType } from 'types';

type ButtonFilterPropsType = {
  todolistId: string;
  title: string;
  filterName: FilterValuesType;
};

export const ButtonFilter = memo(
  ({ todolistId, title, filterName }: ButtonFilterPropsType): ReactElement => {
    const dispatch = useDispatch();

    const filter = useSelector((state: rootReducerType) =>
      selectTodoListFilter(state, todolistId),
    );

    const handleOnClick = useCallback(
      () => dispatch(changeFilterTodolist(todolistId, filterName)),
      [todolistId, dispatch],
    );

    return (
      <Button
        style={{ margin: '5px' }}
        onClick={handleOnClick}
        variant={filter === filterName ? 'contained' : 'outlined'}
        size="small"
      >
        {title}
      </Button>
    );
  },
);
