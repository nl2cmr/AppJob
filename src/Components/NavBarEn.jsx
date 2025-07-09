import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { LiaUsersSolid } from 'react-icons/lia';
import { LuSettings2 } from 'react-icons/lu';
import { MdCircleNotifications, MdMenu, MdClose } from 'react-icons/md';
import { useState, useEffect } from 'react';
import '../Pages/css/NavBar.css';

export const NavBarEn = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Composant de lien réutilisable avec le style original
    const NavLink = ({ to, icon: Icon, text }) => (
        <Link to={to} style={{ textDecoration: 'none' }} onClick={() => isMobile && setMenuOpen(false)}>
            <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <Icon />
                <button>{text}</button>
            </li>
        </Link>
    );

    return(
        <div className="navbar">
            <div className="logo"><h2>JobConnect</h2></div>
            
            {/* Menu pour desktop */}
            {!isMobile && (
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                    <NavLink to="/mainen" icon={CgProfile} text="Profils" />
                    <NavLink to="/mainen/candidatures" icon={LiaUsersSolid} text="Candidatures" />
                    <NavLink to="/mainen/compte" icon={LuSettings2} text="Comptes et Offres" />
                    <NavLink to="/mainen/notifs&messages" icon={MdCircleNotifications} text="Messages et Notifications" />
                </ul>
            )}
            
            {/* Menu pour mobile */}
            {isMobile && (
                <>
                    <button 
                        className="mobile-menu-button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ background: 'transparent', border: 'none' }}
                    >
                        {menuOpen ? 
                            <MdClose size={24} color="white" /> : 
                            <MdMenu size={24} color="white" />}
                    </button>
                    
                    {menuOpen && (
                        <ul style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '70%',
                            height: '100vh',
                            backgroundColor: 'var(--primary-dark)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2rem',
                            paddingTop: '5rem',
                            margin: 0,
                            listStyle: 'none',
                            zIndex: 100,
                            boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.2)'
                        }}>
                            <NavLink to="/mainen" icon={CgProfile} text="Profils" />
                            <NavLink to="/mainen/candidatures" icon={LiaUsersSolid} text="Candidatures" />
                            <NavLink to="/mainen/compte" icon={LuSettings2} text="Comptes et Offres" />
                            <NavLink to="/mainen/notifs&messages" icon={MdCircleNotifications} text="Messages et Notifications" />
                        </ul>
                    )}
                </>
            )}
        </div>
    )
}