import React from "react";
import TableData from "./TableData"

function TableList({tables, loadDash}){

  if (!tables) {
    return null;
  }

    let bodyData = tables.map((table) => {
        return (
            <TableData key={table.table_id} table={table} loadDashboard={loadDash}/>
        )
        })

    return (
      <div className="table table-sm">
        <table>
          <thead>
            <tr>
              <th>Table Name</th>
              <th>Capacity</th>
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

export default TableList