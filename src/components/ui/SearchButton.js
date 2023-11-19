import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
const SearchButton = ({ title, disabled, onPress }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: 'white' }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'white' : Colors.colorSelectionButton,
        },
        styles.search,
      ]}>
      <Text style={styles.searchButton}>{title}</Text>
    </Pressable>
  );
};
export default SearchButton;
const styles = StyleSheet.create({
  searchButton: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
  search: {
    width: 300,
    maxWidth: '90%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
