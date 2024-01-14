import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedGrid = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 mb-5">
      <div
        className="cursor-pointer rounded-3xl bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"
        onClick={() => navigate("/keyboards/kbdfans/tofu60-2-0")}
      >
        <div className="h-[200px] max-lg:flex-col max-xl:h-[350px] max-sm:h-[325px] bg-[radial-gradient(at_left_top,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0)_70%)] overflow-hidden flex items-center relative text-white font-bold rounded-3xl">
          <div className="p-5 flex flex-col gap-y-1 absolute top-0 left-0 z-10">
            <div className="flex">
              <h2 className="mr-2 text-purple-600 font-semibold">FEATURED</h2>
              <h2 className="">Keyboard</h2>
            </div>
            <h2 className="text-2xl font-bold">TG67 V3</h2>
            <h2 className="text-xl">$700</h2>
            <h2 className=" text-blue-600">Learn More</h2>
          </div>
          <img
            className="h-auto w-[450px] transition-all object-cover ml-auto max-lg:mt-auto"
            src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_800/f_auto/v1/api-images/misc/tg67-v3-early-access/angle/whale_vderqb"
          />
        </div>
      </div>
      <div
        className="cursor-pointer rounded-3xl bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-rose-100 to-teal-600"
        onClick={() => navigate("/keyboards/kbdfans/tofu60-2-0")}
      >
        <div className="h-[200px] max-lg:flex-col max-xl:h-[350px] max-sm:h-[325px] bg-[radial-gradient(at_left_top,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0)_70%)] overflow-hidden flex items-center relative text-white font-bold rounded-3xl">
          <div className="p-5 flex flex-col gap-y-1 absolute top-0 left-0 z-10">
            <div className="flex">
              <h2 className="mr-2 text-rose-300 font-semibold">FEATURED</h2>
              <h2 className="">Keycaps</h2>
            </div>
            <h2 className="text-2xl font-bold">Hippo PBT</h2>
            <h2 className="text-xl">$700</h2>
            <h2 className="">Learn More</h2>
          </div>
          <img
            className="h-auto w-[450px] transition-all object-cover ml-auto max-xl:mt-auto"
            src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/hippo-pbt/DSC00387_2_-PLP_vfhpkw"
          />
        </div>
      </div>
      <div
        className="cursor-pointer rounded-3xl bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-500 via-pink-600 to-amber-600"
        onClick={() => navigate("/switches/kbdfans/salmon-tactile")}
      >
        <div className="h-[200px] max-lg:flex-col max-xl:h-[350px] max-sm:h-[325px] bg-[radial-gradient(at_left_top,rgba(0,0,0,0.14)_60%,rgba(0,0,0,0)_70%)]  overflow-hidden flex items-center relative text-white font-bold rounded-3xl">
          <div className="p-5 flex flex-col gap-y-1 absolute top-0 left-0 z-10">
            <div className="flex">
              <h2 className="mr-2 text-yellow-500 font-semibold">FEATURED</h2>
              <h2 className="">Switches</h2>
            </div>
            <h2 className="text-2xl font-bold">Salmon Tactile</h2>
            <h2 className="text-xl">$700</h2>
            <h2 className="">Learn More</h2>
          </div>
          <img
            className="h-auto w-[225px] transition-all object-cover ml-auto max-xl:mt-auto"
            src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/salmons/salmon-tactile-switch_m2p7sy"
          />
        </div>
      </div>
      <div
        className="cursor-pointer rounded-3xl bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-900 to-gray-600 bg-gradient-to-r"
        onClick={() => navigate("/keyboards/kbdfans/tofu60-2-0")}
      >
        <div className="h-[200px] max-lg:flex-col max-xl:h-[350px] max-sm:h-[325px] overflow-hidden flex items-center relative text-white font-bold rounded-3xl bg-[radial-gradient(at_left_top,rgba(0,0,0,0.14)_60%,rgba(0,0,0,0)_70%)]">
          <div className="p-5 flex flex-col gap-y-1 absolute top-0 left-0 z-10">
            <div className="flex">
              <h2 className="mr-2 text-purple-600 font-semibold">FEATURED</h2>
              <h2 className="">Keyboard</h2>
            </div>
            <h2 className="text-2xl font-bold">Keychron Q1 Pro Wireless</h2>
            <h2 className="text-xl">$700</h2>
            <h2 className=" text-blue-600">Learn More</h2>
          </div>
          <div className="overflow-hidden absolute right-5 z-0 ml-5 max-xl:bottom-10">
            <img
              className="h-auto w-[350px] transition-all object-cover ml-auto"
              src="https://res.cloudinary.com/kineticlabs/image/upload/q_auto/c_fit,w_590/f_auto/v1/api-images/products/keychron-q1-pro-keyboard/metadata/casings/Q1_Pro_Black_Casing_yxoxy0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGrid;
