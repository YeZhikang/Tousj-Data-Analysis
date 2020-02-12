<template>
  <div style="height: 100%">
    <img src="../assets/faviconn3.png" style="position: absolute;left: 30px;top: 20px;height: 50px">
    <div style="height: 100%;display: flex;align-items: center;justify-content: center" >
      <el-card style="padding: 5px 15px">
        <div>
          <h2>Ooops!你还没有登陆</h2>
          <p>此页面将跳转至登陆界面，{{time}}秒后跳转 <i class="el-icon-loading"></i></p>
          <router-link :to="{name:'login'}">点击此处跳转</router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NotLogin",
        data(){
            return{
                time:5
            }
        },
        methods:{
            timeToRedirect(){
                let timeRemaing = this.time
                let timeInterval = setInterval(()=>{
                    timeRemaing--
                    this.time = timeRemaing
                    if(this.time === -1){
                        clearInterval(timeInterval)
                        this.$router.push({name:"login"})
                    }
                },1000)
            }
        },
        mounted() {
            this.timeToRedirect()
        }
    }
</script>

<style scoped>

  h2{

  }
</style>
