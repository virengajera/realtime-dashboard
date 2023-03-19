function createLineChartConfig(element, type, label, data, text) {
  return {
    "element": element,
    "type": type,
    "label": label,
    "data": data,
    "text": text
  }
}

function renderLineChart(config) {
  let configurations = {
    type: config.type,
    data: {
      datasets: [{
        label: config.label,
        data: config.data,
        lineTension: 0.35
      }]
    },

    options: {
      scales: {
        x: {
          type: "time",
          time:{
            unit:"second"
          },
            ticks: {
              color: '#03DAC5'
            }
          },
          y: {
            min: 0,
            max: 120,
            ticks: {
              color: '#03DAC5'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: config.text,
            color: 'white',
            font: {
              size: 16,
            }
          }
        }
      },
      maintainAspectRatio: false,
      responsive: true, 
    }


  return new Chart(config.element, configurations)

  }





//setInterval(updateLinechart,3500,temperature_room1_chart)