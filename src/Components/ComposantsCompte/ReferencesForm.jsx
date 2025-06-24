export const ReferencesForm = ({ onReferenceAdded }) => {
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
            const response = await fetch('http://localhost/backend/reference_crud/add_reference.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                closeRefForms();
                onReferenceAdded(); // Callback pour rafraîchir les données
                e.target.reset(); // Réinitialiser le formulaire
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

export default ReferencesForm;