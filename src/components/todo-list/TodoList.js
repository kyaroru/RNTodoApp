// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import NavigationHeader from '../common/NavigationHeader';
import TodoListItem from '../common/TodoListItem';
import Divider from '../common/Divider';
import * as ducks from './ducks';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import TextField from '../common/TextField';

type Props = {
  fetchTodosRequest: Function,
  todos: Object,
  isFetching: bool,
  toggleTodoItem: Function,
  deleteTodoItem: Function,
  addTodoItem: Function,
  updateFormData: Function,
  formData: Object,
};

const selector = formValueSelector('todoForm');

class TodoList extends Component {
  props : Props;

  constructor(props) {
    super(props);
    this.state = {
      shouldShowDeleteButton: false,
    };
  }

  componentDidMount() {
    this.props.fetchTodosRequest();
  }

  onItemPressed(item) {
    this.props.toggleTodoItem(item);
  }

  onDeletePressed() {
    this.setState({ shouldShowDeleteButton: !this.state.shouldShowDeleteButton });
  }

  onDeleteItemPressed(item) {
    this.props.deleteTodoItem(item);
  }

  onTextEndEditing() {
    const { formData } = this.props;
    if (formData.todoValue) {
      this.props.addTodoItem(formData.todoValue);
      this.updateFormDataByName('todoValue', '');
    }
  }

  updateFormDataByName(name, value) {
    this.props.updateFormData('todoForm', name, value);
  }

  renderForm() {
    return (
      <View>
        <Field name="todoValue" component={TextField} placeholder="Enter new todo here" secureTextEntry={false} editable onEndEditing={(event) => this.onTextEndEditing(event)} onInputBlur={(name) => this.updateFormDataByName(name, '')} />
      </View>
    );
  }

  render() {
    const { isFetching, todos } = this.props;

    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={!!isFetching}
          style={styles.centering}
          size="large"
        />
        <NavigationHeader title="TodoApp" rightIcon="delete-sweep" onRightIconPressed={() => this.onDeletePressed()} />
        <View style={styles.listContainer}>
          {!isEmpty(todos) && Object.keys(todos).map((key) =>
            <View key={key}>
              <TodoListItem title={todos[key].title} isChecked={todos[key].isChecked} onItemPressed={() => this.onItemPressed(todos[key])} shouldShowDeleteButton={this.state.shouldShowDeleteButton} onDeleteItemPressed={() => this.onDeleteItemPressed(todos[key])} />
              <Divider />
            </View>
          )}
          {this.renderForm()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listContainer: {
    flex: 1,
  },
  centering: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  emptyItem: {
    padding: 10,
  },
});

const mapStateToProps = (store) => ({
  isFetching: store[ducks.NAME].todoIsFetching,
  todos: store[ducks.NAME].todoList,
  formData: selector(store, 'todoValue', 'anotherInput'),
});

const mapDispatchToProps = {
  fetchTodosRequest: ducks.fetchTodosRequest,
  addTodoItem: ducks.addTodoItem,
  toggleTodoItem: ducks.toggleTodoItem,
  deleteTodoItem: ducks.deleteTodoItem,
  updateFormData: change,
};

const TodoPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'todoForm',
})(TodoList));

export default TodoPage;
