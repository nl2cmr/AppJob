export const ProfilCard = ({infosprofil}) => {
    return(
        <div>
            {infosprofil.map((profil, index) => (
                <div key={index} className="profil-card">
                    <h2>{profil.poste}</h2>
                    <div className="desc">
                        <p>{profil.nom}</p>
                        <p>{profil.prenom}</p>
                        <p>{profil.age}</p>
                        <p>{profil.lieu}</p>
                    </div>
                    <button>Affciher profil</button>
                </div>
            ))}
        </div>
    )
}