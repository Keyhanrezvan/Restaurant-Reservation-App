import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import { updateReservationStatus } from '../utils/api';

function ReservationList({reservation}){

  const history = useHistory();

  //state variables
  const [currentReservation, setCurrentReservation] = useState(reservation);
  const [showSeat, setShowSeat] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      currentReservation.status === 'booked' ||
      currentReservation.status === null
    ) {
      setShowSeat(true);
    }
  }, [currentReservation]);

  //event and click handlers
  const handleSeat = (e) => {
    e.preventDefault();
    setError(null);
    setShowSeat(false);
    updateReservationStatus(
      { status: 'seated' },
      currentReservation.reservation_id
    )
      .then((response) => {
        setCurrentReservation(response);
        history.push(`/reservations/${currentReservation.reservation_id}/seat`);
      })
      .catch(setError);
  };

  const handleCancelRes = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
      'Do you want to cancel this reservation? This cannot be undone.'
    );
    if (confirmBox === true) {
      updateReservationStatus(
        { status: 'cancelled' },
        currentReservation.reservation_id
      )
        .then((response) => {
          setCurrentReservation(response);
          history.go(0);
        })
        .catch(setError);
    }
  };

    let bodyData = reservation.map((res) => {
        return (
            <tr className="">
            <td className="content_td">
                {res.first_name}
            </td>
            <td className="content_td">
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
            <td>
            {currentReservation.status ? currentReservation.status : 'booked'}
            </td>
            {showSeat ? (
            <a
              href={`/reservations/${currentReservation.reservation_id}/seat`}
              onClick={handleSeat}
              className='card-link reservations__btn--seat'>
              Seat
            </a>
          ) : <p></p>}
          <a
            href={`/reservations/${currentReservation.reservation_id}/edit`}
            className='reservations__btn--edit'>
            Edit
          </a>
          <button
            data-reservation-id-cancel={currentReservation.reservation_id}
            onClick={handleCancelRes}
            className='reservations__btn--cancel'>
            Cancel
          </button>
        
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
            <th>Status</th>
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