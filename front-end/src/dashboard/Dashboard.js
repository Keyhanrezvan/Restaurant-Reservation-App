import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import ReservationList from "./ReservationList";
import { useHistory } from "react-router";
import "./Dashboard.css"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError(null);
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
      return () => abortController.abort();
    }
    loadDashboard();
  }, [date]);

  function nextHelper() {
    const nextDate = next(date);
    history.push(`/dashboard?date=${nextDate}`);
  }

  function previousHelper() {
    const previousDate = previous(date);
    history.push(`/dashboard?date=${previousDate}`);
  }

  function todayHelper() {
    const todayDate = today(date);
    history.push(`/dashboard?date=${todayDate}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="buttons">
      <button onClick={previousHelper}> Previous </button>
      <button onClick={todayHelper}> Today </button>
      <button onClick={nextHelper}> Next </button>
      </div>
      <div className="reservationList">
        <ReservationList reservation={reservations}/>
        <TableList tables={tables}/>
    </div>
    </main>
  )


}

export default Dashboard;
