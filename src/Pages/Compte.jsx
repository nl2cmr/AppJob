import { useState, useEffect } from 'react';
import { NavBar } from '../Components/NavBarMain';
import { Input } from '../Components/Input.jsx';
import { Textarea } from '../Components/Textarea.jsx';
import './css/Compte.css';
import { MdClose } from 'react-icons/md';


export const Compte = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [poste, setPoste] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [presentation, setPresentation] = useState("");
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
                    prenom,
                    email,
                    telephone,
                    adresse,
                    poste,
                    description: presentation
                })
                
            });
    
            const result = await response.json();
            
            if (result.success) {
                setUpdateSuccess(true);
                const updatedUser = {
                    ...storedUser,
                    nom,
                    prenom,
                    email,
                    telephone,
                    adresse,
                    poste,
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
            setPrenom(user.prenom || "");
            setEmail(user.email || "");
            setPoste(user.poste || "");
            setTelephone(user.telephone || "");
            setAdresse(user.adresse || "");
            setPresentation(user.description || user.presentation || "");
        }
    }, []);
    
    const showinfos = () => {
        hideAll();
        document.getElementById("infos-compte").style.display = "block";
    };

    const showcomp = () => {
        hideAll();
        document.getElementById("competences").style.display = "block";
    };

    const showform = () => {
        hideAll();
        document.getElementById("formations").style.display = "block";
    };

    const showexp = () => {
        hideAll();
        document.getElementById("experiences").style.display = "block";
    };

    const showqual = () => {
        hideAll();
        document.getElementById("qualites").style.display = "block";
    };

    const showlang = () => {
        hideAll();
        document.getElementById("langues").style.display = "block";
    };

    const showref = () => {
        hideAll();
        document.getElementById("references").style.display = "block";
    };

    const showcert = () => {
        hideAll();
        document.getElementById("certifications").style.display = "block";
    };

    const showdip = () => {
        hideAll();
        document.getElementById("diplomes").style.display = "block";
    };

    const showint = () => {
        hideAll();
        document.getElementById("interets").style.display = "block";
    };

    const showpro = () => {
        hideAll();
        document.getElementById("projets").style.display = "block";
    };

    const hideAll = () => {
        Array.from(document.getElementsByClassName("switch-part")).forEach(element => {
            element.style.display = "none";
        });
    };


    const showExpForm = () =>{
        document.getElementById("expform")?.classList.remove('hide');
    }

    const showCompForm = () =>{
        document.getElementById("compform")?.classList.remove('hide');
    }

    const showFormaForm = () =>{
        document.getElementById("formaform")?.classList.remove('hide');
    }

    const showQuaForm = () =>{
        document.getElementById("quaform")?.classList.remove('hide');
    }

    const showRefForm = () =>{
        document.getElementById("refform")?.classList.remove('hide');
    }

    const showIntForm = () =>{
        document.getElementById("intform")?.classList.remove('hide');
    }

    const showLangForm = () =>{
        document.getElementById("langform")?.classList.remove('hide');
    }

    const showProjForm = () =>{
        document.getElementById("projform")?.classList.remove('hide');
    }

    const showDipForm= () =>{
        document.getElementById("dipform")?.classList.remove('hide');
    }

    const showCertForm= () =>{
        document.getElementById("certform")?.classList.remove('hide');
    }

    return (
        <div className="main-page">
            <NavBar />
            <div className="body-compte">
                <div className="menu">
                    <ul>
                        <li><button onClick={showinfos}>Informations</button></li>
                        <li><button onClick={showexp}>Expériences Professionnelles</button></li>
                        <li><button onClick={showref}>Reférences</button></li>
                        <li><button onClick={showcomp}>Compétences</button></li>
                        <li><button onClick={showcert}>Certifications</button></li>
                        <li><button onClick={showform}>Formations</button></li>
                        <li><button onClick={showdip}>Diplômes</button></li>
                        <li><button onClick={showqual}>Qualités Professionnelles</button></li>
                        <li><button onClick={showlang}>Langues</button></li>
                        <li><button onClick={showint}>Interets</button></li>
                        <li><button onClick={showpro}>Projets</button></li>
                    </ul>
                </div>

                <div className="content-compte">
                    <div id="infos-compte" className='switch-part'>
                        <h1>Vos Informations</h1>
                        <div className="perso">
                            <div className="fullname">
                                <Input name="nom" placeholder="Nom" type="text" onChange={(e) => setNom(e.target.value)} value={nom} label="Votre Nom" />
                                <Input name="prenom" placeholder="Prenom" type="text" onChange={(e) => setPrenom(e.target.value)} value={prenom} label="Votre prénom" />
                            </div>
                            <Input name="email" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} label="Votre email" />
                            <Input name="poste" placeholder="Poste" type="text" onChange={(e) => setPoste(e.target.value)} value={poste} label="Votre poste" />
                            <Input name="telephone" placeholder="Numéro de téléphone" type="tel" onChange={(e) => setTelephone(e.target.value)} value={telephone} label="Votre numéro de téléphone" />
                            <Input name="adresse" placeholder="Adresse" type="text" onChange={(e) => setAdresse(e.target.value)} value={adresse} label="Votre Adresse" />
                        </div>

                        <div className="present">
                            <Textarea name="presentation" label="Votre présentation" value={presentation} onChange={(e) => setPresentation(e.target.value)} />
                        </div>
                        <button onClick={handleUpdateUser} disabled={isUpdating}>
                        {isUpdating ? 'Mise à jour en cours...' : 'Mettre à jour les informations'}
                        </button>
                        {updateSuccess && <div className="success-message">Informations mises à jour avec succès!</div>}                    
                    </div>

                    <div id="experiences" className='switch-part'>
                        <h1>Vos Expériences Professionnelles</h1>

                        <ExperiencesForm />
                        <ExperiencesTable />
                        <button id='addexp' onClick={showExpForm}>Ajouter expériences pro</button>                        
                    </div>

                    <div id="references" className="switch-part">
                        <h1>Vos reférences</h1>

                        <ReferencesForm />
                        <ReferencesTable />
                        <button id='addref' onClick={showRefForm}>Ajouter une reference</button>
                    </div>

                    <div id="competences" className='switch-part'>
                        <h1>Vos Compétences</h1>
                        <CompetencesForm />
                        <CompetencesTable />
                        <button id='addcomp' onClick={showCompForm}>Ajouter compétences</button>
                    </div>

                    <div id="certifications" className="switch-part">
                        <h1>Vos Certifications</h1>
                        <CertificationsForm />
                        <CertificationsTable />
                        <button id='addcert' onClick={showCertForm}>Ajouter certifications</button>
                    </div>

                    <div id="formations" className='switch-part'>
                        <h1>Vos Formations</h1>
                        <FormationsForm />
                        <FormationsTable />
                        <button id='addforma' onClick={showFormaForm}>Ajouter formations</button>
                    </div>

                    <div id="diplomes" className='switch-part'>
                        <h1>Vos diplomes</h1>
                        <DiplomesTable />
                        <DiplomesForm />
                        <button id='adddip' onClick={showDipForm}>Ajouter diplomes</button>
                    </div>

                    <div id="qualites" className='switch-part'>
                        <h1>Vos Qualités</h1>
                        <QualitesForm />
                        <QualitesTable />
                        <button id='addqua' onClick={showQuaForm}>Ajouter qualites</button>
                    </div>

                    <div id="langues" className="switch-part">
                        <h1>Langues</h1>
                        <LanguesForm />
                        <LanguesTable />
                        <button id="addlang" onClick={showLangForm}>Ajouter vos langues</button>
                    </div>

                    <div id="interets" className="switch-part">
                        <h1>Interets</h1>
                        <InteretsForm />
                        <InteretsTable />
                        <button id="addint" onClick={showIntForm}>Ajouter vos interets</button>
                    </div>

                    <div id="projets" className="switch-part">   
                        <h1>Projets</h1>
                        <ProjetsForm />
                        <ProjetsTable />
                        <button id="addproj" onClick={showProjForm}>Ajouter vos projets</button>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

function ExperiencesForm(){

    const closeExpForms = () =>{
        document.getElementById("expform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            poste: e.target.posteexp.value,
            entreprise: e.target.entexp.value,
            date_debut: e.target.datedebexp.value,
            date_fin: e.target.datefinexp.value,
            description: e.target.descexp.value
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/experience_crud/add_experience.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                window.location.reload();
                e.target.reset();
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };


    return(
        <div id="expform" className='hide'>
            <button id='closeExpForm' onClick={closeExpForms}><MdClose /></button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter une expérience professionnelles</legend>
                    <Input name="posteexp" label="Le poste que vous avez occupé"/>
                    <Input name="entexp" label="L'entreprise dans laquelle vous avez travaillé"/>
                    <Input type="date" name="datedebexp" label="La date à laquelle vous avez commencer"/>
                    <Input type="date" name="datefinexp" label="La date à laquelle vous avez terminée"/>
                    <Textarea name="descexp" label="Decrivez votre experience"/>
                    <button >Valider</button>
                </fieldset>
            </form>
        </div>
    )
}


function ExperiencesTable() {
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
        const response = await fetch(`https://jobconnectbackend.ct.ws/backend/experience_crud/get_experiences.php?iduser=${user.iduser}`);
        const data = await response.json();
        setExperiences(data);
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette expérience ?")) {
            try {
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/experience_crud/delete_experience.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idexperience: id })
                });
                
                const result = await response.json();
                if (result.success) {
                    fetchExperiences(); 
                }
            } catch (error) {
                console.error("Erreur:", error);
            }
        }
    };

    
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

    
    const cancelEdit = () => {
        setEditingId(null);
    };

    
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/experience_crud/update_experience.php', {
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
                    {experiences.length === 0 ? (
                        <tr>
                            <td colSpan="3">Aucune expérience enregistrée</td>
                        </tr>
                    ) : (experiences.map(exp => (
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
                    )))}
                </tbody>
            </table>
        </div>
    );
}


function CompetencesForm(){

    const closeCompForms = () =>{
        document.getElementById("compform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
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
                window.location.reload();
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return(
        <div id="compform" className='hide'>
            <button id='closeCompForm' onClick={closeCompForms}><MdClose /></button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter une compétence</legend>
                    <Input name="intcomp" label="Quel est votre compétence"/>
                    <select name="listniveaucomp" id="niveaucomp">
                        <option value="">--Sélectionner un niveau--</option>
                        <option value="debutant">Débutant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="expert">Expert</option>
                    </select>
                    <button>Valider</button>
                </fieldset>
            </form>
        </div>
    )
}

function CompetencesTable() {
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
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/competence_crud/get_competences.php?iduser=${user.iduser}`);
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/competence_crud/delete_competence.php', {
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/competence_crud/update_competence.php', {
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


function FormationsForm(){

    const closeFormaForms = () =>{
        document.getElementById("formaform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            intitule: e.target.intforma.value,
            date_debut: e.target.datedebforma.value,
            date_fin: e.target.datefinforma.value,
            description: e.target.descforma.value,
            institution: e.target.instforma.value,
            niveau: e.target.listniveauforma.value
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/formation_crud/add_formation.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                window.location.reload();
                e.target.reset();
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return(
        <div id="formaform" className='hide'>
            <button id='closeFormaForm' onClick={closeFormaForms}><MdClose /></button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter une formation</legend>
                    <Input name="intforma" label="Quelle etait votre formation"/>
                    <Input name="datedebforma" type="date" label="La date de début de votre formation"/>
                    <Input name="datefinforma" type="date" label="La date de fin de votre formation"/>
                    <Textarea name="descforma" label="Décrivez votre formation"/>
                    <Input name="instforma" label="Dans quel institut avez vous suivi cette formation"/>
                    <div>
                        <label htmlFor="niveauforma">Niveau de la formation</label>
                        <select name="listniveauforma" id="niveauforma">
                            <option value="debutant">Débutant</option>
                            <option value="intermediaire">Intermédiaire</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    <button>Valider</button>
                </fieldset>
            </form>
        </div>
    )
}


function FormationsTable() {
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
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/formation_crud/get_formations.php?iduser=${user.iduser}`);
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/formation_crud/delete_formation.php', {
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/formation_crud/update_formation.php', {
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


function QualitesForm(){

    const closeQuaForms = () =>{
        document.getElementById("quaform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
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
                window.location.reload();
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return(
        <div id="quaform" className='hide'>
            <button id='closeQuaForm' onClick={closeQuaForms}><MdClose /></button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter une qualites professionnelle</legend>
                    <Input name="intqua" label="Votre qualite"/>
                    <Textarea name="descqua" label="Decrivez votre qualite"/>
                    <button>Valider</button>
                </fieldset>
            </form>
        </div>
    )
}


function QualitesTable() {
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
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/qualite_crud/get_qualites.php?iduser=${user.iduser}`);
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/qualite_crud/delete_qualite.php', {
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/qualite_crud/update_qualite.php', {
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
                                                    Valider
                                                </button>
                                                <button onClick={cancelEdit} className="btn-cancel">
                                                    Annuler
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


function ReferencesForm({ onReferenceAdded }) {
    const closeRefForms = () => {
        document.getElementById("refform")?.classList.add('hide');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            intitule: e.target.nomref.value,
            relation: e.target.relaref.value,
            contact: e.target.telref.value
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/reference_crud/add_reference.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeRefForms();
                window.location.reload();
                e.target.reset(); 
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {

        }
    };

    return (
        <div id="refform" className='hide'>
            <button id='closeRefForm' onClick={closeRefForms}>Fermer</button>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Ajouter une référence</legend>
                    <Input name="nomref" label="Nom de la référence" required />
                    <Input name="telref" type="tel" label="Contact" required />
                    <Input name="relaref" label="Votre relation" required />
                    <button type="submit">Valider</button>
                </fieldset>
            </form>
        </div>
    );
}


function ReferencesTable() {
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
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/reference_crud/get_references.php?iduser=${user.iduser}`);
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/reference_crud/delete_reference.php', {
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/reference_crud/update_reference.php', {
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


function InteretsForm(){

    const closeIntForms = () =>{
        document.getElementById("intform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            intitule: e.target.intinteret.value,
            description: e.target.descinteret.value,
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/interet_crud/add_interet.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                window.location.reload();
                e.target.reset();
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return(
        <div id="intform" className='hide'>
            <button id='closeIntForm' onClick={closeIntForms}><MdClose /></button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter un interet</legend>
                    <Input name="intinteret" label="Nommez votre interet"/>
                    <Textarea name="descinteret" label="Decrivez votre interet"/>
                    <button>Valider</button>
                </fieldset>
            </form>
        </div>
    )
}


function InteretsTable() {
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
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/interet_crud/get_interets.php?iduser=${user.iduser}`);
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/interet_crud/delete_interet.php', {
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/interet_crud/update_interet.php', {
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


function LanguesForm(){

    const closeLangForms = () =>{
        document.getElementById("langform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
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
                window.location.reload();
                e.target.reset();
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return(
        <div id="langform" className='hide'>
            <button id='closeLangForm' onClick={closeLangForms}><MdClose /></button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter une langue</legend>
                    <Input name="intlang" label="La langue"/>
                    <div>
                        <label htmlFor="niveaulang">Votre niveau en cette langue</label>
                        <select name="listniveaulang" id="niveaulang">
                            <option value="debutant">Débutant</option>
                            <option value="intermediaire">Intermédiaire</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                    <button>Valider</button>
                </fieldset>
            </form>
        </div>
    )
}


function LanguesTable() {
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
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/langue_crud/get_langues.php?iduser=${user.iduser}`);
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/langue_crud/delete_langue.php', {
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/langue_crud/update_langue.php', {
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



function ProjetsForm(){

    const closeProjForms = () =>{
        document.getElementById("projform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            titre: e.target.titreproj.value,
            description: e.target.descproj.value,
            date_debut: e.target.datedebproj.value,
            date_fin: e.target.datefinproj.value,
            lien: e.target.lienproj.value
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/projet_crud/add_projet.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                window.location.reload();
                e.target.reset();
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return(
        <div id="projform" className='hide'>
            <button id='closeProjForm' onClick={closeProjForms}><MdClose /></button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter une langue</legend>
                    <Input name="titreproj" label="Le titre de votre projet"/>
                    <Textarea name="descproj" label="Une description"/>
                    <Input name="datedebproj" type="date" label="La date de début du projet"/>
                    <Input name="datefinproj" type="date" label="La date de fin du projet"/>
                    <Input name="lienproj" label="Le lien vers le projet"/>
                    <button>Valider</button>
                </fieldset>
            </form>
        </div>
    )
}


function ProjetsTable() {
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
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/projet_crud/get_projets.php?iduser=${user.iduser}`);
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/projet_crud/delete_projet.php', {
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/projet_crud/update_projet.php', {
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
                                                    placeholder="http://example.com"
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


function DiplomesForm(){

    const closeDipForms = () =>{
        document.getElementById("dipform")?.classList.add('hide');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            iduser: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
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
                window.location.reload();
                e.target.reset();
            } else {
                alert(result.message || 'Erreur lors de l\'ajout');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion');
        }
    };

    return(
        <div id="dipform" className='hide'>
            <button id='closeDipForm' onClick={closeDipForms}><MdClose /></button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>
                    <legend>Ajouter un diplome</legend>
                    <Input name="titredip" label="Le titre de votre diplome"/>
                    <Input name="dateobtention" type="date" label="La date de début du projet"/>
                    <button>Valider</button>
                </fieldset>
            </form>
        </div>
    )
}

function DiplomesTable() {
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
            const response = await fetch(`https://jobconnectbackend.ct.ws/backend/diplome_crud/get_diplomes.php?iduser=${user.iduser}`);
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/diplome_crud/delete_diplome.php', {
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
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/diplome_crud/update_diplome.php', {
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


function CertificationsForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const closeCertifForms = () => {
        document.getElementById("certform")?.classList.add('hide');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = {
            utilisateur_id: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")).iduser,
            intitule: e.target.intitule.value,
            date_obtention: e.target.date_obtention.value || null
        };
    
        try {
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/certification_crud/add_certification.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeCertifForms();
                window.location.reload();
                e.target.reset();
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
        <div id="certform" className='hide'>
            <div className="form-header">
                <h3>Ajouter une certification</h3>
                <button 
                    id='closeCertifForm' 
                    onClick={closeCertifForms} 
                    className="close-btn"
                    disabled={isSubmitting}
                >
                    <MdClose />
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="certification-form">
                <div className="form-group">
                    <Input 
                        name="intitule" 
                        label="Intitulé de la certification" 
                        required
                        placeholder="Ex: Certification AWS, Google Analytics..."
                        disabled={isSubmitting}
                    />

                </div>
                
                <div className="form-group">
                    <Input 
                        type="date" 
                        name="date_obtention" 
                        label="Date d'obtention (optionnel)"
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className="form-actions">
                    <button>
                        Valider
                    </button>
                </div>
            </form>
        </div>
    );
}

function CertificationsTable() {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        intitule: '',
        date_obtention: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch(`https://jobconnectbackend.ct.ws/backend/certification_crud/get_certifications.php?utilisateur_id=${user.iduser}`);
                
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des certifications');
                }

                const data = await response.json();
                setCertifications(data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette certification ?")) {
            try {
                const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
                const response = await fetch('https://jobconnectbackend.ct.ws/backend/certification_crud/delete_certification.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        idcertification: id,
                        utilisateur_id: user.iduser
                    })
                });

                if (response.ok) {
                    setCertifications(certifications.filter(certif => certif.idcertification !== id));
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Échec de la suppression');
            }
        }
    };

    const handleEdit = (certification) => {
        setEditingId(certification.idcertification);
        setEditForm({
            intitule: certification.intitule,
            date_obtention: certification.date_obtention || ''
        });
    };

    const handleSave = async (id) => {
        setIsSubmitting(true);
        try {
            const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
            const response = await fetch('https://jobconnectbackend.ct.ws/backend/certification_crud/update_certification.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idcertification: id,
                    utilisateur_id: user.iduser,
                    ...editForm 
                })
            });

            const result = await response.json();
            if (result.success) {
                setCertifications(certifications.map(certif => 
                    certif.idcertification === id ? { 
                        ...certif, 
                        ...editForm 
                    } : certif
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

    const formatDate = (dateString) => {
        if (!dateString) return 'Non spécifiée';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div id="certiftable" className="certification-table-container">
            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Chargement des certifications...</p>
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
                <table className="certification-table">
                    <thead>
                        <tr>
                            <th width="50%">Intitulé</th>
                            <th width="30%">Date d'obtention</th>
                            <th width="20%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certifications.length === 0 ? (
                            <tr>
                                <td colSpan="3">Aucune certification enregistrée</td>
                            </tr>
                        ) : (
                        certifications.map(certification => (
                            <tr key={certification.idcertification}>
                                {editingId === certification.idcertification ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                name="intitule"
                                                value={editForm.intitule}
                                                onChange={handleEditChange}
                                                className="edit-input"
                                                required
                                                maxLength={100}
                                                disabled={isSubmitting}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                name="date_obtention"
                                                value={editForm.date_obtention}
                                                onChange={handleEditChange}
                                                className="edit-input"
                                                disabled={isSubmitting}
                                            />
                                        </td>
                                        <td className="action-buttons">
                                            <button 
                                                onClick={() => handleSave(certification.idcertification)}
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
                                        <td>{certification.intitule}</td>
                                        <td>{formatDate(certification.date_obtention)}</td>
                                        <td className="action-buttons">
                                            <button 
                                                onClick={() => handleEdit(certification)}
                                                className="edit-button"
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(certification.idcertification)}
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
