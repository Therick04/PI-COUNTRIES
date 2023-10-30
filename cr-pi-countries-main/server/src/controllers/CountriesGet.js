const { Country } = require('../db')

const CountriesGET = async (req,res) => {
    try{
        const allCountries = await Country.findAll()
        res.status(200).json(allCountries)
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = CountriesGET