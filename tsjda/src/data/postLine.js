function randomize () {
  let newArray = new Array(30);
  return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(v => {
    return Math.round( Math.random() * 170) / 10
  })
}

export default {
  title : {
  },

  legend: {

  },
  toolbox: {
    show : true,
    feature : {
      magicType : {show: true, type: ['line', 'bar']},
      saveAsImage : {show: true}
    }
  },
  calculable : true,
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
      data : []
    }
  ],
  yAxis : [
    {
      type : 'value',
      axisLabel : {
        formatter: '{value}'
      }
    }
  ],
  visualMap: {
    top: 0,
    left: 10,
    orient: "horizontal",
    pieces: [{
      gt: 0,
      lte: 1,
      color: '#409EFF'
    }, {
      gt: 1,
      lte: 3,
      color: '#ffde33'
    }, {
      gt: 3,
      lte: 5,
      color: '#ff9933'
    }, {
      gt: 5,
      lte: 8,
      color: '#cc0033'
    }, {
      gt: 8,
      lte: 15,
      color: '#660099'
    }],
    outOfRange: {
      color: '#999'
    }
  },
  series: {
    name:'',
    type:'line',
    data:[...randomize()],
    markLine: {
      silent: true,
      data: [{
        yAxis: 5
      }, {
        yAxis: 8
      }, {
        yAxis: 15
      }]
    },

    }
}
