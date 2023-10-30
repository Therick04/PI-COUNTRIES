const { Country,Activity } = require('../db')
const { Op } = require('sequelize')

const CountryNameGET = async (req,res) => {
    const { name } = req.query
    try{
        
        if(!name) {
            return res.status(400).json({ error: 'Se necesita el nombre de un pais.' })
        }

        const CountryXName = await Country.findAll({
            include: Activity,
            where:{
                name:{
                    [Op.iLike]:`%${name}%`
                }
            }
            
        })
        
        if(CountryXName.length === 0){
            return res.status(404).json({error:'Pais no encontrado'})
        }

        res.status(200).json({CountryXName})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = CountryNameGET