import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/homePage";
import { Route, useLocation } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar></ToastContainer>
      <Route exact path="/" component={HomePage}></Route>

      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar></NavBar>
            <Container style={{ marginTop: "7em" }}>
              {/*  Garantir que o nome da rota seja apenas o informado no path */}
              <Route
                exact
                path="/activities"
                component={ActivityDashboard}
              ></Route>
              <Route path="/activities/:id" component={ActivityDetails}></Route>
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              ></Route>
              <Route path="/Errors" component={TestErrors}></Route>
            </Container>
          </>
        )}
      ></Route>
    </>
  );
}

export default observer(App);
