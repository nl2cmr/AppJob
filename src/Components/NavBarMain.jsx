import { Link, useNavigate } from 'react-router-dom';
import { BsCardList } from 'react-icons/bs';
import { MdCircleNotifications, MdMenu, MdClose } from 'react-icons/md';
import { PiReadCvLogoLight } from 'react-icons/pi';
import { LuLogOut } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import '../Pages/css/NavBar.css';

export const NavBar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        
        navigate('/');
        
        if (isMobile) {
            setMenuOpen(false);
        }
    };

    const NavLink = ({ to, icon: Icon, text, onClick }) => (
        <div onClick={onClick} style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <Icon />
                <button>{text}</button>
            </li>
        </div>
    );

    return(
        <div className="navbar">
            <div className="logo"><h1>JobConnect</h1></div>
            
            {!isMobile && (
                <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
                    <Link to="/main" style={{ textDecoration: 'none' }}>
                        <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                            <BsCardList />
                            <button>Offre</button>
                        </li>
                    </Link>
                    <Link to="/main/compte" style={{ textDecoration: 'none' }}>
                        <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                            <PiReadCvLogoLight />
                            <button>Comptes & CV</button>
                        </li>
                    </Link>
                    <Link to="/main/notifs&messages" style={{ textDecoration: 'none' }}>
                        <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                            <MdCircleNotifications />
                            <button>Notifications</button>
                        </li>
                    </Link>
                    <NavLink icon={LuLogOut} text="Déconnexion" onClick={handleLogout} />
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
                            <Link to="/main" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                                <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                    <BsCardList />
                                    <button>Offre</button>
                                </li>
                            </Link>
                            <Link to="/main/compte" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                                <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                    <PiReadCvLogoLight />
                                    <button>Comptes et CV</button>
                                </li>
                            </Link>
                            <Link to="/main/notifs&messages" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                                <li style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                                    <MdCircleNotifications />
                                    <button>Notifications</button>
                                </li>
                            </Link>
                            <NavLink icon={LuLogOut} text="Déconnexion" onClick={handleLogout} />
                        </ul>
                    )}
                </>
            )}
        </div>
    )
}