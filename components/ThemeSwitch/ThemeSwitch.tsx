"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { getItemLS, isClient, storeItemLS } from "@/lib/utils";
import { useEffect } from "react";
import { LOCALSTORAGE_KEYS, spring } from "@/lib/constants";
import { ThemeOptions } from "@/lib/types";

export function ThemeSwitch() {
	const { setTheme } = useTheme();
	const selectedTheme =
		isClient() && (getItemLS(LOCALSTORAGE_KEYS.THEME) || ThemeOptions.LIGHT);
	const isDarkModeOn = selectedTheme === ThemeOptions.DARK;
	const toggleSwitch = () => {
		const incomingTheme = isDarkModeOn ? ThemeOptions.LIGHT : ThemeOptions.DARK;
		setTheme(incomingTheme);
		storeItemLS(LOCALSTORAGE_KEYS.THEME, incomingTheme);
	};

	useEffect(() => {
		if (selectedTheme) {
			setTheme(selectedTheme);
		}
	}, [selectedTheme, setTheme]);

	return (
		<div
			onClick={toggleSwitch}
			className={`flex-start flex h-[40px] w-[70px] rounded-[50px] bg-zinc-100 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${
				isDarkModeOn && "place-content-end"
			}`}>
			<motion.div
				className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black/90"
				layout
				transition={spring}>
				<motion.div whileTap={{ rotate: 360 }}>
					{isDarkModeOn ? (
						<RiSunFill className="h-4 w-4 text-yellow-300" />
					) : (
						<RiMoonClearFill className="h-4 w-4 text-slate-200" />
					)}
				</motion.div>
			</motion.div>
		</div>
	);
}
