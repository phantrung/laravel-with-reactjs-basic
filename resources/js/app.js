/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
import Home from "./components/Page/Home";

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react'
import { render } from 'react-dom'
import {
    Router,
    Route,
    Switch
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Page from './components/User/Page'

const history = createBrowserHistory();
render (
    <Router history={history}>
        <Switch>
            <Home>
                <Route path='/' exact render={(props) => <Page/>} />
                <Route path='/login' exact render={(props) => <Login {...props}/>} />
                <Route path='/register' exact render={(props) => <Register {...props}/>} />
            </Home>
        </Switch>
    </Router>, document.getElementById('app'))
