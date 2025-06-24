export const FormationsTable = () => {
    const [formations, setFormations] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        date_debut: '',
        date_fin: '',
        description: '',
        institution: '',
        niveau: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchFormations = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`http://localhost/backend/formation_crud/get_formations.php?iduser=${user.iduser}`);
            const data = await response.json();
            setFormations(data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFormations();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) return;
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/formation_crud/delete_formation.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idformation: id,
                    user_id: user.iduser 
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchFormations();
            } else {
                alert(result.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const startEdit = (formation) => {
        setEditingId(formation.idformation);
        setEditForm({
            intitule: formation.intitule,
            date_debut: formation.date_debut,
            date_fin: formation.date_fin || '',
            description: formation.description || '',
            institution: formation.institution,
            niveau: formation.niveau || 'licence'
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleEditSubmit = async () => {
        if (!editForm.intitule.trim() || !editForm.date_debut || !editForm.institution.trim()) {
            alert("Les champs Intitulé, Date de début et Institut sont obligatoires");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/formation_crud/update_formation.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editForm,
                    idformation: editingId,
                    user_id: user.iduser
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchFormations();
            } else {
                alert(result.message || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    const getNiveauText = (niveau) => {
        const niveaux = {
            'baccalauréat': 'Baccalauréat',
            'licence': 'Licence',
            'master': 'Master',
            'doctorat': 'Doctorat'
        };
        return niveaux[niveau] || niveau;
    };

    return (
        <div id="formatable">
            {isLoading ? (
                <p>Chargement en cours...</p>
            ) : (
                <table className="formations-table">
                    <thead>
                        <tr>
                            <th>Intitulé</th>
                            <th>Date de Début</th>
                            <th>Date de Fin</th>
                            <th>Description</th>
                            <th>Institut</th>
                            <th>Niveau</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formations.length === 0 ? (
                            <tr>
                                <td colSpan="7">Aucune formation enregistrée</td>
                            </tr>
                        ) : (
                            formations.map(formation => (
                                <tr key={formation.idformation}>
                                    {editingId === formation.idformation ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="intitule"
                                                    value={editForm.intitule}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="date_debut"
                                                    value={editForm.date_debut}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="date_fin"
                                                    value={editForm.date_fin}
                                                    onChange={handleEditChange}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    name="description"
                                                    value={editForm.description}
                                                    onChange={handleEditChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="institution"
                                                    value={editForm.institution}
                                                    onChange={handleEditChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    name="niveau"
                                                    value={editForm.niveau}
                                                    onChange={handleEditChange}
                                                >
                                                    <option value="baccalauréat">Baccalauréat</option>
                                                    <option value="licence">Licence</option>
                                                    <option value="master">Master</option>
                                                    <option value="doctorat">Doctorat</option>
                                                </select>
                                            </td>
                                            <td className="actions-cell">
                                                <button onClick={handleEditSubmit} className="btn-save">
                                                    ✓
                                                </button>
                                                <button onClick={cancelEdit} className="btn-cancel">
                                                    ✗
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{formation.intitule}</td>
                                            <td>{formatDate(formation.date_debut)}</td>
                                            <td>{formatDate(formation.date_fin)}</td>
                                            <td>{formation.description || '-'}</td>
                                            <td>{formation.institution}</td>
                                            <td>{getNiveauText(formation.niveau)}</td>
                                            <td className="actions-cell">
                                                <button 
                                                    onClick={() => startEdit(formation)} 
                                                    className="btn-edit"
                                                >
                                                    Modifier
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(formation.idformation)} 
                                                    className="btn-delete"
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
export default FormationsTable;