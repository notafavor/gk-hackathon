import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserStore from "./store/UserStore.js";
import "@quark-uilib/components/styles/index.css";
import "./assets/style/globalStyle.css";
import { BrowserRouter } from "react-router-dom";
import RecognitionStore from "./store/RecognitionStore.js";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      recognition: new RecognitionStore()
    }}
  >
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Context.Provider>
);

reportWebVitals();
