"use client";
import { Skeleton } from "../ui/skeleton";
import clsx from "clsx";

type Props = {
	width?: string;
	height?: string;
};

export function SkeletonLoader({ width, height }: Props) {
	return (
		<Skeleton
			className={clsx("w-full h-full", {
				[`w-[${width}]`]: !!width,
				[`h-[${height}]`]: !!height,
			})}
		/>
	);
}
