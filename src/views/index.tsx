import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import UserList from "./Users";

const RootView = hot(module)(() => (
  <Fragment>
    <CssBaseline />
    <Switch>
      <UserList />
    </Switch>
  </Fragment>
));

export default RootView;
