"use client";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { Article, DataSources, ErrorMessages, SearchFilters } from "@/lib/types";
import { newsFetcherFunctions } from ".";
import { processNewsArticles } from "@/lib/processArticles";
import { useFilterContext } from "@/context/FiltersContext";

const queryFn = async (metadata: { queryKey: [DataSources, filters: SearchFilters] }) => {
	const [dataKey, filters] = metadata.queryKey;
	const results = await newsFetcherFunctions[dataKey](filters);
	results.dataKey = dataKey;
	return results;
};

const extractArticles = (dataKey: DataSources, data: any) => {
	switch (dataKey) {
		case DataSources.newsApiOrg:
			return !data?.isError ? data.articles : [];
		case DataSources.theNewsApi:
			return data?.data ?? [];
		case DataSources.theGuardian:
			return !data?.isError ? data.response.results : [];
		case DataSources.nyTimesApi:
			return !data?.isError ? data.response.docs : [];
	}
};

function useNews(): {
	results: any;
	isError: boolean;
	refetchAll: () => void;
	processedArticles: Article[];
	errorMessages: ErrorMessages[];
	isFetchingDone: boolean;
} {
	const { filters } = useFilterContext();
	const dataSourcesArray = Object.keys(DataSources).filter((d) => {
		if (!filters.source) {
			return true;
		} else {
			return filters.source === d;
		}
	});

	const queries = dataSourcesArray.map((i: string) => {
		return {
			queryKey: [DataSources[i as DataSources], filters],
			queryFn,
			refetchOnWindowFocus: false,
		};
	});

	const processedArticles: Article[] = [];
	let isError = false;
	const errorMessages: ErrorMessages[] = [];

	const combine = (results: UseQueryResult<any, Error>[]) => {
		results.forEach((item) => {
			if (item.status !== "success") {
				if (item.isError) {
					errorMessages.push({
						message: item?.error?.message || "",
					});
					isError = true;
				}
				return;
			}
			const articles = extractArticles(item.data.dataKey, item.data);
			processedArticles.push(...processNewsArticles(articles));
		});

		return results;
	};

	const results = useQueries({
		//@ts-ignore
		queries,
		combine,
	});
	//@ts-ignore

	const refetchArray: ((options?: any) => Promise<any>)[] = [];
	const isFetchingDone = results.every((item) => item.isLoading === false);

	results.map((item) => {
		refetchArray.push(item.refetch);
	});

	const refetchAll = () => {
		refetchArray.forEach((refetchFn) => refetchFn());
	};

	return {
		results,
		isError,
		refetchAll,
		processedArticles,
		errorMessages,
		isFetchingDone,
	};
}

export default useNews;
