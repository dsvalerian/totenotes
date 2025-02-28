import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignupRoute from "./routes/auth/signup-route.tsx";
import LoginRoute from "./routes/auth/login-route.tsx";
import ForgotPasswordRoute from "./routes/auth/forgot-password-route.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import HomeRoute from "./routes/home/home-page-route.tsx";
import AuthContextProvider from "../shared/providers/auth-context-provider.tsx";
import PrivateRoute from "../shared/components/routes/private-route.tsx";

const queryClient = new QueryClient();

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Router>
            <Routes>
              <Route path={"/signup"} element={<SignupRoute />} />
              <Route path={"/login"} element={<LoginRoute />} />
              <Route path={"/forgotpassword"} element={<ForgotPasswordRoute />} />

              <Route path="/home" element={<PrivateRoute redirect="/login" />}>
                <Route path="/home" element={<HomeRoute />} />
              </Route>
            </Routes>
          </Router>
        </AuthContextProvider>
      </QueryClientProvider>
  );
};

export default App;