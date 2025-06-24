import { useState } from 'react';

export const OffreCard = ({ infosoffre }) => {
    const [selectedOffre, setSelectedOffre] = useState(null);

    const handleViewOffre = (offre) => {
        setSelectedOffre(offre);
    };

    const closeOffreDetail = () => {
        setSelectedOffre(null);
    };

    return (
        <div className="offres-container">
            {/* Liste des offres */}
            {infosoffre.length === 0 ? (
                <div className="no-results">Aucune offre trouvée</div>
            ) : (
                infosoffre.map((offre) => (
                    <div key={offre.idoffre} className="offre-card">
                        <div className="offre-card-header">
                            <h3>{offre.titre}</h3>
                            <span className="reference">{offre.reference}</span>
                        </div>
                        <div className="offre-card-body">
                            <p className="description">{offre.description.substring(0, 150)}...</p>
                            <div className="offre-card-meta">
                                <span className="contract-type">{offre.type_contrat}</span>
                                {offre.salaire && <span className="salary">{offre.salaire} €</span>}
                            </div>
                        </div>
                        <button 
                            className="view-button"
                            onClick={() => handleViewOffre(offre)}
                        >
                            Voir l'offre
                        </button>
                    </div>
                ))
            )}

            {/* Overlay de détail d'offre */}
            {selectedOffre && (
                <div className="offre-detail-overlay">
                    <div className="offre-detail-container">
                        <button className="close-button" onClick={closeOffreDetail}>
                            &times;
                        </button>
                        
                        <div className="offre-detail-header">
                            <h2>{selectedOffre.titre}</h2>
                            <span className="reference">Référence: {selectedOffre.reference}</span>
                            <div className="recruiter-info">
                                <span>Publiée par: {selectedOffre.recruteur_nom || "Entreprise"}</span>
                            </div>
                        </div>
                        
                        <div className="offre-detail-meta">
                            <div className="meta-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{selectedOffre.adresse || 'Lieu non spécifié'}</span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-file-contract"></i>
                                <span>{selectedOffre.type_contrat}</span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-money-bill-wave"></i>
                                <span>{selectedOffre.salaire ? `${selectedOffre.salaire} €` : 'Salaire non précisé'}</span>
                            </div>
                        </div>
                        
                        <div className="offre-detail-content">
                            <section className="description-section">
                                <h3>Description du poste</h3>
                                <p>{selectedOffre.description}</p>
                            </section>
                            
                            {/* Section Diplômes Requis */}
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
                            
                            {/* Section Qualités Recherchées */}
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
                            
                            {/* Section Langues Requises */}
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
                            
                            {/* Section Missions */}
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
                            
                            {/* Section Avantages */}
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
                            
                            {/* Section Documents Requis */}
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
                            
                            {/* Section Compétences Requises */}
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
                            <button className="apply-button">
                                <i className="fas fa-paper-plane"></i> Postuler
                            </button>
                            <button className="save-button">
                                <i className="far fa-bookmark"></i> Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};