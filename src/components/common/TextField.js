import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from './Divider';

type Props = {
  input: Object,
  name: String,
  meta: Object,
  onInputBlur: Function,
}

class TextField extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.blurInput = this.blurInput.bind(this);
  }

  blurInput(name) {
    if (this.refs[name]) {
      this.props.onInputBlur(name);
      this.refs[name].blur();
    }
  }

  focusInput(name) {
    if (this.refs[name]) {
      this.refs[name].focus();
    }
  }

  render() {
    const { input: { onChange, value }, name } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.row} onPress={() => this.focusInput(name)}>
          <Icon name="check-box-outline-blank" size={25} color="rgb(9, 142, 206)" />
          <TextInput
            ref={name}
            style={styles.input}
            value={value}
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            onChangeText={(text) => onChange(text)}
            underlineColorAndroid="transparent"
            placeholderTextColor="#aaa"
            {...this.props}
          />
          {this.state.isFocused && <TouchableOpacity style={styles.cancelIcon} onPress={() => this.blurInput(name)}>
            <Icon name="cancel" size={25} color="#777" />
          </TouchableOpacity>}
        </TouchableOpacity>

        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 12,
    color: '#333',
  },
  cancelIcon: {
    position: 'absolute',
    right: 10,
    top: 5,
    bottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TextField;
