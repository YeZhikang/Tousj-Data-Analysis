export default {
  dataset: {
    source: [
      [ '人数', '性别'],

      // [101852, 'Lemon Juice'],
      // [20112, 'Walnut Brownie']
    ]
  },
  grid: {containLabel: true},
  xAxis: {name: '人数'},
  yAxis: {type: 'category'},
  visualMap: {
    orient: 'horizontal',
    left: 'center',
    // min: 30000,
    // max: 1000,
    text: ['High Score', 'Low Score'],
    // Map the score column to color
    dimension: 0,
    inRange: {
      color: ['#D7DA8B', '#E15457']
    }
  },
  series: [
    {
      type: 'bar',
      encode: {
        // Map the "amount" column to X axis.
        x: '人数',
        // Map the "product" column to Y axis
        y: 'product'
      }
    }
  ]
}
