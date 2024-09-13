import { DATASOURCES_BASE_URLS } from "@/lib/constants";
import { SearchFilters } from "@/lib/types";
import { toSearchDateFormat } from "@/lib/utils";
import axios from "axios";

const GUARDIAN_API_KEY =
	process.env.NEXT_PUBLIC_THE_GUARDIAN_API_KEY || "YOUR_GUARDIAN_API_KEY";

const GUARDIAN_API_BASE_URL = DATASOURCES_BASE_URLS.theGuardian;

type GuardianQueryParamNames =
	| "api-key"
	| "q"
	| "fromDate"
	| "section"
	| "tag"
	| "show-elements";

export const fetchNews = async (filters: SearchFilters) => {
	const { text, date, category } = filters;
	const queryParams: Partial<Record<GuardianQueryParamNames, string>> = {
		"api-key": GUARDIAN_API_KEY,
	};

	const addQueryParam = (key: GuardianQueryParamNames, value?: string) => {
		if (value) {
			queryParams[key] = value;
		}
	};
	addQueryParam("q", text);
	addQueryParam("fromDate", date && toSearchDateFormat(date));
	addQueryParam("tag", category);
	addQueryParam("show-elements", "image");

	const results = await axios.get(GUARDIAN_API_BASE_URL, { params: queryParams });
	return results.data;
};
