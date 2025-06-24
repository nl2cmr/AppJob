export const LanguesForm = () =>{

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
            const response = await fetch('http://localhost/backend/langue_crud/add_langue.php', {
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
        <div id="langform" className='hide'>
            <button id='closeLangForm' onClick={closeLangForms}>close</button>
            <form onSubmit={handleSubmit} method='POST'>
                <fieldset>Ajouter une langue</fieldset>
                <Input name="intlang" label="La langue"/>
                <select name="listniveaulang" id="niveaulang">
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="expert">Expert</option>
                </select>
                <button>Valider</button>
            </form>
        </div>
    )
}