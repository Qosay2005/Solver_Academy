import MainLayout from "./layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Courses from "./pages/courses/Courses";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout/>,
    children:[
        {
            index : true ,
            element:<Home/>
        },
        {
            path:"/courses",
            element:<Courses/>
        },
        {
            path:"/register",
            element: <Register/>
        },
        {
            path:"/cart",
            element: <Cart/>
        }
    ]
  },
]);
export default router;