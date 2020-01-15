import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux'

import TableContainer from './table/TableContainer';
import EditForm from './editForm/EditForm';
import mainReducer from './reducers/mainReducer';

function App() {

    const store = createStore(
        mainReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return (
        <div>
            <Provider store={store}>
                <Router>
                    <Redirect from="/" to="/table"/>
                    <Route path="/table" component={TableContainer}/>
                    <Route path="/edit/:id" component={EditForm}/>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
