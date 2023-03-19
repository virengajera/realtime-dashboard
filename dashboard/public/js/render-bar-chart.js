const el_temperature_systemusage = document.getElementById('temperature-systemusage-chart')
const el_humidity_systemusage = document.getElementById('humidity-systemusage-chart')

let bar_config1 = createBarChartConfig(el_temperature_systemusage,"bar","Temperature RAM usage(Bytes)",[{x:"RAM usage",y:0}],100,'Temperature Device System Usage')
let bar_config2 = createBarChartConfig(el_humidity_systemusage,"bar","Humidity RAM usage(Bytes)",[{x:"RAM usage",y:0}],100,'Humidity Device System Usage')

let temperature_systemusage_chart = renderBarChart(bar_config1)
let humidity_systemusage_chart = renderBarChart(bar_config2)

//const temperature_systemusage_chart = renderBarChart(el_temperature_systemusage,"bar","RAM Usage : Temperature Device",data,'RAM usage in bytes')
//const humiditiy_systemusage_chart = renderBarChart(el_humidity_systemusage,"bar","RAM Usage : Humiditiy Device",data,'RAM usage in bytes')


async function fetchBarChartData(url){
    try {

        let res = await fetch(url,{"method":"GET"})
        let res_data = await res.json()
        let data = res_data.map((d)=>{
            return {"x":"RAM Usage","y":Number(d.usedmemory)}
        })
        return {"data":data,"max":Number(res_data[0].totalmemory)}
        
    } catch (error) {
        console.error(err)
    }
}
let barchart_api_url1 = 'http://localhost:3001/api/systemusage?device=temperature'
let barchart_api_url2 = 'http://localhost:3001/api/systemusage?device=humidity'


Promise.all([fetchBarChartData(barchart_api_url1),fetchBarChartData(barchart_api_url2)])
.then(all_data=>{

    temperature_systemusage_chart.data.datasets[0].data = all_data[0].data
    temperature_systemusage_chart.options.scales.y.max = all_data[0].max
    
    humidity_systemusage_chart.data.datasets[0].data = all_data[1].data
    humidity_systemusage_chart.options.scales.y.max = all_data[1].max

    temperature_systemusage_chart.update()
    humidity_systemusage_chart.update()
})
.catch(error=>console.error(error))