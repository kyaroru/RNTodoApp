// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string,
  rightIcon?: string,
  leftIcon?: string,
  onRightIconPressed?: Function,
  onLeftIconPressed?: Function,
};

export default class NavigationHeader extends Component {
  props: Props;

  render() {
    const { title, rightIcon, leftIcon, onRightIconPressed, onLeftIconPressed } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          {leftIcon && <TouchableOpacity style={styles.iconLeft} onPress={onLeftIconPressed}>
            <Icon name={leftIcon} size={25} color="#fff" />
          </TouchableOpacity>}
          <Text style={styles.title}>
            {title}
          </Text>
          {rightIcon && <TouchableOpacity style={styles.iconRight} onPress={onRightIconPressed}>
            <Icon name={rightIcon} size={25} color="#fff" />
          </TouchableOpacity>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 65 : 44,
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 21 : 0,
    backgroundColor: 'rgb(9, 142, 206)',
  },
  navBar: {
    height: 44,
    backgroundColor: 'rgb(9, 142, 206)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    top: 5,
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: 10,
    top: 5,
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
