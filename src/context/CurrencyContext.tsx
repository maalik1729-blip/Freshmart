import { createContext, useContext, useState, ReactNode } from "react";

export type CurrencyCode = "EUR" | "INR" | "USD";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number; // conversion rate relative to EUR base
  label: string;
}

const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  EUR: { code: "EUR", symbol: "€", rate: 1,       label: "Euro (€)" },
  INR: { code: "INR", symbol: "₹", rate: 90.5,    label: "Rupee (₹)" },
  USD: { code: "USD", symbol: "$", rate: 1.08,     label: "Dollar ($)" },
};

interface CurrencyContextValue {
  currency: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (eurPrice: number) => string;
  allCurrencies: CurrencyInfo[];
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState<CurrencyCode>("EUR");

  const currency = CURRENCIES[code];

  const formatPrice = (eurPrice: number): string => {
    const converted = eurPrice * currency.rate;
    if (code === "INR") {
      return `${currency.symbol}${converted.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: setCode,
        formatPrice,
        allCurrencies: Object.values(CURRENCIES),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextValue => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
};
