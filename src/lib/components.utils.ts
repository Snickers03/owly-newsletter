import { IComponentType, INewsletterComponent } from "@/types";
import {
  Component,
  CryptoParams,
  QuoteParams,
  WeatherParams,
} from "@prisma/client";

type ExtendedComponent = Component & {
  crypto?: CryptoParams | null;
  weather?: WeatherParams | null;
  quote?: QuoteParams | null;
};

export interface NewsletterComponentParam {
  type: IComponentType;
  params: Record<string, any>;
  order: number;
}

function getComponentParams(component: ExtendedComponent): {
  type: IComponentType;
  params: Record<string, any>;
} {
  if (component.type === "crypto" && component.crypto) {
    return {
      type: "crypto",
      params: {
        currencies: component.crypto.currencies.split(","),
      },
    };
  }

  if (component.type === "weather" && component.weather) {
    return {
      type: "weather",
      params: {
        city: component.weather.city,
      },
    };
  }

  if (component.type === "quote" && component.quote) {
    return {
      type: "quote",
      params: {
        quote: component.quote.quote,
        author: component.quote.author,
      },
    };
  }

  throw new Error(
    `Unknown or incomplete component: ${JSON.stringify(component)}`,
  );
}

export function extractComponentParams(
  components: ExtendedComponent[],
): NewsletterComponentParam[] {
  return components.map((component) => {
    const base = getComponentParams(component);
    return {
      ...base,
      order: component.order,
    };
  });
}

export function transformComponents(
  components: ExtendedComponent[],
): INewsletterComponent[] {
  return components.map((component) => {
    const base = getComponentParams(component);
    return {
      id: component.id,
      type: base.type,
      isNew: false,
      params: base.params,
    };
  });
}
