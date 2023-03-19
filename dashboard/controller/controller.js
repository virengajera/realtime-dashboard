const pool = require('../connection/pg')

module.exports.getTemperature = async function(req,res,next){
    try {

        let room = req.query.room

        
        let sqlRead = "SELECT * FROM temperature  WHERE room=$1 ORDER By ts DESC LIMIT 15"
        
        const client = await pool.connect()

        let result = await client.query(sqlRead,[room])
        
        await client.release()

        res.status(200).json(result.rows)
        
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports.getHumidity = async function(req,res,next){
    try {

        let room = req.query.room

        let sqlRead = "SELECT * FROM humidity  WHERE room=$1 ORDER By ts DESC LIMIT 15"

        const client = await pool.connect()

        let result = await client.query(sqlRead,[room])

        await client.release()

        res.status(200).json(result.rows)
        
    } catch (error) {
        res.status(400).json({error})
    }
}


module.exports.getSystemUsage = async function(req,res,next){
    try {

        let device = req.query.device

        let sqlRead = "SELECT * FROM systemusage  WHERE device=$1 ORDER By ts DESC LIMIT 1"

        const client = await pool.connect()

        let result = await client.query(sqlRead,[device])

        await client.release()

        res.status(200).json(result.rows)
        
    } catch (error) {
        res.status(400).json({error})
    }
}