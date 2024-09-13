import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Article } from "@/lib/types";
import Link from "next/link";

export function ArticleCard({
	title,
	description,
	publishDate,
	source,
	image,
	url,
}: Article) {
	const date = new Date(publishDate || "");
	return (
		<Link
			className="w-full"
			href={url || ""}
			passHref
			target="_blank"
			rel="noopener noreferrer">
			<Card className="h-[450px] px-2 py-2 rounded-2xl w-full justify-between flex flex-col">
				<CardHeader className="px-2 py-2">
					{
						<object
							className="rounded-xl w-full h-[200px] object-cover"
							data={image || "./placeholder.jpg"}
							type="image/png">
							<img
								className="rounded-xl w-full h-[200px] object-cover"
								width={"100%"}
								height={200}
								alt={title || ""}
								src={"./placeholder.jpg"}></img>
						</object>
					}
					<CardTitle className="text-ellipsis overflow-hidden line-clamp-3">
						{title}
					</CardTitle>
				</CardHeader>
				<CardDescription className="px-2 py-2">{source}</CardDescription>
				<CardDescription className="px-2 py-2 text-ellipsis overflow-hidden line-clamp-2 h-[52px]">
					{description}
				</CardDescription>

				<CardFooter className="px-2 py-2">
					<p className="mr-2">Published on:</p> <p>{date.toDateString()}</p>
				</CardFooter>
			</Card>
		</Link>
	);
}
