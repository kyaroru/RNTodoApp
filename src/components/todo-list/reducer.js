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

const toDoById = (state = [], action) => {
  switch (action.type) {
    case ducks.FETCH_TODOS_SUCCESS:
      return action.todos.map(todo => todo.id);
    case ducks.DELETE_TODO_ITEM:
      return state.filter(id => id !== action.todo.id);
    default:
      return state;
  }
};

const reduce = (array, reduceFunc, initValue) => {
  let nextValue = initValue;
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    nextValue = reduceFunc(nextValue, item, i);
  }
  return nextValue;
};

const todoList = (state = {}, action) => {
  switch (action.type) {
    case ducks.FETCH_TODOS_REQUEST:
      return {};
    case ducks.FETCH_TODOS_SUCCESS:
      return reduce(action.todos, (obj, todo) => {
        obj[todo.id] = todo;
        return obj;
      }, {});
    case ducks.UPDATE_TODO_ITEM: {
      return Object.assign(state, {
        [action.todo.id]: action.todo,
      });
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

// const todoList = (state = [], action) => {
//   switch (action.type) {
//     case ducks.FETCH_TODOS_REQUEST:
//       return [];
//     case ducks.FETCH_TODOS_SUCCESS:
//       return action.todos;
//     case ducks.UPDATE_TODO_ITEM: {
//       const index = state.findIndex((x) => x.id === action.todo.id);
//       return state.map((item, i) => {
//         if (i === index) {
//           return action.todo;
//         }
//         return item;
//       });
//     }
//     case ducks.DELETE_TODO_ITEM: {
//       const index = state.findIndex((x) => x.id === action.todo.id);
//       return [
//         ...state.slice(0, index),
//         ...state.slice(index + 1),
//       ];
//     }
//     default:
//       return state;
//   }
// };

export default combineReducers({
  todoList,
  todoIsFetching,
});
