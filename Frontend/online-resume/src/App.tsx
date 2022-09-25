import React, {useEffect} from 'react';
import '@/helpers/axios-interceptor';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.scss'
import Navbar from "@/components/navbar/navbar";
import Home from "@/pages/home/home";
import Error from "@/pages/error/error";
import {useCommonStore} from "@/stores/common-store";
import {mountStoreDevtool} from "simple-zustand-devtools";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />
    },
    {
      path: "/about-me",
      element: <div>Some test 2 sdf</div>
    }
  ]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      mountStoreDevtool('CommonStore', useCommonStore);
    }
  }, []);

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
