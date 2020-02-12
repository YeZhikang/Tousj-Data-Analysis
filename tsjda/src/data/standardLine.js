export default {
  title : {

  },

  legend: {
    data:['发博量']
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
      data : ['周一','周二','周三','周四','周五','周六','周日']
    }
  ],
  yAxis : [
    {
      type : 'value',
      axisLabel : {
        formatter: '{value} °C'
      }
    }
  ],
  series : [
    {
      name:'标准气温',
      type:'line',
      data:[6,6,6,6,6,6,6],//标准线效果
      markLine : {
        data : [
          {type : 'average', name : '平均值'}
        ]
      }

    },
    {
      name:'最低气温',
      type:'line',
      data:[1, -2, 2, 5, 3, 2, 0],
      markPoint : {
        data : [
          {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
        ]
      },
      markLine : {
        data : [
          {type : 'average', name : '平均值'}
        ]
      }
    }]
}
