export const DiplomesForm = () => {

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
            const response = await fetch('http://localhost/backend/diplome_crud/add_diplome.php', {
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
        <div id="dipform" className='hide'>
            <button id='closeDipForm' onClick={closeDipForms}>close</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>Ajouter un diplome</fieldset>
                <Input name="titredip" label="Le titre de votre diplome"/>
                <Input name="dateobtention" type="date" label="La date de début du projet"/>
                <button>Valider</button>
            </form>
        </div>
    )
}