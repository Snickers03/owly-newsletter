import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateRandomSixDigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const toNormalCase = (str: string) => {
  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};
