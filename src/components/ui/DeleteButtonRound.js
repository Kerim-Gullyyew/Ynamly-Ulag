import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
const DeleteButtonRound = ({ onPress }) => {
    return (
        <View style={styles.transportHeader}>
            <Pressable android_ripple={{ color: Colors.colorBacground2 }} onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </Pressable>
        </View>
    )
}
export default DeleteButtonRound
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
        backgroundColor: Colors.colorBacground,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
});
