
import SiteRoot from "../pages/site/SiteRoot"
import Home from "../pages/site/home"
import ContactUs from "../pages/site/ContactUs"
import AboutUs from "../pages/site/AboutUs"
import ErrorPage from "../pages/site/error"
const ROUTES =[
    {
        path:"/",
        element:<SiteRoot/>,
        children:[
            {
                path:"",
                element:<Home/>
            },   {
                path:"/contact",
                element:<ContactUs/>
            },
            {
                path:"/about",
                element:<AboutUs/>
            },
            {
                path:"*",
                element:<ErrorPage/>
            }
        ]
    }
]
export default ROUTES;