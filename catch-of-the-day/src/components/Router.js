import App from './App';
import React from 'react';
import NotFound from './NotFound';
import StorePicker from './StorePicker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={StorePicker} />
            <Route path="/store/:storeId" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;