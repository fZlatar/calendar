import { useEffect, useRef } from "react";
const { DateTime } = require("luxon");

const Day = ({ day, date, data, setOverlay }) => {
   let thisDate = date.set({ day: day });

   const overlay = useRef(null);
   const exceptionRef = useRef(null);

   useEffect(() => {
      document.addEventListener('mousedown', handleClickListener);
      
      return () => {
        document.removeEventListener('mousedown', handleClickListener);
      };
   });

   const handleClickListener = (event) => {
      let clickedInside;
      if(exceptionRef) {
        clickedInside = !(overlay && overlay.current.contains(event.target)) || exceptionRef.current === event.target || exceptionRef.current.contains(event.target);
      }
      else {
        clickedInside = (overlay && overlay.current.contains(event.target));
      }
      if (clickedInside) return;
      else setOverlay(false);
   }
   
   return ( 
      <div ref={overlay} className="overlay">
         <div ref={exceptionRef} className="day">
            <h3>{thisDate.toFormat("yyyy MMMM dd")}</h3>
            {
               data.length !== 0 ?
               data.map(com => (
                  <Event info={com} key={com.sha}></Event>)):
               <h4>There are no commits this day!</h4>
            }
         </div>
      </div>
   );
}
 
export default Day;

const Event = ({ info }) => {
   return ( 
      <div className="card">
         <span>Name: <strong>{info.commit.author.name}</strong></span>
         <span>E-mail: {info.commit.author.email}</span>
         <span>Time: {DateTime.fromISO(info.commit.author.date).toFormat("HH:mm:ss")}</span>
         <span>Message: {info.commit.message}</span>
      </div>
   );
}