import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/img1.jpg';
import "./css/Landing.css"

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <NavBarLanding />
      <div className="landing-content">
        <div className="welcometext">
          <h1>Bienvenue sur notre plateforme</h1>
          <p>Découvrez nos services et téléchargez notre application mobile.</p>
        </div>

        <div className="img">
          <img src={img1} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

const NavBarLanding = () => {
  return (
    <header className="navbar">
      <div className="logo">Logo</div>
      <nav className="nav-buttons">
        <a href="/download" className="nav-button">Télécharger l'application</a>
        <Link to="/login" className="nav-button">Se connecter</Link>
        <Link to="/signup" className="nav-button">S'inscrire</Link>
      </nav>
    </header>
  );
};

export default LandingPage;
