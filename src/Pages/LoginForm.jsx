import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../Components/Input';
import './css/Login.css';
import img1 from '../assets/img1.jpg';

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
      const response = await fetch('https://localhost/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Réponse serveur :", data); 

      if (data.success && data.user) {
        const userString = JSON.stringify(data.user);

        
        sessionStorage.setItem('user', userString);
        localStorage.setItem('user', userString);

        setIsLoading(true);

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
            <div className="right-part">
              <h1>JobConnect</h1>
              <form onSubmit={handleSubmit}>
                <fieldset>
                <legend>Connexion</legend>
                {error && <div className="error-msg">{error}</div>}
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
                </fieldset>
              </form>

            </div>
            <div className="left-part">
              <img src={img1} alt="bg" />
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
