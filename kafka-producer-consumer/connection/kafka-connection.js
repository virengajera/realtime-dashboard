const {Kafka} = require('kafkajs')

const kafkaConnection = new Kafka({
    "clientId": "realtime-dashboard",
    "brokers" :["localhost:9092"],
    "connectionTimeout": 9000
})

module.exports = kafkaConnection