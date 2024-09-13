"use client";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import dynamic from "next/dynamic";
import SkeletonLoader from "../Skeleton";
import MobileNav from "../MobileNav";
import { NavItems } from "@/lib/types";
import Link from "next/link";
const ThemeSwitch = dynamic(() => import("../ThemeSwitch"), {
	ssr: false,
	loading: () => <SkeletonLoader width="70px" height="40px" />,
});

type Props = {
	navItems: NavItems[];
};

export function Header({ navItems }: Props) {
	return (
		<div className="border-bottom-solid border-b border-gray-200 py-2 sm:py-1 bg-background">
			<div className="container mx-auto">
				<NavigationMenu className="w-full max-w-full justify-between">
					<NavigationMenuList className="w-full max-w-full place-content-start">
						<NavigationMenuItem className="md:mr-8  w-[160px]">
							<Link passHref href="/">
								<Image
									className="md:py-1"
									src="/newser-logo.png"
									width={0}
									height={0}
									sizes="100vw"
									style={{ width: "100%", height: "auto" }}
									alt="Newser Logo"
								/>
							</Link>
						</NavigationMenuItem>

						{navItems.map((item, index) => (
							<NavItem key={`navitem-${index}`} {...item} />
						))}
					</NavigationMenuList>
					<NavigationMenuList>
						<NavigationMenuItem className="place-content-end">
							<ThemeSwitch />
						</NavigationMenuItem>
					</NavigationMenuList>
					<MobileNav />
				</NavigationMenu>
			</div>
		</div>
	);
}

const NavItem = ({ title, href }: NavItems) => (
	<NavigationMenuItem className="hidden md:block pr-4">
		<NavigationMenuLink href={href}>{title}</NavigationMenuLink>
	</NavigationMenuItem>
);
