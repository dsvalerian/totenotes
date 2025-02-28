import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignupPage from "./pages/auth/signup-page.tsx";
import LoginPage from "./pages/auth/login-page.tsx";
import ForgotPasswordPage from "./pages/auth/forgot-password-page.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import HomeRoute from "./pages/home/home-page-route.tsx";
import AuthContextProvider from "../shared/providers/auth-context-provider.tsx";
import PrivateRoute from "../shared/components/routes/private-route.tsx";
import GuestRoute from "../shared/components/routes/guest-route.tsx";

const queryClient = new QueryClient();

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Router>
            <Routes>
              {/* Guest-only routes */}
              <Route path="/login" element={<GuestRoute redirect={"/home"} />}>
                <Route path={"/login"} element={<LoginPage />}/>
              </Route>
              <Route path="/signup" element={<GuestRoute redirect={"/home"} />}>
                <Route path={"/signup"} element={<SignupPage />}/>
              </Route>
              <Route path="/forgotpassword" element={<GuestRoute redirect={"/home"} />}>
                <Route path={"/forgotpassword"} element={<ForgotPasswordPage />}/>
              </Route>

              {/* Private-only routes */}
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