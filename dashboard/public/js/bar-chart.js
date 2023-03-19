function createBarChartConfig(element,type,label,data,max,text){
  return {
    "element":element,
    "type":type,
    "label":label,
    "data":data,
    "max":max,
    "text":text
  }
}

function renderBarChart(config){
  let configurations = {
    type: config.type,
    data: {
      datasets: [{
        label: config.label,
        data:config.data,
        backgroundColor:["rgba(186, 157, 236, 0.3)"],
        borderColor:['rgba(186, 157, 236, 1)'],
        borderWidth:2
      }]
    },

    options:{
      scales: {
        x: {
          ticks: {
            color:'#03DAC5'
          }
        },
        y: {
          min: 0,
          max: config.max,
          ticks: {
            color:'#03DAC5'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: config.text,
          color:'white',
          font:{
            size:16,
          }
        }
      },
    maintainAspectRatio: false,
    responsive: true,  
    }
  }
    

  return new Chart(config.element,configurations)
  
}


/* 
let data =  [
  { x: "RAM Usage", y: 50 }
]
 */


//setInterval(updateBarchart,3500,humiditiy_systemusage_chart)
