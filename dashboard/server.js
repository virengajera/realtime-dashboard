const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

const {runWebSocket} = require('./connection/ws.js')
const apiRouter = require('./route/route.js')

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || 'localhost'

const pool = require('./connection/pg.js')

async function runServer() {
    try {

        const client = await pool.connect()

        //await client.query("DROP TABLE temperature")
        //await client.query("DROP TABLE humidity")
        //await client.query("DROP TABLE systemusage")
        await client.query("CREATE TABLE IF NOT EXISTS temperature(room STRING, value FLOAT,unit STRING,messagetimestamp date,ts date)")
        await client.query("CREATE TABLE IF NOT EXISTS humidity(room STRING, value FLOAT,unit STRING,messagetimestamp date,ts date) ")
        await client.query("CREATE TABLE IF NOT EXISTS systemusage(device STRING, totalmemory LONG,usedmemory LONG,unit STRING,messagetimestamp date,ts date)")

        await client.release()

        runWebSocket(httpServer)

        httpServer.listen(PORT,HOST, () => { 
            console.log(`Server is Running on ${HOST}:${PORT}`)
        })

    } catch (error) {
        console.log(error)

    }
}

app.use(express.static('public'))

app.use('/api',apiRouter)

runServer()