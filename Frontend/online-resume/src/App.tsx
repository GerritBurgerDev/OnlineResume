import React, {useEffect} from 'react';
import '@/helpers/axios-interceptor';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.scss'
import Navbar from "@/components/global/navbar/navbar";
import Home from "@/pages/home/home";
import Error from "@/pages/error/error";
import {useCommonStore} from "@/stores/common-store";
import {mountStoreDevtool} from "simple-zustand-devtools";
import GlobalModalWrapper from "@/components/global/global-modal-wrapper/global-modal-wrapper";
import {useModalStore} from "@/stores/modal-store";
import {useNotificationStore} from "@/stores/notification-store";
import NotificationWrapper from "@/components/global/notification-wrapper/notification-wrapper";
import Experience from "@/pages/experience/experience";
import {useProjectsStore} from "@/stores/project-store";
import { gapi } from 'gapi-script';
import {GOOGLE_CLIENT_ID} from "@/constants/global-constants";
import {useProfileStore} from "@/stores/profile-store";
import Recommendations from "@/pages/recommendations/recommendations";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />
    },
    {
      path: "/projects",
      element: <Experience />
    },
    {
      path: "/recommendations",
      element: <Recommendations />
    },
    {
      // path: "/about-me",
      // element: <div>About Me Section</div>
    }
  ]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      mountStoreDevtool('CommonStore', useCommonStore);
      mountStoreDevtool('NotificationStore', useNotificationStore);
      mountStoreDevtool('ModalStore', useModalStore);
      mountStoreDevtool('ProjectStore', useProjectsStore);
      mountStoreDevtool('ProfileStore', useProfileStore);
    }

    const initClient = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.email'
      });
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    gapi.load('client:auth2', initClient);
  }, []);

  return (
    <div className="app-container">
      <div className="wave header-layer"></div>
      <Navbar />
      <div className="page-content">
        <RouterProvider router={router} />
      </div>
      <div className="bottom-peaks peaks-layer"></div>
      <GlobalModalWrapper />
      <NotificationWrapper />
    </div>
  )
}

export default App
