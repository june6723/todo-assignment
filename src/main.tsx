import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@parte-ds/ui";
import { GlobalStyle } from "./GlobalStyles";

import { worker } from "./mock/worker";

if (import.meta.env.MODE === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
