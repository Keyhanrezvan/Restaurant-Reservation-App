import React from "react";

function TableList({tables, key}){

    let bodyData = tables.map((tab) => {
        return (
            <tr className="" key={key}>
            <td className="content_td">
                {tab.table_name}
            </td>
            <td className="content_td">
                {tab.capacity}
            </td>
            <td data-table-id-status={tab.table_id} >
               {tab.status}
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