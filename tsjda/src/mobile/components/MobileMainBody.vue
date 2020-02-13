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
          <li><router-link :to="{name: 'MobileIndex'}" style="color: #3a8ee6;font-weight: 600" class="default">首页</router-link></li>
          <li><router-link :to="{name: 'MobileIndex'}" class="default">数据分析</router-link></li>
          <li><router-link :to="{name: 'MobileCelebrityAnalysis'}" class="default">网红价值</router-link></li>
        </ul>
        <el-avatar :src="userAvatarURL"></el-avatar>
      </el-header>
      <el-main style="margin-top: 55px;padding: 0">
        <router-view/>
      </el-main>

        <el-footer
          style="width: 100%;padding: 50px 34px 50px 34px;
                 background-color: #2c3e50;display: flex;
                 align-items: center;flex-wrap: wrap;height: auto"
          v-if="!this.$route.path.includes('celebrity')"
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
                userAvatarURL:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
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
    font-size: 12px;
    color: rgb(222,222,222);
  }

</style>
