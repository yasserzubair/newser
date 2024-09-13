import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isClient() {
	return typeof window !== "undefined";
}

export function storeItemLS(key: string, value: string) {
	return isClient() && localStorage.setItem(key, value);
}

export function getItemLS(key: string) {
	return isClient() && localStorage.getItem(key);
}

export function debounce(callback: any, wait: number) {
	let timeoutId: any = null;
	return (...args: any) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			callback(...args);
		}, wait);
	};
}

export function toSearchDateFormat(date: Date) {
	const offset = date.getTimezoneOffset();
	date = new Date(date.getTime() - offset * 60 * 1000);
	return date.toISOString().split("T")[0];
}
