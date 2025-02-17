import AuthLayout from "../../../features/auth/components/auth-layout/auth-layout.tsx";
import LoginPanel from "../../../features/auth/components/login-panel/login-panel.tsx";

const SignupRoute = () => {
  return (
      <AuthLayout>
        <LoginPanel />
      </AuthLayout>
  );
};

export default SignupRoute;