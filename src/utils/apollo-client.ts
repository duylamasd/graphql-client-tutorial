import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { GRAPHQL_URI, TOKEN_STORAGE_KEY } from "../constants";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: GRAPHQL_URI,
  headers: {
    Authorization: localStorage.getItem(TOKEN_STORAGE_KEY),
    "Client-Name": "Graph Tutorial Client",
    "Client-Version": "1.1.0"
  }
});

export const GraphqlClient = new ApolloClient({
  link,
  cache
});
