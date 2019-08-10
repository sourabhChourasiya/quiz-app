/*
* Entry point of the application
* which renders Header and rest of
* the pages.
*
* Also enable redux store to the
* application.
* */

import React from 'react';
import { Provider } from 'react-redux'
import RenderRoutes from '../../src/Routes/Routes'
import Header from '../../src/Components/Header/Header'
import CreateStore from '../../src/redux/store/CreateStore'
import createBrowserHistory from 'history/createBrowserHistory'

import './app.scss'

const browserHistory = createBrowserHistory()
window.appHistory = browserHistory

const initialState = {}
const store = CreateStore(initialState)

const App = () => {
    return (
        <Provider store={store}>
            <Header />
            <div className="app-container">
                <RenderRoutes history={browserHistory}/>
            </div>
        </Provider>
    )
}

export default App