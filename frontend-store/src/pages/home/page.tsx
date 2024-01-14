import Carousel from "./components/carousel";

import { toast } from "react-hot-toast";
import { useEffect } from "react";
import FeaturedGrid from "./components/featured-grid";
import HomeHeader from "./components/home-header";

const HomePage = () => {
  const isLoggedOut = JSON.parse(
    localStorage.getItem("isLoggedOut") || "false"
  );

  useEffect(() => {
    if (isLoggedOut) {
      toast.success("You are logged out now", { id: "Log out success" });
      localStorage.removeItem("isLoggedOut");
    }
  }, []);

  return (
    <div className="p-5">
      <HomeHeader />
      <FeaturedGrid />
      <div className="flex flex-col gap-y-5">
        <Carousel heading="Best Seller" fetchAPI="/api/product/best-sellers" />
        <Carousel
          heading="Featured Keyboards"
          description="We sell high-quality, community driven mechanical keyboards of various layouts ranging from 60% up to 100%, and with various materials including aluminum and plastic."
          fetchAPI="/api/product/featured-keyboards"
        />
        <Carousel
          heading="Featured Keycaps"
          description="Mechanical keyboard keycaps are what tie your keyboard theme together. We sell beautiful, thematic PBT keycaps to help you build a keyboard that matches the theme of your dreams."
          fetchAPI="/api/product/featured-keycaps"
        />
        <Carousel
          heading="Featured Switches"
          description="Mechanical keyboard switches come in all shapes and sizes. We offer a wide selection of switches to suit your needs: linear, clicky, tactile, even silent switches."
          fetchAPI="/api/product/featured-switches"
        />
      </div>
    </div>
  );
};

export default HomePage;
