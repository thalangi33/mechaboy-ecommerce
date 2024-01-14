import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const MainNav = () => {
  const pathname = useLocation().pathname;
  const routes = [
    { href: "/", label: "Overview", active: pathname === "/" },
    {
      href: "/category",
      label: "Categories",
      active: pathname === "/category",
    },
    {
      href: "/subcategory",
      label: "Subcategories",
      active: pathname === "/subcategory",
    },
    { href: "/product", label: "Products", active: pathname === "/product" },
    { href: "/brand", label: "Brands", active: pathname === "/brand" },
    { href: "/color", label: "Colors", active: pathname === "/color" },
    { href: "/order", label: "Orders", active: pathname === "/order" },
    { href: "/", label: "Settings", active: pathname === "/settings" },
  ];
  return (
    <nav className="flex flex-row gap-6 text-sm mx-10">
      {routes.map((route) => (
        <NavLink
          key={route.label}
          to={route.href}
          className={cn(
            "",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default MainNav;
