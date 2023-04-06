import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert"
import {createTable} from "../utils/api"

function Tables() {

  const history = useHistory()

  const [tableInfo, setTableInfo]= useState({name:"", capacity:""})
  const [error, setError] = useState(null)


  const submitHandler=(e)=>{
    e.preventDefault()
    setError(null)
    createTable({...tableInfo})
    .then(()=>{
      history.push("/dashboard")
    })
    .catch(setError)
  }

  const changeHandler=({target})=>{
target.name === "capacity" ? setTableInfo({...tableInfo, [target.name]:Number(target.value)}):
setTableInfo({...tableInfo, [target.name]:(target.value)})
  }

  const cancelHandler=(e)=>{
    e.preventDefault()
    history.goBack()
  }

  return (
    
    <div className="tableCard">
      <ErrorAlert error={error}/>
      <form onSubmit={submitHandler}>
        <div className="formGroup">
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={tableInfo.name}
            onChange={changeHandler}
            placeholder="Table Name"
          />
        </div>
        <div className="formGroup">
          <label>Capacity</label>
          <input
            type="Number"
            id="capacity"
            name="capacity"
            value={tableInfo.capacity}
            onChange={changeHandler}
            placeholder="Capacity"
            min="1"
            required
          />
        </div>
        </form>
        <button className="cancelButton" type="submit">Submit</button>
        <button onClick={cancelHandler}>Cancel</button>
    </div>
  )
}

export default Tables;
