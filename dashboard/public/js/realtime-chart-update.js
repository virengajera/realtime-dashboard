const socket = io("http://localhost:3001")

socket.connect()
socket.on("connect", () => {
    console.log(socket.id);
});

socket.on('temperature-data', data => {
    console.log(data[0], data[1])
    updateLinechart(temperature_room1_chart, data[0])
    updateLinechart(temperature_room2_chart, data[1])

})

socket.on('humidity-data', data => {

    updateLinechart(humidity_room1_chart, data[0])
    updateLinechart(humidity_room2_chart, data[1])

})

socket.on('systemusage-data', data => {
    updateBarchart(temperature_systemusage_chart, data[0])
    updateBarchart(humidity_systemusage_chart, data[1])
})

function updateLinechart(chart,d) {


    let last_data_time = chart.data.datasets[0].data[0].x
    let new_data_time = d.ts

    let diff = new_data_time - last_data_time
    //console.log("Difference Between Time",last_data_time,new_data_time,diff)

    if(diff > 15000){
        chart.data.datasets[0].data = []
        chart.data.datasets[0].data.unshift({ x: d.ts, y: d.value })
        chart.update()
    }
    else{
        if( chart.data.datasets[0].data.length > 15){
            chart.data.datasets[0].data.pop()
            chart.data.datasets[0].data.unshift({ x: d.ts, y: d.value })
        }
        else{
            chart.data.datasets[0].data.unshift({ x: d.ts, y: d.value })
        }
        chart.update()
    }

}

function updateBarchart(chart, d) {
    chart.data.datasets[0].data[0] = { x: "Ram Usage", y: Number(d.usedmemory) }
    console.log("Bar chart Updated",chart.data.datasets[0].data[0])
    chart.update()
}
