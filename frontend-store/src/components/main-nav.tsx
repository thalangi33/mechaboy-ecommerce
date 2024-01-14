import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { ReactComponent as Logo } from "../images/logo.svg";

const MainNav = () => {
  const pathname = useLocation().pathname;
  const routes = [
    {
      href: "/shop",
      label: "Shop",
      active: pathname === "/shop",
    },
    {
      href: "/keyboards",
      label: "Keyboards",
      active: pathname === "/keyboards",
    },
    { href: "/keycaps", label: "Keycaps", active: pathname === "/keycaps" },
    { href: "/switches", label: "Switches", active: pathname === "/switches" },
  ];
  return (
    <nav className="flex flex-row gap-6 text-md mx-5 items-center">
      <NavLink
        key="Home"
        to="/"
        className={cn(
          "",
          pathname === "/"
            ? "text-black dark:text-white"
            : "text-muted-foreground"
        )}
      >
        <Logo className="h-12 w-32"/>
      </NavLink>

      {routes.map((route) => (
        <NavLink
          key={route.label}
          to={route.href}
          className={cn(
            "max-sm:hidden",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default MainNav;
