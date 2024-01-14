import React from "react";
import MainNav from "./main-nav";
import { Button } from "./ui/button";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  return (
    <div className="border-b flex gap-5 mx-3 h-16 items-center">
      <h1 className="text-lg font-bold tracking-tight">Admin</h1>
      <MainNav />
      <Button onClick={logout} className="ml-auto">
        Log out
      </Button>
    </div>
  );
};

export default Navbar;
