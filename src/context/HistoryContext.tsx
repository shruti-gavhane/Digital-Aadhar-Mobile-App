import { createContext, useState } from "react";

export const HistoryContext = createContext<any>(null);

export const HistoryProvider = ({ children }: any) => {
  const [history, setHistory] = useState<any[]>([]);

  const addHistory = (item: any) => {
    setHistory((prev) => [item, ...prev]);
  };

  return (
    <HistoryContext.Provider value={{ history, addHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};