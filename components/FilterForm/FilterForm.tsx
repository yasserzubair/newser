"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn, debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DataSources, SearchFilters } from "@/lib/types";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { categories, spring } from "@/lib/constants";
import {
	IoCaretDownCircleOutline,
	IoCaretUpCircleOutline,
	IoClose,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFilterContext } from "@/context/FiltersContext";
import { SelectSeparator } from "@radix-ui/react-select";

const filterFormSchema = z.object({
	date: z.date().optional(),
	category: z.string().optional(),
	text: z.string().optional(),
	source: z.string().optional(),
	authors: z.string().optional(),
});

const format = (value: Date) => {
	return value.toDateString();
};

type FilterFormValues = z.infer<typeof filterFormSchema>;

const defaultValues: Partial<FilterFormValues> = {
	category: "",
	text: "",
	source: "",
	authors: "",
};

export function FilterForm() {
	const form = useForm<FilterFormValues>({
		resolver: zodResolver(filterFormSchema),
		defaultValues,
		mode: "onChange",
	});

	const [expanded, setExpanded] = useState<boolean>(false);

	const { setFilters } = useFilterContext();

	function onSubmit(data: FilterFormValues) {
		const searchFilterData: SearchFilters = {
			date: data.date,
			category: data.category,
			text: data.text,
			source: data.source,
			authors: [data?.authors || ""],
		};
		setFilters(searchFilterData);
	}

	useEffect(() => {
		const debouncedCb = debounce(() => form.handleSubmit(onSubmit)(), 1000);
		const subscription = form.watch(debouncedCb);
		return () => subscription.unsubscribe();
	}, [form.handleSubmit, form.watch]);

	return (
		<Form {...form}>
			<form className="">
				<div className="lg:px-2">
					<FormField
						control={form.control}
						name="text"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-white">Search News</FormLabel>
								<FormControl>
									<Input placeholder="Keywords...." {...field} />
								</FormControl>
								<div className="flex flex-row justify-between align-middle">
									<FormDescription className="text-white">
										Type in any keywords you want to search
									</FormDescription>
									<Button
										type="button"
										className="py-0 h-[32px]"
										onClick={() => {
											setExpanded(!expanded);
										}}>
										<div className="flex flex-row items-center">
											<p className="mr-2 hidden sm:block">
												Advanced Search
											</p>
											{expanded ? (
												<IoCaretUpCircleOutline size={18} />
											) : (
												<IoCaretDownCircleOutline size={18} />
											)}
										</div>
									</Button>
								</div>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<motion.div
					style={{ overflow: "hidden" }}
					animate={{ height: expanded ? "auto" : 0 }}
					initial={{ height: 0 }}
					exit={{ height: 0 }}
					key={"container"}
					layout
					transition={spring}>
					{
						<div className={` overflow-hidden`}>
							<div className="md:w-1/3  md:inline-flex md:px-2 mb-4">
								<FormField
									control={form.control}
									name="date"
									render={({ field }) => (
										<FormItem className="flex flex-col w-full">
											<FormLabel className="text-white">
												Date
											</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"w-full pl-3 text-left font-normal justify-between",
																!field.value &&
																	"text-muted-foreground"
															)}>
															{field.value ? (
																format(field.value)
															) : (
																<span>Pick a date</span>
															)}
															<div className="flex self-end align-middle">
																{field.value && (
																	<IoClose
																		onClick={(e) => {
																			e.stopPropagation();
																			field.onChange(
																				undefined
																			);
																		}}
																		size={18}
																		className="mx-2"
																	/>
																)}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</div>
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto p-0"
													align="start">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) =>
															date > new Date() ||
															date < new Date("1900-01-01")
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											{/* <FormDescription className="text-white">
												Select Beignning Date
											</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="md:w-1/3 md:inline-flex md:px-2 mb-4">
								<FormField
									control={form.control}
									name="source"
									render={({ field }) => (
										<FormItem className="flex flex-col w-full">
											<FormLabel className="text-white">
												Source
											</FormLabel>
											<FormControl className="w-full">
												<Select
													onValueChange={field.onChange}
													value={field.value}
													defaultValue={field.value}>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Select a source" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectLabel className="opacity-50">
																Data Sources
															</SelectLabel>
															<SelectItem
																value={
																	DataSources.newsApiOrg
																}>
																News Api Org
															</SelectItem>
															<SelectItem
																value={
																	DataSources.theGuardian
																}>
																The Guardian
															</SelectItem>
															<SelectItem
																value={
																	DataSources.theNewsApi
																}>
																The News
															</SelectItem>
															<SelectItem
																value={
																	DataSources.nyTimesApi
																}>
																NY Times
															</SelectItem>
														</SelectGroup>
														<SelectSeparator />
														<Button
															className="w-full px-2 my-2"
															variant="secondary"
															size="sm"
															onClick={(e) => {
																e.stopPropagation();
																field.onChange(undefined);
															}}>
															Clear
														</Button>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
											{/* <FormDescription className="text-white">
												Select from the sources
											</FormDescription> */}
										</FormItem>
									)}
								/>
							</div>
							<div className="md:w-1/3 md:inline-flex md:px-2 mb-4">
								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem className="flex flex-col w-full">
											<FormLabel className="text-white">
												Categories
											</FormLabel>
											<FormControl className="w-full">
												<Select
													value={field.value}
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<SelectTrigger className="capitalize w-full">
														<SelectValue
															className="capitalize"
															placeholder="Select a category"
														/>
													</SelectTrigger>
													<SelectContent className="capitalize">
														<SelectGroup>
															<SelectLabel className="opacity-50">
																Categories
															</SelectLabel>
															{categories.map(
																mapCategories
															)}
														</SelectGroup>
														<SelectSeparator />
														<Button
															className="w-full px-2 my-2"
															variant="secondary"
															size="sm"
															onClick={(e) => {
																e.stopPropagation();
																field.onChange(undefined);
															}}>
															Clear
														</Button>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
											{/* <FormDescription className="text-white">
												Select from the categories
											</FormDescription> */}
										</FormItem>
									)}
								/>
							</div>
						</div>
					}
				</motion.div>
			</form>
		</Form>
	);
}

const mapCategories = (cat: string, index: number) => {
	return (
		<SelectItem className="capitalize" key={`cat-${index}`} value={cat}>
			{cat}
		</SelectItem>
	);
};
