import { useParams } from "react-router-dom";
import App from "./App";
import { DateTime } from "luxon";
import Error from "./Error";

const Middle = () => {
   const { date } = useParams();
   const regex = "[0-9]{4}-[0-9]{2}";

   if(!date.match(regex) || !(parseInt(date.split("-")[1], 10) <= 12)) {
      return(
         <Error message="Wrong url!"/>
      );
   } else {
      const dateTime = DateTime.fromFormat(date + "-01", "yyyy-MM-dd");
      return ( 
         <App date={dateTime}/>
      );
   }
}
 
export default Middle;