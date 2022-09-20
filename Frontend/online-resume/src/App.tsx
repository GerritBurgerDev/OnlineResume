import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.scss'
import Navbar from "@/components/navbar/navbar";
import Home from "@/pages/home/home";
import ErrorPage from "@/pages/error-page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: "/about-me",
      element: <div>Some test 2 sdf</div>
    }
  ])

  return (
    <div className="app-container">
      <Navbar />
      <div className="page-content">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
