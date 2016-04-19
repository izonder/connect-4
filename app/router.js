import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'page/app';

const Routes = (
    <Route path="*" component={App} />
);

export default Routes;