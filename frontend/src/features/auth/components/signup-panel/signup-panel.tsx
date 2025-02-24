import styles from "./signup-panel.module.css";
import Button from "../../../../shared/components/ui/button/button.tsx";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import Form from "../../../../shared/components/form/form/form.tsx";
import AuthSidePanel from "../auth-side-panel/auth-side-panel.tsx";
import {FormEvent, useState} from "react";
import useSignupUser from "../../hooks/use-signup-user.ts";
import useGetLoggedInUser from "../../hooks/use-get-logged-in-user.ts";
import {useNavigate} from "react-router-dom";

const SignupPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const signupUserMutation = useSignupUser(email, password);
  const {status, data: loggedInUser} = useGetLoggedInUser();
  const navigate = useNavigate();

  if (status === "success") {
    // Check if a user is logged in
    if (loggedInUser.ok) {
      // User is logged in, so we redirect back to home page
      navigate("/home");
    }
  }

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupUserMutation.mutate();
  };

  return (
      <>
        <Form onSubmit={handleSignup}>
          <h1 className={styles["header-title"]}>Sign up</h1>
          <fieldset>
            <InputField
                value={email}
                onChange={event => setEmail(event.target.value)}
                formType={"email"}
                label={"Email"}
                required={true}
            />
            <InputField
                value={password}
                onChange={event => setPassword(event.target.value)}
                formType={"password"}
                label={"Password"}
                required={true}
            />
            <p>
              Password must contain:<br/>- At least 10 characters<br/>- A number<br/>- A special character
            </p>
            <InputField
                value={passwordConfirm}
                onChange={event => setPasswordConfirm(event.target.value)}
                formType={"password"}
                label={"Confirm password"}
                required={true}
            />
          </fieldset>
          <div className={styles["submit-wrapper"]}>
            <Button label={"Sign up"} type={"form"} />
          </div>
        </Form>
        <AuthSidePanel>
          <h2 className={styles["header-title"]}>Have an account?</h2>
          <p>Login to continue where you left off</p>
          <Button label={"Login"} variant={"outline"} type={"route-link"} to={"/login"} />
        </AuthSidePanel>
      </>
  );
};

export default SignupPanel;