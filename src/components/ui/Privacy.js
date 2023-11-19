import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import { Colors } from '../../constants/Colors';
const Privacy = ({ isVisible, onPress, setShow, title }) => {
  return (
    <View>
      <Modal
        animationIn='pulse'
        animationInTiming={500}
        animationOut='pulse'
        animationOutTiming={300}
        isVisible={isVisible}
        backdropOpacity={0.7}
        onBackButtonPress={() => setShow(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', justifyContent: 'space-between', padding: 16, borderRadius: 20, width: 300, height: 400, maxWidth: '90%' }}>
            <Text style={{ color: Colors.colorDetailText, paddingHorizontal: 14, fontSize: 16, paddingTop: 14, fontWeight: '500', textAlign: 'justify', lineHeight: 24 }}>{title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, paddingHorizontal: 14 }}>
              <Pressable onPress={() => setShow(false)}><Text style={{ color: Colors.colorDetailText, fontSize: 16 }}>Yza</Text></Pressable>
              <Pressable onPress={onPress} style={{ backgroundColor: Colors.colorBacground, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4, elevation: 3 }}><Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Dowam etmek</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
export default Privacy