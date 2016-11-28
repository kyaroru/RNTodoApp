// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ListView,
} from 'react-native';
import NavigationHeader from '../common/NavigationHeader';
import TodoListItem from '../common/TodoListItem';
import Divider from '../common/Divider';
import * as ducks from './ducks';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

type Props = {
  fetchTodosRequest: Function,
  todos: Object,
  isFetching: Boolean,
  toggleTodoItem: Function,
  deleteTodoItem: Function,
};

class TodoList extends Component {
  props : Props;

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      shouldShowDeleteButton: false,
      dataSource: ds,
    };
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.props.fetchTodosRequest();
  }

  onItemPressed(item) {
    this.props.toggleTodoItem(item);
  }

  onAddItemPressed() {
    console.log('add item');
  }

  onDeletePressed() {
    this.setState({ shouldShowDeleteButton: !this.state.shouldShowDeleteButton });
  }

  onDeleteItemPressed(item) {
    this.props.deleteTodoItem(item);
  }

  genRow() {
    return this.props.todos || {};
  }

  renderRow(item) {
    return (
      <TodoListItem title={item.title} isChecked={item.isChecked} onItemPressed={() => this.onItemPressed(item)} />
    );
  }

  renderSeparator(sectionID: number, rowID: number) {
    return (
      <Divider key={`${sectionID}-${rowID}`} />
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
        <NavigationHeader title="TodoApp" leftIcon="add" onLeftIconPressed={() => this.onAddItemPressed()} rightIcon="delete-sweep" onRightIconPressed={() => this.onDeletePressed()} />
        <View style={styles.listContainer}>
          {<ListView
            enableEmptySections
            dataSource={this.state.dataSource.cloneWithRows(this.genRow())}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
          />}
          {/* !isEmpty(todos) && Object.keys(todos).map((key) =>
            <View key={key}>
              <TodoListItem title={todos[key].title} isChecked={todos[key].isChecked} onItemPressed={() => this.onItemPressed(todos[key])} shouldShowDeleteButton={this.state.shouldShowDeleteButton} onDeleteItemPressed={() => this.onDeleteItemPressed(todos[key])} />
              <Divider />
            </View>
          ) */}
          {isEmpty(this.props.todos) && <View style={styles.emptyItem}>
            <Text>Press the icon on the left to add your first todo now :p</Text>
          </View>}
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
});

const mapDispatchToProps = {
  fetchTodosRequest: ducks.fetchTodosRequest,
  toggleTodoItem: ducks.toggleTodoItem,
  deleteTodoItem: ducks.deleteTodoItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
