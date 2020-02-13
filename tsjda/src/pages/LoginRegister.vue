<template>
  <div class="content">
    <div class="container">
      <div class="logo">
        <h1>Toushi Jing</h1>
        <p>Seeking Value</p>
      </div>
      <div class="intro">
        <h1>用数据</h1>
        <h3>让网红的商业价值具化</h3>
      </div>
      <div class="aboutUs">
        <span><el-link style="color: white">关于我们 &nbsp;&nbsp;<small>2020 ©Toss</small></el-link></span>
      </div>
      <div class="component">
        <el-card>
          <router-view/>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "LoginRegister",
        methods:{
        },
        mounted() {
            if(this.$store.state.isMobile){
                this.$router.push({name:"MobileLogin"})
            }
            this.$axios.get('/').then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        }
    }
</script>

<style scoped>
  .logo{
    position: absolute;
    left: 60px;
    top: 42px;
    color: white;

  }

  h1{
    margin-bottom: 0;
  }
  p{
    margin-top: -7px;
  }
  .container{

  }

  .intro h1,h4,h3{
    margin: 0;
  }

  .intro h1{
    font-size: 54px;
    letter-spacing: 0;
    font-weight: 700;
  }

  .intro{
    text-align: left;
    color: white;
    font-family: PingFang-SC-Regular,Helvetica,"Microsoft Yahei","微软雅黑";
    position: fixed;
    left: 195px;
    top: 314px;
  }

  .intro h3{
    font-size: 32px;
    letter-spacing: 3.81px;
    font-weight: 300;
  }

  .content{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-size: cover;
    background-image: url("../assets/reg_bg.jpg");
  }

  .reg-bg{

  }

  .component{
    position: fixed;
    right: 110px;
    top: 70px;
    width: 500px;
    text-align: left;
  }

  .content{
    min-width: 1400px;
  }

  >>>.el-card{
    background-color: rgba(255,255,255,0.8);
  }

  .aboutUs{
    position: absolute;
    bottom: 70px;
    left: 70px;
  }




</style>
