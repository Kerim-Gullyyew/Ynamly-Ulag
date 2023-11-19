import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from '../../constants/Colors';

const DropdownForm = ({
  onOptionHandler,
  data,
  value,
  placeholder,
  labelField,
  valueField,
  width,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  return (
    // <View style={styles.container}>
    //   {renderLabel()}
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }, width ? { width: width } : { width: 350 }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      itemTextStyle={styles.itemTextStyle}
      containerStyle={styles.containerStyle}
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={!isFocus ? placeholder : '...'}
      searchPlaceholder="Gözle..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        onOptionHandler(item);
        setIsFocus(false);
      }}
    />
    // </View>
  );
};

export default DropdownForm;

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: 'white',
  //   padding: 16,
  //   width: 300,
  // },
  dropdown: {
    maxWidth: '95%',
    height: 50,
    backgroundColor: 'white',
    borderColor: Colors.colorBorder,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  containerStyle: {
    backgroundColor: 'white'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 15,
    color: Colors.colorBorder,
    fontWeight: 300,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.colorGeneralText,
    fontWeight: 400,
  },
  itemTextStyle: {
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
  },
});
