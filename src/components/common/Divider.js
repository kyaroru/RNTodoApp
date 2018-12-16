import React from 'react';
import PropTypes from 'prop-types';
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
  large: PropTypes.bool,
};

export default Divider;
