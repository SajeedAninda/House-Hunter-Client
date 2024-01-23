import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Register from './Pages/Register/Register.jsx';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login/Login.jsx';
import AuthProvider from './AuthenticationProvider/AuthProvider.jsx';
import ViewPage from './Pages/ViewPage/ViewPage.jsx';
import HouseOwnerDashboard from './Pages/HouseOwner/HouseOwnerDashboard/HouseOwnerDashboard.jsx';
import HouseOwnerPanel from './Pages/HouseOwner/HouseOwnerPanel/HouseOwnerPanel.jsx';
import AddHouses from './Pages/HouseOwner/AddHouses/addHouses.jsx';
import HouseList from './Pages/HouseOwner/HouseList/HouseList.jsx';
import UpdateHouse from './Pages/HouseOwner/UpdateHouse/UpdateHouse.jsx';
import Homepage from './Pages/Guest/Homepage.jsx';
import HouseDetails from './Components/HouseDetails/HouseDetails.jsx';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>
      },
      {
        path: "/houseDetails/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/houseDetails/${params.id}`),
        element: <HouseDetails></HouseDetails>
      },
    ]
  },
  {
    path: "/houseOwner",
    element: <HouseOwnerDashboard></HouseOwnerDashboard>,
    children: [
      {
        path: "/houseOwner",
        element: <HouseOwnerPanel></HouseOwnerPanel>
      },
      {
        path: "addHouses",
        element: <AddHouses></AddHouses>
      },
      {
        path: "houseList",
        element: <HouseList></HouseList>
      },
      {
        path: "houseList",
        element: <HouseList></HouseList>
      },
      {
        path: "houseList/updateHouse/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/houseDetails/${params.id}`),
        element: <UpdateHouse></UpdateHouse>
      },
    ]
  },
  {
    path: "/register",
    element: <Register></Register>
  },
  {
    path: "/login",
    element: <Login></Login>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
