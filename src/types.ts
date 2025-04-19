export type IComponentType = "weather" | "crypto" | "quote";

type BaseComponent = {
  id: string;
  type: IComponentType;
  order: number;
  newsletterId: string;
  createdAt: string; // or `Date` if you're parsing it
  updatedAt: string; // or `Date`
};

type WeatherComponent = BaseComponent & {
  type: "weather";
  weather: {
    id: string;
    city: string;
    componentId: string;
  };
  crypto: null;
  quote: null;
};

type CryptoComponent = BaseComponent & {
  type: "crypto";
  weather: null;
  crypto: {
    id: string;
    currency: string;
    componentId: string;
  };
  quote: null;
};

type QuoteComponent = BaseComponent & {
  type: "quote";
  weather: null;
  crypto: null;
  quote: {
    id: string;
    quote: string;
    author: string;
    componentId: string;
  };
};

export type IComponentTyper =
  | WeatherComponent
  | CryptoComponent
  | QuoteComponent;
