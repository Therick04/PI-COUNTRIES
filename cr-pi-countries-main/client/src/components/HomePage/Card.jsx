import React from "react";
import './Card.css'

const Card = ({flags,name,continents,id,detailCountry}) => {

    const handleDetail = (id) => {
        detailCountry(id)
    }

    return(
        <div className="crd" onClick={() => handleDetail(id)}>
            <h3>{name}</h3>
            <p>{continents}</p>
            <img src={flags} alt="" />
        </div>
    )
}

export default Card