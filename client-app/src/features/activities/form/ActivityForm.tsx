import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Segment, Button, Label } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The acitivity title is required"),
    description: Yup.string().required("The acitivity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  // function handleSubmit() {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     updateActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // }

  // function handleChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = event.target;
  //   setActivity({
  //     ...activity,
  //     [name]: value,
  //   });
  // }

  if (loadingInitial)
    return <LoadingComponent content="Loading activity..."></LoadingComponent>;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="title"></MyTextInput>
            <MyTextArea
              rows={3}
              placeholder="Description"
              name="description"
            ></MyTextArea>
            <MyTextInput placeholder="Category" name="category"></MyTextInput>
            <MyTextInput placeholder="Date" name="date"></MyTextInput>
            <MyTextInput placeholder="City" name="city"></MyTextInput>
            <MyTextInput placeholder="Venue" name="venue"></MyTextInput>
            <Button
              floated="right"
              positive
              loading={loading}
              type="submit"
              content="Submit"
            ></Button>
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
