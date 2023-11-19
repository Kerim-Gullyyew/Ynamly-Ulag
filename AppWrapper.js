import React from 'react'
import App from './src/App'
import { Provider } from 'react-redux'
import PersistProvider from './src/store/providers/persist-provider';
import { store } from './src/store/store';
const AppWrapper = () => {
    return (
        <Provider store={store}>
            <PersistProvider>
                <App />
            </PersistProvider>
        </Provider>
    )
}

export default AppWrapper