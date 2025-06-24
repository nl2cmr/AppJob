export const LanguesTable = () => {
    const [langues, setLangues] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        niveau: 'débutant'
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchLangues = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`http://localhost/backend/langue_crud/get_langues.php?iduser=${user.iduser}`);
            const data = await response.json();
            setLangues(data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLangues();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette langue ?")) return;
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/langue_crud/delete_langue.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idlangue: id,
                    user_id: user.iduser 
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchLangues();
            } else {
                alert(result.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const startEdit = (langue) => {
        setEditingId(langue.idlangue);
        setEditForm({
            intitule: langue.intitule,
            niveau: langue.niveau
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
            const response = await fetch('http://localhost/backend/langue_crud/update_langue.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editForm,
                    idlangue: editingId,
                    user_id: user.iduser
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchLangues();
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

    const getNiveauText = (niveau) => {
        const niveaux = {
            'débutant': 'Débutant',
            'intermediaire': 'Intermédiaire',
            'avancé': 'Avancé'
        };
        return niveaux[niveau] || niveau;
    };

    return (
        <div id="langtable">
            {isLoading ? (
                <div className="loading-spinner">Chargement...</div>
            ) : (
                <table className="langues-table">
                    <thead>
                        <tr>
                            <th>Langue</th>
                            <th>Niveau</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {langues.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucune langue enregistrée</td>
                            </tr>
                        ) : (
                            langues.map(langue => (
                                <tr key={langue.idlangue}>
                                    {editingId === langue.idlangue ? (
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
                                                <select
                                                    name="niveau"
                                                    value={editForm.niveau}
                                                    onChange={handleEditChange}
                                                    className="edit-select"
                                                >
                                                    <option value="débutant">Débutant</option>
                                                    <option value="intermediaire">Intermédiaire</option>
                                                    <option value="avancé">Avancé</option>
                                                </select>
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
                                            <td>{langue.intitule}</td>
                                            <td>{getNiveauText(langue.niveau)}</td>
                                            <td className="actions">
                                                <button 
                                                    onClick={() => startEdit(langue)} 
                                                    className="btn-edit"
                                                >
                                                    <i className="fas fa-edit"></i> Modifier
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(langue.idlangue)} 
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

export default LanguesTable;