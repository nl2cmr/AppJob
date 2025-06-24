import {Link} from 'react-router-dom'
export const NavBarEn = () => {
    return(
        <div className="navbar">
            <div className="logo"><h1>Logo</h1></div>
            <ul>
                <Link to="/mainen"><li><button>Profils</button></li></Link>
                <Link to="/mainen/candidatures"><li><button>Candidatures</button></li></Link>
                <Link to="/mainen/compte"><li><button>Comptes et Ofrres</button></li></Link>
                <Link to="/mainen/notifs&messages"><li><button>Messages et Notifications</button></li></Link>
            </ul>
        </div>
    )
}
