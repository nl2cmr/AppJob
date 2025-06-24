export const CompetencesTable = () => {
    const [competences, setCompetences] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intutile: '',
        niveau: 'débutant'
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchCompetences = async () => {
        setIsLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`http://localhost/backend/competence_crud/get_competences.php?iduser=${user.iduser}`);
            const data = await response.json();
            setCompetences(data);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCompetences();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) return;
        
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/competence_crud/delete_competence.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idcompetence: id,
                    user_id: user.iduser 
                })
            });
            
            const result = await response.json();
            if (result.success) {
                fetchCompetences();
            } else {
                alert(result.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert('Erreur de connexion');
        }
    };

    const startEdit = (competence) => {
        setEditingId(competence.idcompetence);
        setEditForm({
            intutile: competence.intutile,
            niveau: competence.niveau
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleEditSubmit = async () => {
        if (!editForm.intutile.trim()) {
            alert("L'intitulé ne peut pas être vide");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('http://localhost/backend/competence_crud/update_competence.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idcompetence: editingId,
                    intutile: editForm.intutile,
                    niveau: editForm.niveau,
                    user_id: user.iduser
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchCompetences();
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
        <div id="comptable">
            {isLoading ? (
                <p>Chargement en cours...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Intitulé</th>
                            <th>Niveau</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {competences.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucune compétence enregistrée</td>
                            </tr>
                        ) : (
                            competences.map(comp => (
                                <tr key={comp.idcompetence}>
                                    {editingId === comp.idcompetence ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="intutile"
                                                    value={editForm.intutile}
                                                    onChange={handleEditChange}
                                                    className="edit-input"
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
                                            <td>
                                                <button onClick={handleEditSubmit} className="btn-save">
                                                    Enregistrer
                                                </button>
                                                <button onClick={cancelEdit} className="btn-cancel">
                                                    Annuler
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{comp.intutile}</td>
                                            <td>{getNiveauText(comp.niveau)}</td>
                                            <td>
                                                <button 
                                                    onClick={() => startEdit(comp)} 
                                                    className="btn-edit"
                                                >
                                                    Modifier
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(comp.idcompetence)} 
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