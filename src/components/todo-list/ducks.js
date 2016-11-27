
export const NAME = 'TODOS';

export const FETCH_TODOS_REQUEST = `${NAME}/FETCH_TODOS_REQUEST`;
export const fetchTodosRequest = () => ({
  type: FETCH_TODOS_REQUEST,
});

export const FETCH_TODOS_SUCCESS = `${NAME}/FETCH_TODOS_SUCCESS`;
export const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  todos,
});

export const TOGGLE_TODO_ITEM = `${NAME}/TOGGLE_TODO_ITEM`;
export const toggleTodoItem = (todo) => ({
  type: TOGGLE_TODO_ITEM,
  todo,
});

export const UPDATE_TODO_ITEM = `${NAME}/UPDATE_TODO_ITEM`;
export const updateTodoItem = (todo) => ({
  type: UPDATE_TODO_ITEM,
  todo,
});

export const DELETE_TODO_ITEM = `${NAME}/DELETE_TODO_ITEM`;
export const deleteTodoItem = (todo) => ({
  type: DELETE_TODO_ITEM,
  todo,
});
