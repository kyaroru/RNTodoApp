// @flow
import React, { Component } from 'react';
import TodoList from './components/todo-list/TodoList';
import createStore from './createStore';
import createReducers from './ducks';
import { Provider } from 'react-redux';

export default class Main extends Component {
  render() {
    const store = createStore(createReducers());
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}
