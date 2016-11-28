// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string,
  isChecked: boolean,
  onItemPressed: Function,
  onDeleteItemPressed: Function,
  shouldShowDeleteButton: boolean,
};

export default class TodoListItem extends Component {
  props: Props;

  render() {
    const { title, isChecked, onItemPressed, shouldShowDeleteButton, onDeleteItemPressed } = this.props;
    return (
      <TouchableOpacity style={styles.row} onPress={onItemPressed}>
        <Icon name={isChecked ? 'check-box' : 'check-box-outline-blank'} size={25} color="rgb(9, 142, 206)" />
        <Text style={[styles.title, { textDecorationLine: isChecked ? 'line-through' : 'none' }]}>{title}</Text>
        {shouldShowDeleteButton && <TouchableOpacity style={styles.deleteIcon} onPress={onDeleteItemPressed}>
          <Icon name="delete" size={25} color="#777" />
        </TouchableOpacity>}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingLeft: 10,
  },
  deleteIcon: {
    position: 'absolute',
    right: 10,
    top: 5,
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
