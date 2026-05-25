import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import DashboardFarmer from "./DashboardFarmer/DashboardFarmer";
import ProductFarmer from "./DashboardFarmer/productFarmer";

export default function App() {
  return (
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={<ProductsPage />}
        />

        {/* PRODUCT DETAIL */}
        <Route
          path="/product/:productId"
          element={<ProductDetailPage />}
        />

        {/* FARMER DASHBOARD */}
        <Route
          path="/dashboard"
          element={<DashboardFarmer />}
        />

        {/* FARMER PRODUCTS */}
        <Route
          path="/farmer-products"
          element={<ProductFarmer />}
        />

      </Routes>
  );
}