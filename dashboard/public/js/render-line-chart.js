const el_temperature_room1_chart = document.getElementById('temperature-room1-chart');
const el_temperature_room2_chart = document.getElementById('temperature-room2-chart');

const el_humidity_room1_chart = document.getElementById('humidity-room1-chart');
const el_humidity_room2_chart = document.getElementById('humidity-room2-chart');


let line_config1 = createLineChartConfig(el_temperature_room1_chart,"line","Room 1 Temperature",[],'Room 1 Temperature (°C)')
let line_config2 = createLineChartConfig(el_temperature_room2_chart,"line","Room 2 Temperature",[],'Room 2 Temperature (°C)')
let line_config3 = createLineChartConfig(el_humidity_room1_chart,"line","Room 1 Humidity",[],'Room 1 Humidity (%)')
let line_config4 = createLineChartConfig(el_humidity_room2_chart,"line","Room 1 Humidity",[],'Room 2 Humidity (%)')


let temperature_room1_chart = renderLineChart(line_config1)
let temperature_room2_chart = renderLineChart(line_config2)

let humidity_room1_chart = renderLineChart(line_config3)
let humidity_room2_chart = renderLineChart(line_config4)


async function fetchLineChartData(url){
    try {

        let res = await fetch(url,{"method":"GET"})
        let data = await res.json()
        data = data.map((d)=>{
            return {"x":Date.parse(d.ts),"y":d.value}
        })
        return data
        
    } catch (error) {
        console.error(err)
    }
}
let linechart_api_url1 = 'http://localhost:3001/api/temperature?room=room1'
let linechart_api_url2 = 'http://localhost:3001/api/temperature?room=room2'
let linechart_api_url3 = 'http://localhost:3001/api/humidity?room=room1'
let linechart_api_url4 = 'http://localhost:3001/api/humidity?room=room2'

Promise.all([fetchLineChartData(linechart_api_url1),fetchLineChartData(linechart_api_url2),fetchLineChartData(linechart_api_url3),fetchLineChartData(linechart_api_url4)])
.then(all_data=>{

    /* config1 = createLineChartConfig(el_temperature_room1_chart,"line","Room 1 Temperature",all_data[0],'Room 1 Temperature (°C)')
    config2 = createLineChartConfig(el_temperature_room2_chart,"line","Room 2 Temperature",all_data[1],'Room 2 Temperature (°C)')
    config3 = createLineChartConfig(el_humidity_room1_chart,"line","Room 1 Humidity",all_data[2],'Room 1 Humidity (%)')
    config4 = createLineChartConfig(el_humidity_room2_chart,"line","Room 1 Humidity",all_data[3],'Room 2 Humidity (%)') */


    temperature_room1_chart.data.datasets[0].data = all_data[0]
    temperature_room2_chart.data.datasets[0].data = all_data[1]
    
    humidity_room1_chart.data.datasets[0].data = all_data[2]
    humidity_room2_chart.data.datasets[0].data = all_data[3]
    
    temperature_room1_chart.update()
    temperature_room2_chart.update()

    humidity_room1_chart.update()
    humidity_room2_chart.update()


})
.catch(error=>console.error(error))