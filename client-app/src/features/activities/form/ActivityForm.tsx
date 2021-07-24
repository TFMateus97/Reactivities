import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    closeForm,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    debugger;
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({
      ...activity,
      [name]: value,
    });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          onChange={handleInputChange}
          value={activity.title}
          name="title"
        ></Form.Input>
        <Form.TextArea
          placeholder="Description"
          onChange={handleInputChange}
          value={activity.description}
          name="description"
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          onChange={handleInputChange}
          value={activity.category}
          name="category"
        ></Form.Input>
        <Form.Input
          type="Date"
          placeholder="Date"
          onChange={handleInputChange}
          value={activity.date}
          name="date"
        ></Form.Input>
        <Form.Input
          placeholder="City"
          onChange={handleInputChange}
          value={activity.city}
          name="city"
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          onChange={handleInputChange}
          value={activity.venue}
          name="venue"
        ></Form.Input>
        <Button
          floated="right"
          positive
          loading={loading}
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
});
