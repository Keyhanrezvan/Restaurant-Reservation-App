import React from "react";

function TableList({tables, loadDash}){

  if (!tables) {
    return null;
  }

    let bodyData = tables.map((table) => {
        return (
            <tableData key={table.table_id} table={table} loadDashboard={loadDash}/>
        )
        })

    return (
      <div className="res-list">
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