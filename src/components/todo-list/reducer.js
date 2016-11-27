import * as ducks from './ducks';
import { combineReducers } from 'redux';

const todoIsFetching = (state = false, action) => {
  switch (action.type) {
    case ducks.FETCH_TODOS_REQUEST:
      return true;
    case ducks.FETCH_TODOS_SUCCESS:
      return false;
    default:
      return state;
  }
};

const todoList = (state = [], action) => {
  switch (action.type) {
    case ducks.FETCH_TODOS_REQUEST:
      return [];
    case ducks.FETCH_TODOS_SUCCESS:
      return action.todos;
    case ducks.UPDATE_TODO_ITEM: {
      const index = state.findIndex((x) => x.id === action.todo.id);
      return state.map((item, i) => {
        if (i === index) {
          return action.todo;
        }
        return item;
      });
    }
    case ducks.DELETE_TODO_ITEM: {
      const index = state.findIndex((x) => x.id === action.todo.id);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ];
    }
    default:
      return state;
  }
};

export default combineReducers({
  todoList,
  todoIsFetching,
});
