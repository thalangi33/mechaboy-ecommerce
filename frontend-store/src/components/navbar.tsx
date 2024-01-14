import React from "react";
import MainNav from "./main-nav";
import { Button } from "./ui/button";
import MenuSheet from "./menu-sheet";
import ShoppingCartSheet from "./shopping-cart/shopping-cart-sheet";
import LoginModal from "./login/login-modal";
import { UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="border-b">
      <div className="flex px-6 h-16 items-center 2xl:w-[1536px] 2xl:mx-auto ">
        <MenuSheet />
        <MainNav />
        {user ? (
          <NavLink to="/account" className="ml-auto">
            <UserCircle className="h-7 w-7" />
          </NavLink>
        ) : (
          <></>
        )}
        <LoginModal margin={"ml-auto"} />
        <div className="ml-4"></div>
        <ShoppingCartSheet />
      </div>
    </div>
  );
};

export default Navbar;
