import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from './Main';
import Middle from './Middle';
import Error from './Error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route exact path="/" element={<Main/>}>
      <Route path=":date" element={<Middle/>} />
      <Route path="*" element={<Error message={"Wrong url!"}/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);