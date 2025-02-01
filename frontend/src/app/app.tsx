import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import SignupRoute from './routes/auth/signup-route.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupRoute />} />
      </Routes>
    </Router>
  );
};

export default App;