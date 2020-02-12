<template>
  <div>
          <el-col ref="userInfo" class="userInfo" :span="8">
            <el-card class="userCard">
              <div class="card-main">

                  <div class="userAvatar">
                    <el-avatar :size="60" :src="user.userAvatar"></el-avatar>
                  </div>
                  <div class="userText">
                    <div>
                    <h4 style="margin: 3px">{{userInfo.userName}}</h4>
                    </div>
                    <div>
                    <el-alert
                      class="identify"
                      :title="user.identify"
                      type="warning"
                      :closable="closeAble"
                    >
                    </el-alert>
                    </div>
                  </div>

                <div class="userIntro" style="width: 100%">
                  <p style="font-size: 14px">{{userInfo.definedRes}}</p>
                </div>
                <div class="userData">
                  <div class="userData-Son">
                    <el-tooltip class="item" effect="light" :open-delay="300" content="近期粉丝数量情况" placement="top">
                      <h5>粉丝数 <i class="el-icon-question"></i></h5>
                    </el-tooltip>
                    <h3>{{userInfo.fansNum | numCap}}</h3>
                  </div>
                  <div class="userData-Son">
                    <el-tooltip class="item" effect="light" :open-delay="300" content="近期关注数量情况" placement="top">
                     <h5>关注数 <i class="el-icon-question"></i></h5>
                    </el-tooltip>
                    <h3>{{userInfo.focusNum | numCap}}</h3>
                  </div>
                  <div class="userData-Son">
                    <el-tooltip class="item" effect="light" :open-delay="300" content="根据透视镜价值评估体系生成" placement="top">
                      <h5>价值系数 <i class="el-icon-question"></i></h5>
                    </el-tooltip>
                    <h3>{{userInflu | numCap}}</h3>
                  </div>
                </div>
              </div>
            </el-card>
            <div class="userInfo-Intro" style="margin-top: 30px">
                <el-alert
                  title="投前分析"
                  type="warning"
                  show-icon
                  ref="beforeAnalysis"
                  :closable="false"
                ></el-alert>
            </div>

          </el-col>
          <el-col ref="userGraph" class="userGraph" :span="16">
              <el-card class="AnalysisCard">
                <AnalysisGraph
                  :userInfo="userInfo"
                >
                </AnalysisGraph>
              </el-card>
          </el-col>
  </div>
</template>

<script>
    import AnalysisGraph from "../AnalysisGraph";

    export default {
        name: "DataAnalysis",
        components: {AnalysisGraph},
        data(){
            return{
                user:{
                    userAvatar: "https://tvax3.sinaimg.cn/crop.0.8.1125.1125.180/6ade4348ly8fpcrds6cy3j20v90vq75s.jpg?KID=imgbed,tva&Expires=1580924289&ssig=VNE48sOCaF",
                    identify: "明星",
                },
                closeAble: false,
                userInfo:null,
                analysisTime:5
            }
        },
        methods:{
            searchBloggerById(){
                console.log(this.$route.query.userId)
                this.$axios.post('/searchBloggerById',{bloggerId:this.$route.query.userId}).then(res => {
                    console.log(res)
                    if(res.data.bloggerInfo){
                        this.userInfo = res.data.bloggerInfo
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.searchBloggerById();

        },
        computed:{
            userInflu(){
                return Math.floor( this.userInfo.fansNum/12.14 + (100-this.userInfo.focusNum)*100)
            }
        },

        watch:{
            $route:{
                handler:function (val) {
                    this.searchBloggerById()
                }
            }
        }

    }
</script>

<style scoped>
  .CA-Main{
    text-align: left;
    background-color: rgb(244,247,249);
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;

  }

  .el-menu-vertical-demo{
    position: fixed;
    margin-top: 69px;

    min-height: 100%;
  }

  .userCard{
    margin: 10px;
  }

  .AnalysisCard{
    margin: 10px 10px 10px 0;
  }

  .el-menu-item{
    min-width: 100%
  }

  .userInfo{

  }

  .identify{
    padding: 0;
    width: 45px;
  }

  .userInfo,.userGraph{
    z-index: -2;
  }

  >>>.el-row{
    z-index: 0;
  }

  .nav{
    z-index: 999;
  }

  .mainBody{
    height: 100%;
    background-color: rgb(244,247,249);
  }

  .card-main{
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    align-items: center;
  }

  .userText{
    margin-left: 10px;
  }

  .userData{
    width: 100%;
    border-top: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
  }

  .userData-Son{
    width: 33%;
    text-align: center;
  }

  .userData-Son h3{
    font-weight: 400;
    font-size: 20px;
    margin:0 5px 0 5px
  }

  .userData-Son h5{
    margin:15px 0 8px 0;
    font-size: 8px;
    color: #898989;
  }

  .userInfo-Intro{
    text-align: left;
    margin: 0 auto;
    width: 360px;

  }

  .el-button{
    width: 40%;
    margin: 5px 15%;
  }

  .userInfo-Intro p{
    font-size: 13px;
    color: #6f6f6f;
  }

  >>>.userInfo-Intro span{
    font-size: 12px;
  }


</style>
