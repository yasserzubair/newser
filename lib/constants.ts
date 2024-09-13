import { ThemeOptions, SkeletonThemeObject, NavItems, DataSources } from "./types";

export const NEWS_API_ORG_DEFAULT_SEARCH_TEXT = "breaking-news";
export const DEFAULT_NYT_IMAGEURL_APPEND = "https://static01.nyt.com/";

export const DATASOURCES_BASE_URLS: Record<DataSources, string> = {
	[DataSources.newsApiOrg]: "https://newsapi.org/v2",
	[DataSources.theGuardian]: "https://content.guardianapis.com/search",
	[DataSources.theNewsApi]: "https://api.thenewsapi.com/v1/news/all",
	[DataSources.nyTimesApi]: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
};

export const spring = {
	type: "spring",
	stiffness: 700,
	damping: 30,
};

export const LOCALSTORAGE_KEYS = {
	THEME: "theme",
};

export const skeletonTheme: Record<ThemeOptions, SkeletonThemeObject> = {
	dark: {
		baseColor: "#202020",
		highlightColor: "#444",
	},
	light: {
		baseColor: "#f1f1f1",
		highlightColor: "#dfdfdf",
	},
};

export const navItems: NavItems[] = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Sports",
		href: "/sports",
	},
	{
		title: "About",
		href: "/about",
	},
];

export const categories = [
	"business",
	"entertainment",
	"general",
	"health",
	"science",
	"sports",
	"technology",
];