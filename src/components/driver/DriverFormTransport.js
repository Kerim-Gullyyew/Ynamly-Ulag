import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import DropdownForm from '../form/DropdownForm';
import SearchButton from '../ui/SearchButton';
import { PlaceholderContext } from '../../constants/CityContext';
import Input from '../form/Input';
import { Colors } from '../../constants/Colors';
import DeleteButton from '../ui/DeleteButton';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalForImage from '../ui/ModalForImage';
import Loading from '../ui/Loading';
import { backendUrl } from '../../constants/rootUrl';
const DriverFormTransport = ({
  error,
  model,
  onModelChange,
  transportHandler,
  transport,
  setTransport,
  data,
  onPressHandler,
  deleteHandler,
  selectedImage,
  setSelectedImage,
  image,
  isLoading,
  setImage,
}) => {
  const [modal, setModal] = useState(false)
  return (
    <ScrollView style={styles.flex}>
      <Loading loading={isLoading} />
      <View style={styles.body}>
        <ModalForImage setSelectedImage={setSelectedImage} image={image} setImage={setImage} modal={modal} setModal={setModal} />
        <View style={styles.firstsection}>
          <Image
            style={styles.image}
            source={require('../../assets/png/FormPng.png')}
          />
        </View>
        <View style={styles.secondsection}>
          {error && <Text style={styles.error}>{error.detail}</Text>}
          <Input
            value={model}
            onChangeText={onModelChange}
            placeholder="Model"
          />
          <DropdownForm
            onOptionHandler={transportHandler}
            value={transport}
            setValue={setTransport}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={PlaceholderContext.transport}
          />
          <View style={{ flex: 1, marginVertical: 10, justifyContent: 'center' }}>
            <Pressable onPress={() => setModal(true)} style={styles.imageBox}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 300, height: 150 }}
                  resizeMode="contain"
                />
              ) : (
                <>
                  {image ? (
                    <Image
                      style={{ width: 300, height: 150 }}
                      source={{ uri: backendUrl + image }}
                      resizeMode="contain"
                    />
                  ) : (
                    <>
                      <Text style={styles.text}>Surat saýla</Text>
                      <Icon
                        name="file-upload"
                        size={50}
                        color={Colors.colorBacground}
                      />
                    </>
                  )}
                </>
              )}
            </Pressable>
          </View>
          <View style={{ paddingBottom: 20 }}>
            <SearchButton onPress={() => onPressHandler()} title={deleteHandler ? "Üýtgetmek" : "Goşmak"} />
            {deleteHandler && (
              <DeleteButton title="Aýyrmak" onPress={() => deleteHandler()} />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default DriverFormTransport;
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: Colors.colorBacground,
    justifyContent: 'space-between',
  },
  firstsection: {
    backgroundColor: Colors.colorBacground,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 16,
    color: Colors.colorDetailText,
  },
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
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  exit: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    margin: 10,
    padding: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  imageBox: {
    borderWidth: 0.5,
    borderRadius: 10,
    maxWidth: '90%',
    width: 300,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '95%',
    width: 300,
    objectFit: 'contain',
  },
  secondsection: {
    flex: 1,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    paddingTop: 15,
  },
  section: {
    flex: 1,
    backgroundColor: Colors.colorBacground,
  },
  error: {
    color: 'red',
    paddingBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  radios: {
    marginTop: 15,
    flexDirection: 'row',
  },
  sectionImage: {
    backgroundColor: 'red',
  },
  descriptionInput: {
    paddingHorizontal: 15,
    width: 270,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
