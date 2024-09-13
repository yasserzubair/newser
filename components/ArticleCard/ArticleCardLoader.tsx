import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export function ArticleCardLoader() {
	return (
		<Card className="h-[450px] px-2 py-2 rounded-2xl w-full justify-between flex flex-col">
			<CardHeader className="px-2 py-2">
				{
					<div className="rounded-xl w-full h-[200px] object-cover">
						<Skeleton className="w-full h-full" />
					</div>
				}
				<CardTitle className="w-full h-6">
					<Skeleton className="w-full h-full" />
				</CardTitle>
			</CardHeader>
			<CardDescription className="px-2 py-2">
				<Skeleton className="w-full h-full" />
			</CardDescription>
			<CardDescription className="px-2 py-2 text-ellipsis overflow-hidden line-clamp-2 h-[52px]">
				<Skeleton className="w-full h-full" />
			</CardDescription>

			<CardFooter className="px-2 py-2 w-full">
				<p className="px-2 py-2 h-8 w-full">
					<Skeleton className="w-full h-full" />
				</p>
			</CardFooter>
		</Card>
	);
}
