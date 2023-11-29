import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors';
import { PermissionsAndroid } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
const ModalForImage = ({ modal, setModal, setSelectedImage, image, setImage }) => {
  const requestCameraPermission = async () => {
    setModal(false)
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 512,
          maxWidth: 512,
        };
        launchCamera(options, response => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);

            const RNFS = require('react-native-fs');
            RNFS.readFile(imageUri, 'base64').then(data => {
              setImage(data);
            });
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestImagePermission = async () => {
    setModal(false);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error: ', response.error);
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
            const RNFS = require('react-native-fs');
            RNFS.readFile(imageUri, 'base64').then(data => {
              setImage(data);
            });
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        setModal(!modal);
      }}>
      <Pressable onPress={() => setModal(false)} style={styles.exit}>
        <Icon
          name="transit-enterexit"
          size={50}
          color="white"
        />
      </Pressable>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Saýlaň</Text>
          <Pressable
            android_ripple={{ color: Colors.colorBacground2 }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors.colorOptionButtonPressed
                  : 'white',
              },
              styles.button, styles.buttonClose,
            ]}
            onPress={requestCameraPermission}
          >
            <Icon
              name="camera-alt"
              size={30}
              color="white"
            />
            <Text style={styles.textStyle}>Kamera</Text>
          </Pressable>

          <Pressable
            android_ripple={{ color: Colors.colorBacground2 }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors.colorOptionButtonPressed
                  : 'white',
              },
              styles.button, styles.buttonClose,
            ]}
            onPress={requestImagePermission}
          >
            <Icon
              name="folder"
              size={30}
              color="white"
            />
            <Text style={styles.textStyle}>Galereýa</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
export default ModalForImage
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Colors.colorBacground,
  },
  exit: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    margin: 20,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: Colors.colorDetailText,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
});
