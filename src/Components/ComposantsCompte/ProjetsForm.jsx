export const ProjetsForm = () => {

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
            const response = await fetch('http://localhost/backend/projet_crud/add_projet.php', {
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
        <div id="projform" className='hide'>
            <button id='closeProjForm' onClick={closeProjForms}>close</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>Ajouter une langue</fieldset>
                <Input name="titreproj" label="Le titre de votre projet"/>
                <Textarea name="descproj" label="Une description"/>
                <Input name="datedebproj" type="date" label="La date de début du projet"/>
                <Input name="datefinproj" type="date" label="La date de fin du projet"/>
                <Input name="lienproj" label="Le lien vers le projet"/>
                <button>Valider</button>
            </form>
        </div>
    )
}

export default ProjetsForm;