import React, { PropsWithChildren } from "react";
import style from "./CoverImage.module.scss";
import clsx from "clsx";
import { FilterForm } from "../FilterForm";

export function CoverImage(props: PropsWithChildren) {
	return (
		<div
			className={clsx(
				"w-full  bg-cover mx-auto md:h-[500px]",
				style.backgroundImage
			)}>
			<div className="container py-6">
				<h1 className="text-center text-6xl font-bold mb-2 pb-0 text-white">
					NEWSER
				</h1>
				<h1 className="text-center my-12 sm:text-2xl mt-0 pt-0 text-white ">
					One stop search for all news
				</h1>
				<div className="mx-auto lg:w-[50vw] md:w-[60vw] ">
					<FilterForm />
				</div>
				{props.children}
			</div>
		</div>
	);
}
