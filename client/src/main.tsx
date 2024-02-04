import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";
import { AuthProvider } from "./components/auth-context.tsx";
import { CartProvider } from "./components/cart-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
      <Toaster />
    </Provider>
  </BrowserRouter>
);
