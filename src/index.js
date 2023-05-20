import React from "react";

import App from "./App.js";

import { createRoot } from "react-dom/client";

import "./index.scss";

const Page = () => {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

createRoot(document.getElementById("root")).render(<Page />);
