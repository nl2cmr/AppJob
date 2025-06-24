export const InteretsTable = () => {
    const [interets, setInterets] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchInterets = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`http://localhost/backend/interet_crud/get_interets.php?iduser=${user.iduser}`);
            const data = await response.json();
            setInterets(data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInterets();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet intérêt ?")) return;
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/interet_crud/delete_interet.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idinteret: id,
                    user_id: user.iduser 
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchInterets();
            } else {
                alert(result.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const startEdit = (interet) => {
        setEditingId(interet.idinteret);
        setEditForm({
            intitule: interet.intitule,
            description: interet.description || ''
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
            const response = await fetch('http://localhost/backend/interet_crud/update_interet.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editForm,
                    idinteret: editingId,
                    user_id: user.iduser
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchInterets();
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
        <div id="inttable">
            {isLoading ? (
                <div className="loading">Chargement en cours...</div>
            ) : (
                <table className="interets-table">
                    <thead>
                        <tr>
                            <th>Intitulé</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interets.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucun intérêt enregistré</td>
                            </tr>
                        ) : (
                            interets.map(interet => (
                                <tr key={interet.idinteret}>
                                    {editingId === interet.idinteret ? (
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
                                                <textarea
                                                    name="description"
                                                    value={editForm.description}
                                                    onChange={handleEditChange}
                                                    className="edit-textarea"
                                                    rows={3}
                                                />
                                            </td>
                                            <td className="actions">
                                                <button onClick={handleEditSubmit} className="btn-save">
                                                    <i className="fas fa-check">valider</i>
                                                </button>
                                                <button onClick={cancelEdit} className="btn-cancel">
                                                    <i className="fas fa-times">annuler</i>
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{interet.intitule}</td>
                                            <td>{interet.description || 'Aucune description'}</td>
                                            <td className="actions">
                                                <button 
                                                    onClick={() => startEdit(interet)} 
                                                    className="btn-edit"
                                                >
                                                    <i className="fas fa-edit">modifier</i>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(interet.idinteret)} 
                                                    className="btn-delete"
                                                >
                                                    <i className="fas fa-trash">supprimer</i>
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

export default InteretsTable;