import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { history, GraphqlClient } from "./utils";
import RootView from "./views";

render(
  <ApolloProvider client={GraphqlClient}>
    <Router history={history}>
      <RootView />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
