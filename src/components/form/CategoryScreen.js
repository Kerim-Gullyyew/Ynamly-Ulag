import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
export default class CategoryScreen extends Component {
  state = {
    selectedcat: '',
    category: [
      {
        itemName: 'Samsung M20',
      },
      {
        itemName: 'Nokia',
      },
      {
        itemName: 'Apple',
      },
      {
        itemName: 'Samsung M23',
      },
      {
        itemName: 'Samsung M24',
      },
      {
        itemName: 'Samsung M25',
      },
    ],
  };

  async onValueChangeCat(value) {
    this.setState({selectedcat: value});
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={{flex: 0.3}}>
          <Text style={styles.textStyle}>Categories</Text>
        </View>
        <View style={{flex: 0.7, fontSize: 14}}>
          <Picker
            itemStyle={styles.itemStyle}
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={this.state.selectedcat}
            onValueChange={this.onValueChangeCat.bind(this)}>
            {this.state.category.map((item, index) => (
              <Picker.Item
                color="#0087F0"
                label={item.itemName}
                value={item.itemName}
                index={index}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '92%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemStyle: {
    fontSize: 10,
    fontFamily: 'Roboto-Regular',
    color: '#007aff',
  },
  pickerStyle: {
    width: '100%',
    height: 40,
    color: '#007aff',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
