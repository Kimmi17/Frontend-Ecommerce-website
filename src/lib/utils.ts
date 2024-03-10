import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractUrlFromString(url: string): string {
  const httpIndex: number = url.indexOf("http");
  const lastSlashIndex: number = url.lastIndexOf("/");
  const extractedText: string = url.substring(httpIndex, lastSlashIndex);
  return extractedText;
}
