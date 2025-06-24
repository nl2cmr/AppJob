export const CandidatureCard = ({ candidature }) => {
    return (
        <div className="candidature-list">
            {candidature.map((item, index) => (
                <div key={index} className="candidature-card">
                    <h2>{item.poste}</h2>
                    <p>Date de candidature: {item.date}</p>
                    <p>Statut: {item.status}</p>
                    <button className="btn-view">Voir</button>
                    <button className="btn-delete">Supprimer</button>
                </div>
            ))}
        </div>
    );
};