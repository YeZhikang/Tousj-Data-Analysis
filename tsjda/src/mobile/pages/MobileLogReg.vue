<template>
  <div class="container">
    <div class="header" >
      <div class="intro"></div>
      <img src="../../assets/faviconn3.png" style="height: 40px;">
      <div class="intro">{{active}}</div>
    </div>
    <el-row>
      <router-view/>
    </el-row>
  </div>
</template>

<script>
    import "../../static/Mobile.css"
    export default {
        name: "MobileLogReg",
        data(){
            return{
                active:"账户登录"
            }
        }
    }
</script>

<style scoped>
  .intro{
    width: 100px;
    font-size: 14px;
    font-weight: 500;
  }

  .header{
    width: 100%;
    height: 58px;
    border-bottom: 1px solid #e9e9e9;
    background-color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .container{
    background-color: rgb(244, 244, 244);
    height: 100%;
  }

</style>
