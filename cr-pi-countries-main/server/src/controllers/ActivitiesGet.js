const { Activity } = require('../db')

const ActivitiesGET = async (req,res) => {
    try{
        const allActivities = await Activity.findAll()
        
        res.status(200).json(allActivities)
    } catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports = ActivitiesGET