import './App.css';
import Welcome from './components/Welcome/welcome.js';
import Login from './components/Login pages/login.js';
import Register from './components/Register pages/register.js';
import Register1 from './components/Register pages/Register1.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login1 from './components/Login pages/login1.js';
import FingerprintRegistration from './components/Register pages/register2.js';
import Register3 from './components/Register pages/register3.js';
import Team from './components/Team/Team.js';
import Login2 from './components/Login pages/login2.js';
import Login3 from './components/Login pages/login3.js';
function App() {
  return (
    <div className="App">
    <Router>
   
        <Routes>
          {/* Welcome */}
          <Route path="/" element={<Welcome />} />

          {/* Login */}
          <Route path="/login" element={<Login/>} />
          <Route path="/login-otp/:username" element={<Login1/>} />
          <Route path="/login-bio/:username" element={<Login2/>} />
          <Route path="/login-colour/:username" element={<Login3/>} />

          {/* Register */}
          <Route path="/register" element={<Register/>} />
          <Route path="/register-otp/:username" element={<Register1/>} />
          <Route path="/register-bio/:username" element={<FingerprintRegistration/>} />
          <Route path="/register-colour/:username" element={<Register3/>} />

           {/* MYteam */}
          <Route path="/myteam" element={<Team/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
