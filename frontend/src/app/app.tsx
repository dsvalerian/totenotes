import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import SignupRoute from './routes/auth/signup-route.tsx';
import LoginRoute from './routes/auth/login-route.tsx';
import ForgotPasswordRoute from './routes/auth/forgot-password-route.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeRoute from './routes/home/home-page-route.tsx';

const queryClient = new QueryClient();

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path={'/signup'} element={<SignupRoute />} />
            <Route path={'/login'} element={<LoginRoute />} />
            <Route path={'/forgotpassword'} element={<ForgotPasswordRoute />} />
            <Route path={'/home'} element={<HomeRoute />} />
          </Routes>
        </Router>
      </QueryClientProvider>
  );
};

export default App;