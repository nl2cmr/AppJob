import {Link} from 'react-router-dom'
export const NavBar = () => {
    return(
        <div className="navbar">
            <div className="logo"><h1>Logo</h1></div>
            <ul>
                <Link to="/main"><li><button>Offre</button></li></Link>
                <Link to="/main/compte"><li><button>Comptes et CV</button></li></Link>
                <Link to="/main/notifs&messages"><li><button>Messages et Notifications</button></li></Link>
            </ul>
        </div>
    )
}
