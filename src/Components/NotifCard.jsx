export const NotifCard = ({infosnotif}) => {
    return(
        <div>
            {infosnotif.map((notif, index) => (
                <div key={index} className="notif-card">
                    <h2>{notif.expediteur}</h2>
                    <div className="desc">
                        <div className="obj">
                            <img src="" alt="" />
                            <span>{notif.objet}</span>
                        </div>
                        <div className="lieu">
                            <img src="" alt="" />
                            <span>{notif.lieu}</span>
                        </div>
                    </div>
                    <p>{notif.date}</p>
                </div>
            ))}
        </div>
    )
}