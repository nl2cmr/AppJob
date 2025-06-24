export const ExperiencesForm = ()=> {

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
            const response = await fetch('http://localhost/backend/experience_crud/add_experience.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                // Fermer le formulaire et rafraîchir les données
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
            <button id='closeExpForm' onClick={closeExpForms}>close</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>Ajouter une expérience professionnelles</fieldset>
                <Input name="posteexp" label="Le poste que vous avez occupé"/>
                <Input name="entexp" label="L'entreprise dans laquelle vous avez travaillé"/>
                <Input type="date" name="datedebexp" label="La date à laquelle vous avez commencer"/>
                <Input type="date" name="datefinexp" label="La date à laquelle vous avez terminée"/>
                <Textarea name="descexp" label="Decrivez votre experience"/>
                <button >Valider</button>
            </form>
        </div>
    )
}

export default ExperiencesForm;