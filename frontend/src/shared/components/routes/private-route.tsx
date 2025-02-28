import useAuthContext from "../../hooks/use-auth-context.ts";
import {Navigate, Outlet} from "react-router-dom";

interface PrivateRouteProps {
  redirect: string
}

const PrivateRoute = ({redirect}: PrivateRouteProps) => {
  const {user, isLoading} = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return (
      <Outlet />
  );
};

export default PrivateRoute;