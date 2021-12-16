import React from "react";
import { Button, Container, Menu, Image, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { link } from "fs";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to={"/activities"} name="Activities" />
        <Menu.Item as={NavLink} to={"/errors"} name="Errors" />
        <Menu.Item>
          <Button
            positive
            as={NavLink}
            to={"/createActivity"}
            content="Create Activity"
          ></Button>
        </Menu.Item>
        <Menu.Item position="right">
          <Image src={user?.image || "/asset/user.png"} avatar space="right" />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={link}
                to={`/profile/${user?.username}`}
                text="My profile"
                icon="user"
              ></Dropdown.Item>
              <Dropdown.Item
                onClick={logout}
                text="Logout"
                icon="power"
              ></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
});
