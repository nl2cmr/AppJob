import { useState } from 'react';
import { GiPositionMarker } from 'react-icons/gi';
import { PiMoneyFill } from 'react-icons/pi';
import { LiaFileContractSolid } from 'react-icons/lia';
import { BsBuildingsFill } from 'react-icons/bs';

export const OffreCard = ({ infosoffre }) => {
    const [selectedOffre, setSelectedOffre] = useState(null);
    const [isApplying, setIsApplying] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleViewOffre = (offre) => {
        setSelectedOffre(offre);
        setApplicationStatus(null);
        setErrorMessage('');
    };

    const closeOffreDetail = () => {
        setSelectedOffre(null);
    };

    const handleApply = async () => {
        if (!selectedOffre) return;
        
        setIsApplying(true);
        setErrorMessage('');
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            if (!user?.iduser) {
                throw new Error('Vous devez être connecté pour postuler');
            }

            const response = await fetch('http://jobconnectbackend.ct.ws/backend/candidature_crud/add_candidature.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    offre_id: selectedOffre.idoffre,
                    candidat_id: user.iduser
                })
            });

            const result = await response.json();
            
            if (result.success) {
                setApplicationStatus('success');
            } else {
                if (result.error_type === 'duplicate_application') {
                    setErrorMessage(result.message);
                    setApplicationStatus('already_applied');
                } else {
                    throw new Error(result.message || "Erreur lors de la candidature");
                }
            }
        } catch (error) {
            console.error("Erreur lors de la candidature:", error);
            setApplicationStatus('error');
            setErrorMessage(error.message);
        } finally {
            setIsApplying(false);
        }
    };

    const handleSaveOffer = async () => {
        alert("Fonctionnalité d'enregistrement à implémenter");
    };

    return (
        <div className="offres-container">
            {infosoffre.length === 0 ? (
                <div className="no-results">Aucune offre trouvée</div>
            ) : (
                infosoffre.map((offre) => (
                    <div key={offre.idoffre} className="offre-card">
                        <div className="entreprise-logo-container">
                            {offre.logo_entreprise ? (
                                <img 
                                    src={`http://jobconnectbackend.ct.ws/backend/uploads/${offre.logo_entreprise}`} 
                                    alt={`Logo ${offre.recruteur_nom}`}
                                    className="entreprise-logo"
                                />
                            ) : (
                                <div className="entreprise-logo-placeholder">
                                    <BsBuildingsFill />
                                </div>
                            )}
                        </div>
                        <div className="offre-card-content">
                            <div className="offre-card-header">
                                <h3>{offre.titre}</h3>
                                <span className="reference">{offre.reference}</span>
                            </div>
                            <div className="offre-card-body">
                                <p className="description">{offre.description.substring(0, 150)}...</p>
                                <div className="offre-card-meta">
                                    <span className="contract-type">{offre.type_contrat}</span>
                                    {offre.salaire && <span className="salary">{offre.salaire} FCFA</span>}
                                </div>
                            </div>
                            <button 
                                className="view-button"
                                onClick={() => handleViewOffre(offre)}
                            >
                                Voir l'offre
                            </button>
                        </div>
                    </div>
                ))
            )}

            {selectedOffre && (
                <div className="offre-detail-overlay">
                    <div className="offre-detail-container">
                        <button className="close-button" onClick={closeOffreDetail}>
                            &times;
                        </button>
                        
                        <div className="entreprise-header">
                            {selectedOffre.logo_entreprise ? (
                                <img 
                                    src={`http://jobconnectbackend.ct.ws/backend/uploads/${selectedOffre.logo_entreprise}`} 
                                    alt={`Logo ${selectedOffre.recruteur_nom}`}
                                    className="entreprise-logo-detail"
                                />
                            ) : (
                                <div className="entreprise-logo-placeholder-detail">
                                    <BsBuildingsFill />
                                </div>
                            )}
                            <div className="offre-detail-header">
                                <h2>{selectedOffre.titre}</h2>
                                <span className="reference">Référence: {selectedOffre.reference}</span>
                                <div className="recruiter-info">
                                    <span>Publiée par: {selectedOffre.recruteur_nom || "Entreprise"}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="offre-detail-meta">
                            <div className="meta-item">
                                <GiPositionMarker />
                                <span>{selectedOffre.adresse || 'Lieu non spécifié'}</span>
                            </div>
                            <div className="meta-item">
                                <LiaFileContractSolid />
                                <span>{selectedOffre.type_contrat}</span>
                            </div>
                            <div className="meta-item">
                                <PiMoneyFill />
                                <span>{selectedOffre.salaire ? `${selectedOffre.salaire} FCFA` : 'Salaire non précisé'}</span>
                            </div>
                        </div>
                        
                        <div className="offre-detail-content">
                            {applicationStatus === 'success' && (
                                <div className="alert alert-success">
                                    Votre candidature a bien été envoyée !
                                </div>
                            )}
                            {applicationStatus === 'already_applied' && (
                                <div className="alert alert-info">
                                    {errorMessage || 'Vous avez déjà postulé à cette offre'}
                                </div>
                            )}
                            {applicationStatus === 'error' && (
                                <div className="alert alert-error">
                                    {errorMessage || 'Une erreur est survenue lors de votre candidature'}
                                </div>
                            )}
                            
                            <section className="description-section">
                                <h3>Description du poste</h3>
                                <p>{selectedOffre.description}</p>
                            </section>
                            
                            {/* Sections restantes inchangées */}
                            {selectedOffre.diplomes && selectedOffre.diplomes.length > 0 && (
                                <section className="diplomes-section">
                                    <h3>Diplômes requis</h3>
                                    <ul className="diplomes-list">
                                        {selectedOffre.diplomes.map((diplome, index) => (
                                            <li key={`diplome-${index}`}>
                                                <i className="fas fa-graduation-cap"></i>
                                                <span>{diplome.titre} {diplome.date_obtention && `(obtenu le ${new Date(diplome.date_obtention).toLocaleDateString('fr-FR')})`}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            
                            {selectedOffre.qualites && selectedOffre.qualites.length > 0 && (
                                <section className="qualites-section">
                                    <h3>Qualités recherchées</h3>
                                    <ul className="qualites-list">
                                        {selectedOffre.qualites.map((qualite, index) => (
                                            <li key={`qualite-${index}`}>
                                                <i className="fas fa-star"></i>
                                                <span>{qualite.intitule}</span>
                                                {qualite.description && <p className="qualite-description">{qualite.description}</p>}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            
                            {selectedOffre.langues && selectedOffre.langues.length > 0 && (
                                <section className="langues-section">
                                    <h3>Langues requises</h3>
                                    <ul className="langues-list">
                                        {selectedOffre.langues.map((langue, index) => (
                                            <li key={`langue-${index}`}>
                                                <i className="fas fa-language"></i>
                                                <span>{langue.intitule} ({langue.niveau})</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            
                            {selectedOffre.missions && selectedOffre.missions.length > 0 && (
                                <section className="missions-section">
                                    <h3>Missions principales</h3>
                                    <ul className="missions-list">
                                        {selectedOffre.missions.map((mission, index) => (
                                            <li key={`mission-${index}`} className="mission-item">
                                                <div className="mission-header">
                                                    <i className="fas fa-tasks"></i>
                                                    <strong>{mission.titre}</strong>
                                                </div>
                                                {mission.description && <p>{mission.description}</p>}
                                                {mission.date_debut && (
                                                    <div className="mission-dates">
                                                        {mission.date_fin ? (
                                                            <span>Du {new Date(mission.date_debut).toLocaleDateString('fr-FR')} au {new Date(mission.date_fin).toLocaleDateString('fr-FR')}</span>
                                                        ) : (
                                                            <span>À partir du {new Date(mission.date_debut).toLocaleDateString('fr-FR')}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            
                            {selectedOffre.avantages && selectedOffre.avantages.length > 0 && (
                                <section className="avantages-section">
                                    <h3>Avantages</h3>
                                    <ul className="avantages-list">
                                        {selectedOffre.avantages.map((avantage, index) => (
                                            <li key={`avantage-${index}`}>
                                                <i className="fas fa-check-circle"></i>
                                                <span>{avantage.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            
                            {selectedOffre.document_requis && selectedOffre.document_requis.length > 0 && (
                                <section className="documents-section">
                                    <h3>Documents à fournir</h3>
                                    <ul className="documents-list">
                                        {selectedOffre.document_requis.map((doc, index) => (
                                            <li key={`doc-${index}`}>
                                                <i className="fas fa-file-alt"></i>
                                                <span>{doc.intitule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                            
                            {selectedOffre.competences && selectedOffre.competences.length > 0 && (
                                <section className="competences-section">
                                    <h3>Compétences recherchées</h3>
                                    <div className="competences-tags">
                                        {selectedOffre.competences.map((competence, index) => (
                                            <span key={`competence-${index}`} className="competence-tag">
                                                {competence.intutile} ({competence.niveau})
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}
                            
                            <div className="offre-detail-dates">
                                <div>
                                    <strong>Publiée le:</strong> 
                                    {new Date(selectedOffre.date_publication).toLocaleDateString('fr-FR')}
                                </div>
                                {selectedOffre.date_expiration && (
                                    <div>
                                        <strong>Expire le:</strong> 
                                        {new Date(selectedOffre.date_expiration).toLocaleDateString('fr-FR')}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="offre-detail-actions">
                            <button 
                                className="apply-button"
                                onClick={handleApply}
                                disabled={isApplying || applicationStatus === 'success' || applicationStatus === 'already_applied'}
                            >
                                {isApplying ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Envoi...
                                    </>
                                ) : applicationStatus === 'already_applied' ? (
                                    <>
                                        <i className="fas fa-check"></i> Déjà postulé
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i> Postuler
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};