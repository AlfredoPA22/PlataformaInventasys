import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import apolloClient from "./ApolloClient";
import store from "./redux/store";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Provider store={store}>
          <GoogleOAuthProvider clientId="559173991940-aj695pntjmdcpfr01mpcecu7pqr2b5eg.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
