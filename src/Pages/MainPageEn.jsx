import { useState, useEffect } from 'react';
import './css/MainPageEn.css';
import { NavBarEn } from '../Components/NavBarEn.jsx';
import {  ProfilCard } from '../Components/ProfilCard.jsx';
import { FaEnvelope } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';



export const MainPageEn = () => {
    const [profils, setProfils] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProfil, setSelectedProfil] = useState(null);

    useEffect(() => {
        const fetchProfils = async () => {
            try {
                const response = await fetch('http://jobconnectbackend.ct.ws/backend/get_profils.php');
                const data = await response.json();
                
                if (data.success) {
                    setProfils(data.data);
                } else {
                    throw new Error(data.message);
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProfils();
    }, []);

    const filteredProfils = profils.filter(profil => 
        profil.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profil.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profil.poste.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-pageent">
            <NavBarEn />
            <div className="search-filters-container">
                <SearchPart 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                />
            </div>
            <div className="body-part">
                {loading ? (
                    <div className="loading">Chargement en cours...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : filteredProfils.length === 0 ? (
                    <div className="no-results">Aucun profil trouvé</div>
                ) : (
                    <div className="list-card">
                        <ProfilCard 
                            infosprofil={filteredProfils} 
                            onViewProfil={setSelectedProfil}
                        />
                    </div>
                )}
            </div>

            {selectedProfil && (
                <ProfilDetail 
                    profil={selectedProfil} 
                    onClose={() => setSelectedProfil(null)} 
                />
            )}
        </div>
    );
};

function SearchPart({ searchTerm, setSearchTerm }) {
    return (
        <div className="search-part">
            <input 
                type="text" 
                placeholder="Rechercher un profil..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
                <FaSearch /> 
            </button>
        </div>
    );
}



const ProfilDetail = ({ profil, onClose }) => {
    const [notification, setNotification] = useState(null);

    const handleContactClick = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            if (!userData || !userData.iduser) {
                throw new Error("Vous devez être connecté pour contacter un candidat");
            }

            const response = await fetch('http://jobconnectbackend.ct.ws/backend/notification_crud/create_notification.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_id: userData.iduser,
                    receiver_id: profil.iduser,
                    message: `${userData.nom} est intéressé par votre profil`
                })
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi de la notification");
            }

            setNotification({
                type: 'success',
                message: 'Notification envoyée avec succès'
            });

            setTimeout(() => setNotification(null), 3000);

        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message
            });
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="profil-detail-overlay" onClick={handleOverlayClick}>

            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <div className="profil-detail-container">
                <button className="close-button" onClick={onClose}>
                    <AiOutlineCloseCircle />
                </button>
                
                <div className="profil-detail-header">
                    <h2>{profil.prenom} {profil.nom}</h2>
                    <span className="poste">{profil.poste}</span>
                    <div className="contact-info">
                        <span><MdOutlineAlternateEmail /> {profil.email}</span>
                        <span><BsFillTelephoneFill /> {profil.telephone || 'Non renseigné'}</span>
                    </div>
                </div>
                
                <div className="profil-detail-content">
                    <section className="description-section">
                        <h3>À propos</h3>
                        <p>{profil.description || 'Aucune description disponible'}</p>
                        <br />
                    </section>
                    
                    {profil.experiences?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-briefcase"></i> Expériences professionnelles</h3>
                            <div className="section-content">
                                {profil.experiences.map(exp => (
                                    <div key={exp.idexperience} className="experience-item">
                                        <h4>{exp.poste} - {exp.entreprise}</h4>
                                        <div className="date-range">
                                            {new Date(exp.date_debut).toLocaleDateString('fr-FR')} - 
                                            {exp.date_fin ? new Date(exp.date_fin).toLocaleDateString('fr-FR') : 'Aujourd\'hui'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {profil.diplomes?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-graduation-cap"></i> Diplômes</h3>
                            <div className="section-content">
                                {profil.diplomes.map(diplome => (
                                    <div key={diplome.iddiplome} className="diplome-item">
                                        <h4>{diplome.titre}</h4>
                                        {diplome.date_obtention && (
                                            <div className="date">
                                                Obtenu le {new Date(diplome.date_obtention).toLocaleDateString('fr-FR')}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {profil.formations?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-university"></i> Formations complémentaires</h3>
                            <div className="section-content">
                                {profil.formations.map(form => (
                                    <div key={form.idformation} className="formation-item">
                                        <h4>{form.intitule} - {form.institution}</h4>
                                        <div className="date-range">
                                            {new Date(form.date_debut).toLocaleDateString('fr-FR')} - 
                                            {form.date_fin ? new Date(form.date_fin).toLocaleDateString('fr-FR') : 'Aujourd\'hui'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {profil.qualites?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-star"></i> Qualités personnelles</h3>
                            <div className="qualites-tags">
                                {profil.qualites.map(qualite => (
                                    <span key={qualite.idqualite} className="qualite-tag">
                                        {qualite.intitule}
                                        {qualite.description && (
                                            <span className="qualite-tooltip">{qualite.description}</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {profil.competences?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-code"></i> Compétences techniques</h3>
                            <div className="competences-tags">
                                {profil.competences.map(comp => (
                                    <span key={comp.idcompetence} className="competence-tag">
                                        {comp.intutile} ({comp.niveau})
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {profil.langues?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-language"></i> Langues</h3>
                            <ul className="langues-list">
                                {profil.langues.map(lang => (
                                    <li key={lang.idlangue}>
                                        {lang.intitule} <span className="niveau">({lang.niveau})</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    
                    {profil.certifications?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-certificate"></i> Certifications</h3>
                            <ul className="certifications-list">
                                {profil.certifications.map(cert => (
                                    <li key={cert.idcertification}>
                                        {cert.intitule}
                                        {cert.date_obtention && (
                                            <span className="date">
                                                (Obtenu le {new Date(cert.date_obtention).toLocaleDateString('fr-FR')})
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    
                    {profil.references?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-user-check"></i> Références</h3>
                            <div className="references-grid">
                                {profil.references.map(ref => (
                                    <div key={ref.idreference} className="reference-item">
                                        <h4>{ref.intitule}</h4>
                                        <div className="reference-meta">
                                            {ref.relation && <span>Relation: {ref.relation}</span>}
                                            {ref.contact && <span>Contact: {ref.contact}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {profil.interets?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-heart"></i> Centres d'intérêt</h3>
                            <div className="interets-list">
                                {profil.interets.map(interet => (
                                    <div key={interet.idinteret} className="interet-item">
                                        <h4>{interet.intitule}</h4>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {profil.projets?.length > 0 && (
                        <section className="section">
                            <h3><i className="fas fa-project-diagram"></i> Projets réalisés</h3>
                            <div className="section-content">
                                {profil.projets.map(proj => (
                                    <div key={proj.idprojet} className="project-item">
                                        <h4>{proj.titre}</h4>
                                        {proj.description && <p>{proj.description}</p>}
                                        {proj.lien && (
                                            <a href={proj.lien} target="_blank" rel="noopener noreferrer">
                                                <i className="fas fa-external-link-alt"></i> Voir le projet
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
                
                <div className="profil-detail-actions">
                    <button className="contact-button" onClick={handleContactClick}>
                        <FaEnvelope /> Contacter
                    </button>
                </div>
            </div>
        </div>
    );
};