<template>
  <div :id="id" class="container"> </div>
</template>

<script>
    // 引入基本模板
    import echarts from 'echarts/lib/echarts'
    // 引入雷达图组件
    import 'echarts/lib/chart/radar'
    // 引入提示框和图例组件
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'

    export default {
        name: "radar-chart",
        props: {                //接受父组件传递来的数据
            id: {
                type: String,
            },
            className: {
                type: String
            },
        },
        data(){
            return {
                items:this.$store.getters.getBaseItem
            }
        },
        methods:{
          makeChart(){
              let values = []  //提炼接收到的数据
              this.items.forEach(el => {
                  values.push(el.value)
              })
              const option = { //覆盖配置数据option
                  tooltip: {},
                  radar: {
                      indicator: this.items,
                      center: ['50%', '51%']
                  },
                  series: [{
                      type: 'radar',
                      itemStyle: {normal: {areaStyle: {type: 'default'}}},
                      data: [
                          {
                              value: values,
                              name: '各字段非 NaN-Value 情况',
                              itemStyle: {normal: {color: '#f0ad4e'}}
                          }
                      ]
                  }]
              }
              //初始化
              const chartObj = echarts.init(document.getElementById(this.id))
              chartObj.setOption(option)
          }
        },
        mounted(){
            this.makeChart()
        },
        computed: {
            getData() {
                return this.$store.getters.getBaseItem
            }
        },
        watch:{
            getData(val){
              this.items = val;
              this.makeChart();
            }
        }
    }
</script>

<style scoped>
  .container{
    width: 300px;
    height: 300px;
  }
</style>
