import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserStore from "./store/UserStore.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./assets/style/reset.css";
import { BrowserRouter } from "react-router-dom";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
    }}
  >
    <GoogleOAuthProvider clientId="<your_client_id>">
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Context.Provider>
);

reportWebVitals();
