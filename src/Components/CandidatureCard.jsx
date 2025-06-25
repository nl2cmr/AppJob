import { useState } from 'react';

export const CandidatureCard = ({ candidature, onStatusChange }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const getStatusClass = () => {
        switch(candidature.statut) {
            case 'acceptée':
                return 'status-accepted';
            case 'refusée':
                return 'status-rejected';
            default:
                return 'status-pending';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const closeDetails = () => {
        setShowDetails(false);
    };

    const handleStatusUpdate = async (newStatus) => {
        setIsUpdating(true);
        try {
            console.log("Envoi de la requête avec:", {
                idcandidature: candidature.idcandidature,
                statut: newStatus
            });
    
            const response = await fetch(`http://localhost/backend/candidature_crud/update_candidature.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idcandidature: candidature.idcandidature,
                    statut: newStatus
                })
            });
    
            console.log("Réponse reçue, status:", response.status);
            
            const result = await response.json();
            console.log("Résultat parsé:", result);
    
            if (!response.ok || !result.success) {
                throw new Error(result.message || `Erreur HTTP: ${response.status}`);
            }
    
            onStatusChange(candidature.idcandidature, newStatus);
            closeDetails();
            
        } catch (error) {
            console.error("Erreur complète:", {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            alert(`Erreur lors de la mise à jour: ${error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={`candidature-card ${getStatusClass()}`}>
            <div className="candidature-header">
                <h3>{candidature.titre_offre || 'Poste non spécifié'}</h3>
                <div className="candidature-meta">
                    <span className="candidature-date">
                        {formatDate(candidature.date_candidature)}
                    </span>
                    <span className={`candidature-status ${getStatusClass()}`}>
                        {candidature.statut === 'en_attente' && 'En attente'}
                        {candidature.statut === 'acceptée' && 'Acceptée'}
                        {candidature.statut === 'refusée' && 'Refusée'}
                    </span>
                </div>
            </div>
            
            <div className="candidature-details">
                <div className="detail-item">
                    <strong>Candidat:</strong> {candidature.candidat_prenom} {candidature.candidat_nom}
                </div>
                <div className="detail-item">
                    <strong>Email:</strong> {candidature.candidat_email || 'Non spécifié'}
                </div>
                <div className="detail-item">
                    <strong>Téléphone:</strong> {candidature.candidat_telephone || 'Non spécifié'}
                </div>
            </div>
            
            <div className="candidature-actions">
                <button 
                    className="view-offre-button"
                    onClick={toggleDetails}
                >
                    Consulter le CV
                </button>
                {candidature.statut === 'refusée' && (
                    <button className="delete-button">
                        Supprimer
                    </button>
                )}
            </div>

            {showDetails && (
                <div className="candidate-overlay">
                    <div className="candidate-overlay-content">
                        <button className="close-overlay" onClick={closeDetails}>
                            ×
                        </button>
                        
                        <div className="candidate-full-details">
                            <h3>Profil complet de {candidature.candidat_prenom} {candidature.candidat_nom}</h3>
                            <h4>Poste candidaté: {candidature.titre_offre}</h4>
                            
                            <div className="details-section">
                                <h5>Informations personnelles</h5>
                                <div className="details-grid">
                                    <div>
                                        <strong>Nom complet:</strong> {candidature.candidat_prenom} {candidature.candidat_nom}
                                    </div>
                                    <div>
                                        <strong>Email:</strong> {candidature.candidat_email}
                                    </div>
                                    <div>
                                        <strong>Téléphone:</strong> {candidature.candidat_telephone}
                                    </div>
                                    <div>
                                        <strong>Adresse:</strong> {candidature.candidat_adresse || 'Non spécifié'}
                                    </div>
                                    <div>
                                        <strong>Poste actuel:</strong> {candidature.candidat_poste || 'Non spécifié'}
                                    </div>
                                </div>
                            </div>

                            <div className="details-section">
                                <h5>Description</h5>
                                <p className="description-text">
                                    {candidature.candidat_description || 'Aucune description fournie'}
                                </p>
                            </div>

                            {/* Section Expériences professionnelles */}
                            {candidature.experiences && candidature.experiences.length > 0 && (
                                <div className="details-section">
                                    <h5>Expériences professionnelles</h5>
                                    <div className="experience-list">
                                        {candidature.experiences.map((exp, index) => (
                                            <div key={`exp-${index}`} className="experience-item">
                                                <div className="experience-header">
                                                    <h6>{exp.poste}</h6>
                                                    <span className="experience-dates">
                                                        {formatDate(exp.date_debut)} - {exp.date_fin ? formatDate(exp.date_fin) : 'Aujourd\'hui'}
                                                    </span>
                                                </div>
                                                <div className="experience-company">{exp.entreprise}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section Références */}
                            {candidature.references && candidature.references.length > 0 && (
                                <div className="details-section">
                                    <h5>Références</h5>
                                    <div className="reference-list">
                                        {candidature.references.map((ref, index) => (
                                            <div key={`ref-${index}`} className="reference-item">
                                                <div className="reference-header">
                                                    <h6>{ref.intitule}</h6>
                                                    {ref.relation && (
                                                        <span className="reference-relation">({ref.relation})</span>
                                                    )}
                                                </div>
                                                {ref.contact && (
                                                    <div className="reference-contact">Contact: {ref.contact}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section Formations */}
                            {candidature.formations && candidature.formations.length > 0 && (
                                <div className="details-section">
                                    <h5>Formations</h5>
                                    <div className="formation-list">
                                        {candidature.formations.map((formation, index) => (
                                            <div key={`formation-${index}`} className="formation-item">
                                                <div className="formation-header">
                                                    <h6>{formation.intitule}</h6>
                                                    <span className="formation-dates">
                                                        {formatDate(formation.date_debut)} - {formation.date_fin ? formatDate(formation.date_fin) : 'Aujourd\'hui'}
                                                    </span>
                                                </div>
                                                <div className="formation-institution">{formation.institution}</div>
                                                <div className="formation-niveau">Niveau: {formation.niveau}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section Compétences */}
                            {candidature.competences && candidature.competences.length > 0 && (
                                <div className="details-section">
                                    <h5>Compétences</h5>
                                    <div className="competence-tags">
                                        {candidature.competences.map((competence, index) => (
                                            <span key={`competence-${index}`} className="competence-tag">
                                                {competence.intutile} ({competence.niveau})
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section Certifications */}
                            {candidature.certifications && candidature.certifications.length > 0 && (
                                <div className="details-section">
                                    <h5>Certifications</h5>
                                    <div className="certification-list">
                                        {candidature.certifications.map((certif, index) => (
                                            <div key={`certif-${index}`} className="certification-item">
                                                <div className="certification-header">
                                                    <h6>{certif.intitule}</h6>
                                                    {certif.date_obtention && (
                                                        <span className="certification-date">
                                                            Obtenu le: {formatDate(certif.date_obtention)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section Diplômes */}
                            {candidature.diplomes && candidature.diplomes.length > 0 && (
                                <div className="details-section">
                                    <h5>Diplômes</h5>
                                    <div className="diplome-list">
                                        {candidature.diplomes.map((diplome, index) => (
                                            <div key={`diplome-${index}`} className="diplome-item">
                                                <div className="diplome-header">
                                                    <h6>{diplome.titre}</h6>
                                                    {diplome.date_obtention && (
                                                        <span className="diplome-date">
                                                            Obtenu le: {formatDate(diplome.date_obtention)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section Projets */}
                            {candidature.projets && candidature.projets.length > 0 && (
                                <div className="details-section">
                                    <h5>Projets</h5>
                                    <div className="projet-list">
                                        {candidature.projets.map((projet, index) => (
                                            <div key={`projet-${index}`} className="projet-item">
                                                <div className="projet-header">
                                                    <h6>{projet.titre}</h6>
                                                    <span className="projet-dates">
                                                        {projet.date_debut && formatDate(projet.date_debut)}
                                                        {projet.date_fin && ` - ${formatDate(projet.date_fin)}`}
                                                    </span>
                                                </div>
                                                {projet.description && (
                                                    <p className="projet-description">{projet.description}</p>
                                                )}
                                                {projet.lien && (
                                                    <a href={projet.lien} target="_blank" rel="noopener noreferrer" className="projet-lien">
                                                        Lien vers le projet
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section Qualités */}
                            {candidature.qualites && candidature.qualites.length > 0 && (
                                <div className="details-section">
                                    <h5>Qualités</h5>
                                    <div className="qualite-tags">
                                        {candidature.qualites.map((qualite, index) => (
                                            <span key={`qualite-${index}`} className="qualite-tag">
                                                {qualite.intitule}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section Langues */}
                            {candidature.langues && candidature.langues.length > 0 && (
                                <div className="details-section">
                                    <h5>Langues</h5>
                                    <div className="langue-list">
                                        {candidature.langues.map((langue, index) => (
                                            <div key={`langue-${index}`} className="langue-item">
                                                <span className="langue-name">{langue.intitule}</span>
                                                <span className="langue-level">({langue.niveau})</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="details-actions">
                                <button className="contact-button">
                                    Contacter le candidat
                                </button>
                                {candidature.statut === 'en_attente' && (
                                    <div className="decision-buttons">
                                        <button 
                                            className="accept-button"
                                            onClick={() => handleStatusUpdate('acceptée')}
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? 'Validation...' : 'Valider'}
                                        </button>
                                        <button 
                                            className="reject-button"
                                            onClick={() => handleStatusUpdate('refusée')}
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? 'Refus...' : 'Refuser'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};