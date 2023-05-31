import { createBrowserRouter } from "react-router-dom";

import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
// import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";

import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyAppoient from "../../Pages/Dashboard/MyAppointment/MyAppoient";
import DashboardLayout from "../../Pages/Dashboard/Dashboard/DashboartLayout";
import AllUser from "../../Pages/Dashboard/AllUsers/AllUser";
import Profile from "../../Pages/Profile/Profile";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        // path: '/profile',
        // element: <PrivateRoute><Profile /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppoient />

            },
            {
                path: '/dashboard/alluser',
                element: <AllUser />

            }
        ]
    }
])

export default router;