function plot_data(counters, view_count) {
    document.getElementById("audience").innerHTML = String(viewer_count) + "viewers included in the database."
    plot_happy_gauge("happyscore", counters[1], view_count);
    plot_surprise_gauge("surprisedscore", counters[3], view_count);
    plot_angry_gauge("angryscore", counters[0], view_count);
    plot_sad_gauge("sadscore", counters[2], view_count);

}

function plot_happy_gauge(divname, level, total){
    // Enter a speed between 0 and 180
    //total = 100
    var level = happy_c
    var labels = []
    var step = total/6;
    //for (i = total; i > 0; i - step) {
    //    labels.push(["" + String(i) + "-" + String(i - step)])
    //}
    // Trig to calc meter point
    var degrees = total - level,
         radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 18, color:'850000'},
        showlegend: false,
        name: 'nb of viewers',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['AMAZING!', 'Pretty Cool', 'Cool', 'OK',
                'Boring', 'Super Boring', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(204, 82, 0, .5)', 'rgba(255, 102, 0, .5)',
                       'rgba(255, 133, 51, .5)', 'rgba(255, 163, 102, .5)',
                       'rgba(255, 194, 153, .5)', 'rgba(255, 224, 204, .5)',
                       'rgba(255, 255, 255, 0)']},
      labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: 'Gauge of Happiness',
      //height: 100,
      //width: 100,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot(divname, data, layout);
}

function plot_angry_gauge(divname, level, total){
    // Enter a speed between 0 and 180
    var level = level; //happy_c;
    // Trig to calc meter point
    var degrees = total - level,
         radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 18, color:'850000'},
        showlegend: false,
        name: 'nb of viewers',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['ENRAGING!', 'Pretty Angry', 'Angry', 'Heated',
                'Hot', 'Calm', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(204, 0, 0, .5)', 'rgba(255, 0, 0, .5)',
                       'rgba(255, 51, 51, .5)', 'rgba(255, 102, 102, .5)', 
                       'rgba(255, 153, 153, .5)', 'rgba(255, 204, 204, .5)',
                       'rgba(255, 255, 255, 0)']},
      labels: ['-', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: 'Gauge of Angriness',
      //height: 100,
      //width: 100,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot(divname, data, layout);
}

function plot_surprise_gauge(divname, level, total){
    // Enter a speed between 0 and 180
    var level = level; //happy_c;
    // Trig to calc meter point
    var degrees = total - level,
         radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 18, color:'850000'},
        showlegend: false,
        name: 'nb of viewers',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['SHOCKING!', 'Pretty Surprised', 'Surprised', 'OK',
                'Boring', 'Super Boring', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                       'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                       'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                       'rgba(255, 255, 255, 0)']},
      labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: 'Gauge of Surprise',
      //height: 100,
      //width: 100,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot(divname, data, layout);
}

function plot_sad_gauge(divname, level, total){
    // Enter a speed between 0 and 180
    var level = level; //happy_c;
    var labels = []
    // Trig to calc meter point
    var degrees = total - level,
         radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 18, color:'850000'},
        showlegend: false,
        name: 'nb of viewers',
        text: level,
        hoverinfo: 'text+name'},
      { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
      rotation: 90,
      text: ['DEPRESSING!', 'Pretty Down', 'Down', 'OK',
                'Cheerful', 'Super Cheerful', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                       'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                       'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                       'rgba(255, 255, 255, 0)']},
      labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: 'Gauge of Sadness',
      //height: 100,
      //width: 100,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot(divname, data, layout);
}