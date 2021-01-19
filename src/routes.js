import React from 'react'
import { isAuthenticated } from './config/auth'
import {
    Switch,
    Route,
    Redirect,
    Router
} from "react-router-dom"
import viewUser from '../src/views/user'
import viewLogin from '../src/views/login'
import history from './config/history'

const CustomRoute = ({ ...rest }) => {

   if (!isAuthenticated()) {
        return <Redirect to='/login' />
    }
    return <Route  {...rest} />
} 

const Routers = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/login" component={viewLogin} />
            <CustomRoute path="/" component={viewUser} />
        </Switch>
    </Router>
)

export default Routers

