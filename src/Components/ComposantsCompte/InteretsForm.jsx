export const InteretsForm = () =>{

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
            const response = await fetch('http://localhost/backend/interet_crud/add_interet.php', {
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
        <div id="intform" className='hide'>
            <button id='closeIntForm' onClick={closeIntForms}>close</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>Ajouter un interet</fieldset>
                <Input name="intinteret" label="Nommez votre interet"/>
                <Textarea name="descinteret" label="Decrivez votre interet"/>
                <button>Valider</button>
            </form>
        </div>
    )
}