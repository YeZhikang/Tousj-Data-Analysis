<template>
  <div>
    <el-container>
      <el-header
        style="position: fixed;height: 55px;
                 width: 100%;display: flex;align-items: center;
                 justify-content: space-between;background-color: white;z-index: 999"
      >
        <img src="../../assets/faviconn3.png" style="height: 40px">
        <ul>
          <li><router-link :to="{name: 'MobileIndex'}" :class="{'default':true,'active':routeArr[0]}"><a ref="MobileIndex">首页</a></router-link></li>
          <li><router-link :to="{name: 'da'}" :class="{'default':true,'active':routeArr[1]}"><a ref="da">数据分析</a></router-link></li>
          <li><router-link :to="{name: 'MobileCelebrityAnalysis'}" :class="{'default':true,'active':routeArr[2]}"><a ref="MobileCelebrityAnalysis">网红价值</a></router-link></li>
        </ul>
        <div v-if="userName">
          <el-dropdown size="small" trigger="click">
            <el-button type="text" style="height: 44px;padding: 0">
              <el-avatar >yezhikang</el-avatar>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="$router.push({name:'MobileUserIndex'})">历史记录</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button style="color: #E6A23C" type="text" @click="signOut()">注销</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-if="!userName">
          <li><router-link :to="{name: 'MobileLogin'}" :class="{'default':true}" style="font-weight: 600;color: black"><a>请登录</a></router-link></li>
        </div>
      </el-header>
      <el-main style="margin-top: 55px;padding: 0">
        <router-view/>
      </el-main>

        <el-footer
          style="width: 100%;padding: 50px 34px 50px 34px;
                 background-color: #2c3e50;display: flex;
                 align-items: center;flex-wrap: wrap;height: auto"
          v-if="!this.$route.path.includes('celebrity') && !this.$route.path.includes('userIndex')"
        >
          <div class="footer-main">
            <div class="icon-block" style="display: flex;">
              <h3><i class="el-icon-phone-outline"></i></h3>
              <h3><i class="el-icon-share"></i></h3>
              <h3><i class="el-icon-postcard"></i></h3>
              <h3><i class="el-icon-discover"></i></h3>
            </div>
            <img src="../../assets/faviconn3.png" style="width: 100px">
            <div style="text-align: right;width: 100%;padding-top: 20px">
              <h3>透视镜</h3>
              <p style="margin-top: 10px">Copyright © 2019 - 2020 阿里巴巴商学院 · 透视镜</p>
            </div>
          </div>
        </el-footer>
    </el-container>
  </div>
</template>

<script>
    import "../../static/Mobile.css"
    import Footer from "../../components/TheFooter";
    export default {
        name: "MobileMainBody",
        components: {Footer},
        data(){
            return{
                userAvatarURL:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                routeArr:[false,false,false],
                userName:localStorage.getItem("userName")
            }
        },
        methods:{
            changeNavColor(){
              let routeName = this.$route.name;
              if(routeName === "手机端博主搜索"){
                  this.routeArr = [false,false,true]
              }else if(routeName === "MobileIndex"){
                  this.routeArr = [true,false,false]
              }else{
                  this.routeArr = [false,false,false]
              }
            },
            signOut(){
                // this.$store.dispatch("changeUserInfo",{});
                localStorage.setItem("userName","");
                this.userName = ""
                // this.$router.push({name:"login"})
            }
        },
        mounted(){
            this.changeNavColor()
        },
        watch:{
            $route:{
                handler:function (val) {
                    this.changeNavColor()
                }
            }
        }
    }
</script>

<style scoped>
  ul{
    list-style: none;
    padding:0
  }
  li{
    display: inline-block;
    font-size: 14px;
    padding-right: 7px;
  }

  .footer-main{
    color: white;
    display: flex;
    justify-content:space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
  }

  .footer-main p{
    margin: 0;
    font-size: 12px;
    font-weight: 400;
  }

  .footer-main h4,h3,h1,h2,p{
    margin: 0;
    font-weight: 400;
  }

  .icon-block h3{
    display: inline-block;
    margin-right: 4px;
    font-size: 16px;
    color: rgb(222,222,222);
  }

</style>
