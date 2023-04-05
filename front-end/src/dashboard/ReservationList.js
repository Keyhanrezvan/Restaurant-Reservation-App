import React from "react";

function ReservationList({reservation}){

const handleSeat=(e)=>{

}

    let bodyData = reservation.map((res) => {
        return (
            <tr className="">
            <td>
                {res.first_name}
            </td>
            <td>
                {res.last_name}
            </td>
            <td className="content_td">
               {res.mobile_number}
            </td>
            <td className="content_td">
                {res.reservation_date}
            </td>
            <td className="content_td">
               {res.reservation_time}
            </td>
            <td className="content_td">
                {res.people}
            </td>
            <a
              href={`/reservations/${res.reservation_id}/seat`}
              onClick={handleSeat}
              className='seatButton'>
              Seat
            </a>
        </tr>
        )
        })
  
  
    return (
      <div className="res-list">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
            </tr>
          </thead>
          <tbody>
          {bodyData}
          </tbody>
        </table>
      </div>
    );
  }
export default ReservationList