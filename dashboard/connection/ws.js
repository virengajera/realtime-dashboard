const {Server} = require('socket.io')

module.exports.runWebSocket = function (server){

        let c = 0;

        const io = new Server(server)

        io.on('connection',(socket)=>{
            c +=1
            console.log("WS client joined c = ",c)

            socket.on('temperature-from-consumer',(data)=>{
                console.log("Msg recieved from temperture-cosumer")
                io.emit('temperature-data',data)
            })

            socket.on('humidity-from-consumer',(data)=>{
                console.log("Msg recieved from humidity-cosumer")
                io.emit('humidity-data',data)
            })

            socket.on('systemusage-from-consumer',(data)=>{
                console.log("Msg recieved from systemusage-cosumer")
                io.emit('systemusage-data',data)
            })


            socket.on('disconnect',(s)=>{
                c-=1;
                console.log("WS client disconnected c = ",c)
            })
        })


}