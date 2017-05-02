// @flow
import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import NavigationHeader from '../common/NavigationHeader';
import TodoListItem from '../common/TodoListItem';
import Divider from '../common/Divider';
import * as ducks from './ducks';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import TextField from '../common/TextField';
import KeyboardSpacer from 'react-native-keyboard-spacer';

type Props = {
  initializeTodos: Function,
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
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onTextEndEditing = this.onTextEndEditing.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    this.props.initializeTodos();
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

  onTextEndEditing(model) {
    const { formData } = this.props;
    if (formData[model]) {
      this.props.addTodoItem(formData[model]);
      this.updateFormDataByName(model, '');
    }
  }

  onBlur(name) {
    this.updateFormDataByName(name, '');
  }

  onInputFocus(model) {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        const scrollResponder = this.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          ReactNative.findNodeHandle(model),
          65,
          true
        );
      }, 100);
    }
  }

  updateFormDataByName(name, value) {
    this.props.updateFormData('todoForm', name, value);
  }

  renderForm() {
    return (
      <View>
        <Field name="todoValue" component={TextField} placeholder="Enter new todo here" secureTextEntry={false} editable onTextEndEditing={this.onTextEndEditing} onBlur={this.onBlur} onInputFocus={this.onInputFocus} />
      </View>
    );
  }

  render() {
    const { isFetching, todos } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'rgb(9, 142, 206)'}
          barStyle="light-content"
        />
        <ActivityIndicator
          animating={!!isFetching}
          style={styles.centering}
          size="large"
        />
        <NavigationHeader title="RNTodoApp" rightIcon="delete-sweep" onRightIconPressed={() => this.onDeletePressed()} />
        <ScrollView ref="scrollView">
          <View style={styles.listContainer}>
            {!isEmpty(todos) && Object.keys(todos).map((key) =>
              <View key={key}>
                <TodoListItem title={todos[key].title} isChecked={todos[key].isChecked} onItemPressed={() => this.onItemPressed(todos[key])} shouldShowDeleteButton={this.state.shouldShowDeleteButton} onDeleteItemPressed={() => this.onDeleteItemPressed(todos[key])} />
                <Divider />
              </View>
            )}
            {this.renderForm()}
          </View>
          {Platform.OS === 'ios' && <KeyboardSpacer />}
        </ScrollView>
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
  initializeTodos: ducks.initializeTodos,
  addTodoItem: ducks.addTodoItem,
  toggleTodoItem: ducks.toggleTodoItem,
  deleteTodoItem: ducks.deleteTodoItem,
  updateFormData: change,
};

const TodoPage = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'todoForm',
})(TodoList));

export default TodoPage;
