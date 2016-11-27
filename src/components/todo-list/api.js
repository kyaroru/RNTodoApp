import { todos } from '../../json/todos';

export const fetchTodos = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(todos);
  }, 500);
});
