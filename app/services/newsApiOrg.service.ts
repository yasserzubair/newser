import { DATASOURCES_BASE_URLS, NEWS_API_ORG_DEFAULT_SEARCH_TEXT } from "@/lib/constants";
import { SearchFilters } from "@/lib/types";
import { toSearchDateFormat } from "@/lib/utils";
import axios from "axios";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_ORG_API_KEY || "";
const NEWS_API_BASE_URL = DATASOURCES_BASE_URLS.newsApiOrg;

type NewsApiOrgQueryParamNames =
	| "q"
	| "sortBy"
	| "apiKey"
	| "from"
	| "sources"
	| "category";

export const fetchNews = async (filters: SearchFilters) => {
	const { text, date, category } = filters;

	const queryParams: Partial<Record<NewsApiOrgQueryParamNames, string>> = {
		apiKey: NEWS_API_KEY,
	};

	const addQueryParam = (key: NewsApiOrgQueryParamNames, value?: string) => {
		if (value) {
			queryParams[key] = value;
		}
	};

	addQueryParam("q", (text || "").length > 0 ? text : NEWS_API_ORG_DEFAULT_SEARCH_TEXT);
	addQueryParam("from", date && toSearchDateFormat(date));
	addQueryParam("category", category);

	const url = category
		? `${NEWS_API_BASE_URL}/top-headlines` // category param not supported on everything
		: `${NEWS_API_BASE_URL}/everything`;
	const results = await axios.get(url, { params: queryParams });
	return results.data;
};
