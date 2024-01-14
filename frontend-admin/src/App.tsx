import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/login";
import HomePage from "./pages/home";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound";
import { useAuthContext } from "./hooks/useAuthContext";
import ProtectedRoute from "./route/ProtectedRoute";
import CategoryPage from "./pages/category/page";
import CategoryEditPage from "./pages/category/edit-page";
import BrandPage from "./pages/brand/page";
import BrandEditPage from "./pages/brand/edit-page";
import ColorPage from "./pages/color/page";
import ColorEditPage from "./pages/color/edit-page";
import ProductPage from "./pages/products/page";
import ProductEditPage from "./pages/products/edit-page";
import SubcategoryPage from "./pages/subcategory/page";
import SubcategoryEditPage from "./pages/subcategory/edit-page";
import OrderPage from "./pages/order/page";

function App() {
  const { state } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<ProtectedRoute user={state.user} />}>
          <Route element={<RootLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="category">
              <Route path="" element={<CategoryPage />} />
              <Route path="new" element={<CategoryEditPage />} />
              <Route path=":id" element={<CategoryEditPage />} />
            </Route>
            <Route path="subcategory">
              <Route path="" element={<SubcategoryPage />} />
              <Route path="new" element={<SubcategoryEditPage />} />
              <Route path=":id" element={<SubcategoryEditPage />} />
            </Route>
            <Route path="brand">
              <Route path="" element={<BrandPage />} />
              <Route path="new" element={<BrandEditPage />} />
              <Route path=":id" element={<BrandEditPage />} />
            </Route>
            <Route path="color">
              <Route path="" element={<ColorPage />} />
              <Route path="new" element={<ColorEditPage />} />
              <Route path=":id" element={<ColorEditPage />} />
            </Route>
            <Route path="product">
              <Route path="" element={<ProductPage />} />
              <Route path="new" element={<ProductEditPage />} />
              <Route path=":id" element={<ProductEditPage />} />
            </Route>
            <Route path="order">
              <Route path="" element={<OrderPage />} />
            </Route>
          </Route>
        </Route>
        {/* <Route
          path=""
          element={
            <ProtectedRoute user={state.user}>
              <HomePage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
