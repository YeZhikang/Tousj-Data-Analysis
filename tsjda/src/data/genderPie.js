export default {
  title: {
    text: '',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'left',
    data: [
      "女性",
      "男性"
    ]
  },
  series: [
    {
      name: '性别',
      type: 'pie',
      radius: ['30%', '50%'],
      center: ['50%', '50%'],
      data: [

      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
