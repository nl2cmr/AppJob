import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../Components/Input';
import './css/Signup.css'
import { useState } from 'react';


const CandidateForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
    return (
        <div className="candidat-form">
            <Input 
                name="nom" 
                placeholder="Entrez votre nom" 
                type="text" 
                label="Nom"
                required
            />

            <Input 
                name="prenom" 
                placeholder="Entrez votre prénom" 
                type="text" 
                label="Prénom"
                required
            />

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
                name="telephone" 
                placeholder="Entrez votre numéro de téléphone" 
                type="tel" 
                label="Téléphone"
                required
            />

            <Input 
                name="adresse" 
                placeholder="Entrez votre adresse" 
                type="text" 
                label="Adresse"
                required
            />

            <Input 
                name="date_naiss" 
                type="date" 
                label="Date de Naissance"
                required
            />

            <Input 
                name="password" 
                placeholder="Entrez votre mot de passe" 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}  
                value={password}
                label="Mot de Passe"
                required
            />

            <Input 
                name="confirmpassword" 
                placeholder="Confirmer votre mot de passe" 
                type="password" 
                onChange={(e) => setConfirmPassword(e.target.value)}  
                value={confirmPassword}
                label="Confirmer votre mot de passe"
                required
            />
        </div>
    );
}

const RecruiterForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
    return (
        <div className="recruteur-form">
            <Input 
                name="nom" 
                placeholder="Entrez le nom de votre entreprise" 
                type="text" 
                label="Nom de l'entreprise"
                required
            />

            <Input 
                name="email" 
                placeholder="Entrez l'email de votre entreprise" 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}  
                value={email}
                label="Email de l'entreprise"
                required
            />

            <Input 
                name="telephone" 
                placeholder="Entrez un numéro de téléphone pour votre entrepise" 
                type="tel" 
                label="Numéro de téléphone de l'entreprise"
                required
            />

            <Input 
                name="adresse" 
                placeholder="Adresse de votre entreprise"
                type="text" 
                label="Adresse"
                required
            />

            <Input 
                name="password" 
                placeholder="Entrez votre mot de passe" 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}  
                value={password}
                label="Mot de Passe"
                required
            />

            <Input 
                name="confirmpassword" 
                placeholder="Confirmer votre mot de passe" 
                type="password" 
                onChange={(e) => setConfirmPassword(e.target.value)}  
                value={confirmPassword}
                label="Confirmer votre mot de passe"
                required
            />
        </div>
    );
}

export const SignupForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('candidate'); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = {
            role,
            email,
            password,
            confirmpassword: confirmPassword,
            ...(role === 'candidate' ? {
                prenom: e.target.prenom.value,
                nom: e.target.nom.value,
                telephone: e.target.telephone.value,
                adresse: e.target.adresse.value,
                date_naiss: e.target.date_naiss.value
            } : {
                nom: e.target.nom.value,
                telephone: e.target.telephone.value,
                adresse: e.target.adresse.value
            })
        };
    
        console.log("Données envoyées:", JSON.stringify(formData, null, 2));
        
        try {
            const response = await fetch('http://localhost/backend/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData) 
            });
            
            if (!response.ok) {
                throw new Error(`http error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log(result);
            
            if (result.success) {
                alert(result.message);
                navigate('/login');
            } else {
                
                if (result.fieldErrors) {
                    let errorMessages = [];
                    for (const field in result.fieldErrors) {
                        errorMessages.push(result.fieldErrors[field]);
                    }
                    alert(errorMessages.join('\n'));
                } else {
                    alert(result.message || "Erreur lors de l'inscription");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Une erreur s'est produite: " + error.message);
        }
    };

    return (
        <div className="signuppage">
            <div className="logo">
                <h1>JobConnect</h1>
            </div>

            <div className="signupform">
                <h2>Inscription</h2>

                <form onSubmit={handleSubmit}>
                    <div className="radio-part">
                        <p>Veuillez choisir le role que vous souhaiter jouer dans cette plateforme</p>
                        <div className="radio">
                            <div className="radio-candidat radio-comp">
                                <input 
                                    type="radio" 
                                    name="role" 
                                    id="candidat" 
                                    onChange={() => setRole('candidate')}
                                    checked={role === 'candidate'}
                                />
                                <label htmlFor="candidat">Chercheur d'emploi</label>
                            </div>
                            <div className="radio-recruteur radio-comp">
                                <input 
                                    type="radio" 
                                    name="role" 
                                    id="recruteur" 
                                    onChange={() => setRole('recruiter')}
                                    checked={role === 'recruiter'}
                                />
                                <label htmlFor="recruteur">Recruteur pour entreprise</label>
                            </div>
                        </div>
                    </div>

                    {role === 'candidate' && (
                        <CandidateForm 
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                        />
                    )}

                    {role === 'recruiter' && (
                        <RecruiterForm 
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                        />
                    )}

                    <div className="form-footer">
                        <p>En cliquant sur <span>Accepter et s'inscrire, vous acceptez les <a href="#">conditions d'utilisations</a></span></p>
                        <div className="signupformbottom">
                            <button type="submit">Accepter et s'inscrire</button>
                            <p>Déjà un compte? <Link to="/login">Se connecter</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;