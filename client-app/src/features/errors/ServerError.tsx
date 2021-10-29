import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function ServerError() {
  const { commomStore } = useStore();

  return (
    <Container>
      <Header as="h1" content="Server Error"></Header>
      <Header as="h5" color="red" content={commomStore.error?.message}></Header>
      {commomStore.error?.details && (
        <Segment>
          <Header as="h4" content="Stack trace" color="teal"></Header>
          <code style={{ marginTop: "10px" }}>{commomStore.error.details}</code>
        </Segment>
      )}
    </Container>
  );
});
