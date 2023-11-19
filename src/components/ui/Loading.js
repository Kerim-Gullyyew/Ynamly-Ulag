import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
const Loading = ({ loading }) => {
    return (
        <Spinner
            cancelable='true'
            visible={loading}
            textContent={'Maglumat Ýüklenýär...'}
        />
    )
}
export default Loading