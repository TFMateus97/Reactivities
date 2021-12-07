import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";

export default function LoginForm() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput name="email" placeholder="E-mail"></MyTextInput>
          <MyTextInput
            name="password"
            placeholder="Password"
            type="password"
          ></MyTextInput>
          <Button positive content="Login" type="submit" fluid />
        </Form>
      )}
    </Formik>
  );
}
