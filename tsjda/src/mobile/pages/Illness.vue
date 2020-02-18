<template>
  <div style="width: 100%">
    <to-honey name="Wang Yaxuan" :is-wyx="isWyx"></to-honey>
    <div style="display: flex;justify-content: center;">
      <div class="main" >
        <h1 style="font-size: 36px;color: black;">实时情况图</h1>
        <h3 style="font-size: 14px;color: darkgrey;font-weight: 400">
           更新自 {{refreshTime}}
          <el-button type="text"><i class="el-icon-loading"></i></el-button>
        </h3>
        <div style="width: 100%;height: 600px;margin-top: -80px">
            <chart
              :height="'550px'"
              :options="map"
              :init-options="initOptions"
              ref="map"
              autoresize
            />
        </div>
        <h2 style="font-size: 22px;color: black;margin-top: -50px ">More Data <i class="el-icon-data-analysis"></i></h2>
        <el-card  style="margin:20px 0 40px 0">
          <div v-for="(note,index) in notes" :key="index">
            <el-alert :closable="false" style="font-size: 8px;margin-bottom: 5px;text-align: left;padding: 4px" :title="illData[note]" type="info">

            </el-alert>
          </div>
          <div style="display: flex;justify-content: space-between;margin-top: 16px;padding: 2px 4px;flex-wrap: wrap">
            <section style="width: 81%">
              <chart
                :options="data2"
                :init-options="initOptions"
                ref="pie"
                autoresize
                :height="'200px'"
              />
            </section>
            <div style="width: 19% ; " >
              <div
                v-for="(cate,index) in illCate" :key="index"
                style="width: 100%;margin-bottom: 10px;text-align: right"
              >
                <h3 style="font-size: 12px;color:darkgrey">{{cate | getCate}}</h3>
                <p>{{illData[cate]}}</p>
              </div>
            </div>
          </div>
        </el-card>
        <h2 style="font-size: 22px;color: black">Tips <i class="el-icon-tickets"></i></h2>
        <el-card  style="margin:20px 0 40px 0">
          <div style="text-align: left;">
            <div v-for="(remarkTip,index) in remarks" :key="index">
              <el-alert :closable="false" style="margin: 8px 0" type="warning" v-if="index === 0" show-icon>
                {{illData[remarkTip]}}
              </el-alert>
              <el-alert :closable="false" style="margin: 8px 0" type="info" v-else>
                {{illData[remarkTip]}}
              </el-alert>
            </div>
          </div>
        </el-card>

        <h2 style="font-size: 22px;color: black;margin-top: 20px">Recent News <i class="el-icon-news"></i></h2>
        <el-card style="margin-top: 25px">
          <el-collapse v-model="activeName" >
            <el-collapse-item
              v-for="(newReport,index) in news"
              :title="newReport.title.length > 18 ? newReport.title.substr(0,18) : newReport.title" :name="index"
            >
              <div style="font-size: 12px;text-align: left;margin-bottom: 6px">
                <span style="font-weight: 600">
                  {{newReport.infoSource}}
                  <span v-if="newReport.provinceName">- {{newReport.provinceName}}</span>
                </span>
                <span style="color: darkgrey;float: right">{{newReport.pubDateStr}}</span>
              </div>
              <div style="text-align: left">{{newReport.summary}}</div>
            </el-collapse-item>

          </el-collapse>
        </el-card>
        <h4 style="font-weight: 400; text-align: right;margin: 100px 10px 20px 0;color: rgba(44,62,80,0.76)">Made by <br/><i>Wang Yaxuan</i></h4>
        <div class="end" >
          <div style="display: flex;align-items: center">
            <router-link class="rl" :to="{name:'illness'}">Illness</router-link>
            <router-link class="rl pl25" :to="{name:'illness'}">Contact  <i class="el-icon-paperclip"></i></router-link>
          </div>
          <div>
            <a class="rl" href= "https://github.com/YeZhikang'">
              <img src="../../assets/github.svg" height="30px">
            </a>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
    import Echarts from "../../components/charts/Echarts2";
    import echarts from 'echarts'
    import 'echarts/map/js/china'
    import map from '../../data/map2'
    import ToHoney from "../components/toHoney";
    import data2 from '../../data/data2'
    import '../../static/font.css'

    export default {
        name: "Illness",
        props: ["userJson"],
        components:{
            ToHoney,
            chart:Echarts
        },
        filters:{
            getCate(val){
                if(val === "confirmedCount"){
                    return '累计统计'
                }else if(val === "currentConfirmedCount"){
                    return '现存人数'
                }else if(val === "suspectedCount"){
                    return '疑似人数'
                }else{
                    return "治愈人数"
                }
            }
        },
        data() {
            return {
                notes:["note1","note2","note3"],
                remarks:["remark1","remark2","remark3"],
                chart: null,
                activeName:'1',
                map:map,
                data2:data2,
                isWyx:true,
                refreshTime:new Date().toLocaleString(),
                news:[],
                illCate: ["confirmedCount","currentConfirmedCount","suspectedCount","curedCount"],
                illData: {
                    confirmedCount: 0,
                    currentConfirmedCount: 0,
                    suspectedCount: 0,
                    curedCount: 0,
                    deadCount: 0,
                    seriousCount: 0,
                    suspectedIncr: 0,
                    currentConfirmedIncr: 0,
                    confirmedIncr: 0
                },
                msg:[]
            };
        },
        methods:{
            getData(){
                this.$axios.get('http://www.dzyong.top:3005/yiqing/area').then(res => {
                    let $_illArr = [];
                    let $_data = res.data.data;
                    $_data.forEach(item => {
                        if($_illArr.length === 0){
                            $_illArr.push({
                                name: item.provinceName,
                                value: item.confirmedCount,
                                cityLst: [{cityName:item.cityName,number:item.confirmedCount}]
                            })
                        }else {
                            for( let i = 0; i < $_illArr.length; i++ ) {
                                if ($_illArr[i].name === item.provinceName) {
                                    $_illArr[i].value += item.confirmedCount
                                    $_illArr[i].cityLst.push({ cityName:item.cityName,number:item.confirmedCount })
                                    break
                                } else if (i === $_illArr.length - 1) {
                                    $_illArr.push({
                                        name: item.provinceName,
                                        value: item.confirmedCount,
                                        cityLst: [{cityName:item.cityName,number:item.confirmedCount}]
                                    })
                                }
                            }
                        }
                    })
                    map.series[0].data = $_illArr
                    map.tooltip.formatter = (e, t, n) => {
                        let $_hData = e.data.cityLst.map(item =>
                                `<div style="font-size: 12px;text-align: left">${item.cityName} : ${item.number}</div>`
                            )
                        return e.seriesName + "<br />" + e.name + "：" + e.value + "<br/>"+"<div style='text-align: left;margin-top: 10px'>其中</div>"+ $_hData.join('')
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message({
                        type: "error",
                        message: "Unknown Error"
                    })
                })
            },
            getNews(){
                this.$axios.get('http://api.tianapi.com/txapi/ncov/index?key=c63d8ca758344542d27433117adc7d3f').then(res => {
                    this.illData = res.data.newslist[0].desc
                    this.news = res.data.newslist[0].news;
                    // illCate: ["confirmedCount","currentConfirmedCount","suspectedCount","curedCount"];
                    data2.series[0].data = [
                        {
                            name: "疑似人数",
                            value: this.illData.suspectedCount
                        },
                        {
                            name: "累计统计",
                            value: this.illData.confirmedCount
                        },
                        {
                            name: "治愈人数",
                            value: this.illData.curedCount
                        },
                        {
                            name: "现存人数",
                            value: this.illData.currentConfirmedCount
                        }
                    ]
                    console.log(this.illData)
                }).catch(error => {
                    console.log(error)
                })
            },
            handleChange(val) {
                console.log(val);
            }
        },
        mounted() {
            // this.$axios.get('http://www.dzyong.top:3005/yiqing/area').then(res => {
            //     console.log(res)
            // }).catch(error => {
            // })
            this.getData();
            this.getNews();
        },

    }
</script>

<style scoped>
  >>>::selection
  {
    background-color: rgba(8, 96, 96, 0.44);
    color: white;
  }
  h1,h2,h3,h4,p{
    margin: 0;
    padding: 0;
    text-align: left;
  }

  .main{
    width: 60%;
    margin-top: 200px
  }

  .end{
    margin: 110px 0 25px 0;padding:0 40px;display: flex;justify-content: space-between
  }

  @media screen and (max-width: 800px){
    .main{
      width: 90%;
      margin-top: 150px
    }
    .end{
      padding:0 10px
    }
    .end .pl25{
      padding-left: 10px;
    }
  }


</style>
