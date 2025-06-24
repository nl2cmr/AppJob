import { NavBar } from '../Components/NavBarMain';
import { NotifCard } from '../Components/NotifCard';
import './css/Notifs.css'

export const Notifs = () => {

    const infos = [
        {expediteur:"Orange", objet:"recrutement", lieu:"Douala, CICAM", date:"20/02/2025"},
        {expediteur:"MTN", objet:"stage", lieu:"Yaoundé, Tsinga", date:"20/02/2025"}
    ]

    return (
        <div className="main-page">
            <NavBar />
            <div className="body-notifs">
                <div className="search-part">
                    <h1>Filter Part</h1>
                </div>
                <div className='notifs-part'>
                    <h1>Vos Notifications</h1>
                    <div className="list-notifs">
                        <NotifCard infosnotif={infos}/>
                    </div>
                </div>
                
            </div>
        </div>
    );
}