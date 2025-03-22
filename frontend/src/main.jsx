import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
// import SocketClient from "./lib/socketClient";
import { SocketContextProvider } from "./context/SocketContext.jsx";

// export const socketClient = new SocketClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>
      </SocketContextProvider>
    </Provider>
  </StrictMode>
);
