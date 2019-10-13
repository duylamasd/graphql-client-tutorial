import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split, from } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import { GRAPHQL_URI, TOKEN_STORAGE_KEY, WS_URI } from "../constants";

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
  headers: {
    Authorization: localStorage.getItem(TOKEN_STORAGE_KEY),
    "Client-Name": "Graph Tutorial Client",
    "Client-Version": "1.1.0"
  }
});

const wsLink = new WebSocketLink({
  uri: WS_URI,
  options: {
    reconnect: true
  }
});

const terminalLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const link = from([terminalLink]);

export const GraphqlClient = new ApolloClient({
  link,
  cache
});
