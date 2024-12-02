import { createContext, useContext, useState } from "react";

const ClickCountContext = createContext({});

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

export const useClickCount = () => useContext(ClickCountContext);
