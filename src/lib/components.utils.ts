import { IComponentType, INewsletterComponent } from "@/types";
import {
  Component,
  CryptoParams,
  QuoteParams,
  WeatherParams,
} from "@prisma/client";

// Typdefinitionen für die einzelnen Komponententypen
export interface CryptoParamsType {
  currencies: string[];
}

export interface WeatherParamsType {
  city: string;
}

export interface QuoteParamsType {
  quote: string;
  author: string;
}

// Union-Typ für alle möglichen Parameter
export type ComponentParams =
  | CryptoParamsType
  | WeatherParamsType
  | QuoteParamsType;

// Erweiterter Component-Typ
type ExtendedComponent = Component & {
  crypto?: CryptoParams | null;
  weather?: WeatherParams | null;
  quote?: QuoteParams | null;
};

// Typ für extrahierte Komponenten mit Parametern und Reihenfolge
export interface NewsletterComponentParam {
  type: IComponentType;
  params: ComponentParams;
  order: number;
}

// Hilfsfunktion zur Extraktion der Parameter aus einer Komponente
function getComponentParams(component: ExtendedComponent): {
  type: IComponentType;
  params: ComponentParams;
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

// Extraktion der Parameter mit Reihenfolge für interne Verarbeitung
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

// Transformation zu INewsletterComponent-Objekten
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
