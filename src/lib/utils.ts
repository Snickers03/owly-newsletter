import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// auth
export const generateRandomSixDigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const toNormalCase = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatDate = (date: Date | null): string => {
  if (!date) return "-";
  return format(date, "MMM d, yyyy");
};

export const numberToTemperature = (temp: number): string => {
  return `${String(temp).replace(".", ",")}°C`;
};

export function parseCurrencies(
  currenciesString: string | null | undefined,
): string[] {
  if (!currenciesString) return [];
  return currenciesString.split(",").filter(Boolean);
}

// newsletter time options
export const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});
