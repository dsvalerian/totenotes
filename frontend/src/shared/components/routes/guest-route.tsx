import useAuthContext from "../../hooks/use-auth-context.ts";
import {Navigate, Outlet} from "react-router-dom";

interface GuestRouteProps {
  redirect: string
}

const GuestRoute = ({redirect}: GuestRouteProps) => {
  const {user, isLoading} = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to={redirect} replace />;
  }

  return (
      <Outlet />
  );
};

export default GuestRoute;