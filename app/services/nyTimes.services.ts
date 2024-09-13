import { DATASOURCES_BASE_URLS } from "@/lib/constants";
import { SearchFilters } from "@/lib/types";
import { toSearchDateFormat } from "@/lib/utils";
import axios from "axios";

const NYTIMES_API_KEY =
	process.env.NEXT_PUBLIC_NYTIMES_API_KEY || "YOUR_GUARDIAN_API_KEY";

const NYTIMES_API_BASE_URL = DATASOURCES_BASE_URLS.nyTimesApi;

type NYTimesQueryParams = "api-key" | "q" | "begin_date" | "fq";

export const fetchNews = async (filters: SearchFilters) => {
	const { text, date, category } = filters;
	const queryParams: Partial<Record<NYTimesQueryParams, string>> = {
		"api-key": NYTIMES_API_KEY,
	};

	const addQueryParam = (key: NYTimesQueryParams, value?: string) => {
		if (value) {
			queryParams[key] = value;
		}
	};
	addQueryParam("q", text);
	addQueryParam("begin_date", date && toSearchDateFormat(date));
	addQueryParam("fq", category && `section_name:("${category}")`);

	const results = await axios.get(NYTIMES_API_BASE_URL, { params: queryParams });
	return results.data;
};
