import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Segment, Button, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { ActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loadingInitial } =
        activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [activity, setActivity] = useState<ActivityFormValues>(
        new ActivityFormValues()
    );

    const validationSchema = Yup.object({
        title: Yup.string().required("The acitivity title is required"),
        description: Yup.string().required(
            "The acitivity description is required"
        ),
        category: Yup.string().required(),
        date: Yup.string().required("Date is required").nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    });

    useEffect(() => {
        if (id)
            loadActivity(id).then((activity) =>
                setActivity(new ActivityFormValues(activity))
            );
    }, [id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid(),
            };
            createActivity(newActivity).then(() =>
                history.push(`/activities/${newActivity.id}`)
            );
        } else {
            updateActivity(activity).then(() =>
                history.push(`/activities/${activity.id}`)
            );
        }
    }

    if (loadingInitial)
        return (
            <LoadingComponent content="Loading activity..."></LoadingComponent>
        );

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal"></Header>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={(values) => handleFormSubmit(values)}
            >
                {({ isValid, isSubmitting, dirty, handleSubmit }) => (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <MyTextInput
                            name="title"
                            placeholder="title"
                        ></MyTextInput>
                        <MyTextArea
                            rows={3}
                            placeholder="Description"
                            name="description"
                        ></MyTextArea>
                        <MySelectInput
                            placeholder="Category"
                            name="category"
                            options={categoryOptions}
                        ></MySelectInput>
                        <MyDateInput
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Date"
                            name="date"
                        ></MyDateInput>
                        <Header
                            content="Location Details"
                            sub
                            color="teal"
                        ></Header>
                        <MyTextInput
                            placeholder="City"
                            name="city"
                        ></MyTextInput>
                        <MyTextInput
                            placeholder="Venue"
                            name="venue"
                        ></MyTextInput>
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            floated="right"
                            positive
                            loading={isSubmitting}
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
