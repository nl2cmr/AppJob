import {Link} from 'react-router-dom'
import { BsCardList } from 'react-icons/bs';
import { MdCircleNotifications } from 'react-icons/md';
import { PiReadCvLogoLight } from 'react-icons/pi';

export const NavBar = () => {
    return(
        <div className="navbar">
            <div className="logo"><h1>JobConnect</h1></div>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                <Link to="/main" style={{ textDecoration: 'none'}}>
                    <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                        <BsCardList />
                        <button>Offre</button>
                    </li>
                </Link>
                <Link to="/main/compte" style={{ textDecoration: 'none'}}>
                    <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                        <PiReadCvLogoLight />
                        <button>Comptes et CV</button>
                    </li>
                </Link>
                <Link to="/main/notifs&messages" style={{ textDecoration: 'none'}}>
                    <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                        <MdCircleNotifications />
                        <button>Messages et Notifications</button>
                    </li>
                </Link>
            </ul>
        </div>
    )
}
