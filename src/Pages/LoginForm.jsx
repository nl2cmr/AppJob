import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../Components/Input';
import './css/Login.css';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    

    try {
      const response = await fetch('http://localhost/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Réponse serveur :", data); // Pour vérifier la réponse

      if (data.success && data.user) {
        const userString = JSON.stringify(data.user);

        // Stockage selon le choix de l'utilisateur
        
        sessionStorage.setItem('user', userString);
        localStorage.setItem('user', userString);

        setIsLoading(true);
        // Redirection après une courte attente
        setTimeout(() => {
          navigate(data.user.role === 'recruteur' ? '/mainen' : '/main');
        }, 1000);
      } else {
        setIsLoading(false);
        setError(data.message || 'Échec de la connexion.');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion au serveur.');
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="chargement" style={{ display: 'flex' }}>
          <h2 className="loader">Bienvenue...</h2>
        </div>
      ) : (
        <div className="loginpage">
          <div className='logo'>
            <h1>Logo</h1>
          </div>

          <div className="loginform">
            <h2>Connexion</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <Input
                name="email"
                placeholder="Entrez votre email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                label="Email"
                required
              />

              <Input
                name="password"
                placeholder="Entrez votre mot de passe"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="Mot de passe"
                required
              />

              <CheckBox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <div className="loginformbottom">
                <button type="submit" disabled={isLoading}>
                  Se connecter
                </button>
                <p>Pas de compte ? <Link to="/signup">S'inscrire</Link></p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

function CheckBox({ checked, onChange }) {
  return (
    <div className='checkbox'>
      <input
        type="checkbox"
        name="souvenir"
        id="souv"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="souv">Se souvenir de moi</label>
    </div>
  );
}

export default LoginForm;
