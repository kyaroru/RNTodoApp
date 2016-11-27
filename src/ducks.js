import { combineReducers } from 'redux';
import todo from './components/todo-list';
import { reducer as formReducer } from 'redux-form';

const createReducers = (reducers = {}) => combineReducers({
  [todo.ducks.NAME]: todo.reducer,
  form: formReducer,
  ...reducers,
});

export default createReducers;
