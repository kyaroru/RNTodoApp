import { fork } from 'redux-saga/effects';
import todo from './components/todo-list';

export default function* root() {
  yield [
    fork(todo.saga),
  ];
}
