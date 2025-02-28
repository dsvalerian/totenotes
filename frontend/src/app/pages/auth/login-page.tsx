import AuthLayout from "../../../features/auth/components/auth-layout/auth-layout.tsx";
import LoginPanel from "../../../features/auth/components/login-panel/login-panel.tsx";

const LoginPage = () => {
  return (
      <AuthLayout>
        <LoginPanel />
      </AuthLayout>
  );
};

export default LoginPage;