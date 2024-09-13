import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/themeProvider";

import ReactQueryProvider from "@/lib/reactQueryProvider";
import { navItems } from "@/lib/constants";
import { Toaster } from "@/components/ui/toaster";
import { FilterContextProvider } from "@/context/FiltersContext";

const lato = Lato({
	weight: ["100", "300", "400", "700", "900"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Newser",
	description: "A Demo Project for Innoscripta",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body className={lato.className}>
				<ReactQueryProvider>
					<FilterContextProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange>
							<Toaster />
							<Header navItems={navItems} />
							<div className="mx-auto">{children}</div>
						</ThemeProvider>
					</FilterContextProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
