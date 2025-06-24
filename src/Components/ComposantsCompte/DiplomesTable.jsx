export const DiplomesTable = () => {
    const [diplomes, setDiplomes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        titre: '',
        date_obtention: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchDiplomes = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`http://localhost/backend/diplome_crud/get_diplomes.php?iduser=${user.iduser}`);
            const data = await response.json();
            setDiplomes(data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDiplomes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce diplôme ?")) return;
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/diplome_crud/delete_diplome.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    iddiplome: id,
                    user_id: user.iduser 
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchDiplomes();
            } else {
                alert(result.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const startEdit = (diplome) => {
        setEditingId(diplome.iddiplome);
        setEditForm({
            titre: diplome.titre,
            date_obtention: diplome.date_obtention ? formatDateForInput(diplome.date_obtention) : ''
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleEditSubmit = async () => {
        if (!editForm.titre.trim()) {
            alert("Le titre ne peut pas être vide");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/diplome_crud/update_diplome.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editForm,
                    iddiplome: editingId,
                    user_id: user.iduser
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchDiplomes();
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

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return 'Non spécifiée';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    return (
        <div id="dipltable">
            {isLoading ? (
                <div className="loading-spinner">Chargement...</div>
            ) : (
                <table className="diplomes-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Date d'obtention</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diplomes.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucun diplôme enregistré</td>
                            </tr>
                        ) : (
                            diplomes.map(diplome => (
                                <tr key={diplome.iddiplome}>
                                    {editingId === diplome.iddiplome ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="titre"
                                                    value={editForm.titre}
                                                    onChange={handleEditChange}
                                                    className="edit-input"
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="date_obtention"
                                                    value={editForm.date_obtention}
                                                    onChange={handleEditChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td className="actions">
                                                <button onClick={handleEditSubmit} className="btn-save">
                                                    <i className="fas fa-check"></i> Valider
                                                </button>
                                                <button onClick={cancelEdit} className="btn-cancel">
                                                    <i className="fas fa-times"></i> Annuler
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{diplome.titre}</td>
                                            <td>{formatDateForDisplay(diplome.date_obtention)}</td>
                                            <td className="actions">
                                                <button 
                                                    onClick={() => startEdit(diplome)} 
                                                    className="btn-edit"
                                                >
                                                    <i className="fas fa-edit"></i> Modifier
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(diplome.iddiplome)} 
                                                    className="btn-delete"
                                                >
                                                    <i className="fas fa-trash"></i> Supprimer
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

export default DiplomesTable;