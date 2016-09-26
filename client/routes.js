import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Header from './components/Commons/Header';
import OutletsPage from './components/Home/OutletsPage';
import Outlet from './components/Home/SelectOutlet';
import NotFound from './components/Commons/NotFound';

console.log("routes file client");

export default (
  <Route path="/" component={App}>    /*App component houses all of our components in React: says always load app component and nest other componenets*/
    <IndexRoute component={Outlet}/>    /* Index route loads when someone just goes to / as a child of app */
    <Route path="outlets" component={OutletsPage}/>  /*load outlets page when path is /outlets */*/}
    <Route path="*" component={NotFound}/>
  </Route>
);
