import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const FormErrorMessage = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    // marginVertical: 4,
    fontWeight: '600',
  }
});
