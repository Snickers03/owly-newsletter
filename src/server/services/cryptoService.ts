// server/services/cryptoService.ts

type CurrencySummary = {
  name: string;
  symbol: string;
  price: number;
  percent_change_24h: number;
};

type RawCurrency = {
  name: string;
  symbol: string;
  quote: {
    EUR: {
      price: number;
      percent_change_24h: number;
    };
  };
};

export const fetchCryptoData = async (
  symbols: string[],
): Promise<CurrencySummary[]> => {
  const symbolString = symbols.map((s) => s.toUpperCase()).join(",");

  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbolString}&convert=EUR`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKET_API_KEY ?? "",
        Accept: "application/json",
      },
    },
  );

  const resJson = await res.json();

  return Object.values(resJson.data).map((currency) => {
    const c = currency as RawCurrency;
    return {
      name: c.name,
      symbol: c.symbol,
      price: c.quote.EUR.price,
      percent_change_24h: c.quote.EUR.percent_change_24h,
    };
  });
};
