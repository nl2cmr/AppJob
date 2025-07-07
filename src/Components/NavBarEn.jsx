import {Link} from 'react-router-dom'
import { CgProfile } from 'react-icons/cg';
import { LiaUsersSolid } from 'react-icons/lia';
import { LuSettings2 } from 'react-icons/lu';
import { MdCircleNotifications } from 'react-icons/md';

export const NavBarEn = () => {
    return(
        <div className="navbar">
            <div className="logo"><h2>JobConnect</h2></div>
            <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                <Link to="/mainen" style={{ textDecoration: 'none'}}>
                    <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                        <CgProfile /><button>Profils</button>
                    </li>
                </Link>
                <Link to="/mainen/candidatures" style={{ textDecoration: 'none'}}>
                    <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                        <LiaUsersSolid /><button>Candidatures</button>
                    </li>
                </Link>
                <Link to="/mainen/compte" style={{ textDecoration: 'none'}}>
                    <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                        <LuSettings2 /><button>Comptes et Ofrres</button>
                    </li>
                </Link>
                <Link to="/mainen/notifs&messages" style={{ textDecoration: 'none'}}>
                    <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                        <MdCircleNotifications /><button>Messages et Notifications</button>
                    </li>
                </Link>
            </ul>
        </div>
    )
}
