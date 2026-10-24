
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import NFTList from "./components/NFTList";
import Mercado from "./pages/admin/Mercado";
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoute from "./pages/admin/AdminRoute";

import "./App.css";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <NFTList />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mercado/:id" element={<Mercado />} />
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
            />
         
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
