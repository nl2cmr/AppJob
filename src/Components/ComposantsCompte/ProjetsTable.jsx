export const ProjetsTable = () => {
    const [projets, setProjets] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        lien: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchProjets = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`http://localhost/backend/projet_crud/get_projets.php?iduser=${user.iduser}`);
            const data = await response.json();
            setProjets(data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjets();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/projet_crud/delete_projet.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idprojet: id,
                    user_id: user.iduser 
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchProjets();
            } else {
                alert(result.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const startEdit = (projet) => {
        setEditingId(projet.idprojet);
        setEditForm({
            titre: projet.titre,
            description: projet.description,
            date_debut: projet.date_debut ? formatDateForInput(projet.date_debut) : '',
            date_fin: projet.date_fin ? formatDateForInput(projet.date_fin) : '',
            lien: projet.lien || ''
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
            const response = await fetch('http://localhost/backend/projet_crud/update_projet.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editForm,
                    idprojet: editingId,
                    user_id: user.iduser
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchProjets();
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
        if (!dateString) return 'En cours';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    return (
        <div id="projtable">
            {isLoading ? (
                <div className="loading-spinner">Chargement...</div>
            ) : (
                <table className="projets-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Date de début</th>
                            <th>Date de fin</th>
                            <th>Lien</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projets.length === 0 ? (
                            <tr>
                                <td colSpan="6">Aucun projet enregistré</td>
                            </tr>
                        ) : (
                            projets.map(projet => (
                                <tr key={projet.idprojet}>
                                    {editingId === projet.idprojet ? (
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
                                                <textarea
                                                    name="description"
                                                    value={editForm.description}
                                                    onChange={handleEditChange}
                                                    className="edit-textarea"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="date_debut"
                                                    value={editForm.date_debut}
                                                    onChange={handleEditChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="date_fin"
                                                    value={editForm.date_fin}
                                                    onChange={handleEditChange}
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="url"
                                                    name="lien"
                                                    value={editForm.lien}
                                                    onChange={handleEditChange}
                                                    className="edit-input"
                                                    placeholder="https://example.com"
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
                                            <td>{projet.titre}</td>
                                            <td className="description-cell">
                                                {projet.description && (
                                                    <div className="description-content">
                                                        {projet.description.length > 50 
                                                            ? `${projet.description.substring(0, 50)}...` 
                                                            : projet.description}
                                                    </div>
                                                )}
                                            </td>
                                            <td>{formatDateForDisplay(projet.date_debut)}</td>
                                            <td>{formatDateForDisplay(projet.date_fin)}</td>
                                            <td>
                                                {projet.lien && (
                                                    <a href={projet.lien} target="_blank" rel="noopener noreferrer">
                                                        Lien
                                                    </a>
                                                )}
                                            </td>
                                            <td className="actions">
                                                <button 
                                                    onClick={() => startEdit(projet)} 
                                                    className="btn-edit"
                                                >
                                                    <i className="fas fa-edit"></i> Modifier
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(projet.idprojet)} 
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

export default ProjetsTable;