import * as ducks from './ducks';
import { all, put, fork, select, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

function* initializeTodos() {
  try {
    const todos = yield AsyncStorage.getItem('todos');
    if (todos !== null) {
      const todosJSON = JSON.parse(todos);
      yield put(ducks.initializeTodosSuccess(todosJSON));
    } else {
      yield put(ducks.initializeTodosSuccess({}));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchInitializeTodos() {
  yield takeLatest(ducks.INITIALIZE_TODOS, initializeTodos);
}

function* updateTodos() {
  try {
    const todos = yield select(ducks.getTodos);
    const todosJSONString = JSON.stringify(todos);
    yield AsyncStorage.setItem('todos', todosJSONString);
    // console.log(`New todo list: ${todosJSONString}`);
  } catch (e) {
    console.log(e);
  }
}

function* watchAddTodoItem() {
  yield takeLatest(ducks.ADD_TODO_ITEM, updateTodos);
}

function* watchDeleteTodoItem() {
  yield takeLatest(ducks.DELETE_TODO_ITEM, updateTodos);
}

function* watchToggleTodoItem() {
  yield takeLatest(ducks.TOGGLE_TODO_ITEM, updateTodos);
}

export default function* todoSaga() {
  yield all([
    fork(watchAddTodoItem),
    fork(watchDeleteTodoItem),
    fork(watchToggleTodoItem),
    fork(watchInitializeTodos),
  ]);
}
