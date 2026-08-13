import { useContext } from "react";
import { ClientContext } from "./ClientContext.jsx";

const useClientContext = () => {
  const context = useContext(ClientContext);

  // Error handling for missing provider
  if (!context) {
    throw new Error(
      "useClientContext must be used within a ClientProvider. " +
        "Make sure to wrap your component tree with <ClientProvider>.",
    );
  }

  return context;
};

export default useClientContext;
