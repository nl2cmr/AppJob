import { Link } from 'react-router-dom'
import { BsCardList } from 'react-icons/bs';
import { MdCircleNotifications, MdMenu, MdClose } from 'react-icons/md';
import { PiReadCvLogoLight } from 'react-icons/pi';
import { useState, useEffect } from 'react';
import '../Pages/css/NavBar.css';

export const NavBar = () => {
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

    const NavLink = ({ to, icon: Icon, text }) => (
        <Link to={to} style={{ textDecoration: 'none'}} onClick={() => isMobile && setMenuOpen(false)}>
            <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <Icon />
                <button>{text}</button>
            </li>
        </Link>
    );

    return(
        <div className="navbar">
            <div className="logo"><h1>JobConnect</h1></div>
            
            {!isMobile && (
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                    <NavLink to="/main" icon={BsCardList} text="Offre" />
                    <NavLink to="/main/compte" icon={PiReadCvLogoLight} text="Comptes et CV" />
                    <NavLink to="/main/notifs&messages" icon={MdCircleNotifications} text="Messages et Notifications" />
                </ul>
            )}
            
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
                        }} className='mobile-menu'>
                            <NavLink to="/main" icon={BsCardList} text="Offre" />
                            <NavLink to="/main/compte" icon={PiReadCvLogoLight} text="Comptes et CV" />
                            <NavLink to="/main/notifs&messages" icon={MdCircleNotifications} text="Messages et Notifications" />
                        </ul>
                    )}
                </>
            )}
        </div>
    )
}