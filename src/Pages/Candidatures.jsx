import { NavBarEn } from '../Components/NavBarEn.jsx';
import { CandidatureCard } from '../Components/CandidatureCard.jsx';
import './css/Candidatures.css';

export const CandidaturesEn = () => {

    const listCandidature = [
        { poste: 'Développeur Frontend', date: '2023-10-01', status: 'pending' },
        { poste: 'Designer UI/UX', date: '2023-10-02', status: 'accepted' },
        { poste: 'Chef de projet', date: '2023-10-03', status: 'rejected' }
    ];

    return (
        <div className="main-page">
            <NavBarEn />
            <div id="candidature-body">

                <div className="filter-section">
                    <h1>Filtrer les candidatures</h1>
                    <div className="filter-options">
                        <label>
                            <input type="checkbox" name="status" value="pending" />
                            En attente
                        </label>
                        <label>
                            <input type="checkbox" name="status" value="accepted" />
                            Accepté
                        </label>
                        <label>
                            <input type="checkbox" name="status" value="rejected" />
                            Rejeté
                        </label>
                    </div>
                </div>

                <div className="candidature-content">
                    <h1>Vos candidatures</h1>
                    <div className="candidature-list">
                        <CandidatureCard candidature={listCandidature}/>
                    </div>
                </div>
            </div>
        </div>
    );
}