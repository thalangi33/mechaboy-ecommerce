import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black pb-16">
      {/* grid grid-cols-4 max-lg:grid-cols-2 max-lg:gap-y-10 */}
      <div className="py-10 px-20 max-lg:px-10 max-sm:px-10 flex max-sm:flex-col max-sm:gap-y-10 justify-center text-white 2xl:mx-auto 2xl:w-[1536px]">
        <div className="">
          <div className="font-bold text-xl mb-5">MK Ecommerce</div>
          <div className="text-sm mb-1">Follow Us</div>
          <div className="flex flex-row gap-x-2">
            <Instagram />
            <Twitter />
            <Facebook />
            <Youtube />
          </div>
        </div>
        <div className="flex max-sm:gap-y-5 max-sm:mx-0 max-sm:justify-between max-lg:mx-10 max-lg:gap-x-10 mx-20 gap-x-20">
          <div>
            <div className="font-bold text-xl mb-5">About</div>
            <div className="flex flex-col gap-y-1">
              <NavLink key="About" to="/" className="text-sm">
                About MK Ecommerce
              </NavLink>
              <NavLink key="Contact" to="/" className="text-sm">
                Contact
              </NavLink>
              <NavLink key="TOS" to="/" className="text-sm">
                Terms of Service
              </NavLink>
            </div>
          </div>
          <div>
            <div className="font-bold text-xl mb-5">Categories</div>
            <div className="flex flex-col gap-y-1">
              <NavLink key="Keyboards" to="/keyboards" className="text-sm">
                Keyboards
              </NavLink>
              <NavLink key="Keycaps" to="/keycaps" className="text-sm">
                Keycaps
              </NavLink>
              <NavLink key="Keyboards" to="/keyboards" className="text-sm">
                Switches
              </NavLink>
            </div>
          </div>
        </div>

        <div className="">
          <div className="font-bold text-xl mb-5">Support</div>
          <div className="flex flex-col gap-y-1">
            <NavLink key="FAQ" to="/" className="text-sm">
              FAQ
            </NavLink>
            <NavLink key="Shipping" to="/" className="text-sm">
              Shipping Policy
            </NavLink>
            <NavLink key="Refund" to="/" className="text-sm">
              Refund Policy
            </NavLink>
            <NavLink key="Return" to="/" className="text-sm">
              Return Policy
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
