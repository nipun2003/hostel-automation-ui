import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {Toaster} from "sonner";
import App from "@/App.tsx";
import {Provider} from "react-redux";
import store from "@/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
            <Toaster richColors={true} position={"bottom-center"}/>
        </Provider>
    </React.StrictMode>
);
