import './css/MainPageJSe.css';
import { useState, useEffect } from 'react';
import { OffreCard } from '../Components/OffreCard.jsx';
import { NavBar } from '../Components/NavBarMain';
import { useNavigate } from 'react-router-dom';
import { CVGenerator } from '../Components/CVGenerator.jsx';
import { FaSearch } from 'react-icons/fa';


export const MainPage = () => {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        typeContrat: '',
        salaireMin: '',
        lieu: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (filters.typeContrat) queryParams.append('type_contrat', filters.typeContrat);
                if (filters.salaireMin) queryParams.append('salaire_min', filters.salaireMin);
                if (filters.lieu) queryParams.append('lieu', filters.lieu);

                const url = `https://185.27.134.109/backend/offre_crud/get_offres_card.php?${queryParams.toString()}`;
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des offres');
                }

                const result = await response.json();
                
                if (result.success) {
                    setOffres(result.data || []);
                } else {
                    throw new Error(result.message);
                }
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };
    
        fetchOffres();
    }, [filters]);

    const handleViewOffre = (offre) => {
        navigate(`/offre/${offre.idoffre}`, { state: { offre } });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredOffres = offres.filter(offre => {
        const matchesSearch = 
            offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offre.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (offre.adresse && offre.adresse.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesSearch;
    });

    return (
        <div className="main-page">
            <NavBar />
            <div className="search-filters-container">
                <SearchPart searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="filters-section">
                    <select 
                        name="typeContrat" 
                        value={filters.typeContrat}
                        onChange={handleFilterChange}
                    >
                        <option value="">Tous les types de contrat</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Freelance">Freelance</option>
                    </select>
                    
                    <input 
                        type="number" 
                        name="salaireMin" 
                        placeholder="Salaire minimum"
                        value={filters.salaireMin}
                        onChange={handleFilterChange}
                    />
                    
                    <input 
                        type="text" 
                        name="lieu" 
                        placeholder="Localisation"
                        value={filters.lieu}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
            <div className="body-part">
                <TriMenu />
                {loading ? (
                    <div className="loading-message">
                        <div className="spinner"></div>
                        Chargement des offres...
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <i className="fas fa-exclamation-triangle"></i>
                        {error}
                    </div>
                ) : filteredOffres.length === 0 ? (
                    <div className="no-results">
                        <i className="fas fa-search"></i>
                        Aucune offre ne correspond à vos critères
                    </div>
                ) : (
                    <div className="list-card">
                        <OffreCard 
                            infosoffre={filteredOffres} 
                            onViewOffre={handleViewOffre}
                        />
                    </div>
                )}
            </div>
            <CVGenerator />
        </div>
    );
}

function SearchPart({ searchTerm, setSearchTerm }) {
    return (
        <div className="search-part1">
            <input 
                type="text" 
                placeholder="Rechercher par titre, lieu ou description..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
                <FaSearch style={{color:'white'}}/>
            </button>
        </div>
    );
}

function TriMenu() {
    return (
        <div className="tri-part">
            <div className="filter-group">
                <h3 className="filter-title">Domaines professionnels</h3>
                <div className="filter-options">
                    <div className="filter-option">
                        <input type="checkbox" id="informatique" />
                        <label htmlFor="informatique">Informatique</label>
                    </div>
                    <div className="filter-option">
                        <input type="checkbox" id="enseignement" />
                        <label htmlFor="enseignement">Enseignement</label>
                    </div>
                    <div className="filter-option">
                        <input type="checkbox" id="sante" />
                        <label htmlFor="sante">Santé</label>
                    </div>
                    <div className="filter-option">
                        <input type="checkbox" id="finance" />
                        <label htmlFor="finance">Finance</label>
                    </div>
                    <div className="filter-option">
                        <input type="checkbox" id="marketing" />
                        <label htmlFor="marketing">Marketing</label>
                    </div>
                    <div className="filter-option">
                        <input type="checkbox" id="ingenierie" />
                        <label htmlFor="ingenierie">Ingénierie</label>
                    </div>
                    <div className="filter-option">
                        <input type="checkbox" id="design" />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="filter-option">
                        <input type="checkbox" id="juridique" />
                        <label htmlFor="juridique">Juridique</label>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}