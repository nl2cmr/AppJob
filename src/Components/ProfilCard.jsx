import { FaUserCircle } from 'react-icons/fa';
export const ProfilCard = ({ infosprofil, onViewProfil }) => {
    return (
        <div className="profils-container">
            {infosprofil.map((profil) => (
                <div key={profil.iduser} className="profil-card" onClick={() => onViewProfil(profil)}>
                    <div className="profil-card-content">
                        <div className="profil-photo-container">
                            {profil.photo ? (
                                <img 
                                    src={`http://localhost/uploads/${profil.photo}`} 
                                    alt={`${profil.prenom} ${profil.nom}`} 
                                    className="profil-photo"
                                />
                            ) : (
                                <div className="profil-photo-default">
                                    <FaUserCircle />
                                </div>
                            )}
                        </div>
                        
                        <div className="profil-info">
                            <div className="profil-card-header">
                                <h3>{profil.prenom} {profil.nom} {profil.poste}</h3>
                                <span className="poste"><b>{profil.email}</b> - <b>{profil.telephone}</b></span>
                            </div>
                            <div className="profil-card-body">
                                <p className="description">{profil.description?.substring(0, 100) || 'Aucune description disponible'}</p>
                                <div className="profil-card-meta">
                                    <span className="location">
                                        <i className="fas fa-map-marker-alt"></i> {profil.adresse || 'Non spécifié'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        className="view-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewProfil(profil);
                        }}
                    >
                        <i className="fas fa-eye"></i> Voir le profil
                    </button>
                </div>
            ))}
        </div>
    );
};