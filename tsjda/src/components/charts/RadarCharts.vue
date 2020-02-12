<template>
  <div>
    <div :class="className" :id="id" style="height: 500px;width: 500px">
    </div>
  </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "RadarCharts",
        props:{
            className: String,
            id: String,
            height: Number,
            weight: Number,
            title: String,
            legends: Array,
            indicator: Array,
            dataA:Array
        },
        mounted() {
            this.drawRadar();
        },
        watch:{
          dataA:{
              handler(val){
                  console.log(val)
                  this.drawRadar()
              }
          }
        },
        methods:{
            drawRadar(){
                let radarChart = this.$echarts.init(document.getElementById(this.id));
                console.log(radarChart)
                radarChart.setOption({
                    title: {
                        text: this.title
                    },
                    tooltip: {},
                    legend: {
                        data: this.legends
                    },
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: this.indicator,
                            // { name: '销售（sales）', max: 6500},
                            // { name: '管理（Administration）', max: 16000},
                            // { name: '信息技术（Information Techology）', max: 30000},
                            // { name: '客服（Customer Support）', max: 38000},
                            // { name: '研发（Development）', max: 52000},
                            // { name: '市场（Marketing）', max: 25000}
                        series: [{
                            name: '',
                            type: 'radar',
                            // areaStyle: {normal: {}},
                            data: this.dataA
                            //     [
                            //     {
                            //         value: [4300, 10000, 28000, 35000, 50000, 19000],
                            //         name: '预算分配（Allocated Budget）'
                            //     },
                            //     {
                            //         value: [5000, 14000, 28000, 31000, 42000, 21000],
                            //         name: '实际开销（Actual Spending）'
                            //     }
                            // ]
                        }]
                    },
                })
            }
        }
    }
</script>

<style scoped>

</style>
