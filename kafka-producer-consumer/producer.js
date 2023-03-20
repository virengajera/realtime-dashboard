const process = require('process')
const os = require('os')

const kafkaConnection = require('./connection/kafka-connection')
const utils = require('./utils/lib.js')

let producer = process.argv[2]
let config = {}

switch (producer) {
    case "temperature":
        config = {
            "producer": producer,
            "topic": "temperature"
        }
        break;
    case "humidity":
        config = {
            "producer": producer,
            "topic": "humidity"
        }
        break;

    case "systemusage":
        config = {
            "producer": producer,
            "topic": "systemusage"
        }
        break;

}


produce(config)

async function produce(config) {

    try {

        const producer = kafkaConnection.producer()

        await producer.connect()
        console.log(`Producer Connected : ${config.producer} `)

        setInterval(async () => {
            let message = [
                {
                    value: generateMessage(config.producer)
                }
            ]

            let response = await producer.send({
                topic: config.topic,
                messages: message
            })

            console.log(`Message sent ==> Topic : ${config.topic} ==> Response :`,response)

        }, 10000)


    } catch (error) {
        console.error(error)
    }

}

function generateMessage(producer){

    let message = null;

    switch (producer) {
        case "temperature":
            message = [{
                "room": "room1",
                "value": utils.randmomNumber(0, 100),
                "unit": "C",
                "messagetimestamp": Date.now()
            }, {
                "room": "room2",
                "value": utils.randmomNumber(0, 100),
                "unit": "C",
                "messagetimestamp": Date.now()
            }]
            break;
        case "humidity":
            message = [{
                "room": "room1",
                "value": utils.randmomNumber(0, 100),
                "unit": "%",
                "messagetimestamp": Date.now()
            }, {
                "room": "room2",
                "value": utils.randmomNumber(0, 100),
                "unit": "%",
                "messagetimestamp": Date.now()
            }]
            break;
        
        case "systemusage":
            let totalmemory = os.totalmem()
            let usedmemory = totalmemory - os.freemem()
            message = [{
                "device" : "temperature",
                "totalmemory" : totalmemory,
                "usedmemory" : Math.floor(utils.randmomNumber(0,7000000000)),
                "unit": "bytes",
                "messagetimestamp" : Date.now()

            },{
                "device" : "humidity",
                "totalmemory" : totalmemory,
                "usedmemory" : Math.floor(utils.randmomNumber(0,7000000000)),
                "unit": "bytes",
                "messagetimestamp" : Date.now()

            }]
            break;

    }


    return Buffer.from(JSON.stringify(message))
}