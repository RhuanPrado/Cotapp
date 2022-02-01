import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Loginpass from './pages/Login/Loginpass';
import Cotacoes from './pages/Cotacoes/Cotacoes';
import NewCot from './pages/NewCot/NewCot';
import EditarCot from './pages/EditarCot/EditarCot';
import Home from './pages/Home/Home';
export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/pass" component={Loginpass}/>
                <Route path="/cotacoes" component={Cotacoes}/>
                <Route path="/newCot" component={NewCot}/>
                <Route path="/editCot" component={EditarCot}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}