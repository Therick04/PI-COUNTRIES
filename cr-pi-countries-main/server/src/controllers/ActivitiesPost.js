const { Activity } = require('../db')

const ActivityPOST = async (req,res) => {
    const {name,difficulty,duration,temp,countries} = req.body
    
    try{
        if(!name,!difficulty,!duration,!name,!temp){
            return res.status(404).json({error:'Faltan datos'})
        }
        if(countries.length < 1){
            return res.status(404).json({error:'Faltan paises'})
        }

        const newActivity = await Activity.create({
            id: name,
            name,
            difficulty,
            duration,
            temp,
        })
    
        newActivity.setCountries(countries)

        res.status(200).send('Actividad creada!')

    }catch(error){
        res.status(500).json({error:error.message})
    }
} 

module.exports = ActivityPOST 