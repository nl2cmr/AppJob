import { NavBarEn } from '../Components/NavBarEn.jsx';
import { Input } from '../Components/Input.jsx'
import { Textarea } from '../Components/Textarea.jsx'
import { useState, useEffect } from 'react';
import './css/CompteEn.css';

export const CompteEn = () => {
    
    const [nom,setNom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [presentation,setPresentation] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const storedUser = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const iduser = storedUser.iduser || storedUser.id;

            if (!iduser) {
                console.error("ID utilisateur manquant:", storedUser);
                alert("Erreur: ID utilisateur non trouvé");
                return;
            }
    
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/update_user.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    iduser,
                    nom,
                    email,
                    telephone,
                    adresse,
                    description: presentation
                })
                
            });
    
            const result = await response.json();
            
            if (result.success) {
                setUpdateSuccess(true);
                const updatedUser = {
                    ...storedUser,
                    nom,
                    email,
                    telephone,
                    adresse,
                    presentation 
                };
                
                if (localStorage.getItem("user")) {
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                } else {
                    sessionStorage.setItem("user", JSON.stringify(updatedUser));
                }
                
                setTimeout(() => setUpdateSuccess(false), 3000);
            } else {
                alert(result.message || 'Échec de la mise à jour');
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            alert("Une erreur est survenue lors de la mise à jour");
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            console.log("Utilisateur récupéré depuis le storage :", user);
            setNom(user.nom || "");
            setEmail(user.email || "");
            setTelephone(user.telephone || "");
            setAdresse(user.adresse || "");
            setPresentation(user.description || user.presentation || "");
        }
    }, []);


    const showinfos = () =>{
        hideAll();
        document.getElementById("infos-ent").style.display = "block";
    }

    const showcomp = () =>{
        hideAll();
        document.getElementById("comps").style.display = "block";
    }

    const showdip = () =>{
        hideAll();
        document.getElementById("dips").style.display = "block";
    }

    const showlang = () =>{
        hideAll();
        document.getElementById("langs").style.display = "block";
    }

    const showqua= () =>{
        hideAll();
        document.getElementById("quas").style.display = "block";
    }

    const showmis = () =>{
        hideAll();
        document.getElementById("miss").style.display = "block";
    }

    const showavan = () =>{
        hideAll();
        document.getElementById("avans").style.display = "block";
    }
    
    const showdoc = () =>{
        hideAll();
        document.getElementById("docs").style.display = "block";
    }

    const showajoutoffre = () =>{
        hideAll();
        document.getElementById("ajoutoffres").style.display = "block";
    }

    const hideAll = () => {
        Array.from(document.getElementsByClassName("switch-part")).forEach(element => {
            element.style.display = "none";
        });
    };


    const showOffForm = () =>{
        document.getElementById("offform")?.classList.remove('hide');
    }

    const showCompForm = () =>{
        document.getElementById("compform")?.classList.remove('hide');
    }

    const showDipForm = () =>{
        document.getElementById("dipform")?.classList.remove('hide');
    }

    const showLangForm = () =>{
        document.getElementById("langform")?.classList.remove('hide');
    }

    const showMisForm = () =>{
        document.getElementById("misform")?.classList.remove('hide');
    }

    const showQuaForm = () =>{
        document.getElementById("quaform")?.classList.remove('hide');
    }

    const showAvanForm = () =>{
        document.getElementById("avanform")?.classList.remove('hide');
    }

    const showDocForm = () =>{
        document.getElementById("docform")?.classList.remove('hide');
    }
    
    
    return (
        <div className="compte-page">
            <NavBarEn />
            <div className="body-ent">
                <div className="menu">
                    <ul>
                        <li><button onClick={showinfos} id='btn-ent-infos' type="button">Informations de l'entreprise</button></li>
                        <li><button onClick={showajoutoffre} id='btn-ent-exp' type="button">Gestion des offres</button></li>
                        <li><button onClick={showcomp} id='btn-ent-exp' type="button">Gestion des compétences</button></li>
                        <li><button onClick={showdip} id='btn-ent-exp' type="button">Gestion des diplômes</button></li>
                        <li><button onClick={showlang} id='btn-ent-exp' type="button">Gestion des langues</button></li>
                        <li><button onClick={showqua} id='btn-ent-exp' type="button">Gestion des qualités</button></li>
                        <li><button onClick={showmis} id='btn-ent-exp' type="button">Gestion des missions</button></li>
                        <li><button onClick={showavan} id='btn-ent-exp' type="button">Gestion des avantages</button></li>
                        <li><button onClick={showdoc} id='btn-ent-exp' type="button">Gestion des documents requis</button></li>
                    </ul>
                </div>

                <div className="content-ent">

                    
                    <div id="infos-ent" className='switch-part'>
                        <h1>Vos Informations</h1>
                        <div className="perso">
                            <div className="fullname">
                                <Input name="Nom" placeholder="Votre nom" type="text" onChange={(e) => {setNom(e.target.value)}} value={nom} label="Votre Nom"/>
                            </div>
                            <Input name="telephone" placeholder="Numéro de téléphone" type="tel" onChange={(e) => setTelephone(e.target.value)} value={telephone} label="Votre numéro de téléphone" />
                            <Input name="Email" placeholder="Votre email" type="email" onChange={(e) => {setEmail(e.target.value)}} value={email} label="Votre email"/>
                            <Input name="adresse" placeholder="Adresse" type="text" onChange={(e) => setAdresse(e.target.value)} value={adresse} label="Votre Adresse" />
                        </div>

                        <div className="present">
                            <Textarea name="presentation" label="Votre présentation" value={presentation} onChange={(e)=>{setPresentation(e.target.value)}}/>
                        </div>
                        <button onClick={handleUpdateUser} disabled={isUpdating}>
                        {isUpdating ? 'Mise à jour en cours...' : 'Mettre à jour les informations'}
                        </button>
                        {updateSuccess && <div className="success-message">Informations mises à jour avec succès!</div>}
                    </div>

                    <div id="ajoutoffres" className='switch-part'>
                        <h2>Gestion des offres</h2>
                        <OffresTable />
                        <OffresForm />
                        <button id='addoff' onClick={showOffForm}>Ajouter une offre</button>
                    </div>

                    <div id="comps" className='switch-part'>
                        <h2>Gestion des compétences</h2>
                        <CompetencesTableOff />
                        <CompetencesFormOff />
                        <button id='addcomp' onClick={showCompForm}>Ajouter une competence</button>
                        <br />
                    </div>

                    <div id="dips" className='switch-part'>
                        <h2>Gestion des diplômes</h2>
                        <DiplomesTableOff />
                        <DiplomesFormOff />
                        <button id='adddip' onClick={showDipForm}>Ajouter un diplome</button>
                        <br />
                    </div>

                    <div id="langs" className='switch-part'>
                        <h2>Gestion des langues</h2>
                        <LanguesTableOff />
                        <LanguesFormOff />
                        <button id='addlang' onClick={showLangForm}>Ajouter une langue</button>
                        <br />
                    </div>

                    <div id="quas" className='switch-part'>
                        <h2>Gestion des qualites</h2>
                        <QualitesTableOff />
                        <QualitesFormOff />
                        <button id='addqua' onClick={showQuaForm}>Ajouter une qualite</button>
                        <br />
                    </div>

                    <div id="miss" className='switch-part'>
                        <h2>Gestion des missions</h2>
                        <MissionsTableOff />
                        <MissionsFormOff />
                        <button id='addmis' onClick={showMisForm}>Ajouter une mission</button>
                        <br />
                    </div>

                    <div id="avans" className='switch-part'>
                        <h2>Gestion des avantages</h2>
                        <AvantagesTableOff />
                        <AvantagesFormOff />
                        <button id='addavan' onClick={showAvanForm}>Ajouter un avantage</button>
                        <br />
                    </div>

                    <div id="docs" className='switch-part'>
                        <h2>Gestion des documents requis</h2>
                        <DocRequisFormOff />
                        <DocRequisTableOff />
                        <button id='adddoc' onClick={showDocForm}>Ajouter un document</button>
                        <br />
                    </div>

                </div>
            </div>
        </div>
    );
}

function OffresForm() {


    const closeOffForms = () =>{
        document.getElementById("offform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            titre: e.target.titreoff.value,
            reference: e.target.refoff.value,
            description: e.target.descoff.value,
            date_publication: new Date().toISOString().split('T')[0],
            date_expiration: e.target.dateexpoff.value, 
            salaire: e.target.salaire.value, 
            type_contrat: e.target.listtypecontrat.value 
        };

        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/offre_crud/add_offre.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.success) {
                alert('Offre ajoutée avec succès');
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return (
        <div id="offform" className='hide'>
            <button id='closeOffForm' onClick={closeOffForms}>&times;</button>
            <form onSubmit={handleSubmit} method="POST">
                <fieldset>
                    <legend>Ajouter une offre d'emploi</legend>
                    <Input name="titreoff" label="Donnez un titre à votre offre d'emploi" />
                    <Input name="refoff" label="Entrez la référence de votre offre d'emploi" />
                    <Textarea name="descoff" label="Décrivez l'offre d'emploi" />
                    <Input type="date" name="dateexpoff" label="Date d'expiration" />
                    <Input type="number" name="salaire" label="Salaire de base" />
                    <div>
                        <label htmlFor="typecontrat">Types de contrat</label>
                        <select name="listtypecontrat" id="typecontrat">
                            <option value="cdi">CDI</option>
                            <option value="cdd">CDD</option>
                            <option value="stage">Stage</option>
                            <option value="freelance">Freelance</option>
                        </select>
                    </div>
                    <button className='submit-btn'>Enregistrer cette offre</button>
                </fieldset>
            </form>
        </div>
    );
}

function OffresTable(){

    const [offres, setOffres] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        titre: '',
        reference: '',
        description: '',
        date_publication: '',
        date_expiration: '',
        salaire: '',
        type_contrat: ''
    });

    const fetchOffres = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
            const data = await response.json();
            setOffres(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des offres:", error);
        }
    };

    useEffect(() => {
        fetchOffres();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ? Toutes les données associées seront également supprimées.")) {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Vous devez être connecté');
                }
    
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/offre_crud/delete_offre.php', {
                    method: 'DELETE',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        idoffre: id,
                        user_id: user.iduser 
                    })
                });
    
                // Vérification du Content-Type
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    throw new Error(`Invalid response: ${text.substring(0, 100)}`);
                }
    
                const result = await response.json();
                
                if (!response.ok || !result.success) {
                    throw new Error(result.message || 'Failed to delete offer');
                }
    
                // Mise à jour de l'état
                setOffres(prev => prev.filter(off => off.idoffre !== id));
                alert('Offre supprimée avec succès');
    
            } catch (error) {
                console.error('Delete error:', error);
                alert(`Échec de la suppression: ${error.message}`);
            }
        }
    };

    const handleEdit = (id) => {
        const offreToEdit = offres.find(off => off.idoffre === id);
        setEditingId(id);
        setEditForm({
            titre: offreToEdit.titre,
            reference: offreToEdit.reference,
            description: offreToEdit.description,
            date_publication: offreToEdit.date_publication,
            date_expiration: offreToEdit.date_expiration,
            salaire: offreToEdit.salaire,
            type_contrat: offreToEdit.type_contrat
        });
    };

    const handleSave = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/offre_crud/update_offre.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idoffre: id, 
                    user_id: user.iduser,
                    ...editForm 
                })
            });
            if (response.ok) {
                setOffres(offres.map(off => (off.idoffre === id ? { ...off, ...editForm } : off)));
                setEditingId(null);
            } else {
                console.error("Erreur lors de la mise à jour de l'offre.");
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({
            titre: '',
            reference: '',
            description: '',
            date_publication: '',
            date_expiration: '',
            salaire: '',
            type_contrat: ''
        });
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };


    return (
        <div id="offtable" className="offre-table-container">
            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Reference de l'offre</th>
                        <th>Description de l'offre</th>
                        <th>Date de publication</th>
                        <th>Date d'expiration</th>
                        <th>Salaire de base</th>
                        <th>Type de contrat</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {offres.length === 0 ? (
                        <tr>
                            <td colSpan="3">Aucune offre enregistrée</td>
                        </tr>
                    ) : (
                    offres.map(off => (
                        <tr key={off.idoffre}>
                            {editingId === off.idoffre ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="titre"
                                            value={editForm.titre || ''}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="reference"
                                            value={editForm.reference || ''}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            name="description"
                                            value={editForm.description || ''}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="date_publication"  
                                            value={editForm.date_publication || ''}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            name="date_expiration" 
                                            value={editForm.date_expiration || ''}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="salaire"
                                            value={editForm.salaire || ''}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="type_contrat" 
                                            value={editForm.type_contrat || ''}
                                            onChange={handleEditChange}
                                        >
                                            <option value="CDI">CDI</option>
                                            <option value="CDD">CDD</option>
                                            <option value="Stage">Stage</option>
                                            <option value="Freelance">Freelance</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleSave(off.idoffre)}>Valider</button>
                                        <button onClick={handleCancel}>Annuler</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{off.titre}</td>
                                    <td>{off.reference}</td>
                                    <td>{off.description}</td>
                                    <td>{off.date_publication}</td>
                                    <td>{off.date_expiration}</td>
                                    <td>{off.salaire}</td>
                                    <td>{off.type_contrat}</td>
                                    <td>
                                        <button onClick={() => handleEdit(off.idoffre)}>Modifier</button>
                                        <button onClick={() => handleDelete(off.idoffre)}>Supprimer</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    );
}


function CompetencesFormOff() {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Utilisateur non connecté');
                }

                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur serveur');
                }

                const data = await response.json();
                setOffres(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    const closeCompForms = () => {
        document.getElementById("compform")?.classList.add('hide');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            idoffre: e.target.refoff.value,
            intitule: e.target.intcomp.value,
            niveau: e.target.listniveaucomp.value,
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/competence_crud/add_competence.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeCompForms();
                alert('Compétence ajoutée avec succès !');
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return (
        <div id="compform" className='hide'>
            <button id='closeCompForm' onClick={closeCompForms}>&times;</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter une compétence</legend>
                    
                    <div className="form-group">
                        <label htmlFor="refoff">Offre associée :</label>
                        {loading ? (
                            <p>Chargement des offres...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : offres.length === 0 ? (
                            <p>Aucune offre disponible</p>
                        ) : (
                            <select 
                                name="refoff" 
                                id="refoff" 
                                required
                                className="form-control"
                            >
                                {offres.map(offre => (
                                    <option 
                                        key={offre.idoffre} 
                                        value={offre.idoffre}
                                    >
                                        {offre.reference}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <Input 
                            name="intcomp" 
                            label="Intitulé de la compétence" 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="niveaucomp">Niveau :</label>
                        <select 
                            name="listniveaucomp" 
                            id="niveaucomp" 
                            required
                            className="form-control"
                        >
                            <option value="">-- Sélectionnez un niveau --</option>
                            <option value="debutant">Débutant</option>
                            <option value="intermediaire">Intermédiaire</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        Enregistrer cette compétence
                    </button>
                </fieldset>
            </form>
        </div>
    );
}


function CompetencesTableOff() {
    const [competences, setCompetences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intutile: '',
        niveau: ''
    });

    useEffect(() => {
        const fetchCompetences = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/competence_crud/get_competencesoff.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des compétences');
                }

                const data = await response.json();
                setCompetences(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCompetences();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/competence_crud/delete_competenceoff.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        idcompetence: id,
                        iduser: user.iduser
                    })
                });

                if (response.ok) {
                    setCompetences(competences.filter(comp => comp.idcompetence !== id));
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Échec de la suppression');
            }
        }
    };

    
    const handleEdit = (competence) => {
        setEditingId(competence.idcompetence);
        setEditForm({
            intutile: competence.intutile, 
            niveau: competence.niveau
        });
    };

    const handleCancel = (id) => {
        setEditingId(null);
      };

    
    const handleSave = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/competence_crud/update_competenceoff.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idcompetence: id,
                    iduser: user.iduser,
                    ...editForm 
                })
            });

            if (response.ok) {
                setCompetences(competences.map(comp => 
                    comp.idcompetence === id ? { ...comp, ...editForm } : comp
                ));
                setEditingId(null);
            } else {
                throw new Error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Échec de la mise à jour');
        }
    };

    
    const niveauxOptions = [
        { value: 'debutant', label: 'Débutant' },
        { value: 'intermediaire', label: 'Intermédiaire' },
        { value: 'expert', label: 'Expert' }
    ];

    return (
        <div id="comptableoff" className="competence-table-container">
            {loading ? (
                <div className="loading-state">Chargement...</div>
            ) : error ? (
                <div className="error-state">Erreur: {error}</div>
            ) : (
                <table className="competence-table">
                    <thead>
                        <tr>
                            <th>Intitulé</th>
                            <th>Niveau</th>
                            <th>Offre associée</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {competences.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucune compétence enregistrée</td>
                            </tr>
                        ) : (
                        competences.map(competence => (
                            <tr key={competence.idcompetence}>
                                {editingId === competence.idcompetence ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                name="intutile"
                                                value={editForm.intutile}
                                                onChange={(e) => setEditForm({...editForm, intutile: e.target.value})}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={editForm.niveau}
                                                onChange={(e) => setEditForm({...editForm, niveau: e.target.value})}
                                            >
                                                {niveauxOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>{competence.reference_offre || '-'}</td>
                                        <td>
                                            <button onClick={() => handleSave(competence.idcompetence)}>Enregistrer</button>
                                            <button onClick={handleCancel}>Annuler</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{competence.intutile}</td>
                                        <td>{niveauxOptions.find(n => n.value === competence.niveau)?.label || competence.niveau}</td>
                                        <td>{competence.reference_offre || '-'}</td>
                                        <td>
                                            <button onClick={() => handleEdit(competence)}>Modifier</button>
                                            <button onClick={() => handleDelete(competence.idcompetence)}>Supprimer</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )))}
                    </tbody>
                </table>
            )}
        </div>
    );
}



function DiplomesFormOff() {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Utilisateur non connecté');
                }

                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des offres');
                }

                const data = await response.json();
                setOffres(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    const closeDipForms = () => {
        document.getElementById("dipform")?.classList.add('hide');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            idoffre: e.target.refoff.value,
            titre: e.target.titredip.value,
            date_obtention: e.target.dateobtention.value,
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/diplome_crud/add_diplome.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeDipForms();
                alert('Diplôme ajouté avec succès !');
                
            } else {
                alert(result.message || 'Erreur lors de l\'ajout du diplôme');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        }
    };

    return (
        <div id="dipform" className='hide'>
            <button id='closeDipForm' onClick={closeDipForms}>&times;</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter un diplôme</legend>
                    
                    <div className="form-group">
                        <label htmlFor="refoff">Offre associée :</label>
                        {loading ? (
                            <p>Chargement des offres...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : offres.length === 0 ? (
                            <p>Aucune offre disponible</p>
                        ) : (
                            <select 
                                name="refoff" 
                                id="refoff" 
                                required
                                className="form-control"
                            >
                                <option value="">-- Sélectionnez une offre --</option>
                                {offres.map(offre => (
                                    <option 
                                        key={offre.idoffre} 
                                        value={offre.idoffre}
                                    >
                                        {offre.reference}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <Input 
                            name="titredip" 
                            label="Titre du diplôme"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <Input 
                            name="dateobtention" 
                            type="date" 
                            label="Date d'obtention"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        Enregistrer ce diplôme
                    </button>
                </fieldset>
            </form>
        </div>
    );
}


function DiplomesTableOff() {
    const [diplomes, setDiplomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        titre: '',
        date_obtention: ''
    });

    
    useEffect(() => {
        const fetchDiplomes = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/diplome_crud/get_diplomes.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des diplômes');
                }

                const data = await response.json();
                setDiplomes(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDiplomes();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce diplôme ?")) {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/diplome_crud/delete_diplome.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        iddiplome: id,
                        iduser: user.iduser 
                    })
                });

                if (response.ok) {
                    setDiplomes(diplomes.filter(dip => dip.iddiplome !== id));
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Échec de la suppression');
            }
        }
    };

    
    const handleEdit = (diplome) => {
        setEditingId(diplome.iddiplome);
        setEditForm({
            titre: diplome.titre,
            date_obtention: diplome.date_obtention.split('T')[0] // Format YYYY-MM-DD
        });
    };

    
    const handleSave = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/diplome_crud/update_diplome.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    iddiplome: id,
                    iduser: user.iduser, 
                    ...editForm 
                })
            });

            if (response.ok) {
                setDiplomes(diplomes.map(dip => 
                    dip.iddiplome === id ? { ...dip, ...editForm } : dip
                ));
                setEditingId(null);
            } else {
                throw new Error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Échec de la mise à jour');
        }
    };

    
    const handleCancel = () => {
        setEditingId(null);
    };

    
    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div id="diptableoff" className="diplome-table-container">
            {loading ? (
                <div className="loading-message">
                    <div className="spinner"></div>
                    <p>Chargement des diplômes...</p>
                </div>
            ) : error ? (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Réessayer</button>
                </div>
            ) : (
                <table className="diplome-table">
                    <thead>
                        <tr>
                            <th>Titre du diplôme</th>
                            <th>Date d'obtention</th>
                            <th>Offre associée</th>
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
                                        <td>
                                            {diplome.reference_offre || 'Non spécifiée'}
                                        </td>
                                        <td className="actions-cell">
                                            <button 
                                                onClick={() => handleSave(diplome.iddiplome)}
                                                className="save-btn"
                                            >
                                                Valider
                                            </button>
                                            <button 
                                                onClick={handleCancel}
                                                className="cancel-btn"
                                            >
                                                Annuler
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{diplome.titre}</td>
                                        <td>{formatDate(diplome.date_obtention)}</td>
                                        <td>{diplome.reference_offre || 'Non spécifiée'}</td>
                                        <td className="actions-cell">
                                            <button 
                                                onClick={() => handleEdit(diplome)}
                                                className="edit-btn"
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(diplome.iddiplome)}
                                                className="delete-btn"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


function LanguesFormOff() {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Utilisateur non connecté');
                }

                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Échec du chargement des offres');
                }

                const data = await response.json();
                setOffres(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    const closeLangForms = () => {
        document.getElementById("langform")?.classList.add('hide');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            idoffre: e.target.refoff.value,
            intitule: e.target.intlang.value,
            niveau: e.target.listniveaulang.value,
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/langue_crud/add_langue.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeLangForms();
                alert('Langue ajoutée avec succès !');
                
            } else {
                alert(result.message || "Échec de l'ajout de la langue");
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        }
    };

    return (
        <div id="langform" className='hide'>
            <button id='closeLangForm' onClick={closeLangForms}>&times;</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter une langue</legend>
                    
                    <div className="form-group">
                        <label htmlFor="refoff">Offre associée :</label>
                        {loading ? (
                            <p>Chargement des offres...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : offres.length === 0 ? (
                            <p>Aucune offre disponible</p>
                        ) : (
                            <select 
                                name="refoff" 
                                id="refoff" 
                                required
                                className="form-control"
                            >
                                <option value="">-- Sélectionnez une offre --</option>
                                {offres.map(offre => (
                                    <option 
                                        key={offre.idoffre} 
                                        value={offre.idoffre}
                                    >
                                        {offre.reference} - {offre.titre}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <Input 
                            name="intlang" 
                            label="Langue" 
                            required
                            placeholder="Ex: Anglais, Espagnol..."
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="niveaulang">Niveau :</label>
                        <select 
                            name="listniveaulang" 
                            id="niveaulang" 
                            required
                            className="form-control"
                        >
                            <option value="">-- Sélectionnez un niveau --</option>
                            <option value="debutant">Débutant</option>
                            <option value="intermediaire">Intermédiaire</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        Enregistrer cette langue
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

function LanguesTableOff() {
    const [langues, setLangues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        niveau: 'debutant' 
    });

    const niveauxOptions = [
        { value: 'debutant', label: 'Débutant' },
        { value: 'intermediaire', label: 'Intermédiaire' },
        { value: 'avance', label: 'Avancé' } 
    ];

    useEffect(() => {
        const fetchLangues = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('User not authenticated');
                }

                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/langue_crud/get_languesoff.php?iduser=${user.iduser}`);
                
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    throw new Error(`Invalid response: ${text.substring(0, 100)}`);
                }

                const data = await response.json();
                
                if (!response.ok || !data.success) {
                    throw new Error(data.message || 'Failed to load languages');
                }

                setLangues(data.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLangues();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette langue ?")) {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/langue_crud/delete_langueoff.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        idlangue: id,
                        iduser: user.iduser
                    })
                });

                if (response.ok) {
                    setLangues(langues.filter(lang => lang.idlangue !== id));
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Échec de la suppression');
            }
        }
    };

    
    const handleEdit = (langue) => {
        setEditingId(langue.idlangue);
        setEditForm({
            intitule: langue.intitule,
            niveau: langue.niveau
        });
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    
    const handleSave = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/langue_crud/update_langueoff.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idlangue: id,
                    iduser: user.iduser,
                    ...editForm 
                })
            });

            if (response.ok) {
                setLangues(langues.map(lang => 
                    lang.idlangue === id ? { ...lang, ...editForm } : lang
                ));
                setEditingId(null);
            } else {
                throw new Error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Échec de la mise à jour');
        }
    };

    return (
        <div id="langtableoff" className="langue-table-container">
            {loading ? (
                <div className="loading-state">Chargement...</div>
            ) : error ? (
                <div className="error-state">
                    Erreur: {error}
                    <button onClick={() => window.location.reload()}>Réessayer</button>
                </div>
            ) : (
                <table className="langue-table">
                    <thead>
                        <tr>
                            <th>Langue</th>
                            <th>Niveau</th>
                            <th>Offre associée</th>
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
                                                value={editForm.intitule}
                                                onChange={(e) => setEditForm({...editForm, intitule: e.target.value})}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={editForm.niveau}
                                                onChange={(e) => setEditForm({...editForm, niveau: e.target.value})}
                                            >
                                                {niveauxOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>{langue.reference_offre || '-'}</td>
                                        <td>
                                            <button onClick={() => handleSave(langue.idlangue)}>Enregistrer</button>
                                            <button onClick={handleCancel}>Annuler</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{langue.intitule}</td>
                                        <td>{niveauxOptions.find(n => n.value === langue.niveau)?.label || langue.niveau}</td>
                                        <td>{langue.reference_offre || '-'}</td>
                                        <td>
                                            <button onClick={() => handleEdit(langue)}>Modifier</button>
                                            <button onClick={() => handleDelete(langue.idlangue)}>Supprimer</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


function QualitesFormOff() {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Vous devez être connecté(e)');
                }

                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des offres');
                }

                const data = await response.json();
                setOffres(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    const closeQuaForms = () => {
        document.getElementById("quaform")?.classList.add('hide');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            idoffre: e.target.refoff.value,
            intitule: e.target.intqua.value,
            description: e.target.descqua.value,
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/qualite_crud/add_qualite.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeQuaForms();
                alert('Qualité professionnelle enregistrée avec succès !');
                
            } else {
                alert(result.message || "Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Problème de connexion au serveur');
        }
    };

    return (
        <div id="quaform" className='hide'>

            <button id='closeQuaForm' onClick={closeQuaForms} className="close-btn">
                &times;
            </button>
            
            <form onSubmit={handleSubmit} className="qualite-form">
                
                <fieldset>
                    <legend>Ajouter une qualité</legend>
                    <div className="form-group">
                        <label htmlFor="refoff">Offre concernée :</label>
                        {loading ? (
                            <div className="loading-msg">Chargement en cours...</div>
                        ) : error ? (
                            <div className="error-msg">{error}</div>
                        ) : offres.length === 0 ? (
                            <div className="empty-msg">Aucune offre disponible</div>
                        ) : (
                            <select 
                                name="refoff" 
                                id="refoff" 
                                required
                                className="form-control"
                            >
                                <option value="">-- Sélectionner une offre --</option>
                                {offres.map(offre => (
                                    <option 
                                        key={offre.idoffre} 
                                        value={offre.idoffre}
                                    >
                                        {offre.reference}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <Input 
                            name="intqua" 
                            label="Intitulé de la qualité" 
                            required
                            placeholder="Ex: Esprit d'équipe, Rigoureux..."
                            className="input-field"
                        />
                    </div>
                    
                    <div className="form-group">
                        <Textarea 
                            name="descqua" 
                            label="Description détaillée" 
                            required
                            placeholder="Décrivez cette qualité et son importance..."
                            rows={4}
                            className="textarea-field"
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        Enregistrer cette qualité
                    </button>
                </fieldset>
                
                
            </form>
        </div>
    );
}


function QualitesTableOff() {
    const [qualites, setQualites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        description: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    
    useEffect(() => {
        const fetchQualites = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/qualite_crud/get_qualitesoff.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des qualités');
                }

                const data = await response.json();
                setQualites(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchQualites();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette qualité professionnelle ?")) {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/qualite_crud/delete_qualiteoff.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        idqualite: id,
                        iduser: user.iduser 
                    })
                });

                if (response.ok) {
                    setQualites(qualites.filter(qualite => qualite.idqualite !== id));
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Échec de la suppression');
            }
        }
    };

    
    const handleEdit = (qualite) => {
        setEditingId(qualite.idqualite);
        setEditForm({
            intitule: qualite.intitule,
            description: qualite.description
        });
    };

    
    const handleSave = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/qualite_crud/update_qualiteoff.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idqualite: id,
                    iduser: user.iduser, 
                    ...editForm 
                })
            });

            if (response.ok) {
                setQualites(qualites.map(qualite => 
                    qualite.idqualite === id ? { ...qualite, ...editForm } : qualite
                ));
                setEditingId(null);
            } else {
                throw new Error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Échec de la mise à jour');
        }
    };

    
    const handleCancel = () => {
        setEditingId(null);
    };

    
    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = qualites.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(qualites.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div id="quatable" className="qualite-table-container">

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Chargement des qualités...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <span className="error-icon">!</span>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="retry-button"
                    >
                        Réessayer
                    </button>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="qualite-table">
                            <thead>
                                <tr>
                                    <th width="20%">Intitulé</th>
                                    <th width="50%">Description</th>
                                    <th width="15%">Offre associée</th>
                                    <th width="15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {qualites.length === 0 ? (
                                    <tr>
                                        <td colSpan="3">Aucune qualité enregistrée</td>
                                    </tr>
                                ) : (
                                currentItems.map(qualite => (
                                    <tr key={qualite.idqualite}>
                                        {editingId === qualite.idqualite ? (
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
                                                        required
                                                        rows="3"
                                                    />
                                                </td>
                                                <td>
                                                    {qualite.reference_offre || 'Non spécifiée'}
                                                </td>
                                                <td className="action-buttons">
                                                    <button 
                                                        onClick={() => handleSave(qualite.idqualite)}
                                                        className="save-button"
                                                    >
                                                        Valider
                                                    </button>
                                                    <button 
                                                        onClick={handleCancel}
                                                        className="cancel-button"
                                                    >
                                                        Annuler
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{qualite.intitule}</td>
                                                <td className="description-cell">
                                                    {qualite.description || 'Aucune description'}
                                                </td>
                                                <td>
                                                    {qualite.reference_offre || 'Non spécifiée'}
                                                </td>
                                                <td className="action-buttons">
                                                    <button 
                                                        onClick={() => handleEdit(qualite)}
                                                        className="edit-button"
                                                        title="Modifier"
                                                    >
                                                        modifier
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(qualite.idqualite)}
                                                        className="delete-button"
                                                        title="Supprimer"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination-container">
                            <button 
                                onClick={() => paginate(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className="pagination-button"
                            >
                                &laquo; Précédent
                            </button>
                            
                            {[...Array(totalPages).keys()].map(number => (
                                <button
                                    key={number + 1}
                                    onClick={() => paginate(number + 1)}
                                    className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
                                >
                                    {number + 1}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => paginate(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                                className="pagination-button"
                            >
                                Suivant &raquo;
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}



function MissionsFormOff() {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateError, setDateError] = useState('');

    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Vous devez être connecté(e)');
                }

                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des offres');
                }

                const data = await response.json();
                setOffres(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    const closeMisForms = () => {
        document.getElementById("misform")?.classList.add('hide');
    };

    const validateDates = (startDate, endDate) => {
        if (new Date(startDate) > new Date(endDate)) {
            setDateError('La date de fin doit être postérieure à la date de début');
            return false;
        }
        setDateError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const startDate = e.target.datedebmis.value;
        const endDate = e.target.datefinmis.value;
        
        if (!validateDates(startDate, endDate)) {
            return;
        }

        const formData = {
            idoffre: e.target.refoff.value,
            titre: e.target.titmis.value,
            description: e.target.descmis.value,
            date_debut: startDate,
            date_fin: endDate,
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/mission_crud/add_mission.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeMisForms();
                alert('Mission enregistrée avec succès !');
            } else {
                alert(result.message || "Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Problème de connexion au serveur');
        }
    };

    return (
        <div id="misform" className='hide mission-form-container'>

            <button id='closeMisForm' onClick={closeMisForms} className="close-btn">
                &times;
            </button>

            <form onSubmit={handleSubmit} className="mission-form">
                <fieldset>
                    <legend>Ajouter une mission</legend>
                    <div className="form-group">
                        <label htmlFor="refoff">Offre associée :</label>
                        {loading ? (
                            <div className="loading-msg">Chargement des offres...</div>
                        ) : error ? (
                            <div className="error-msg">{error}</div>
                        ) : offres.length === 0 ? (
                            <div className="empty-msg">Aucune offre disponible</div>
                        ) : (
                            <select 
                                name="refoff" 
                                id="refoff" 
                                required
                                className="form-control"
                            >
                                <option value="">-- Sélectionner une offre --</option>
                                {offres.map(offre => (
                                    <option 
                                        key={offre.idoffre} 
                                        value={offre.idoffre}
                                    >
                                        {offre.reference}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <Input 
                            name="titmis" 
                            label="Titre de la mission" 
                            required
                            placeholder="Ex: Développement d'une nouvelle fonctionnalité"
                            className="input-field"
                        />
                    </div>
                    
                    <div className="form-group">
                        <Textarea 
                            name="descmis" 
                            label="Description détaillée" 
                            required
                            placeholder="Décrivez les objectifs et tâches de cette mission..."
                            rows={4}
                            className="textarea-field"
                        />
                    </div>
                    
                    <div className="date-fields">
                        <div className="form-group">
                            <Input 
                                type="date" 
                                name="datedebmis" 
                                label="Date de début" 
                                required
                                className="date-field"
                                onChange={(e) => validateDates(e.target.value, document.getElementById("datefinmis")?.value)}
                            />
                        </div>
                        
                        <div className="form-group">
                            <Input 
                                type="date" 
                                name="datefinmis" 
                                id="datefinmis"
                                label="Date de fin" 
                                required
                                className="date-field"
                                onChange={(e) => validateDates(document.getElementById("datedebmis")?.value, e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {dateError && <div className="error-msg">{dateError}</div>}
                    
                    <button type="submit" className="submit-btn">
                        Enregistrer cette mission
                    </button>
                </fieldset>
                
            </form>
        </div>
    );
}

function MissionsTableOff() {
    const [missions, setMissions] = useState([]);
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        idoffre: ''
    });
    const [dateError, setDateError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user || !user.iduser) {
                    throw new Error('Utilisateur non connecté');
                }
                
                const offresResponse = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                if (!offresResponse.ok) throw new Error('Erreur lors du chargement des offres');
                setOffres(await offresResponse.json());
    
                
                const missionsResponse = await fetch(`https://jobconnectbackend.ct.ws/backend/mission_crud/get_missions.php?iduser=${user.iduser}`);
                if (!missionsResponse.ok) throw new Error('Erreur lors du chargement des missions');
                
                const missionsData = await missionsResponse.json();
                setMissions(missionsData.data || []);
    
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette mission ?")) {
            try {
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/mission_crud/delete_mission.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idmission: id })
                });

                if (response.ok) {
                    setMissions(missions.filter(mission => mission.idmission !== id));
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Échec de la suppression');
            }
        }
    };

    
    const handleEdit = (mission) => {
        setEditingId(mission.idmission);
        setEditForm({
            titre: mission.titre,
            description: mission.description,
            date_debut: mission.date_debut,
            date_fin: mission.date_fin,
            idoffre: offres.find(o => o.reference === mission.reference_offre)?.idoffre || ''
        });
    };

    
    const validateDates = (startDate, endDate) => {
        if (new Date(startDate) > new Date(endDate)) {
            setDateError('La date de fin doit être postérieure à la date de début');
            return false;
        }
        setDateError('');
        return true;
    };

    
    const handleSave = async (id) => {
        if (!validateDates(editForm.date_debut, editForm.date_fin)) {
            return;
        }

        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/mission_crud/update_mission.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idmission: id,
                    ...editForm 
                })
            });

            if (response.ok) {
                setMissions(missions.map(mission => 
                    mission.idmission === id ? { 
                        ...mission, 
                        ...editForm,
                        reference_offre: offres.find(o => o.idoffre == editForm.idoffre)?.reference || mission.reference_offre
                    } : mission
                ));
                setEditingId(null);
            } else {
                throw new Error('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Échec de la mise à jour');
        }
    };

    
    const handleCancel = () => {
        setEditingId(null);
        setDateError('');
    };

    
    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div id="mistable" className="mission-table-container">
            {loading ? (
                <div className="loading-state">Chargement...</div>
            ) : error ? (
                <div className="error-state">Erreur: {error}</div>
            ) : (
                <table className="mission-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Période</th>
                            <th>Offre associée</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missions.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucune mission enregistrée</td>
                            </tr>
                        ) : (
                        missions.map(mission => (
                            <tr key={mission.idmission}>
                                {editingId === mission.idmission ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                name="titre"
                                                value={editForm.titre}
                                                onChange={handleEditChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <textarea
                                                name="description"
                                                value={editForm.description}
                                                onChange={handleEditChange}
                                                rows={3}
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
                                            <input
                                                type="date"
                                                name="date_fin"
                                                value={editForm.date_fin}
                                                onChange={handleEditChange}
                                                required
                                            />
                                            {dateError && <div className="error">{dateError}</div>}
                                        </td>
                                        <td>
                                            <select
                                                name="idoffre"
                                                value={editForm.idoffre}
                                                onChange={handleEditChange}
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                {offres.map(offre => (
                                                    <option key={offre.idoffre} value={offre.idoffre}>
                                                        {offre.reference}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <button onClick={() => handleSave(mission.idmission)}>Enregistrer</button>
                                            <button onClick={handleCancel}>Annuler</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{mission.titre}</td>
                                        <td>{mission.description || '-'}</td>
                                        <td>
                                            {new Date(mission.date_debut).toLocaleDateString()} - {' '}
                                            {new Date(mission.date_fin).toLocaleDateString()}
                                        </td>
                                        <td>{mission.reference_offre || '-'}</td>
                                        <td>
                                            <button onClick={() => handleEdit(mission)}>Modifier</button>
                                            <button onClick={() => handleDelete(mission.idmission)}>Supprimer</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


function AvantagesFormOff() {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Authentification requise');
                }

                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Échec du chargement des offres');
                }

                const data = await response.json();
                setOffres(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    const closeAvanForms = () => {
        document.getElementById("avanform")?.classList.add('hide');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = {
            idoffre: e.target.refoff.value,
            description: e.target.descavan.value,
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/avantage_crud/add_avantage.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeAvanForms();
                alert('Avantage enregistré avec succès !');
                
            } else {
                alert(result.message || "Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="avanform" className='hide avantage-form-container'>

            <button 
                id='closeAvanForm' 
                onClick={closeAvanForms} 
                className="close-btn"
                disabled={isSubmitting}
            >
                &times;
            </button>
            
            <form onSubmit={handleSubmit} className="avantage-form">
                <fieldset>
                    <legend>Ajouter un avantage</legend>
                    <div className="form-group">
                        <label htmlFor="refoff">Offre concernée :</label>
                        {loading ? (
                            <div className="loading-msg">
                                <span className="spinner"></span> Chargement des offres...
                            </div>
                        ) : error ? (
                            <div className="error-msg">
                                <span className="error-icon">⚠️</span> {error}
                            </div>
                        ) : offres.length === 0 ? (
                            <div className="empty-msg">
                                Aucune offre disponible. Créez d'abord une offre.
                            </div>
                        ) : (
                            <select 
                                name="refoff" 
                                id="refoff" 
                                required
                                className="form-control"
                                disabled={isSubmitting}
                            >
                                <option value="">-- Sélectionnez une offre --</option>
                                {offres.map(offre => (
                                    <option 
                                        key={offre.idoffre} 
                                        value={offre.idoffre}
                                    >
                                        {offre.reference}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <Textarea 
                            name="descavan" 
                            label="Description de l'avantage" 
                            required
                            placeholder="Décrivez en détail l'avantage proposé (ex: Tickets restaurant, Mutuelle, Télétravail...)"
                            rows={5}
                            className="textarea-field"
                            disabled={isSubmitting}
                        />
                        
                    </div>
                
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting || loading || error || offres.length === 0}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span> Enregistrement...
                            </>
                        ) : (
                            'Enregistrer cet avantage'
                        )}
                    </button>
                </fieldset>
                
            </form>
        </div>
    );
}

function AvantagesTableOff() {
    const [avantages, setAvantages] = useState([]);
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        description: '',
        idoffre: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user || !user.iduser) {
                    throw new Error('Utilisateur non connecté');
                }
                
                
                const offresResponse = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                if (!offresResponse.ok) throw new Error('Erreur lors du chargement des offres');
                setOffres(await offresResponse.json());
    
                
                const avantagesResponse = await fetch(`https://jobconnectbackend.ct.ws/backend/avantage_crud/get_avantages.php?iduser=${user.iduser}`);
                if (!avantagesResponse.ok) throw new Error('Erreur lors du chargement des avantages');
                
                const avantagesData = await avantagesResponse.json();
                setAvantages(avantagesData.data || []);
    
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet avantage ?")) {
            try {
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/avantage_crud/delete_avantage.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idavantage: id })
                });

                if (response.ok) {
                    setAvantages(avantages.filter(avantage => avantage.idavantage !== id));
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Échec de la suppression');
            }
        }
    };

    
    const handleEdit = (avantage) => {
        setEditingId(avantage.idavantage);
        setEditForm({
            description: avantage.description,
            idoffre: avantage.idoffre
        });
    };

    
    const handleSave = async (id) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/avantage_crud/update_avantage.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idavantage: id,
                    ...editForm 
                })
            });

            const result = await response.json();
            if (result.success) {
                setAvantages(avantages.map(avantage => 
                    avantage.idavantage === id ? { 
                        ...avantage, 
                        ...editForm,
                        reference_offre: offres.find(o => o.idoffre == editForm.idoffre)?.reference || avantage.reference_offre
                    } : avantage
                ));
                setEditingId(null);
            } else {
                throw new Error(result.message || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert(error.message || 'Échec de la mise à jour');
        } finally {
            setIsSubmitting(false);
        }
    };

    
    const handleCancel = () => {
        setEditingId(null);
    };

    
    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div id="avantable" className="avantage-table-container">
            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Chargement des avantages...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="retry-button"
                    >
                        Réessayer
                    </button>
                </div>
            ) : (
                <table className="avantage-table">
                    <thead>
                        <tr>
                            <th width="40%">Description</th>
                            <th width="20%">Offre associée</th>
                            <th width="20%">Caractères</th>
                            <th width="20%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {avantages.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucun avantage enregistré</td>
                            </tr>
                        ) : (
                        avantages.map(avantage => (
                            <tr key={avantage.idavantage}>
                                {editingId === avantage.idavantage ? (
                                    <>
                                        <td>
                                            <textarea
                                                name="description"
                                                value={editForm.description}
                                                onChange={handleEditChange}
                                                rows={3}
                                                maxLength={500}
                                                className="edit-textarea"
                                                disabled={isSubmitting}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name="idoffre"
                                                value={editForm.idoffre}
                                                onChange={handleEditChange}
                                                className="edit-select"
                                                disabled={isSubmitting}
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                {offres.map(offre => (
                                                    <option key={offre.idoffre} value={offre.idoffre}>
                                                        {offre.reference}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            {editForm.description.length}/500
                                        </td>
                                        <td className="action-buttons">
                                            <button 
                                                onClick={() => handleSave(avantage.idavantage)}
                                                className="save-button"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                                            </button>
                                            <button 
                                                onClick={handleCancel}
                                                className="cancel-button"
                                                disabled={isSubmitting}
                                            >
                                                Annuler
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="description-cell">
                                            {avantage.description}
                                        </td>
                                        <td>
                                            {avantage.reference_offre || '-'}
                                        </td>
                                        <td>
                                            {avantage.description.length}/500
                                        </td>
                                        <td className="action-buttons">
                                            <button 
                                                onClick={() => handleEdit(avantage)}
                                                className="edit-button"
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(avantage.idavantage)}
                                                className="delete-button"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


function DocRequisFormOff() {
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [documentTypes, setDocumentTypes] = useState([
        'CV',
        'Lettre de motivation',
        'Diplômes',
        'Relevés de notes',
        'Pièce d\'identité',
        'Justificatif de domicile',
        'Attestation de travail'
    ]);

    
    useEffect(() => {
        const fetchOffres = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user?.iduser) {
                    throw new Error('Authentification requise');
                }

                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Échec du chargement des offres');
                }

                const data = await response.json();
                setOffres(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    const closeDocForms = () => {
        document.getElementById("docform")?.classList.add('hide');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = {
            idoffre: e.target.refoff.value,
            intitule: e.target.intdoc.value,
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/documentrequis_crud/add_docrequis.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeDocForms();
                alert('Document requis enregistré avec succès !');
                
            } else {
                alert(result.message || "Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="docform" className='hide docrequis-form-container'>
            <button 
                id='closeDocForm' 
                onClick={closeDocForms} 
                className="close-btn"
                disabled={isSubmitting}
            >
                &times;
            </button>
            
            <form onSubmit={handleSubmit} className="docrequis-form">
                <fieldset>
                    <legend>Ajouter un document requis</legend>
                    <div className="form-group">
                        <label htmlFor="refoff">Offre concernée :</label>
                        {loading ? (
                            <div className="loading-msg">
                                <span className="spinner"></span> Chargement des offres...
                            </div>
                        ) : error ? (
                            <div className="error-msg">
                                <span className="error-icon">⚠️</span> {error}
                            </div>
                        ) : offres.length === 0 ? (
                            <div className="empty-msg">
                                Aucune offre disponible. Créez d'abord une offre.
                            </div>
                        ) : (
                            <select 
                                name="refoff" 
                                id="refoff" 
                                required
                                className="form-control"
                                disabled={isSubmitting}
                            >
                                <option value="">-- Sélectionnez une offre --</option>
                                {offres.map(offre => (
                                    <option 
                                        key={offre.idoffre} 
                                        value={offre.idoffre}
                                    >
                                        {offre.reference} 
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="intdoc">Type de document :</label>
                        <div className="document-select-container">
                            <select
                                name="intdoc"
                                id="intdoc"
                                required
                                className="form-control"
                                disabled={isSubmitting}
                            >
                                <option value="">-- Sélectionnez un type --</option>
                                {documentTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isSubmitting || loading || error || offres.length === 0}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span> Enregistrement...
                                </>
                            ) : (
                                'Enregistrer ce document'
                            )}
                        </button>
                    </div>
                
                </fieldset>
                
            </form>
        </div>
    );
}

function DocRequisTableOff() {
    const [documents, setDocuments] = useState([]);
    const [offres, setOffres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        idoffre: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [documentTypes, setDocumentTypes] = useState([
        'CV',
        'Lettre de motivation',
        'Diplômes',
        'Relevés de notes',
        'Pièce d\'identité',
        'Justificatif de domicile',
        'Attestation de travail',
        'Autre'
    ]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                if (!user || !user.iduser) {
                    throw new Error('Utilisateur non connecté');
                }
                
                
                const offresResponse = await fetch(`https://jobconnectbackend.ct.ws/backend/offre_crud/get_offres.php?iduser=${user.iduser}`);
                if (!offresResponse.ok) throw new Error('Erreur lors du chargement des offres');
                setOffres(await offresResponse.json());
    
                
                const docsResponse = await fetch(`https://jobconnectbackend.ct.ws/backend/documentrequis_crud/get_documents.php?iduser=${user.iduser}`);
                if (!docsResponse.ok) throw new Error('Erreur lors du chargement des documents requis');
                
                const docsData = await docsResponse.json();
                setDocuments(docsData.data || []);
    
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce document requis ?")) {
            try {
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/documentrequis_crud/delete_document.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ iddocumentreq: id })
                });

                if (response.ok) {
                    setDocuments(documents.filter(doc => doc.iddocumentreq !== id));
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Échec de la suppression');
            }
        }
    };

    
    const handleEdit = (document) => {
        setEditingId(document.iddocumentreq);
        setEditForm({
            intitule: document.intitule,
            idoffre: document.idoffre
        });
    };

    
    const handleSave = async (id) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/documentrequis_crud/update_document.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    iddocumentreq: id,
                    ...editForm 
                })
            });

            const result = await response.json();
            if (result.success) {
                setDocuments(documents.map(doc => 
                    doc.iddocumentreq === id ? { 
                        ...doc, 
                        ...editForm,
                        reference_offre: offres.find(o => o.idoffre == editForm.idoffre)?.reference || doc.reference_offre
                    } : doc
                ));
                setEditingId(null);
            } else {
                throw new Error(result.message || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert(error.message || 'Échec de la mise à jour');
        } finally {
            setIsSubmitting(false);
        }
    };

    
    const handleCancel = () => {
        setEditingId(null);
    };

    
    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div id="doctable" className="docrequis-table-container">
            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Chargement des documents requis...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="retry-button"
                    >
                        Réessayer
                    </button>
                </div>
            ) : (
                <table className="docrequis-table">
                    <thead>
                        <tr>
                            <th width="40%">Type de document</th>
                            <th width="30%">Offre associée</th>
                            <th width="30%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucun document enregistré</td>
                            </tr>
                        ) : (
                        documents.map(document => (
                            <tr key={document.iddocumentreq}>
                                {editingId === document.iddocumentreq ? (
                                    <>
                                        <td>
                                            <select
                                                name="intitule"
                                                value={editForm.intitule}
                                                onChange={handleEditChange}
                                                className="edit-select"
                                                disabled={isSubmitting}
                                            >
                                                <option value="">-- Sélectionnez un type --</option>
                                                {documentTypes.map((type, index) => (
                                                    <option key={index} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                name="idoffre"
                                                value={editForm.idoffre}
                                                onChange={handleEditChange}
                                                className="edit-select"
                                                disabled={isSubmitting}
                                            >
                                                <option value="">-- Sélectionnez une offre --</option>
                                                {offres.map(offre => (
                                                    <option key={offre.idoffre} value={offre.idoffre}>
                                                        {offre.reference}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="action-buttons">
                                            <button 
                                                onClick={() => handleSave(document.iddocumentreq)}
                                                className="save-button"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                                            </button>
                                            <button 
                                                onClick={handleCancel}
                                                className="cancel-button"
                                                disabled={isSubmitting}
                                            >
                                                Annuler
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="document-cell">
                                            {document.intitule}
                                        </td>
                                        <td>
                                            {document.reference_offre || '-'}
                                        </td>
                                        <td className="action-buttons">
                                            <button 
                                                onClick={() => handleEdit(document)}
                                                className="edit-button"
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(document.iddocumentreq)}
                                                className="delete-button"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )))}
                    </tbody>
                </table>
            )}
        </div>
    );
}