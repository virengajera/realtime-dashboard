const { Pool } = require('pg')
 
const pool = new Pool({
    database: "dashboard",
    host: "127.0.0.1",
    password: "quest",
    port: 8812,
    user: "admin",
    max:3,
    connectionTimeoutMillis:0
})
 
module.exports = pool


/* 
http://127.0.0.1:9000/ ==> QuestDB web console
port 8812 ==> used to query using postrgess protocol to questDB
*/


