import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast as shadcnToast } from "@/hooks/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toast = (message = "", type = "default", duration = 3000) => {
  return shadcnToast({
    description: message,
    variant: type === "error" ? "destructive" : "default",
    duration,
    title: type === "error" ? "Error" : "Success",
  });
};
