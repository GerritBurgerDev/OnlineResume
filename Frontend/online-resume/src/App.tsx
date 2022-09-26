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
import GlobalModalWrapper from "@/components/global-modal-wrapper/global-modal-wrapper";
import {useModalStore} from "@/stores/modal-store";
import {useNotificationStore} from "@/stores/notification-store";
import NotificationWrapper from "@/components/notification-wrapper/notification-wrapper";

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
    if (import.meta.env.DEV) {
      mountStoreDevtool('CommonStore', useCommonStore);
      mountStoreDevtool('NotificationStore', useNotificationStore);
      mountStoreDevtool('ModalStore', useModalStore);
    }
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <div className="page-content">
        <RouterProvider router={router} />
      </div>
      <GlobalModalWrapper />
      <NotificationWrapper />
    </div>
  )
}

export default App
