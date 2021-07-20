import React from 'react';
import {MainPage, CartPage, PageNotFound} from '../pages';
import AppHeader from '../app-header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Background from './food-bg.jpg';

const App = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <Router>
                <AppHeader total={50}/>
                <Switch>
                    <Route
                        path='/'
                        exact
                        component={MainPage}
                        />
                    <Route
                        path='/cart'
                        exact
                        component={CartPage}
                        />
                    <Route
                        component={PageNotFound}
                        />
                </Switch>
            </Router>
        </div>
    )
}

export default App;
