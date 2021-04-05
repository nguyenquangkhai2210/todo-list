import React, { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

/* Models */
import { Data } from "src/models/todo";

/* Components */
import Button from "src/common/Button";
import Form from "src/common/Form";
import FormNote from "src/pages/SignInPage/FormNote";

/* Hook */
import { useSignIn } from "src/pages/SignInPage/handleApi";

const SignInPage = () => {
  const history = useHistory();
  const { signIn, clearError, error, message } = useSignIn();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = token !== null && token !== undefined;

    if (isAuthenticated) {
      history.push("/todo");
    }
  }, [history]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>, data: Data) => {
      e.preventDefault();
      signIn(data);
    },
    [signIn],
  );

  const options = useMemo(() => {
    return [
      {
        id: "user_id",
        name: "userId",
        text: "text",
        label: "User id",
      },
      {
        id: "password",
        name: "password",
        type: "password",
        label: "Password",
      },
    ];
  }, []);

  return (
    <div className="Form__sign_in">
      <span className="Form__header">Sign In</span>
      <Form
        onSubmit={handleSubmit}
        options={options}
        error={error}
        messageError={message}
        clearError={clearError}
      >
        <Button type="submit">Sign in</Button>
        <FormNote />
      </Form>
    </div>
  );
};

export default SignInPage;
