import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from '../pages/containers/HomeContainer';
import CategoryContainer from '../pages/containers/CategoryContainer';
import ItemContainer from '../pages/containers/ItemContainer';
import CabinetContainer from '../pages/containers/CabinetContainer';
import RegisterContainer from '../pages/containers/RegisterContainer';
import ProfileEditContainer from '../pages/containers/ProfileEditContainer';

import Login from '../pages/components/Login';
import Logout from '../pages/components/Logout';
import NotFound from '../pages/components/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Route exact path="/category/:category" component={CategoryContainer} />
    <Route path="/category/:category/:id" component={ItemContainer} />

    <Route path="/register" component={RegisterContainer} />
    <Route exact path="/cabinet" component={CabinetContainer} />
    <Route path="/cabinet/edit" component={ProfileEditContainer} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />

    <Route component={NotFound} />
  </Switch>
);

export default Routes;
