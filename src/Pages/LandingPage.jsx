import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Landing.css"
import { RiMobileDownloadLine } from 'react-icons/ri';
import { MdManageSearch } from 'react-icons/md';
import { MdManageAccounts } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa6';

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <NavBarLanding />
      <div className="landing-content">
        <div className="welcome-container">
          <div className="welcometext">
            <h1>Bienvenue sur JobConnect</h1>
            <h2>Votre passerelle vers l'emploi de demain</h2>
            <p>
              Trouvez l'emploi idéal ou le candidat parfait en quelques clics.
              <br />
              Notre plateforme intuitive connecte talents et recruteurs efficacement.
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="cta-button primary">Commencer maintenant</Link>
              <Link to="/about" className="cta-button secondary">Découvrir plus</Link>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
};

const NavBarLanding = () => {
  return (
    <header className="navbar">
      <div className="logo">JobConnect</div>
      <nav className="nav-buttons">
        <a href="/download" className="nav-button btndown">
          <RiMobileDownloadLine className="icon" />
          <span>Télécharger l'application mobile</span>
        </a>
        <Link to="/login" className="nav-button btncon">Se connecter</Link>
        <Link to="/signup" className="nav-button btninsc">S'inscrire</Link>
      </nav>
    </header>
  );
};

const FooterLanding = () => {
  return (
    <footer>
      <div className="footer-feature">
        <MdManageAccounts className="footer-icon" />
        <p>Gestion centralisée du CV et des offres</p>
      </div>
      <div className="footer-feature">
        <FaFilter className="footer-icon" />
        <p>Gestion efficace des candidatures</p>
      </div>
      <div className="footer-feature">
        <MdManageSearch className="footer-icon" />
        <p>Plus de 1000 offres disponibles</p>
      </div>
    </footer>
  )
}

export default LandingPage;