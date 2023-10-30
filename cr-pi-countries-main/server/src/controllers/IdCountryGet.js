const { Country,Activity } = require('../db')

const IdCountryGET = async (req,res) => {
    try{
        const { id } = req.params
        const CountryID = await Country.findByPk(id,{
            include: {
                model:Activity,
            }
        })
        if(!CountryID){
            return res.status(404).json({error: 'No se encontro el pais.'})
        }

        res.status(200).json(CountryID)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = IdCountryGET