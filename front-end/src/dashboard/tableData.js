import React from "react";
import { useHistory } from "react-router";
import { deleteReservationId } from "../utils/api";

function tableData({ table, loadDashboard }) {
  const history = useHistory();

  const status = table.reservation_id ? "Occupied" : "Free";

  async function handleClick() {
    return window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
      ? await handleFinish(table.table_id, table.reservation_id)
      : null;
  }

  async function handleFinish(table_id, reservation_id) {
    await deleteReservationId(table_id, reservation_id);
    await loadDashboard();
    history.push("/dashboard");
  }

  return (
    <div>
      <tr className="" key={key}>
        <td className="content_td">{table.table_name}</td>
        <td className="content_td">{table.capacity}</td>
        <td data-table-id-status={table.table_id}>{status}</td>
        {status === "Occupied" && (
          <td>
            <button
              data-table-id-finish={table.table_id}
              type="button"
              onClick={handleClick}
              className="btn btn-sm btn-primary"
            >
              Finish
            </button>
          </td>
        )}
      </tr>
    </div>
  );
}

export default tableData;
