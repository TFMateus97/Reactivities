import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
}

export default function ActivityForm({ activity, closeForm }: Props) {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title"></Form.Input>
        <Form.TextArea placeholder="Description"></Form.TextArea>
        <Form.Input placeholder="Category"></Form.Input>
        <Form.Input placeholder="Date"></Form.Input>
        <Form.Input placeholder="City"></Form.Input>
        <Form.Input placeholder="Venue"></Form.Input>
        <Button
          floated="right"
          positive
          //   onClick={activity}
          type="submit"
          content="Submit"
        ></Button>
        <Button
          floated="right"
          onClick={closeForm}
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
}
