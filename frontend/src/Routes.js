import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TodayPage, TomorrowPage, _10DaysPage } from "./js/pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={TodayPage} />
          <Route exact path="/tomorrow" component={TomorrowPage} />
          <Route exact path="/10days" component={_10DaysPage} />
        </Switch>
      </App>
    </BrowserRouter>
  );
};

export default Routes;
