import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/homePage";
import { Route } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>
        {/*  Garantir que o nome da rota seja apenas o informado no path */}
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/activities" component={ActivityDashboard}></Route>
        <Route path="/createActivity" component={ActivityForm}></Route>
      </Container>
    </>
  );
}

export default observer(App);
