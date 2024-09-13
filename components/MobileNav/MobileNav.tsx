import React from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constants";
import { IoMenu } from "react-icons/io5";
import { NavItems } from "@/lib/types";

export const MobileNav = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
					<IoMenu size={30} />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>NEWSER</SheetTitle>
					{navItems.map((item, index) => (
						<MobileNavItems {...item} key={index}></MobileNavItems>
					))}
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

const MobileNavItems = ({ title }: NavItems) => <div>{title}</div>;
