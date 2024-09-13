"use client";
import useNewsArticles from "./services/useNews";
import { CoverImage } from "@/components/CoverImage";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Article } from "@/lib/types";
import dynamic from "next/dynamic";

const ArticleCard = dynamic(
	() => import("@/components/ArticleCard").then((module) => module.ArticleCard),
	{
		ssr: false,
	}
);

const ArticleCardLoader = dynamic(
	() => import("@/components/ArticleCard").then((module) => module.ArticleCardLoader),
	{
		ssr: false,
	}
);

export default function Home() {
	const { processedArticles, isError, errorMessages, isFetchingDone } =
		useNewsArticles();
	useEffect(() => {
		if (isFetchingDone && isError && errorMessages.length) {
			toast({
				variant: "destructive",
				title: "Something Went Wrong",
				description:
					"While fetching data from one of the sources. Check if quota limit reached and api keys are correct",
			});
		}
	}, [errorMessages]);

	return (
		<main
			suppressHydrationWarning
			className="flex min-h-screen flex-col items-center ">
			<CoverImage />
			<div suppressHydrationWarning className="container my-10">
				<h1 className="text-4xl mb-4 md:px-4">Articles</h1>
				{!processedArticles?.length ? (
					<CardsSkeletonLoader />
				) : (
					processedArticles.map(mapCards)
				)}
				{/* <CardsSkeletonLoader /> */}
			</div>
		</main>
	);
}

const mapCards = (item: Article, index: number) => (
	<div
		suppressHydrationWarning
		key={`cards-${index}`}
		className="w-full md:w-1/2 lg:w-1/3  inline-flex md:px-4 mb-4">
		<ArticleCard {...item} />
	</div>
);

const CardsSkeletonLoader = () => {
	return Array(10)
		.fill(0)
		.map((_i, index) => (
			<div
				suppressHydrationWarning
				key={`loader-cards-${index}`}
				className="w-full md:w-1/2 lg:w-1/3  inline-flex md:px-4 mb-4">
				{" "}
				<ArticleCardLoader />
			</div>
		));
};