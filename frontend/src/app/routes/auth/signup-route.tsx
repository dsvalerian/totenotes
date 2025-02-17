import AuthLayout from "../../../features/auth/components/auth-layout/auth-layout.tsx";
import SignupPanel from "../../../features/auth/components/signup-panel/signup-panel.tsx";

const SignupRoute = () => {
  return (
      <AuthLayout>
        <SignupPanel />
      </AuthLayout>
  );
};

export default SignupRoute;