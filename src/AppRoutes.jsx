import React from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Login, NotFound, Unauthorized } from "@pages";
import ProtectRoute from "./routes/ProtectRoute";
import Layout from "./layout/Layout";

const defaultRoles = ["user", "admin"];

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Route Within the App */}
      <Route path="/" element={<ProtectRoute element={<Layout />} />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
