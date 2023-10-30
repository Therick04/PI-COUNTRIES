import React from "react";
import { connect } from "react-redux";
import './Detailpage.css'
import bck from '../../assets/vintage-pocket-watch-7439236_1280.jpg'


const Detail = ({ DETAIL_CRD }) => {

    return (
        <div >
            <img src={bck} style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: '0.5',
            }} />
            <h1 style={{marginBottom: '30px'}}>Nombre:{DETAIL_CRD.name}</h1>
            <h2 style={{marginBottom: '30px'}}>Continente:{DETAIL_CRD.continents}</h2>
            <h3 style={{marginBottom: '30px'}}>Capital:{DETAIL_CRD.capital}</h3>
            <p style={{marginBottom: '30px'}}>Area: {DETAIL_CRD.area}</p>
            <p style={{marginBottom: '30px'}}>ID: {DETAIL_CRD.id}</p>
            <p style={{marginBottom: '30px'}}>Subregión: {DETAIL_CRD.subregion}</p>
            <p style={{marginBottom: '30px'}}>Poblacion: {DETAIL_CRD.population}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        DETAIL_CRD: state.DETAIL_CRD
    }
}

export default connect(mapStateToProps, null)(Detail)