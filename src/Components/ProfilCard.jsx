export const ProfilCard = ({ infosprofil, onViewProfil }) => {
    return (
        <div className="profils-container">
            {infosprofil.map((profil) => (
                <div key={profil.iduser} className="profil-card">
                    <div className="profil-card-header">
                        <h3>{profil.prenom} {profil.nom}</h3>
                        <span className="poste">{profil.poste}</span>
                    </div>
                    <div className="profil-card-body">
                        <p className="description">{profil.description?.substring(0, 100) || 'Aucune description disponible'}</p>
                        <div className="profil-card-meta">
                            <span className="location">
                                <i className="fas fa-map-marker-alt"></i> {profil.adresse || 'Non spécifié'}
                            </span>
                        </div>
                    </div>
                    <button 
                        className="view-button"
                        onClick={() => onViewProfil(profil)}
                    >
                        <i className="fas fa-eye"></i> Voir le profil
                    </button>
                </div>
            ))}
        </div>
    );
};