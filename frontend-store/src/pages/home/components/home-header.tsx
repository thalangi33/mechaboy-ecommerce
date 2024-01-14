import React from "react";
import keyboardIcon from "../../../images/keyboard-icon.webp";
import keycapIcon from "../../../images/keycap-icon.webp";
import switchIcon from "../../../images/switch-icon.webp";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";

const HomeHeader = () => {
  const navigate = useNavigate();
  const icons = [
    {
      name: "Keyboards",
      icon: keyboardIcon,
      href: "keyboards",
      bgGradient:
        "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-orange-500 to-yellow-300",
    },
    {
      name: "Keycaps",
      icon: keycapIcon,
      href: "keycaps",
      bgGradient:
        "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-sky-400 to-sky-200",
    },
    {
      name: "Switches",
      icon: switchIcon,
      href: "switches",
      bgGradient:
        "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-400 to-pink-600",
    },
  ];
  return (
    <div className="flex max-lg:flex-col my-5 max-lg:gap-y-5">
      <div className="w-3/5  text-5xl font-bold tracking-tight max-lg:w-full max-lg:justify-center ">
        <h2 className="max-lg:text-center">Welcome to the world of</h2>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 max-lg:text-center">
          mechanical keyboards.
        </h2>
      </div>
      <div className="w-2/5 flex gap-x-12 justify-end mr-10 max-lg:w-full max-lg:justify-center max-sm:gap-x-5">
        {icons.map((icon: any) => (
          <div
            className="flex flex-col justify-items-center cursor-pointer"
            onClick={() => navigate(icon.href)}
          >
            <img
              className={cn(
                "w-[75px] max-sm:w-[65px] rounded-full aspect-square mb-2 mx-auto ",
                icon.bgGradient
              )}
              src={icon.icon}
            />
            <p className=" text-lg font-bold tracking-tighter text-center">
              {icon.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeHeader;
