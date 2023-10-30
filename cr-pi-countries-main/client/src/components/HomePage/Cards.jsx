import React, { useState } from "react";
import { connect, useDispatch } from 'react-redux'
import Card from './Card'
import { COUNTRY_ORDER, COUNTRY_FILTER } from '../../redux/actions/actions'
import './Cards.css'

const Cards = ({ CRDS, detailCountry, COUNTRY_ORDER, COUNTRY_FILTER }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const countriesPerPage = 10

    const indexOfLastCountry = currentPage * countriesPerPage; // 10
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
    const currentCountries = CRDS.slice(
        indexOfFirstCountry,
        indexOfLastCountry
    );

    //console.log(currentCountries);

    const dispatch = useDispatch()

    const handleOrder = (event) => {
        const value = event.target.value;
            dispatch(COUNTRY_ORDER(value));
            setCurrentPage(1); // Reiniciar la página actual a 1
    };

    const handleFilter = (event) => {
        const value = event.target.value;
        dispatch(COUNTRY_FILTER(value));
        setCurrentPage(1); // Reiniciar la página actual a 1
    };

    const totalPages = Math.ceil(CRDS.length / countriesPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            console.log(CRDS);
        }
    };


    return (

        <div className="container">

            <div className="container">

                <div className="order">
                    <select onChange={handleOrder}>
                        <option value='default'>Por defecto</option>
                        <option value="A - Z">A - Z</option>
                        <option value="Z - A">Z - A</option>
                        <option value="+">Poblacion +</option>
                        <option value="-">Poblacion -</option>
                    </select>
                </div>

                <div className="contints">
                    <select onChange={handleFilter}>
                        <option value="all">Todos</option>
                        <option value='Africa'>Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Asia">Asia</option>
                        <option value="South America">South America</option>
                        <option value="North America">North America</option>
                        <option value="Antarctica">Antarctica</option>
                    </select>
                </div>
            </div>

            <div className="card">
                {currentCountries.map((crd) => (
                    
                    <Card
                        key={crd.id}
                        name={crd.name}
                        continents={crd.continents}
                        id={crd.id}
                        flags={crd.flags}
                        detailCountry={detailCountry}
                    />
                ))}
            </div>

            <div className="container">
                {/* Resto del código del componente */}
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        CRDS: state.CRDS
    }
}

export default connect(mapStateToProps, { COUNTRY_ORDER, COUNTRY_FILTER })(Cards)