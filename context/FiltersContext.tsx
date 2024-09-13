"use client";
import { SearchFilters } from "@/lib/types";
import React, { createContext, useState } from "react";
import { useContext } from "react";

interface FilterContextProps {
	filters: any;
	setFilters: (user: SearchFilters) => void;
}

export const FilterContext = createContext<FilterContextProps>({
	filters: {},
	setFilters: (filters: SearchFilters) => {},
});

export const FilterContextProvider = (props: any) => {
	const [filters, setFilters] = useState<SearchFilters>({});

	return (
		<FilterContext.Provider
			value={{
				filters: filters,
				setFilters: setFilters,
			}}>
			{props.children}
		</FilterContext.Provider>
	);
};

export const useFilterContext = () => useContext(FilterContext);
