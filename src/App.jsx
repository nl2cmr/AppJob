import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {LandingPage} from './Pages/LandingPage.jsx';
import {LoginForm} from './Pages/LoginForm.jsx';
import {SignupForm} from './Pages/SignupForm.jsx';
import {MainPage} from './Pages/MainPageJSe.jsx';
import {Compte} from './Pages/Compte.jsx';
import {Notifs} from './Pages/Notifs.jsx';
import {MainPageEn} from './Pages/MainPageEn.jsx';
import {CompteEn} from './Pages/CompteEn.jsx';
import {NotifsEn} from './Pages/NotifsEn.jsx';
import {CandidaturesEn} from './Pages/Candidatures.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/compte" element={<Compte />} />
        <Route path="/main/notifs&messages" element={<Notifs />} />
        <Route path="/mainen" element={<MainPageEn />} />
        <Route path="/mainen/compte" element={<CompteEn />} />
        <Route path="/mainen/candidatures" element={<CandidaturesEn />} />
        <Route path="/mainen/notifs&messages" element={<NotifsEn />} />
      </Routes>
    </Router>
  )
}

export default App
