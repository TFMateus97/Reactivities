import { Formik, Form, FieldProps, Field } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Comment, Button, Loader } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        return () => {
            commentStore.clearComments();
        };
    }, [commentStore, activityId]);

    return (
        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{ border: "none" }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map((comment) => (
                        <Comment key={comment.id}>
                            <Comment.Avatar
                                src={comment.image || "/assets/user.png"}
                            />
                            <Comment.Content>
                                <Comment.Author
                                    as={Link}
                                    to={`/profiles/${comment.username}`}
                                >
                                    {comment.displayName}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>
                                        {fomartDistanceToNow(comment.createdAt)}{" "}
                                        ago
                                    </div>
                                </Comment.Metadata>
                                <Comment.Text
                                    style={{ whiteSpace: "pre-wrap" }}
                                >
                                    {comment.body}
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <Formik
                        onSubmit={(values, { resetForm }) =>
                            commentStore
                                .addComment(values)
                                .then(() => resetForm())
                        }
                        initialValues={{ body: "" }}
                        validationSchema={Yup.object({
                            body: Yup.string().required(),
                        })}
                    >
                        {({ isSubmitting, isValid, handleSubmit }) => (
                            <Form className="ui form">
                                <Field name="body">
                                    {(props: FieldProps) => (
                                        <div style={{ position: "relative" }}>
                                            <Loader
                                                active={isSubmitting}
                                            ></Loader>
                                            <textarea
                                                placeholder="Enter your comment (Enter to submit, SHIFT + enter for new line)"
                                                rows={2}
                                                {...props.field}
                                                onKeyPress={(e) => {
                                                    if (
                                                        e.key === "Enter" &&
                                                        e.shiftKey
                                                    ) {
                                                        return;
                                                    }
                                                    if (
                                                        e.key === "Enter" &&
                                                        !e.shiftKey
                                                    ) {
                                                        e.preventDefault();
                                                        isValid &&
                                                            handleSubmit();
                                                    }
                                                }}
                                            ></textarea>
                                        </div>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                </Comment.Group>
            </Segment>
        </>
    );
});
function fomartDistanceToNow(createdAt: Date): React.ReactNode {
    throw new Error("Function not implemented.");
}
