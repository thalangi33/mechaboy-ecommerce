import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../components/ui/sheet";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

const MenuSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-[350px]">
        <div className="flex flex-col gap-y-3 ml-2">
          <NavLink key="Home" to="/" onClick={() => setSheetOpen(false)}>
            <h2 className="text-2xl font-bold tracking-tight">Home</h2>
          </NavLink>
          <NavLink key="Home" to="/shop" onClick={() => setSheetOpen(false)}>
            <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          </NavLink>
          <div className="flex flex-col gap-y-1 ml-5">
            <NavLink
              key="Keyboards"
              to="/keyboards"
              onClick={() => setSheetOpen(false)}
            >
              <h2 className="text-lg font-medium tracking-tight">Keyboards</h2>
            </NavLink>
            <NavLink
              key="Keycaps"
              to="/keycaps"
              onClick={() => setSheetOpen(false)}
            >
              <h2 className="text-lg font-medium tracking-tight">Keycaps</h2>
            </NavLink>
            <NavLink
              key="Switches"
              to="/switches"
              onClick={() => setSheetOpen(false)}
            >
              <h2 className="text-lg font-medium tracking-tight">Switches</h2>
            </NavLink>
          </div>
          <NavLink key="FAQ" to="/" onClick={() => setSheetOpen(false)}>
            <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
          </NavLink>
          <NavLink key="About Us" to="/" onClick={() => setSheetOpen(false)}>
            <h2 className="text-2xl font-bold tracking-tight">About Us</h2>
          </NavLink>
          <NavLink key="Contact Us" to="/" onClick={() => setSheetOpen(false)}>
            <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
          </NavLink>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
