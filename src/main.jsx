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
import HouseRenterDashboard from './Pages/HouseRentor/HouseRentorHomepage/HouseRenterDashboard.jsx';
import HouseRenterPanel from './Pages/HouseRentor/HouseRenterPanel/HouseRenterPanel.jsx';
import OwnerRoute from './Pages/PrivateRoute/OwnerRoute.jsx';
import RenterRoute from './Pages/PrivateRoute/RenterRoute.jsx';

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
        loader: ({ params }) => fetch(`https://house-hunter-server-murex.vercel.app/houseDetails/${params.id}`),
        element: <RenterRoute><HouseDetails></HouseDetails></RenterRoute>
      },
    ]
  },
  {
    path: "/houseOwner",
    element: <OwnerRoute><HouseOwnerDashboard></HouseOwnerDashboard></OwnerRoute>,
    children: [
      {
        path: "/houseOwner",
        element: <OwnerRoute><HouseOwnerPanel></HouseOwnerPanel></OwnerRoute>
      },
      {
        path: "addHouses",
        element: <OwnerRoute><AddHouses></AddHouses></OwnerRoute>
      },
      {
        path: "houseList",
        element: <OwnerRoute><HouseList></HouseList></OwnerRoute>
      },
      {
        path: "houseList/updateHouse/:id",
        loader: ({ params }) => fetch(`https://house-hunter-server-murex.vercel.app/houseDetails/${params.id}`),
        element: <OwnerRoute><UpdateHouse></UpdateHouse></OwnerRoute>
      },
    ]
  },
  {
    path: "/houseRenter",
    element: <RenterRoute><HouseRenterDashboard></HouseRenterDashboard></RenterRoute>,
    children: [
      {
        path: "/houseRenter",
        element: <RenterRoute><HouseRenterPanel></HouseRenterPanel></RenterRoute>
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
