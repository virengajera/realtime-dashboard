const { io } = require('socket.io-client')
const process = require('process')

const kafkaConnection = require('./connection/kafka-connection.js')
const pool = require('./connection/pg.js')

let consumer = process.argv[2]
let config = {}

switch (consumer) {
    case "temperature":
        config = {
            "consumer": consumer,
            "groupId": "temperature",
            "topics": ["temperature"],
            "emit_event_name": "temperature-from-consumer"
        }
        break;
    case "humidity":
        config = {
            "consumer": consumer,
            "groupId": "humidity",
            "topics": ["humidity"],
            "emit_event_name": "humidity-from-consumer"
        }
        break;
    case "systemusage":
        config = {
            "consumer": consumer,
            "groupId": "systemusage",
            "topics": ["systemusage"],
            "emit_event_name": "systemusage-from-consumer"
        }
        break;


}

const socket = io('http://localhost:3001')

socket.connect()


consume(config)

async function consume(config) {
    try {
        const consumer = await kafkaConnection.consumer({ groupId: config.groupId, sessionTimeout: 90000 })

        await consumer.connect()
        console.log(`Consumer Connected : ${config.consumer}`)

        const client = await pool.connect()
        console.log("DB Connected")

        await consumer.subscribe({ topics: config.topics })
        console.log(`Subscribed to topic : ${config.topics}`)

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                try {

                    let data = JSON.parse(message.value)

                    await insertInDB(client, config.consumer, data)
                    data[0]['ts'] = data[1]['ts'] = Date.now()
                    socket.emit(config.emit_event_name, data)

                } catch (error) {
                    if (error) {
                        console.error("Error ==>", error.message)
                        consumer.pause([{ topic }])
                        let retryAfter = (error && error.retryAfter) ? 5000 : error.retryAfter * 1000
                        setTimeout(() => consumer.resume([{ topic }]), retryAfter)
                    }
                }

            },
        })

    } catch (error) {
        console.error("Error Main Block --->", error.message)

    }

}

async function insertInDB(client, consumer, data) {

        let sqlInsert = null;
        let values = null;
        switch (consumer) {
            case "temperature":
                sqlInsert = "INSERT INTO temperature(room,value,unit,messagetimestamp,ts) VALUES ($1,$2,$3,$4,$5),($6,$7,$8,$9,$10)"
                values = [data[0].room, data[0].value, data[0].unit, data[0].messagetimestamp, Date.now(), data[1].room, data[1].value, data[1].unit, data[1].messagetimestamp, Date.now()]
                break;
            
            case "humidity":
                sqlInsert = "INSERT INTO humidity(room,value,unit,messagetimestamp,ts) VALUES ($1,$2,$3,$4,$5),($6,$7,$8,$9,$10)"
                values = [data[0].room, data[0].value, data[0].unit, data[0].messagetimestamp, Date.now(), data[1].room, data[1].value, data[1].unit, data[1].messagetimestamp, Date.now()]
                break;

            case "systemusage":
                sqlInsert = "INSERT INTO systemusage(device,totalmemory,usedmemory,unit,messagetimestamp,ts) VALUES ($1,$2,$3,$4,$5,$6),($7,$8,$9,$10,$11,$12)"
                values = [data[0].device, data[0].totalmemory, data[0].usedmemory, data[0].unit, data[0].messagetimestamp,Date.now(), data[1].device, data[1].totalmemory, data[1].usedmemory, data[1].unit, data[1].messagetimestamp,Date.now()]
                break;

        }


        await client.query(sqlInsert, values)

        console.log("Data Inserted in DB")

}