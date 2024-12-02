import { createContext, useContext, useState } from "react";

const ClickCountContext = createContext(null);

export const ClickCountProvider = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);

  const incrementCount = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <ClickCountContext.Provider value={{ clickCount, incrementCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};

export const useClickCount = () => {
  const context = useContext(ClickCountContext);
  if (context === undefined) {
    throw new Error("useClickCount must be used within a ClickCountProvider");
  }
  return context;
};
