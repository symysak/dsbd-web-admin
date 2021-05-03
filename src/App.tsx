import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import SignIn from './pages/Login/SignIn';
import SignUp from "./pages/SignUp";
import PasswordRecovery from "./pages/PasswordRecovery";
import Group from "./pages/Group/Group";
import Dashboard from "./pages/Dashboard/Dashboard";
import Notice from './pages/Notice/Notice';
import Order from "./pages/Order/Order";
import GroupDetail from './pages/Group/GroupDetail/GroupDetail';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/register" component={SignUp}/>
                    <Route exact path="/login" component={SignIn}/>
                    <Route exact path="/forget" component={PasswordRecovery}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/dashboard/notice" component={Notice}/>
                    <Route exact path="/dashboard/group" component={Group}/>
                    <Route exact path="/dashboard/group/:id" component={GroupDetail}/>
                    <Route exact path="/dashboard/order" component={Order}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
