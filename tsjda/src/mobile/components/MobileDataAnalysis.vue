<template>
    <div>
      <div class="DC-son" style="text-align: left">
        <div class="son-intro">
          <h4>数据概览<br>
            <small style="margin-left: 0">上次更新时间：{{refreshTime}}
              <el-button
                type="text"
                icon="el-icon-refresh">
              </el-button>
            </small>
          </h4>
        </div>
        <div class="button-group">
          <el-radio-group
            v-model="timeLimit"
            size="mini">
            <el-radio-button label="近7日"></el-radio-button>
            <el-radio-button label="近30日"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="time-data graph5">
          <div class="time-data-block">
            <h5>发博数</h5>
            <h3>{{userData[0]}}</h3>
          </div>
          <div class="time-data-block">
            <h5>平均点赞数</h5>
            <h3>{{userData[1]}}</h3>
          </div>
          <div class="time-data-block">
            <h5>平均评论数</h5>
            <h3>{{userData[2]}}</h3>
          </div>
          <div class="time-data-block">
            <h5>平均转发数</h5>
            <h3>{{userData[3]}}</h3>
          </div>
        </div>
      </div>
      <div class="DC-Block">
        <div class="DC-son">
          <div class="son-intro">
            <h4>发博数趋势</h4>
          </div>
          <div class="button-group">
            <el-radio-group v-model="postTimeLimit" size="mini">
              <el-radio-button label="近7日"></el-radio-button>
              <el-radio-button label="近30日"></el-radio-button>
              <el-radio-button label="近90日"></el-radio-button>
              <el-radio-button label="近180日"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="graph graph1">
          <section>
            <chart
              :height="height"
              :options="postLine"
              :init-options="initOptions"
              ref="postLine"
              autoresize
            />
          </section>
        </div>
      </div>
      <div class="DC-Block">
        <div class="DC-son-next">
          <div class="son-intro">
            <h4>点赞数趋势</h4>
          </div>
          <div class="button-group">
            <el-radio-group v-model="likeTimeLimit" size="mini">
              <el-radio-button label="近7日"></el-radio-button>
              <el-radio-button label="近30日"></el-radio-button>
              <el-radio-button label="近90日"></el-radio-button>
              <el-radio-button label="近180日"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="graph graph2">
          <section>
            <chart

              :options="likeLine"
              :init-options="initOptions"
              ref="likeLine"
              autoresize
            />
          </section>
        </div>
      </div>

      <div class="DC-Block">
        <div class="DC-son-next">
          <div class="son-intro">
            <h4>评论数趋势</h4>
          </div>
          <div class="button-group">
            <el-radio-group v-model="commentTimeLimit" size="mini">
              <el-radio-button label="近7日"></el-radio-button>
              <el-radio-button label="近30日"></el-radio-button>
              <el-radio-button label="近90日"></el-radio-button>
              <el-radio-button label="近180日"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="graph graph3">
          <section>
            <chart
              :options="commentLine"
              :init-options="initOptions"
              ref="commentLine"
              autoresize
            />
          </section>
        </div>
      </div>

      <div class="DC-Block">
        <div class="DC-son-next">
          <div class="son-intro">
            <h4>转发数趋势</h4>
          </div>
          <div class="button-group">
            <el-radio-group v-model="repostTimeLimit" size="mini">
              <el-radio-button label="近7日"></el-radio-button>
              <el-radio-button label="近30日"></el-radio-button>
              <el-radio-button label="近90日"></el-radio-button>
              <el-radio-button label="近180日"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="graph graph4">
          <section>
            <chart

              :options="repostLine"
              :init-options="initOptions"
              ref="repostLine"
              autoresize
            />
          </section>
        </div>
      </div>
    </div>
</template>

<script>
    import ECharts from '../../components/charts/Echarts'
    import likeLine from "../../data/likeLine";
    import commentLine from "../../data/commentLine";
    import repostLine from "../../data/repostLine";
    import postLine from '../../data/postLine';
    import equipPie from '../../data/pie';
    import { Loading } from 'element-ui';

    export default {
        name: "MobileDataAnalysis",
        components:{
            chart: ECharts
        },
        data(){
            return {
                loadingComment:true,
                loadingArr:[true,true,true,true],
                repostLine:null,
                likeLine:null,
                postLine:null,
                commentLine:null,
                equipPie:equipPie,
                refreshTime:"2019-02-06 22:15:35",
                timeLimit: "近7日",
                likeTimeLimit: "近7日",
                postTimeLimit: "近7日",
                repostTimeLimit:'近7日',
                commentTimeLimit: "近7日",
                userId:this.$route.query.userId,
                userData:[0,0,0,0],
                commentData:null,
                likeData:null,
                blogData:null,
                repostData:null,
            }
        },
        watch:{
            postTimeLimit:{
                handler:function (val) {
                    let loadingInstance1 = Loading.service({ target: ".graph1" });
                    this.loadingArr[0] = true;
                    this.$axios.post('/getBloggerDataByDay',{
                        userId: this.userId,
                        theme: 'info',
                        dayCount: this.choiceDay(val)
                    }).then( res => {
                        this.getPostLine(res.data.data[0],res.data.data[1])
                        loadingInstance1.close()
                    }).catch( error => {
                    })
                }
            },
            likeTimeLimit:{
                handler:function (val) {
                    let loadingInstance2 = Loading.service({ target: ".graph2" });
                    this.$axios.post('/getBloggerDataByDay',{
                        userId: this.userId,
                        theme: 'like',
                        dayCount: this.choiceDay(val)
                    }).then( res => {
                        this.getLikeLine(res.data.data[0],res.data.data[1])
                        loadingInstance2.close()
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },
            commentTimeLimit:{
                handler:function (val) {
                    let loadingInstance3 = Loading.service({ target: ".graph3" });

                    this.$axios.post('/getBloggerDataByDay',{
                        userId: this.userId,
                        theme: 'comment',
                        dayCount: this.choiceDay(val)
                    }).then( res => {
                        loadingInstance3.close()
                        this.getCommentLine(res.data.data[0],res.data.data[1])
                    }).catch( error => {
                        console.log(error)
                    })
                }
            },
            repostTimeLimit:{
                handler:function (val) {
                    let loadingInstance4 = Loading.service({ target: ".graph4" });
                    this.$axios.post('/getBloggerDataByDay',{
                        userId: this.userId,
                        theme: 'repost',
                        dayCount: this.choiceDay(val)
                    }).then( res => {
                        this.getRepostLine(res.data.data[0],res.data.data[1])
                        loadingInstance4.close()
                    }).catch( error => {
                        console.log(error)
                    })
                }
            }
        },
        mounted(){
            this.getDetailInfo({userId:this.userId})
        },
        methods:{
            getRepostLine(date,data){
                // let choiceDay = this.choiceDay(val);
                let newRepostLine = repostLine;
                newRepostLine.series.data = data;
                newRepostLine.xAxis[0].data = date;
                return newRepostLine
            },
            getCommentLine(date,data){
                // let choiceDay = this.choiceDay(val);
                let newCommentLine = commentLine;
                newCommentLine.series.data = data;
                newCommentLine.xAxis[0].data = date
                return newCommentLine
            },

            getLikeLine(date,data){
                // let choiceDay = this.choiceDay(val);
                let newLikeLine = likeLine;
                newLikeLine.series.data = data;
                newLikeLine.xAxis[0].data = date
                return newLikeLine
            },

            getPostLine(date,data){
                // let choiceDay = this.choiceDay(val);
                let newPostLine = postLine;
                newPostLine.series.data = data;
                newPostLine.xAxis[0].data = date
                return newPostLine
            },

            /*
                  获取随机数
             */

            getRandomValueArray(day){
                let newArray = [];
                for(let i = 0;i<day;i++){
                    newArray.push(Math.round( Math.random() * 170) / 10)
                }
                return newArray
            },
            getRandomLikeArray(day){
                let newArray = [];
                for(let i = 0;i<day;i++){
                    newArray.push(Math.round( Math.random() * 300000) / 10)
                }
                return newArray
            },

            /*
                  获取天数
             */
            choiceDay(val){
                let day;
                if(val === "近7日"){
                    day = 7
                }else if(val === "近30日"){
                    day = 30
                }else if(val === "近90日"){
                    day = 90
                }else if(val === "近180日"){
                    day = 180
                }else{
                    day = val
                }
                return day
            },

            getDetailInfo(userId){
                let loadingInstance1 = Loading.service({ target: ".graph1" });
                let loadingInstance2 = Loading.service({ target: ".graph2" });
                let loadingInstance3 = Loading.service({ target: ".graph3" });
                let loadingInstance4 = Loading.service({ target: ".graph4" });
                let loadingInstance5 = Loading.service({ target: ".graph5" });
                userId = this.compareBloggerId ? {userId:this.compareBloggerId} : userId

                this.$axios.post('/getBloggerData',userId).then(res => {
                    this.repostLine = this.getRepostLine(res.data.repost_list_obj[0],res.data.repost_list_obj[1]);
                    this.likeLine = this.getLikeLine(res.data.like_list_obj[0],res.data.like_list_obj[1])
                    this.commentLine = this.getCommentLine(res.data.comment_list_obj[0],res.data.comment_list_obj[1])
                    this.postLine = this.getPostLine(res.data.info_list_obj[0],res.data.info_list_obj[1])
                    this.userData = res.data.dataLst;
                    loadingInstance1.close()
                    loadingInstance2.close()
                    loadingInstance3.close()
                    loadingInstance4.close()
                    loadingInstance5.close()

                    // equipPie.series[0].data = res.data.equip_list;
                    // console.log(equipPie)
                }).catch(error => {
                    console.log(error);
                });
            }

            // choicePieces(val){
            //     return [{
            //         top: 0,
            //         left: 10,
            //         orient: "horizontal",
            //         pieces: [{
            //               gt: 0,
            //               lte: Math.round(val / 5),
            //               color: '#409EFF'
            //             },
            //             {
            //               gt: Math.round(val / 5),
            //               lte: Math.round(val / 5) * 2,
            //               color: '#ffde33'
            //             },
            //             {
            //               gt: Math.round(val / 5) * 2,
            //               lte: Math.round(val / 5) * 3,
            //               color: '#ff9933'
            //             },
            //             {
            //               gt: Math.round(val / 5) * 3,
            //               lte: Math.round(val / 5) * 4,
            //               color: '#cc0033'
            //             },
            //             {
            //               gt: Math.round(val / 5) * 4,
            //               lte: Math.round(val / 5) * 5,
            //               color: '#660099'
            //             }],
            //         outOfRange: {
            //             color: '#999'
            //         }
            //   },{
            //         silent: true,
            //         data: [{
            //             yAxis:  Math.round(val / 5) * 3
            //         }, {
            //             yAxis: Math.round(val / 5) * 4
            //         }, {
            //             yAxis: Math.round(val / 5) * 5
            //         }]
            //     }]
            // }
        }
    }
</script>

<style scoped>
  .DC-son{
    justify-content: space-between;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .DC-son small{
    font-size: 12px;
    color: rgb(111,111,111);
    margin-left: 15px;
  }

  .son-intro h4{
    padding-left: 10px;
    border-left: 4px solid #409EFF;
  }

  .son-intro .el-button{
    padding: 0;
  }

  .time-data{
    width: 100%;
    border: 0.5px solid #f4e9e9;
    padding: 20px 5px;
    display: flex;
    justify-content: space-between;
    border-radius: 4px;

  }

  .time-data-block{
    width: 25%;
    text-align: center;
  }

  .time-data-block h3{
    font-weight: 400;
    font-size: 18px;
    margin:0 5px 0 5px
  }

  .time-data-block h5{
    margin:0 0 8px 0;
    font-size: 13px;
    color: #898989;
  }

  section{
    width: 100%;
  }

  .graph5{
    margin-top: 15px;
  }

  .graph{
    padding: 15px 10px 5px 10px;
    border: 1px dashed rgb(230,230,230);
    margin-top: 15px;

  }

  .DC-son-next{
    justify-content: space-between;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .DC-son-next small{
    font-size: 12px;
    color: rgb(111,111,111);
    margin-left: 15px;
  }
  .DC-son-next h4{
    margin-top: 20px;
  }
  .time-data-block h5{
    margin:0 0 8px 0;
    font-size: 12px;
    font-weight: 400;
    color: #898989;
  }



</style>
