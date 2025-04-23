export type IComponentType = "weather" | "crypto" | "quote";

export type IComponentParams = {
  city?: string;
  currencies?: string[];
  quote?: string;
  author?: string;
  quoteId?: number;
};

export type INewsletterComponent = {
  id: string;
  type: IComponentType;
  params: IComponentParams;
  isNew?: boolean;
};
