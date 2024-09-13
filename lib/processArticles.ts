import { DEFAULT_NYT_IMAGEURL_APPEND } from "./constants";
import { Article } from "./types";

export const processNewsArticles = (articles: any[]): Article[] => {
	if (!articles || articles.length === 0) {
		return [];
	}

	return articles.map((article) => {
		const title = extractTitle(article);
		const description = extractDescription(article);
		const url = extractUrl(article);
		const publishDate = extractPublishDate(article);
		const source = extractSource(article);
		const image = extractImage(article);

		return { title, description, url, publishDate, source, image };
	});
};

function extractTitle(article: any): string | undefined {
	return article.title || article.webTitle || article.headline?.main;
}

function extractDescription(article: any): string | undefined {
	return article.abstract || article.description;
}

function extractUrl(article: any): string | undefined {
	return article?.url || article.webUrl || article.web_url || "";
}

function extractPublishDate(article: any): string | undefined {
	return (
		article.publishedAt ||
		article.webPublicationDate ||
		article.pub_date ||
		article.published_at
	);
}

function extractSource(article: any): string | undefined {
	return article.source?.name || article.source;
}

function extractImage(article: any): string | undefined {
	if (article.elements && article.elements.length > 0) {
		return article?.elements[0]?.assets[0]?.file || "";
	}
	if (article.multimedia && article.multimedia.length > 0) {
		return `${DEFAULT_NYT_IMAGEURL_APPEND}${article?.multimedia[0]?.url}` || "";
	}
	return article.urlToImage
		? article.urlToImage
		: article.image_url
			? article.image_url
			: "";
}
