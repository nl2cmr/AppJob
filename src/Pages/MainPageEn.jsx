import './css/MainPageEn.css';
import { ProfilCard } from '../Components/ProfilCard.jsx';
import { NavBarEn } from '../Components/NavBarEn.jsx';

export const MainPageEn = () => {

    const infos = [
        {nom:"doe", prenom:"john", age:41, lieu:"Yaoundé, Bastos", poste:"Ingénieur Informatique"},
        {nom:"marie", prenom:"dupont", age:20, lieu:"Douala, Makepe", poste:"Etudiante"},
    ]

    return (
        <div className="main-page">
            <NavBarEn />
            <SearchPart />
            <div className="body-part">
                <div className='search-part'>

                </div>  
                <div className="list-card">
                    <ProfilCard infosprofil={infos}/>   
                </div>
            </div>
        </div>
    );
}

function SearchPart (){
    return (
        <div className="search-part">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
        </div>
    );
}