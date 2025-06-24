export const QualitesForm = () =>{

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
            const response = await fetch('http://localhost/backend/qualite_crud/add_qualite.php', {
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
        <div id="quaform" className='hide'>
            <button id='closeQuaForm' onClick={closeQuaForms}>close</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>Ajouter une qualites professionnelle</fieldset>
                <Input name="intqua" label="Votre qualite"/>
                <Textarea name="descqua" label="Decrivez votre qualite"/>
                <button>Valider</button>
            </form>
        </div>
    )
}

export default QualitesForm;