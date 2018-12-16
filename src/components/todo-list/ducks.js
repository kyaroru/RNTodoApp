
export const NAME = 'TODOS';

export const INITIALIZE_TODOS = `${NAME}/INITIALIZE_TODOS`;
export const initializeTodos = () => ({
  type: INITIALIZE_TODOS,
});

export const INITIALIZE_TODOS_SUCCESS = `${NAME}/INITIALIZE_TODOS_SUCCESS`;
export const initializeTodosSuccess = (todos) => ({
  type: INITIALIZE_TODOS_SUCCESS,
  todos,
});

export const TOGGLE_DELETE_MODE = 'TOGGLE_DELETE_MODE';
export const toggleDeleteMode = () => ({
  type: TOGGLE_DELETE_MODE,
});

export const TOGGLE_TODO_ITEM = `${NAME}/TOGGLE_TODO_ITEM`;
export const toggleTodoItem = (todo) => ({
  type: TOGGLE_TODO_ITEM,
  todo,
});

export const ADD_TODO_ITEM = `${NAME}/ADD_TODO_ITEM`;
export const addTodoItem = (text) => ({
  type: ADD_TODO_ITEM,
  text,
});

export const DELETE_TODO_ITEM = `${NAME}/DELETE_TODO_ITEM`;
export const deleteTodoItem = (todo) => ({
  type: DELETE_TODO_ITEM,
  todo,
});

export const getTodos = (state) => state[NAME].todoList;
