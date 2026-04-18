import { createContext, useState } from "react";

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [riskScore, setRiskScore] = useState(30);

  return (
    <UserContext.Provider value={{ riskScore, setRiskScore }}>
      {children}
    </UserContext.Provider>
  );
};