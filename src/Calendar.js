import Day from "./Day";
import { useState } from "react";

const { DateTime } = require("luxon");

const Calendar = ({date, data}) => {
   const [isOverlayVisible, setOverlayVisible] = useState(false);
   const [day, setDay] = useState(date.day);
   const [dayCommits, setDayCommits] = useState(null);

   return ( 
      <div className="conteiner">
      <table className="calendar">
         <thead>
            <tr>
               <th>Monday</th>
               <th>Tuesday</th>
               <th>Wednesday</th>
               <th>Thursday</th>
               <th>Friday</th>
               <th>Saturday</th>
               <th>Sunday</th>
            </tr>
         </thead>
         <Days date={date} setDay={setDay} setOverlay={setOverlayVisible} data={data} setDayCommits={setDayCommits}></Days>
      </table>
      {isOverlayVisible && <Day day={day} date={date} setOverlay={setOverlayVisible} data={dayCommits}></Day>}
      </div>
   );
}
 
export default Calendar;

const Days = ({ date, setDay, setOverlay, data, setDayCommits }) => {
   const weeks = sortDays(date, data);

   return (
      <tbody>
         {weeks.map((week, index) => (
            <tr key={index}>
               {week.map((day) => {
                  if(day["disabled"] === true) {
                     return (
                        <td className="cell disabled" key={day["date"]}>
                           {day["day"]}
                           <button disabled className="cell-button disabled"></button>
                        </td>
                     );
                  }
                  return (
                     <td className="cell" key={day["date"]}>
                        <span>{day["day"]}</span>
                        <button onClick={() => openDay(day, setOverlay, setDay, date, setDayCommits, data)} className="cell-button"></button>
                        <div className="commits-conetiner">
                           {day["commits"].map(com => (
                              <div className="commit" key={com.sha}>
                                 {com.commit.author.name}
                              </div>
                           ))}
                        </div>
                     </td>
                  );
               })}
            </tr>
         ))}
      </tbody>
   );
}

function openDay(day, setOverlay, setDay, date, setDayCommits, data) {
   let tmpDate = date.set({ day: day["day"]});
   setOverlay(true);
   setDay(day["day"]);
   setDayCommits(data.filter(com => {
      let comDate = DateTime.fromISO(com.commit.author.date);
      if(comDate.year === tmpDate.year && comDate.month === tmpDate.month && comDate.day === tmpDate.day) {
         return true;
      }
      return false;
   }));
}

function sortDays(date, data) {
   let firstDay = date.set({ day: 1 }).weekday;
   let daysInMonth = date.daysInMonth;
   let lastDay = date.endOf("month").weekday;
   let lastMonthDays = date.minus({ months: 1}).daysInMonth;
   let tmpDate = date.set({ day: 1 });
   var weeks = [];
   var weeksNum = 0;
   var daysOfWeek = [];

   if(firstDay !== 1) {
      tmpDate = tmpDate.minus({ days: firstDay-1});
   }

   let counter = 0;
   for(let i = -(firstDay-2); i <= daysInMonth + (7 - lastDay); i++) {
      if(counter % 7 === 0) {
         weeks[weeksNum++] = daysOfWeek;
         daysOfWeek = [];
      }
      if(i <= 0) {
         daysOfWeek.push({
            "day": lastMonthDays + i,
            "date": tmpDate,
            "disabled": true,
            "start": i === -firstDay,
            "end": false
         });
      }
      else if(i > daysInMonth) {
         daysOfWeek.push({
            "day": i % daysInMonth,
            "date": tmpDate,
            "disabled": true,
            "start": false,
            "end": i === daysInMonth + (6 - lastDay)
         });
      }
      else {
         let commits = data.filter(com => {
            if(DateTime.fromISO(com.commit.author.date).day === i) {
               return true;
            }
            return false;
         })
         
         daysOfWeek.push({
            "day": i,
            "date": tmpDate,
            "disabled": false,
            "start": date.set({ "day": i }).weekday === 1,
            "end": date.set({ "day": i }).weekday === 7,
            "commits": commits
         });
      }
      ++counter;
      tmpDate = tmpDate.plus({ days: 1});
   }
   weeks[weeksNum++] = daysOfWeek;
   return weeks;
}