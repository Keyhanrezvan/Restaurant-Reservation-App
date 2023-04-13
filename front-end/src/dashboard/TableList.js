import React from "react";
import TableData from "./ABC";

export default function TableList({ tables, loadDashboard }) {
  if (!tables) {
    return null;
  }

  const formatted = tables.map((table) => {
    return (
      <TableData key={table.table_id} table={table} loadDashboard={loadDashboard} />
    );
  });

  return (
    <div>
      <table className="table table-sm table-hover table-bordered">
        <thead class="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th scope="col">Finish</th>
          </tr>
        </thead>
        <tbody>{formatted}</tbody>
      </table>
    </div>
  );
}