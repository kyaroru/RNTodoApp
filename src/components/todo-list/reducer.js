import * as ducks from './ducks';
import { combineReducers } from 'redux';
import isEmpty from 'lodash/isEmpty';

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
