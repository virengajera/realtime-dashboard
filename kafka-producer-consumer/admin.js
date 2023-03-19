const kafkaConnection = require('./connection/kafka-connection.js')

runAdmin()

async function runAdmin() {

    let topicsList = ["temperature","humidity","systemusage"]

    try {

        const admin = kafkaConnection.admin()
        
        await admin.connect()
        console.log("Admin connected")

        let topicsOld = await admin.listTopics();

        let topicsNew = []

        topicsList.forEach((topic)=>{
            if(!topicsOld.includes(topic)){

                topicsNew.push({
                    "topic":topic,
                    "numPartitions" : 1
                })
            }
        })

        await admin.createTopics({
            topics: topicsNew
        })

        console.log("Topics Created")
        console.log("All Topics : ",await admin.listTopics())

        admin.disconnect()

        console.log("Admin Disconnected")
    } catch (error) {

        console.error(error)

    }

}
