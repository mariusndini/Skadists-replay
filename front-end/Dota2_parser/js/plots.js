function drawGoldXP(div, xA, gold, xp){
	
    var trace1 = {
        x: xA,
        y: gold,
        name:'Gold',
        marker: {
            color: '#FFD700',
            size: 1
        },
        type: 'scatter'
      };
      
      var trace2 = {
        x: xA,
        y: xp,
        name:'XP',
        marker: {
            color: '#62bd69',
            size: 1
        },
        type: 'scatter'
      };
      
      var data = [trace1, trace2];
      
    var layout = {
      plot_bgcolor: "rgba(0,0,0,0)",
      paper_bgcolor: "rgba(0,0,0,0)",
      width: 900,
      xaxis: {
            tickcolor: '#fff',
            gridcolor: '#000',
            color: "#fff",
            type: 'time'
        },
        yaxis: {
            tickcolor: '#fff',
            gridcolor: 'ffffFF44',
            color: "#fff"
        },
          margin: {
                r: 50, 
                t: 50, 
                b: 50, 
                l: 50
              }, 
	  showlegend: false
	};

    Plotly.newPlot(div, data, layout);
	
}