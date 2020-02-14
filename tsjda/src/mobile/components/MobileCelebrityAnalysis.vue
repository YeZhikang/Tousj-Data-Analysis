<template>
    <div style="padding: 0 25px">
      <el-row type="flex" justify="end">
        <el-col class="menu-button" :span="5">
          <el-button
            @click="drawer = true"
            icon="el-icon-menu"
            type="primary"
            style="position: fixed;z-index: 999"
            circle
            plain
          >
          </el-button>
        </el-col>
      </el-row>
      <el-row style="padding-bottom: 25px">
        <router-view/>
      </el-row>


<!--  menu    -->
      <el-drawer
        size="74%"
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">
        <ul ref="mainPart"  class="drawer-menu cav">
            <div v-if="!isRedirect2">
              <a v-for="(item,index) in menuItem" :key="index">
                <li @click="changeRedir(item)">{{item.par}}
                  <i v-if="item.children" class="el-icon-arrow-right"></i>
                </li>
              </a>
            </div>
            <transition name="el-fade-in-linear">
              <div
                style="height: 240px;width: 100%"
                v-show="isRedirect"
                class="transition-box"
              >
                <el-button
                  @click="changeBack()"
                  type="text"
                  style="color: darkgrey;padding-left: 40px;margin-bottom: 40px"
                >
                  <i class="el-icon-arrow-left">&nbsp;&nbsp;{{subMenu.par}}</i>
                </el-button>
                <a v-for="(item) in subMenu.children" :key="item">
                  <li>{{item}}
                  </li>
                </a>
              </div>
            </transition>
          <div v-if="!isRedirect2">
            <el-row :style="{marginTop: '30px'}" ref="second">
              <el-col
                style="border-top: 1px solid #e8e8e8;padding-top: 25px;text-align: left"
                      :span="20" :offset="2">
              </el-col>
              <el-col
                :span="24"
                style="text-align: left">
                <a class="nav-default" to="/m/main/celebrityAnalysis">
                  <li>浙ICP备12345678号</li>
                </a>
                <a class="nav-default" to="/m/main/celebrityAnalysis">
                  <li>隐私政策</li>
                </a>
              </el-col>
            </el-row>
          </div>
        </ul>
        <el-avatar :src="userInfo.userAvatarURL" style="position:absolute;left: 40px;bottom: 20px;"/>
        <div style="position: absolute;right: 40px;bottom: 20px">
          <p>
            <el-tag size="mini">
              用户
            </el-tag>
              &nbsp;&nbsp;{{userInfo.userName}}
          </p>
        </div>
      </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "MobileCelebrityAnalysis",
        data(){
            return{
                drawer:false,
                isRedirect:false,
                isRedirect2:false,
                subMenu:{
                    par:"",
                    children:[]
                },
                userInfo:{
                    userName:"叶志康",
                    userAvatarURL:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                },
                mt:"30px",
                menuItem:[
                    {
                        par:"博主搜索",
                    },
                    {
                        par:"微博排行榜",
                        children:["博主影响力排行榜","广告微博排行榜"]
                    },
                    {
                        par:"电商数据分析",
                        children:["商品搜索","商品排行榜","电商达人排行榜","团购排行榜"]
                    },
                    {
                        par:"微博监控",
                    },
                    {
                        par:"个人主页",
                    },
                    {
                        par:"帮助",
                    }
                ]
            }
        },
        methods:{
            changeRedir(item){
                if(item.children) {
                    this.isRedirect2 = true
                    this.subMenu = item;
                    this.isRedirect = true;
                }
            },
            changeBack(){
                this.isRedirect = false;
                setTimeout(()=>{
                    this.isRedirect2 = false;
                },250)
                console.log("ha")
            }
        }
    }
</script>

<style scoped>
  .drawer-menu{
    list-style: none;
    text-align: left;
    margin-top: 24px;
    padding-left: 0;

  }

  .drawer-menu li{
    padding:0 40px 0 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p{
    font-size: 12px;
    line-height: 12px;
    color: #293039;
    font-weight: 500;
  }

  /*.menu-button >>>i{*/
  /*  width: 20px;*/
  /*  height: 20px;*/
  /*}*/

  .sectionBanner__heading h1{
    font-size: 30px;
    margin-bottom: 0px;
    font-family: 'Open Sans','PingFang SC',sans-serif!important;
    font-weight: 500;
    text-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: black;
  }

  .sectionBanner{
    text-align: left;
  }

  .sectionBanner__heading p{
    font-weight: 400;
    color: black;
  }
</style>
