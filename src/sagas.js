import { all, fork, spawn } from 'redux-saga/effects';
import todo from './components/todo-list';
import codePushSaga from 'react-native-code-push-saga';

export default function* root() {
  yield all([
    fork(todo.saga),
    yield spawn(codePushSaga),
  ]);
}
