"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
    const path = usePathname();

    const isActive = path === href || path.startsWith(href + "/");

    return (
        <Link
            href={href}
            className={`font-medium ${isActive ? "text-primary" : ""
                }`}
        >
            {children}
        </Link>
    );
};

export default NavLink;