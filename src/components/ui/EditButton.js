import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const EditButton = ({ onPress }) => {
    return (
        <View style={styles.transportHeader}>
            <Pressable android_ripple={{ color: Colors.colorBacground2 }} onPress={onPress} style={styles.button}>
                <Icon name="edit" size={30} color="white" />
            </Pressable>
        </View>
    )
}
export default EditButton
const styles = StyleSheet.create({
    transportHeader: {
        paddingVertical: 5,
        zIndex: 1,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.colorTeal,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
});
