import * as ducks from './ducks';
import { combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';

const todoIsFetching = (state = false, action) => {
  switch (action.type) {
    case ducks.INITIALIZE_TODOS:
      return true;
    case ducks.INITIALIZE_TODOS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const todoList = (state = {}, action) => {
  switch (action.type) {
    case ducks.INITIALIZE_TODOS_SUCCESS:
      return action.todos;
    case ducks.TOGGLE_TODO_ITEM: {
      return {
        ...state,
        [action.todo.id]: {
          ...state[action.todo.id],
          isChecked: !action.todo.isChecked,
        },
      };
    }
    case ducks.ADD_TODO_ITEM: {
      const lastId = isEmpty(state) ? 0 : Object.keys(state)[Object.keys(state).length - 1];
      const newId = isEmpty(state) ? 1 : state[lastId].id + 1;
      return {
        ...state,
        [newId]: {
          id: newId,
          title: action.text,
          isChecked: false,
        },
      };
    }
    case ducks.DELETE_TODO_ITEM: {
      const newTodoList = Object.assign({}, state);
      delete newTodoList[action.todo.id];
      return newTodoList;
    }
    default:
      return state;
  }
};

const deleteMode = (state = { isDeleteModeOn: false }, action) => {
  switch (action.type) {
    case ducks.TOGGLE_DELETE_MODE:
      return { isDeleteModeOn: !state.isDeleteModeOn };
    default:
      return state;
  }
};

export default combineReducers({
  deleteMode,
  todoList,
  todoIsFetching,
});
