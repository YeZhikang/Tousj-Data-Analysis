<template>
  <div :id="id" class="container" :index="plain" :text="text"> </div>
</template>

<script>
    // 引入基本模板
    import echarts from 'echarts/lib/echarts'
    // 引入雷达图组件
    import 'echarts/lib/chart/line'
    // 引入提示框和图例组件
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/legend'

    export default {
        name: "line-chart",
        props: {
            id: {
                type:String
            },
            plain: {
                type:String
            },
            text: {
                type:String
            }
        },
        data(){
            return {
                items:this.$store.state.analyseProcessResult[this.plain]
            }
        },
        methods:{
            makeChart(){
                let legendData = this.items.legendData;
                let xAxis = this.items.xAxis;
                let series = this.items.series;
                const option = {
                    title:{
                        text:this.text
                    },
                    tooltip:{},
                    legend:{
                        data:legendData
                            // ['访客来源']
                    },
                    xAxis:{
                        data:xAxis
                            // ["智联招聘","51job","拉钩","Boss直聘"]
                    },
                    yAxis:{
                    },
                    series:series
                    //     [{
                    //     name:'访问量',
                    //     type:'line',
                    //     data:[600,310,200,800]
                    // }]
                };
                const chartObj = echarts.init(document.getElementById(this.id))
                chartObj.setOption(option)
            }
        },
        mounted() {

        },
        computed: {
            getData() {
                return this.$store.state.analyseProcessResult[this.plain]
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
