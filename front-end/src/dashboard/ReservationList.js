import React from "react";

function ReservationList({reservation}){

return (
    <div>
        {reservation.map((res)=>{
            return (
                <div>
               <p>{res.first_name}</p>
               <p>{res.last_name}</p>
               <p>{res.mobile_number}</p>
               <p>{res.people}</p>
               <p>{res.reservation_date}</p>
               <p>{res.reservation_time}</p>
               </div>
            )
        })}
    </div>
)
}


export default ReservationList