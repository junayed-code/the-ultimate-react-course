/* eslint-disable react-refresh/only-export-components */
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { lazy } from "react";

import Homepage from "@pages/Homepage";
import Form from "@components/Form";
import City from "@components/City";
import CityList from "@components/CityList";
import CountryList from "@components/CountryList";
import ProtectedRoute from "@components/ProtectedRoute";
import BaseLayout from "@layout/BaseLayout";

const Login = lazy(() => import("@pages/Login"));
const Product = lazy(() => import("@pages/Product"));
const Pricing = lazy(() => import("@pages/Pricing"));
const AppLayout = lazy(() => import("@layout/AppLayout"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<BaseLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="cities" replace />} />
          <Route path="form" element={<Form />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
        </Route>
      </Route>
    </Route>
  )
);
