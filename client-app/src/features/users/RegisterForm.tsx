import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{
                displayName: "",
                username: "",
                email: "",
                password: "",
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                userStore.login(values).catch((error) => setErrors({ error }))
            }
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                passwor: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form
                    className="ui form error"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <Header
                        as="h2"
                        content="Sign up to Reactivities"
                        color="teal"
                        textAlign="center"
                    ></Header>
                    <MyTextInput
                        name="displayName"
                        placeholder="Display Name"
                    ></MyTextInput>
                    <MyTextInput
                        name="username"
                        placeholder="Username"
                    ></MyTextInput>
                    <MyTextInput
                        name="email"
                        placeholder="E-mail"
                    ></MyTextInput>
                    <MyTextInput
                        name="password"
                        placeholder="Password"
                        type="password"
                    ></MyTextInput>
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <ValidationErrors
                                errors={errors.error}
                            ></ValidationErrors>
                        )}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        positive
                        content="Register"
                        type="submit"
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
});
