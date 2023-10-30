import React from "react";
import Landing from '../../assets/landing.jpg'

import './LandingPage.css'
const LandingPage = ({login}) => {

const handleLogin = () => {
    login()
}

    return (
        <div className="main">
            <img src={Landing} alt="" />
            <div className="tx">
                <h1>Bienvenido a la Single Page de Countries !!</h1>
            </div>
            <div className="btn_l">
                <button onClick={handleLogin}>Buscar!</button>
            </div>
        </div>
    )
}

export default LandingPage