import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

const MyImageButton = (props) => {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.btnColor }]}
      onPress={props.customClick}>

      <Icon style={styles.icon}
        name={props.btnIcon} size={30} color='white' />

      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    color: '#ffffff',
    width: '30%',
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
    marginLeft: '33.33%',
    marginRight: 35,
    borderRadius: 5,
  },
  text: {
    color: '#ffffff',
  },
  icon: {
    paddingBottom: 5,
  }
});

export default MyImageButton;