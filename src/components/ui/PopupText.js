import { View, Text } from 'react-native'
import React from 'react'

const PopupText = ({ title }) => {
  return (
    <Modal
      animationIn='pulse'
      animationInTiming={500}
      animationOut='pulse'
      animationOutTiming={300}
      isVisible={visible}
      backdropOpacity={0.7}
      onBackButtonPress={() => setVisible(false)}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={{ color: 'black' }}>
          {title}
        </Text>
      </View>


    </Modal>
  )
}

export default PopupText