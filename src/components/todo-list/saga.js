import { takeLatest } from 'redux-saga';
import * as ducks from './ducks';
import * as api from './api';
import { put, fork, call } from 'redux-saga/effects';

function* fetchTodos() {
  const result = yield call(api.fetchTodos);
  yield put(ducks.fetchTodosSuccess(result));
}

function* watchTodosFetch() {
  yield* takeLatest(ducks.FETCH_TODOS_REQUEST, fetchTodos);
}

function* toggleTodo({ todo }) {
  const newTodo = Object.assign(todo, {
    isChecked: !todo.isChecked,
  });
  yield put(ducks.updateTodoItem(newTodo));
}

function* watchToggleTodo() {
  yield* takeLatest(ducks.TOGGLE_TODO_ITEM, toggleTodo);
}

// function* deleteTodoItem({ todo }) {
//   const newTodo = Object.assign(todo, {
//     isChecked: !todo.isChecked,
//   });
//   yield put(ducks.deleteTo(newTodo));
// }
//
// function* watchDeleteTodo() {
//   yield* takeLatest(ducks.DELETE_TODO_ITEM, deleteTodoItem);
// }

export default function* todoSaga() {
  yield [
    fork(watchTodosFetch),
    fork(watchToggleTodo),
    // fork(watchDeleteTodo),
  ];
}
