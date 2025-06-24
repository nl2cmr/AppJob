export const QualitesTable = () => {
    const [qualites, setQualites] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchQualites = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`http://localhost/backend/qualite_crud/get_qualites.php?iduser=${user.iduser}`);
            const data = await response.json();
            setQualites(data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQualites();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette qualité ?")) return;
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/qualite_crud/delete_qualite.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idqualite: id,
                    user_id: user.iduser 
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchQualites();
            } else {
                alert(result.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const startEdit = (qualite) => {
        setEditingId(qualite.idqualite);
        setEditForm({
            intitule: qualite.intitule,
            description: qualite.description || ''
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleEditSubmit = async () => {
        if (!editForm.intitule.trim()) {
            alert("L'intitulé ne peut pas être vide");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/qualite_crud/update_qualite.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editForm,
                    idqualite: editingId,
                    user_id: user.iduser
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchQualites();
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

    return (
        <div id="quatable">
            {isLoading ? (
                <p>Chargement en cours...</p>
            ) : (
                <table className="qualites-table">
                    <thead>
                        <tr>
                            <th>Intitulé</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qualites.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucune qualité enregistrée</td>
                            </tr>
                        ) : (
                            qualites.map(qualite => (
                                <tr key={qualite.idqualite}>
                                    {editingId === qualite.idqualite ? (
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
                                                <textarea
                                                    name="description"
                                                    value={editForm.description}
                                                    onChange={handleEditChange}
                                                    rows="3"
                                                />
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
                                            <td>{qualite.intitule}</td>
                                            <td>{qualite.description || '-'}</td>
                                            <td className="actions-cell">
                                                <button 
                                                    onClick={() => startEdit(qualite)} 
                                                    className="btn-edit"
                                                >
                                                    Modifier
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(qualite.idqualite)} 
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

export default QualitesTable;