import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { REACT_APP_GITHUB_BASE_URL } from "../utils/constants";

const httpLink = new HttpLink({
  uri: REACT_APP_GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      //can add loging here, eg: sentry
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    const hasErrorCode = networkError.name === "Unauthorised";
    if (hasErrorCode) {
      //do something
    }
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache({
  typePolicies: {
    Issue: {
      keyFields: ["id"],
    },
    User: {
      keyFields: ["login"],
    },
  },
});

export const client = new ApolloClient({
  link,
  cache,
});
