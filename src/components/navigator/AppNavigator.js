import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import TodoList from '../todo-list/TodoList';

const routeConfiguration = {
  TodoList: { screen: TodoList },
};

const AppNavigator = createStackNavigator(routeConfiguration);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;