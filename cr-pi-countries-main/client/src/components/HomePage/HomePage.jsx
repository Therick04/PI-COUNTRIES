import React from "react";
import Cards from "./Cards";
import './HomePage.css'

const HomePage = ({detailCountry}) => {


    return (

            <div className="ct_hp"> 
                <Cards detailCountry={detailCountry}/>
            </div>
    )
}

export default HomePage