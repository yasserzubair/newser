import { DATASOURCES_BASE_URLS } from "@/lib/constants";
import { SearchFilters } from "@/lib/types";
import { toSearchDateFormat } from "@/lib/utils";
import axios from "axios";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_THE_NEWS_API_KEY || "";
const NEWS_API_BASE_URL = DATASOURCES_BASE_URLS.theNewsApi;

export const fetchNews = async (filters: SearchFilters) => {
	const { text, date, category } = filters;

	type TheNewsApiQueryParamNames =
		| "search"
		| "sort"
		| "api_token"
		| "published_after"
		| "sources"
		| "categories";

	const queryParams: Partial<Record<TheNewsApiQueryParamNames, string>> = {
		api_token: NEWS_API_KEY,
	};

	const addQueryParam = (key: TheNewsApiQueryParamNames, value?: string) => {
		if (value) {
			queryParams[key] = value;
		}
	};

	addQueryParam("search", (text || "").length > 0 ? text : "");
	addQueryParam("published_after", date && toSearchDateFormat(date));
	addQueryParam("categories", category);

	const results = await axios.get(NEWS_API_BASE_URL, { params: queryParams });
	return results.data;
};
