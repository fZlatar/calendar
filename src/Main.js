import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
const { DateTime } = require("luxon");

const Main = () => {
   const navigate = useNavigate();
   const location = useLocation();
   useEffect(() => {
      const date = DateTime.local();
      if(location.pathname === "/") {
         navigate("/" + date.toFormat("yyyy-MM"));
      }
   }, [location, navigate])

   return (
      <Outlet/>
   );
}
 
export default Main;