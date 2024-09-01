import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);
  const [persistor, setPersistor] = useState(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const pStore = persistStore(store);
      setPersistor(pStore);
    }
  }, []);

  if (!mounted || !persistor) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
