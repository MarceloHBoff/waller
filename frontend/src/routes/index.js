import React from 'react';
import { Switch } from 'react-router-dom';

import Actives from '~/pages/Actives';
import Allocation from '~/pages/Allocation';
import Bond from '~/pages/Bond';
import Dashboard from '~/pages/Dashboard';
import Daytrade from '~/pages/Daytrade';
import Performance from '~/pages/Performance';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/performance" component={Performance} isPrivate />
      <Route path="/allocation" component={Allocation} isPrivate />
      <Route path="/bond" component={Bond} isPrivate />
      <Route path="/actives" component={Actives} isPrivate />
      <Route path="/daytrade" component={Daytrade} isPrivate />
    </Switch>
  );
}
