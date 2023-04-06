import React from "react";
import useQuery from "../utils/useQuery"
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../dashboard/NewReservation"
import Tables from "../dashboard/Tables"
import Seat from "../dashboard/Seat"
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  const query = useQuery();
  const date = query.get("date")

  return (
    <Switch>
      <Route exact={true} path="/reservations/new">
        <NewReservation />
      </Route>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard date={date || today()}/>
      </Route>
      <Route exact={true} path="/tables/new">
        <Tables/>
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seat/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;

