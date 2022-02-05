import { memo, ReactElement, useCallback } from 'react';

import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { FIRST_INDEX } from 'const';
import { changeFilterTodolist } from 'store/actions';
import { selectTodoListArray } from 'store/selectors';
import { FilterValuesType } from 'types';

type ButtonFilterPropsType = {
  todolistId: string;
  title: string;
  filterName: FilterValuesType;
};

export const ButtonFilter = memo(
  ({ todolistId, title, filterName }: ButtonFilterPropsType): ReactElement => {
    const { filter } = useSelector(selectTodoListArray).filter(
      ({ id }) => id === todolistId,
    )[FIRST_INDEX];

    const dispatch = useDispatch();
    const onClickHandler = useCallback(
      () => dispatch(changeFilterTodolist(todolistId, filterName)),
      [todolistId, dispatch],
    );
    return (
      <Button
        style={{ margin: '5px', backgroundColor: filter === filterName ? '#3f51b5' : '' }}
        onClick={onClickHandler}
        variant={filter === 'all' ? 'contained' : 'outlined'}
        size="small"
      >
        {title}
      </Button>
    );
  },
);
