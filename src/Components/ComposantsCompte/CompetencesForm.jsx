export const CompetencesForm = () => {

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
            const response = await fetch('http://localhost/backend/competence_crud/add_competence.php', {
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
        <div id="compform" className='hide'>
            <button id='closeCompForm' onClick={closeCompForms}>close</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>Ajouter une compétence</fieldset>
                <Input name="intcomp" label="Quel est votre compétence"/>
                <select name="listniveaucomp" id="niveaucomp">
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="expert">Expert</option>
                </select>
                <button>Valider</button>
            </form>
        </div>
    )
}