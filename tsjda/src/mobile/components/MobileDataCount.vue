<template>
  <div style="margin-top: 30px">
    <el-row>
      <el-col :span="24">
        <el-card>
          <div style="display: flex;width: 100%;align-items: center">
            <el-avatar :size="50" :src="userAvatar"></el-avatar>
            <div style="margin-left: 8px;">
              <h4 style="margin: 3px;font-weight: 500">{{userInfo.userName}} &nbsp;
                <el-tag type="warning" size="mini">{{identify}}</el-tag></h4>
            </div>
          </div>
          <div
            style="font-size: 13px;color: rgb(100,100,100);text-align: left;
                  border-bottom: 1px solid rgb(222,222,222)">
            <p style="margin-top: 0;padding-left: 4px">{{userInfo.definedRes}}</p>
          </div>
          <div style="display: flex;justify-content: space-around">
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
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24" >
        <el-card>
          <el-tabs :stretch="isStrech" v-model="activeData" @tab-click="handleClick">
            <el-tab-pane label="数据统计" name="数据统计"></el-tab-pane>
            <el-tab-pane label="历史微博" name="历史微博"></el-tab-pane>
            <el-tab-pane label="粉丝画像" name="粉丝画像"></el-tab-pane>
          </el-tabs>
          <router-view/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "MobileDataCount",
        data(){
            return{
                userAvatar: "https://tvax3.sinaimg.cn/crop.0.8.1125.1125.180/6ade4348ly8fpcrds6cy3j20v90vq75s.jpg?KID=imgbed,tva&Expires=1580924289&ssig=VNE48sOCaF",
                userInfo:{
                    userName:"小站",
                },
                identify:"明星",
                activeData:"数据统计",
                isStrech:false
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
            },
            handleClick(){
                if(this.activeData === "数据统计"){
                    this.$router.push({
                        name: "手机端数据分析",
                        query: {
                            userId: this.userInfo.userId
                        }
                    })
                }else{
                    this.$router.push({
                        name: "手机端" + this.activeData,
                        query: {
                            userId: this.userInfo.userId
                        }
                    })
                }
            }
        },
        computed:{
            userInflu(){
                return Math.floor( this.userInfo.fansNum/12.14 + (100-this.userInfo.focusNum)*100)
            }
        },
        mounted() {
            this.searchBloggerById();
        },
        watch:{

        }
    }
</script>

<style scoped>
  .userData-Son h5{
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 8px;
    color: #808080;
  }

  .userData-Son h3{
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }

  >>>.el-tabs__item{
    font-size: 12px;
    padding-right: 5px;
  }
</style>
