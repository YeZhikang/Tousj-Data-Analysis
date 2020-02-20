<template>
    <div class="mainBody">
      <CaNav
        class="nav"
        width="1400px"
        @is-collapsed="checkIsCollapsed"
      ></CaNav>
      <el-row class="CA-Main" ref="CAMain" >
        <el-col :span="3" class="menuBlock">
          <el-menu
            ref="menuVertical"
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @select="handleSelect"
          >
            <el-menu-item index="博主搜索">
              <i class="el-icon-search"></i>
              <span slot="title">博主搜索</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-trophy"></i>
                <span slot="title">微博排行榜</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="博主影响力排行榜">
                  <span style="font-size: 13px;">博主影响力排行榜</span>
                </el-menu-item>
                <el-menu-item index="广告微博排行榜">
                  <span style="font-size: 13px;">广告微博排行榜</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="电商数据分析">
              <template slot="title">
                <i class="el-icon-s-help"></i>
                <span slot="title">电商数据分析</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="商品搜索">
                  <span style="font-size: 13px;">商品搜索</span>
                </el-menu-item>
                <el-menu-item index="商品排行榜">
                  <span style="font-size: 13px;">商品排行榜</span>
                </el-menu-item>
                <el-menu-item index="电商达人排行榜">
                  <span style="font-size: 13px;">电商达人排行榜</span>
                </el-menu-item>
                <el-menu-item index="团购排行榜">
                  <span style="font-size: 13px;">团购排行榜</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="微博监控">
              <i class="el-icon-view"></i>
              <span slot="title">微博监控</span>
            </el-menu-item>
            <el-menu-item index="个人中心">
              <i class="el-icon-user"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col
          class="mainBody"
          id="mainBody"
          :span="21"
          ref="mainBody"
          style="margin-top: 69px;z-index: -2;">
          <router-view/>
        </el-col>
<!--        <el-col ref="userInfo" class="userInfo" :span="5">-->
<!--          <el-card class="userCard">-->
<!--            <div class="card-main">-->
<!--              <div class="userAvatar">-->
<!--                <el-avatar :size="60" :src="user.userAvatar"></el-avatar>-->
<!--              </div>-->
<!--              <div class="userText">-->
<!--                <div>-->
<!--                <h4 style="margin: 3px">{{user.userName}}</h4>-->
<!--                </div>-->
<!--                <div>-->
<!--                <el-alert-->
<!--                  class="identify"-->
<!--                  :title="user.identify"-->
<!--                  type="warning"-->
<!--                  :closable="closeAble"-->
<!--                >-->
<!--                </el-alert>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="userIntro">-->
<!--                <p>{{user.userIntro}}</p>-->
<!--              </div>-->
<!--              <div class="userData">-->
<!--                <div class="userData-Son">-->
<!--                  <h5>粉丝数 <i class="el-icon-question"></i></h5>-->
<!--                  <h3>{{user.userFansNum}}</h3>-->
<!--                </div>-->
<!--                <div class="userData-Son">-->
<!--                  <h5>关注数 <i class="el-icon-question"></i></h5>-->
<!--                  <h3>{{user.userFocusNum}}</h3>-->
<!--                </div>-->
<!--                <div class="userData-Son">-->
<!--                  <h5>价值系数 <i class="el-icon-question"></i></h5>-->
<!--                  <h3>{{user.userValueNum}}</h3>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->
<!--          <div class="userInfo-Intro">-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              size="mini"-->
<!--              disabled-->
<!--            >投前分析</el-button>-->
<!--            <el-link type="info">若要进行分析，请先登陆</el-link>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col ref="userGraph" class="userGraph" :span="16">-->
<!--            <el-card class="AnalysisCard">-->
<!--              <AnalysisGraph/>-->
<!--            </el-card>-->
<!--        </el-col>-->
      </el-row>
    </div>
</template>

<script>
    import Nav from "../components/TheNav";
    import CaNav from "../components/CaNav";
    import AnalysisGraph from "../components/AnalysisGraph";
    import {Loading} from 'element-ui'
    // window.onresize = changeBlockWidth;
    // function changeBlockWidth() {
    //     document.querySelector(".CAMain").style.width = document.body.clientWidth + "px"
    // }

    export default {
        name: "CelebrityAnalysis",
        components: {AnalysisGraph, CaNav, Nav},
        data(){
            return{
                isCollapse: false,
                activeData: "数据统计",
                user:{
                    userAvatar: "https://tvax1.sinaimg.cn/crop.0.0.512.512.180/005ZHJnily8g70iv31fgqj30e80e8wf3.jpg?KID=imgbed,tva&Expires=1579976431&ssig=20znJ5iECH",
                    userName: this.$route.params.celebrityName,
                    identify: "明星",
                    userIntro: "Test it is not a whale how been a with you shadow Test it is not a whale how been a with you",
                    userFansNum: "100,0",
                    userFocusNum: "13",
                    userValueNum: "312,44"
                },
                closeAble: false
            }
        },
        methods:{
            checkIsCollapsed(data){
                this.isCollapse = data;
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(val){
                console.log(val);
                this.$router.push({name:val});
            },
            keepConnect(){
                let loadingInstance1 = Loading.service({ target: "#mainBody" });
                this.$axios.get('/').then(res => {
                    loadingInstance1.close()
                }).catch(error => {
                    this.$message({
                        message:"网络连接失败，请稍后再试",
                        type:"error"
                    })
                })
            }
        },
        mounted(){
            this.$refs.mainBody.$el.style.marginLeft = "180px"
            this.$refs.CAMain.$el.style.width = document.body.clientWidth + "px"
            this.keepConnect()
        },
        watch:{
            isCollapse:{
                handler:function (val) {
                    if(val === false){
                        this.$refs.mainBody.$el.style.marginLeft = "180px"
                    }else{
                        this.$refs.mainBody.$el.style.marginLeft = "64px"
                    }
                }
            },
            $router:{
                handler:function (val) {

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
    margin-top: 72px;
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
    text-align: center;
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
