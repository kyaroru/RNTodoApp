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

export default function* todoSaga() {
  yield [
    fork(watchTodosFetch),
  ];
}
