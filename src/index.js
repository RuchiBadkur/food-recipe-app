import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GlobalProvider from "./context/GlobalProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <React.StrictMode>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </React.StrictMode>
    </BrowserRouter>
)