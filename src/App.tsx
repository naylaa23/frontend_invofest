import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Beranda from "./pages/Beranda";
import Seminar from "./pages/Seminar";
import Competition from "./pages/Competition";
import Login from "./pages/Login";
import Talkshow from "./pages/Talkshow";
import Workshop from "./pages/Workshop";
import Register from "./pages/Register";

import Dashboard from "./pages/dashboard/Dashboard";
import Biodata from "./pages/biodata/biodata";

import CategoryIndex from "./pages/dashboard/kategori/CategoryIndex";
import CategoryCreate from "./pages/dashboard/kategori/CategoryCreate";
import CategoryEdit from "./pages/dashboard/kategori/CategoryEdit";

import EventIndex from "./pages/dashboard/event/EventIndex";
import EventCreate from "./pages/dashboard/event/EventCreate";
import EventEdit from "./pages/dashboard/event/EventEdit";

import PembicaraIndex from "./pages/dashboard/pembicara/PembicaraIndex";
import PembicaraCreate from "./pages/dashboard/pembicara/PembicaraCreate";
import PembicaraEdit from "./pages/dashboard/pembicara/PembicaraEdit";

import UserIndex from "./pages/dashboard/user/UserIndex";
import UserCreate from "./pages/dashboard/user/UserCreate";
import UserEdit from "./pages/dashboard/user/UserEdit";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/talkshow" element={<Talkshow />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* DASHBOARD */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />

            {/* BIODATA */}
            <Route
              path="/dashboard/biodata"
              element={<Biodata />}
            />

            {/* USER */}
            <Route
              path="/dashboard/user"
              element={<UserIndex />}
            />

            <Route
              path="/dashboard/user/create"
              element={<UserCreate />}
            />

            <Route
              path="/dashboard/user/edit/:id"
              element={<UserEdit />}
            />

            {/* CATEGORY */}
            <Route
              path="/dashboard/category"
              element={<CategoryIndex />}
            />

            <Route
              path="/dashboard/category/create"
              element={<CategoryCreate />}
            />

            <Route
              path="/dashboard/category/edit/:id"
              element={<CategoryEdit />}
            />

            {/* EVENT */}
            <Route
              path="/dashboard/event"
              element={<EventIndex />}
            />

            <Route
              path="/dashboard/event/create"
              element={<EventCreate />}
            />

            <Route
              path="/dashboard/event/edit/:id"
              element={<EventEdit />}
            />

            {/* PEMBICARA */}
            <Route
              path="/dashboard/pembicara"
              element={<PembicaraIndex />}
            />

            <Route
              path="/dashboard/pembicara/create"
              element={<PembicaraCreate />}
            />

            <Route
              path="/dashboard/pembicara/edit/:id"
              element={<PembicaraEdit />}
            />

          </Route>
        </Route>

        {/* REDIRECT */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}