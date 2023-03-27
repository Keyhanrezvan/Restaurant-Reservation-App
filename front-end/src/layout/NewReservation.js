import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api.js";
import ErrorAlert from "./ErrorAlert"

function NewReservation() {

  const history = useHistory();

  const formData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [newRes, setNewRes] = useState({...formData});
  const [error, setError] =useState(null)

  const cancelHandler= (e)=>{
    e.preventDefault()
    history.goBack()
  }

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     let reservation = {...newRes}
    
//       createReservation(reservation)

//       .then(()=>{history.push(`/dashboard?date=${newRes.reservation_date}`)})
//     .catch (setError) 
    
//   };

const submitHandler = (event) => {
    event.preventDefault();
    
    async function addData() {
      try {
        await createReservation({...newRes}); // :or brackets 
        setNewRes(formData);
      } catch (error) {
        setError(error)
      }
    }
    addData()
    history.push(`/dashboard?date=${newRes.reservation_date}`);

    //  / saves new reservaton and displays /dashboard page for the date of the new reservation.
    // / The /dashboard page will list all reservations for one date only.
  };

  const changeHandler = ({ target }) => {
    target.name === "people"? setNewRes({ ...newRes, [target.name]: Number(target.value)}):
    setNewRes({ ...newRes, [target.name]: target.value });
  };

  return (
    <div>
        <ErrorAlert error={error}/>
      <form onSubmit={submitHandler}>
        <div className="formGroup">
          <label>First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={newRes.first_name}
            onChange={changeHandler}
            placeholder="First Name"
          />
        </div>
        <div className="formGroup">
          <label>Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={newRes.last_name}
            onChange={changeHandler}
            placeholder="Last Name"
          />
        </div>
        <div className="formGroup">
          <label>Mobile_Number</label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={newRes.mobile_number}
            onChange={changeHandler}
            placeholder="***-***-****"
          />
        </div>
        <div className="formGroup">
          <label>Date of Reservation</label>
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            value={newRes.reservation_date}
            onChange={changeHandler}
            placeholder="Date"
          />
        </div>
        <div className="formGroup">
          <label>Time of Reservation</label>
          <input
            type="time"
            id="reservation_time"
            name="reservation_time"
            value={newRes.reservation_time}
            onChange={changeHandler}
            placeholder="Time"
          />
        </div>
        <div className="formGroup">
          <label>Party Size</label>
          <input
            type="number"
            id="people"
            name="people"
            value={newRes.people}
            onChange={changeHandler}
            placeholder="#"
            min="1"
          />
        </div>
        <div className="buttonGroup">
          <button className="cancelButton" onClick={cancelHandler}>Cancel</button>
          <button className="submitButton" type="submit" >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewReservation;
