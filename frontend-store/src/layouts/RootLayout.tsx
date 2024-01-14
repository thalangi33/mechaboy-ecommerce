import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import ScrollToTop from "../components/scrollToTop";

const RootLayout = () => {
  return (
    <ScrollToTop>
      <div className="flex flex-col min-h-screen">
        {/* mx-auto max-w-screen-2xl */}
        <Navbar />
        <main className="mb-auto 2xl:w-[1536px] 2xl:mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ScrollToTop>
  );
};

export default RootLayout;
