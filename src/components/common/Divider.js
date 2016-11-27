import React from 'react';
import {
  View,
} from 'react-native';

const getHeight = (props) => {
  if (props.large) {
    return 10;
  }
  if (props.medium) {
    return 5;
  }
  return 1;
};

const Divider = (props) => (
  <View
    {...props}
    style={[{
      height: getHeight(props),
      backgroundColor: '#ddd',
    }]}
  />
);

Divider.propTypes = {
  large: React.PropTypes.bool,
};

export default Divider;
