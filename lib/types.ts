export interface SearchFilters {
	date?: Date;
	category?: string;
	text?: string;
	source?: string;
	authors?: string[];
}

export enum ThemeOptions {
	DARK = "dark",
	LIGHT = "light",
}

export type SkeletonThemeObject = {
	baseColor: string;
	highlightColor: string;
};

export type NavItems = {
	title: string;
	href: string;
};

export enum DataSources {
	theGuardian = "theGuardian",
	newsApiOrg = "newsApiOrg",
	theNewsApi = "theNewsApi",
	nyTimesApi = "nyTimesApi",
}

export type ErrorMessages = {
	message?: string;
	dataKey?: string;
};

export type Article = {
	title?: string;
	description?: string;
	url?: string;
	publishDate?: string;
	source?: string;
	image?: string;
};
