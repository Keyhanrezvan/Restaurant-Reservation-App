import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, seatReservationUpdate } from "../utils/api";

function Seat() {
  const history = useHistory();
const {reservation_id}= useParams()

  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [seatTableID, setSeatTableID] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables()
    .then(setTables)
    .catch(setError);
    return () => abortController.abort();
  }, [reservation_id]);


  async function handleSubmit(e){
e.preventDefault()
try {
    const response = await seatReservationUpdate(seatTableID, reservation_id)
    if (response) {
      history.push(`/dashboard`);
    }
  } catch (error) {
    setError(error);
  }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  function handleSelectTable(e) {
    setSeatTableID(e.target.value);
  }

  const options = tables.map((table) => (
    <option
      key={table.table_id}
      value={table.table_id}
    >{`${table.table_name} - ${table.capacity}`}</option>
  ));

  return (
    <div>
      <h3>Choose table for reservation</h3>
      <ErrorAlert error={error}/>
      <br/>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <label htmlFor="seat_reservation">
          Seat at:
          <select
            id="table_id"
            name="table_id"
            onChange={handleSelectTable}
            className="mr-1"
            required
          >
            <option defaultValue>Select a table</option>
            {options}
          </select>
        </label>
        <button className="btn btn-primary mr-1" type="submit">
          Submit
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Seat;
