import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import AppRoute from "./routes/appRoute";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRoute />
          <Toaster />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
