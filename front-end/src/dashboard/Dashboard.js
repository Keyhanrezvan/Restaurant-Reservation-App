import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import ReservationList from "./ReservationList";
import TableList from "./TableList"
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
  const [tables, setTables] = useState([])
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError(null);
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .then(listTables)
        .then(setTables)
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
      <ErrorAlert error={reservationsError} />
      <div className="buttons">
      <button onClick={previousHelper}> Previous </button>
      <button onClick={todayHelper}> Today </button>
      <button onClick={nextHelper}> Next </button>
      </div>
      <br/>
      <div className="reservationList">
      <h4 className="mb-0">Reservations for date</h4>
        <ReservationList reservation={reservations}/>
        <br/>
      <h4 className="mb-0">Tables</h4>
        <TableList tables={tables} key={tables.table_id}/>
    </div>
    </main>
  )


}

export default Dashboard;
