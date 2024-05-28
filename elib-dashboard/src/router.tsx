import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import BooksPage from "./pages/BooksPage";

 const router =createBrowserRouter([
   
    {
        path:'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path:'home',
                element: <HomePage />
            },
            {
                path:'books',
                element: <BooksPage />
            }
        ],
    },
    {
        path:'/login',
        element: <LoginPage />
    },
    {
        path:'/register',
        element: <RegisterPage />
    }


]);

export default function App(){
    return <RouterProvider router={router} />
}