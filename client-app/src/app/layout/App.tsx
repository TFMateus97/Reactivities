import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/homePage";
import { Route, Switch, useLocation } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/modalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";

function App() {
    const location = useLocation();
    const { commomStore, userStore } = useStore();

    useEffect(() => {
        if (commomStore.token) {
            userStore.getUser().finally(() => commomStore.setAppLoaded());
        } else {
            commomStore.setAppLoaded();
        }
    }, [commomStore, userStore]);

    if (!commomStore.appLoaded)
        return <LoadingComponent content="Loading app..."></LoadingComponent>;

    return (
        <>
            <ToastContainer
                position="bottom-right"
                hideProgressBar
            ></ToastContainer>
            <ModalContainer />
            <Route exact path="/" component={HomePage}></Route>

            <Route
                path={"/(.+)"}
                render={() => (
                    <>
                        <NavBar></NavBar>
                        <Container style={{ marginTop: "7em" }}>
                            {/*  Garantir que o nome da rota seja apenas o informado no path */}
                            <Switch>
                                <Route
                                    exact
                                    path="/activities"
                                    component={ActivityDashboard}
                                ></Route>
                                <Route
                                    path="/activities/:id"
                                    component={ActivityDetails}
                                ></Route>
                                <Route
                                    key={location.key}
                                    path={["/createActivity", "/manage/:id"]}
                                    component={ActivityForm}
                                ></Route>
                                <Route
                                    path="/profiles/:username"
                                    component={ProfilePage}
                                ></Route>
                                <Route
                                    path="/errors"
                                    component={TestErrors}
                                ></Route>
                                <Route
                                    path="/server-errors"
                                    component={ServerError}
                                ></Route>
                                <Route
                                    path="/login"
                                    component={LoginForm}
                                ></Route>
                                <Route component={NotFound}></Route>
                            </Switch>
                        </Container>
                    </>
                )}
            ></Route>
        </>
    );
}

export default observer(App);
