export const FormationsForm = () => {

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
            const response = await fetch('http://localhost/backend/formation_crud/add_formation.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                // Fermer le formulaire et rafraîchir les données
                // Ajoutez ici le code pour rafraîchir le tableau des expériences
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
            <button id='closeFormaForm' onClick={closeFormaForms}>close</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>Ajouter une formation</fieldset>
                <Input name="intforma" label="Quelle etait votre formation"/>
                <Input name="datedebforma" type="date" label="La date de début de votre formation"/>
                <Input name="datefinforma" type="date" label="La date de fin de votre formation"/>
                <Textarea name="descforma" label="Décrivez votre formation"/>
                <Input name="instforma" label="Dans quel institut avez vous suivi cette formation"/>
                <select name="listniveauforma" id="niveauforma">
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="expert">Expert</option>
                </select>
                <button>Valider</button>
            </form>
        </div>
    )
}
export default FormationsForm;