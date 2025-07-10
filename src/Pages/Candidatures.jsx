import { useState, useEffect } from 'react';
import { NavBarEn } from '../Components/NavBarEn.jsx';
import { CandidatureCard } from '../Components/CandidatureCard.jsx';
import './css/Candidatures.css';

export const CandidaturesEn = () => {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        pending: true,
        accepted: true,
        rejected: true
    });

    useEffect(() => {
        const fetchCandidatures = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Utilisateur non connecté');
                }
        
                const response = await fetch(`https://185.27.134.109/backend/candidature_crud/get_candidatures.php?recruteur_id=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des candidatures');
                }
        
                const data = await response.json();
                console.log("Données reçues:", data)
                
                if (!Array.isArray(data)) {
                    throw new Error('Les données reçues ne sont pas au format attendu');
                }
                
                setCandidatures(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setCandidatures([]);
                setLoading(false);
            }
        };

        fetchCandidatures();
    }, []);

    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    // S'assurer que filteredCandidatures est toujours un tableau
    const filteredCandidatures = Array.isArray(candidatures) 
        ? candidatures.filter(candidature => {
            if (filters.pending && candidature.statut === 'en_attente') return true;
            if (filters.accepted && candidature.statut === 'acceptée') return true;
            if (filters.rejected && candidature.statut === 'refusée') return true;
            return false;
          })
        : [];

    const handleStatusChange = (candidatureId, newStatus) => {
        setCandidatures(prevCandidatures => 
            prevCandidatures.map(candidature => 
                candidature.idcandidature === candidatureId 
                    ? { ...candidature, statut: newStatus } 
                    : candidature
            )
        );
    };

    return (
        <div className="main-page">
            <NavBarEn />
            <div id="candidature-body">
                <div className="filter-section">
                    <h1>Filtrer les candidatures</h1>
                    <div className="filter-options">
                        <label>
                            <input 
                                type="checkbox" 
                                name="pending" 
                                checked={filters.pending}
                                onChange={handleFilterChange}
                            />
                            En attente
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="accepted" 
                                checked={filters.accepted}
                                onChange={handleFilterChange}
                            />
                            Accepté
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="rejected" 
                                checked={filters.rejected}
                                onChange={handleFilterChange}
                            />
                            Rejeté
                        </label>
                    </div>
                </div>

                <div className="candidature-content">
                    <h1>Vos candidatures</h1>
                    {loading ? (
                        <div className="loading-message">Chargement en cours...</div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : filteredCandidatures.length === 0 ? (
                        <div className="empty-message">Aucune candidature trouvée</div>
                    ) : (
                        <div className="candidature-list">
                            {filteredCandidatures.map((candidature) => (
                                <CandidatureCard 
                                    key={candidature.idcandidature} 
                                    candidature={candidature} 
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};