import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import SignupRoute from './routes/auth/signup-route.tsx';
import LoginRoute from './routes/auth/login-route.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupRoute />} />
        <Route path="/login" element={<LoginRoute />} />
      </Routes>
    </Router>
  );
};

export default App;