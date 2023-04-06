import React from "react";

function TableList({tables, key}){

    let bodyData = tables.map((table) => {
        return (
            <tr className="" key={key}>
            <td className="content_td">
                {table.table_name}
            </td>
            <td className="content_td">
                {table.capacity}
            </td>
            <td data-table-id-status={table.table_id} >
               {table.status}
            </td>
        </tr>
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