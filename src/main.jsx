import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Component/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path: "/login",
       element: <Login></Login>,
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
