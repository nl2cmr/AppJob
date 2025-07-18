import { NavBar } from '../Components/NavBarMain';
import { useState, useEffect } from 'react';
import './css/Notifs.css'
import { FaUserTag } from 'react-icons/fa';
import { AiFillClockCircle } from 'react-icons/ai';
import { API_BASE_URL } from '../config';

export const Notifs = () => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        setUser(storedUser);

        if (storedUser?.iduser) {
            fetchNotifications(storedUser.iduser);
        }
    }, []);

    const fetchNotifications = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/notification_crud/get_notifications.php?user_id=${userId}`);
            const data = await response.json();
            
            if (data.success) {
                setNotifications(data.notifications);
            } else {
                setError(data.message || "Failed to fetch notifications");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/notification_crud/mark_lu.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notification_id: notificationId })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Mettre à jour l'état local
                setNotifications(notifications.map(notif => 
                    notif.idnotification === notificationId ? { ...notif, lu: 1 } : notif
                ));
            }
        } catch (err) {
            console.error("Error marking notification as read:", err);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/notification_crud/delete_notification.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notification_id: notificationId })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setNotifications(notifications.filter(notif => notif.idnotification !== notificationId));
            }
        } catch (err) {
            console.error("Error deleting notification:", err);
        }
    };

    if (!user) {
        return (
            <div className="main-page">
                <NavBar/>
                <div className="notification-container">
                    <h2>Notifications</h2>
                    <p>Please log in to view your notifications</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="main-page">
                <NavBar/>
                <div className="notification-container">
                    <h2>Notifications</h2>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="main-page">
                <NavBar />
                <div className="notification-container">
                    <h2>Notifications</h2>
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="main-page">
            <NavBar />
            <div className="notification-container">
                <h2>Notifications</h2>
                
                {notifications.length === 0 ? (
                    <p>Aucune notification</p>
                ) : (
                    <div className="notifications-list">
                        {notifications.map(notification => (
                            <div 
                                key={notification.idnotification} 
                                className={`notification-item ${notification.lu ? 'read' : 'unread'}`}
                                onClick={() => markAsRead(notification.idnotification)}
                            >
                                <div className="notification-content">
                                    <p className="notification-message">{notification.message}</p>
                                    <p className="notification-date">
                                        <AiFillClockCircle />
                                        {new Date(notification.date_notification).toLocaleString()}
                                    </p>
                                    {notification.expediteur_nom && (
                                        <p className="notification-sender">
                                            <FaUserTag />
                                            From: {notification.expediteur_prenom} {notification.expediteur_nom}
                                        </p>
                                    )}
                                </div>
                                <button 
                                    className="delete-notification"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotification(notification.idnotification);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}