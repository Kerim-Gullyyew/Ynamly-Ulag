import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Image } from 'react-native'
import React from 'react'
import { getLocation } from '../client/locationSlice';
import { useDispatch } from 'react-redux';
import { Colors } from '../../constants/Colors';
const NetworkError = () => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getLocation()).then(() => {
            setRefreshing(false);
        })
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.group}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/png/network.png')}
                    />
                    <Text style={styles.text}>Network Error Try Refresh</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default NetworkError
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.colorDetailText,
        fontSize: 20,
        flexWrap: 'wrap',
    },
    image: {
        width: 200,
        height: 200,
    },
    group: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});