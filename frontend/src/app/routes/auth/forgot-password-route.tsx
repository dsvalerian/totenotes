import AuthLayout from "../../../features/auth/components/auth-layout/auth-layout.tsx";
import ForgotPasswordPanel from "../../../features/auth/components/forgot-password-panel/forgot-password-panel.tsx";

const ForgotPasswordRoute = () => {
  return (
      <AuthLayout>
        <ForgotPasswordPanel />
      </AuthLayout>
  );
};

export default ForgotPasswordRoute;