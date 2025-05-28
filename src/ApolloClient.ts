import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { resetAuth } from "./redux/slices/authSlice";
import store from "./redux/store";

const logout = async () => {
  store.dispatch(resetAuth());
  localStorage.clear();

  window.location.href = "/login";
};

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const authLink = new ApolloLink((operation, forward) => {
  const state = store.getState();
  const token = state.authSlice.token;

  if (token) {
    operation.setContext({
      headers: {
        Authorization: token,
      },
    });
  }

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.message.includes("Token inválido")) {
        logout();
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
