import React from "react";
import "./App.css";
import HomePage from "./pages/home/page";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./route/protected-route";

import ShopPage from "./pages/shop/page";
import KeyboardsPage from "./pages/keyboards/page";
import KeycapsPage from "./pages/keycaps/page";
import SwitchesPage from "./pages/switches/page";
import ProductsPage from "./pages/products/page";
import AccountPage from "./pages/account/page";
import PersonalInfoPage from "./pages/account/personal-info/page";
import OrdersPage from "./pages/account/orders/page";
import AddressesPage from "./pages/account/addresses/page";
import FavoritesPage from "./pages/account/favorites/page";
import CartPage from "./pages/cart/page";
import BrandPage from "./pages/brands/page";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<RootLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="keyboards">
            <Route path="" element={<KeyboardsPage />} />
            <Route path=":brand">
              <Route path="" element={<BrandPage />} />
              <Route path=":product" element={<ProductsPage />} />
            </Route>
          </Route>
          <Route path="keycaps">
            <Route path="" element={<KeycapsPage />} />
            <Route path=":brand">
              <Route path="" element={<BrandPage />} />
              <Route path=":product" element={<ProductsPage />} />
            </Route>
          </Route>
          <Route path="switches">
            <Route path="" element={<SwitchesPage />} />
            <Route path=":brand">
              <Route path="" element={<BrandPage />} />
              <Route path=":product" element={<ProductsPage />} />
            </Route>
          </Route>
          <Route path="brands" element={<ProductsPage />} />

          {/* <Route path="products" element={<ProductsPage />} /> */}

          <Route path="account" element={<ProtectedRoute />}>
            <Route path="" element={<AccountPage />} />
            <Route path="personal-info" element={<PersonalInfoPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
          <Route path="cart" element={<ProtectedRoute />}>
            <Route path="" element={<CartPage />} />
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
