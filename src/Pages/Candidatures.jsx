import { useState, useEffect } from 'react';
import { NavBarEn } from '../Components/NavBarEn.jsx';
import { CandidatureCard } from '../Components/CandidatureCard.jsx';
import './css/Candidatures.css';
import { API_BASE_URL } from '../config';

export const CandidaturesEn = () => {
    const [candidatures, setCandidatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        pending: true,
        accepted: true,
        rejected: true
    });
    const [matchFilter, setMatchFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('recent');

    useEffect(() => {
        const fetchCandidatures = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Utilisateur non connecté');
                }
        
                const response = await fetch(`${API_BASE_URL}/candidature_crud/get_candidatures.php?recruteur_id=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des candidatures');
                }
        
                const data = await response.json();
                console.log("Données reçues:", data);
                
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

    const filteredCandidatures = Array.isArray(candidatures) 
        ? candidatures
            .filter(candidature => {
                // Filtre par statut
                if (filters.pending && candidature.statut === 'en_attente') return true;
                if (filters.accepted && candidature.statut === 'acceptée') return true;
                if (filters.rejected && candidature.statut === 'refusée') return true;
                return false;
            })
            .filter(candidature => {
                // Filtre par correspondance (vous devrez adapter selon vos données)
                if (matchFilter === 'all') return true;
                if (matchFilter === 'high' && (candidature.matchScore || 0) >= 75) return true;
                if (matchFilter === 'medium' && (candidature.matchScore || 0) >= 50 && (candidature.matchScore || 0) < 75) return true;
                if (matchFilter === 'low' && (candidature.matchScore || 0) < 50) return true;
                return false;
            })
            .sort((a, b) => {
                // Tri selon l'ordre sélectionné
                if (sortOrder === 'recent') {
                    return new Date(b.date_candidature) - new Date(a.date_candidature);
                } else if (sortOrder === 'oldest') {
                    return new Date(a.date_candidature) - new Date(b.date_candidature);
                } else if (sortOrder === 'match') {
                    return (b.matchScore || 0) - (a.matchScore || 0);
                }
                return 0;
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
        <div className="main-page-cand">
            <NavBarEn />
            <div id="candidature-body">
                <div className="filter-sort-container">
                    <div className="filter-sort-section">
                        <h1>Filtres et tri</h1>
                        <div className="filter-sort-content">
                            <div className="filter-part">
                                <h3>Statut</h3>
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

                            <div className="sort-part">
                                <h3>Correspondance avec l'offre</h3>
                                <div className="radio-group">
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="match" 
                                            value="all"
                                            checked={matchFilter === 'all'}
                                            onChange={() => setMatchFilter('all')} 
                                        />
                                        Toutes
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="match" 
                                            value="high" 
                                            checked={matchFilter === 'high'}
                                            onChange={() => setMatchFilter('high')} 
                                        />
                                        Forte correspondance
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="match" 
                                            value="medium" 
                                            checked={matchFilter === 'medium'}
                                            onChange={() => setMatchFilter('medium')} 
                                        />
                                        Moyenne correspondance
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="match" 
                                            value="low" 
                                            checked={matchFilter === 'low'}
                                            onChange={() => setMatchFilter('low')} 
                                        />
                                        Faible correspondance
                                    </label>
                                </div>
                            </div>

                            <div className="sort-order-part">
                                <h3>Ordre de tri</h3>
                                <select 
                                    className="sort-select"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="recent">Plus récentes</option>
                                    <option value="oldest">Plus anciennes</option>
                                    <option value="match">Meilleure correspondance</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="candidature-content-container">
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
        </div>
    );
};