import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Dashboard from "./pages/dashboard/Dashboard";
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";
import PasswordRecovery from "./pages/PasswordRecovery";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/register" component={SignUp}/>
                <Route exact path="/login" component={SignIn}/>
                <Route exact path="/forget" component={PasswordRecovery}/>
                <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
