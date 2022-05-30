import { memo, ReactElement, useCallback } from 'react';

import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { rootReducerType } from 'store';
import { changeFilterTodolist } from 'store/reducers';
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

    const onButtonClick = useCallback(
      () => dispatch(changeFilterTodolist({ todolistId, filter: filterName })),
      [todolistId],
    );

    return (
      <Button
        style={{ margin: '5px' }}
        onClick={onButtonClick}
        variant={filter === filterName ? 'contained' : 'outlined'}
        size="small"
      >
        {title}
      </Button>
    );
  },
);
