export const ReferencesTable = () => {
    const [references, setReferences] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        contact: '',
        relation: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchReferences = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`http://localhost/backend/reference_crud/get_references.php?iduser=${user.iduser}`);
            const data = await response.json();
            setReferences(data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReferences();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette référence ?")) return;
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/reference_crud/delete_reference.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idreference: id,
                    user_id: user.iduser 
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchReferences();
            } else {
                alert(result.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const startEdit = (reference) => {
        setEditingId(reference.idreference);
        setEditForm({
            intitule: reference.intitule,
            contact: reference.contact,
            relation: reference.relation
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleEditSubmit = async () => {
        if (!editForm.intitule.trim() || !editForm.contact.trim()) {
            alert("L'intitulé et le contact sont obligatoires");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/reference_crud/update_reference.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editForm,
                    idreference: editingId,
                    user_id: user.iduser
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchReferences();
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
        <div id="reftable">
            {isLoading ? (
                <div className="loading-spinner">Chargement...</div>
            ) : (
                <table className="references-table">
                    <thead>
                        <tr>
                            <th>Intitulé</th>
                            <th>Contact</th>
                            <th>Relation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {references.length === 0 ? (
                            <tr>
                                <td colSpan="4">Aucune référence enregistrée</td>
                            </tr>
                        ) : (
                            references.map(reference => (
                                <tr key={reference.idreference}>
                                    {editingId === reference.idreference ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="intitule"
                                                    value={editForm.intitule}
                                                    onChange={handleEditChange}
                                                    className="edit-input"
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="contact"
                                                    value={editForm.contact}
                                                    onChange={handleEditChange}
                                                    className="edit-input"
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="relation"
                                                    value={editForm.relation}
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
                                            <td>{reference.intitule}</td>
                                            <td>{reference.contact}</td>
                                            <td>{reference.relation}</td>
                                            <td className="actions">
                                                <button 
                                                    onClick={() => startEdit(reference)} 
                                                    className="btn-edit"
                                                >
                                                    <i className="fas fa-edit"></i> Modifier
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(reference.idreference)} 
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

export default ReferencesTable;