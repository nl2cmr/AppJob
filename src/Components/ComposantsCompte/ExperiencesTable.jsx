export const  ExperiencesTable = () => {
    const [experiences, setExperiences] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        poste: '',
        entreprise: '',
        date_debut: '',
        date_fin: '',
        description: ''
    });

    const fetchExperiences = async () => {
        const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        const response = await fetch(`http://localhost/backend/experience_crud/get_experiences.php?iduser=${user.iduser}`);
        const data = await response.json();
        setExperiences(data);
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    // Supprimer une expérience
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) {
            try {
                const response = await fetch('http://localhost/backend/experience_crud/delete_experience.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idexperience: id })
                });
                
                const result = await response.json();
                if (result.success) {
                    fetchExperiences(); // Rafraîchir la liste
                }
            } catch (error) {
                console.error("Erreur:", error);
            }
        }
    };

    // Commencer l'édition
    const startEdit = (exp) => {
        setEditingId(exp.idexperience);
        setEditForm({
            poste: exp.poste,
            entreprise: exp.entreprise,
            date_debut: exp.date_debut,
            date_fin: exp.date_fin,
            description: exp.description
        });
    };

    // Annuler l'édition
    const cancelEdit = () => {
        setEditingId(null);
    };

    // Soumettre les modifications
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/backend/experience_crud/update_experience.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idexperience: editingId,
                    ...editForm
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setEditingId(null);
                fetchExperiences();
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
        fetchExperiences();
    };

    return (
        <div id="exptable">
            <table>
                <thead>
                    <tr>
                        <th>Poste</th>
                        <th>Entreprise</th>
                        <th>Date de Début</th>
                        <th>Date de Fin</th>
                        <th>Description</th>
                        <th>Actions</th>  
                    </tr>
                </thead>
                <tbody>
                    {experiences.map(exp => (
                        <tr key={exp.idexperience}>
                            {editingId === exp.idexperience ? (
                                <>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="poste"
                                            value={editForm.poste}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="entreprise"
                                            value={editForm.entreprise}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="date" 
                                            name="date_debut"
                                            value={editForm.date_debut}
                                            onChange={handleEditChange}
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
                                        <button onClick={handleEditSubmit}>Valider</button>
                                        <button onClick={cancelEdit}>Annuler</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{exp.poste}</td>
                                    <td>{exp.entreprise}</td>
                                    <td>{new Date(exp.date_debut).toLocaleDateString()}</td>
                                    <td>{new Date(exp.date_fin).toLocaleDateString()}</td>
                                    <td>{exp.description}</td>
                                    <td>
                                        <button onClick={() => startEdit(exp)}>Modifier</button>
                                        <button onClick={() => handleDelete(exp.idexperience)}>Supprimer</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExperiencesTable;