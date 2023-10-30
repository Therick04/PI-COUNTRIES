const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const { Country } = require('./db')
const axios = require('axios');
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

axios.get('http://localhost:5000/countries')
.then((response) => {
    let newCountries = response.data.map(({
        name: {common},
        flags: {png},
        continents,
        capital,
        subregion,
        area,
        population
    }) => ({
        name: {common},
        flags: {png},
        continents,
        capital,
        subregion,
        area,
        population
    }))
    
    newCountries = newCountries.map((objs) => {

        let ID = ''
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

        for(i = 0 ; i < 3 ; i++){
            const indx = Math.floor(Math.random() * caracteres.length)
            ID += caracteres[indx]
        }

        const { 
            name: { common },
            flags: { png },
            continents,
            capital,
            subregion,
            area,
            population } = objs


        return {
            name: common,
            id: ID,
            flags: png,
            continents,
            capital,
            subregion,
            area,
            population,
        };
    })

    //Country.bulkCreate(newCountries)
    // ya esta creada y no hace falta otro bulkcreate [el force esta en false]
    //(OJO AL SER  MUCHOS PAISES HAY QUE DARLE VARIAS VUELTAS PQ AVECES SE REPITE EL ID XD) perdon
    // en el dado caso para resetear los valores se usa (TRUNCATE "Countries";) en pgadmin
})
.catch((err) => {
    throw new Error('ERROR')
})

module.exports = server;
