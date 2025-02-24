import styles from "./login-panel.module.css";
import InputField from "../../../../shared/components/form/input-field/input-field.tsx";
import Button from "../../../../shared/components/ui/button/button.tsx";
import Form from "../../../../shared/components/form/form/form.tsx";
import AuthSidePanel from "../auth-side-panel/auth-side-panel.tsx";
import Checkbox from "../../../../shared/components/form/checkbox/checkbox.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import useLoginUser from "../../hooks/use-login-user.ts";
import useGetLoggedInUser from "../../hooks/use-get-logged-in-user.ts";

const LoginPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUserMutation = useLoginUser(email, password);
  const {status, data: loggedInUser} = useGetLoggedInUser();
  const navigate = useNavigate();

  if (status === "success") {
    // Check if a user is logged in
    if (loggedInUser.ok) {
      // User is logged in, so we redirect back to home page
      navigate("/home");
    }
  }

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUserMutation.mutate();
  };

  return (
      <>
        <Form onSubmit={handleLogin}>
          <h1 className={styles["header-title"]}>Login</h1>
          <fieldset>
            <InputField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                formType={"email"}
                label={"Email"}
                required={true}
            />
            <InputField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                formType={"password"}
                label={"Password"}
                required={true}
            />
          </fieldset>
          <div className={styles["inline-options"]}>
            <Checkbox id={"remember-me-id"} label={"Remember me?"} />
            <Link className={styles["link"]} to={"/forgotpassword"}>Forgot your password?</Link>
          </div>
          <div className={styles["submit-wrapper"]}>
            <Button label={"Login"} type={"form"} />
          </div>
        </Form>
        <AuthSidePanel>
          <h2 className={styles["header-title"]}>Need an account?</h2>
          <p>Sign up to get started</p>
          <Button label={"Sign up"} variant={"outline"} type={"route-link"} to={"/signup"} />
        </AuthSidePanel>
      </>
  );
};

export default LoginPanel;