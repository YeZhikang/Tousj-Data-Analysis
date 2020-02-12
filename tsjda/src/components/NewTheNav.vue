<template>
    <div style="min-width: 1400px">
      <section class="nav-main">
        <div class="main_bg">
          <ul class="menu-item">
            <div style="display: flex;align-items: center;">
              <div class="main">
                <li class="menu-son logo"><a href="/"></a></li>
              </div>
              <div>
                <li class="menu-son"><router-link to="/" ><a ref="index" style="font-weight: 800" class="active">首页</a></router-link></li>
                <li class="menu-son"><router-link to="/da" ><a ref="da">数据分析</a></router-link></li>
                <li class="menu-son" style="padding-right: 100px"><router-link to="/celebrityAnalysis"><a ref="ca">网红价值</a></router-link></li>
              </div>
            </div>
            <div class="logreg">
              <div v-if="!userName">
                <li class="menu-son" id="login" ref="login">
                  <router-link
                    :to="{name:'login'}"
                    class="active2"
                  >
                    立即登陆
                  </router-link>
                </li >
                <li class="menu-son" id="register" ref="register">
                  <router-link
                    :to="{name:'register'}"
                    class="regis"
                  >
                    免费注册
                  </router-link>
                </li>
              </div>
              <div v-if="userName">
                <el-dropdown>
                  <li class="menu-son" id="userName" ref="userName"><router-link to="/" class="active2">{{userName}} <i class="el-icon-arrow-down el-icon--right"></i></router-link></li>
                  <el-dropdown-menu id="sub" slot="dropdown">
                    <el-dropdown-item>用户中心</el-dropdown-item>
                    <el-dropdown-item><a @click="pullDown()">注销</a></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </ul>
          <div class="bannerHeaderText">
            <h1>数据价值评估体系</h1>
            <el-button @click="$router.push({name:'博主搜索'})" style="background-color: #00c9d1;font-size: 16px;border: none;color: white;font-weight: 500;line-height: 1.4;margin-top: 15px" >立即体验</el-button>
          </div>
        </div>

      </section>
    </div>
</template>

<script>
    export default {
        name: "NewTheNav",
        data(){
            return{
                userName: localStorage.getItem("userName")
            }
        },
        props:{

        },
        methods:{
            pullDown(){
                // this.$store.dispatch("changeUserInfo",{});
                localStorage.setItem("userName","");
                this.userName = ""
                // this.$router.push({name:"login"})
            }
        },
        mounted(){
        },
        watch:{

        }
    }
</script>

<style scoped>
  .main_bg{
    width: 100%;
    background-image: url("../assets/main_bg3.png");
    background-position: 55% 50%;
    background-size: cover;
    background-color: black;
    height: 350px;
  }
  .nav-main{
    height: 350px;
    width: 100%;

  }

  .menu-son h1{
    font-family: "Savoye LET";
    margin: 0;
  }
  .menu-item{
    list-style: none;
    padding: 15px 0 15px 100px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .menu-son:not(.logo){
    display: inline-block;
    line-height: 64px;
    margin-left: 40px;
  }

  .logreg{
    display: inline-block;
  }

  .logo{
    background-size: cover;
    background-image: url("../assets/faviconn.png");
    width: 100px;
    height: 40px;
  }

  .menu-son a{
    font-size: 16px;
    color: white;
    text-decoration: none;
  }

  a:hover:not(.regis){
    padding-top: 20px;
    border-top: 2px dashed white;
    font-weight: 700;
  }

  .active{
    padding-top: 20px;
    border-top: 2px dashed white;
    font-weight: 700;
  }


  a:link{
    color: white;
  }

  .logreg{
    margin-right: 100px;
  }

  .logreg li{
    margin-left: 30px;
    font-weight: 600;
  }

  li#register{
    border: 2px solid white;
    border-radius: 4px;
    padding:0 20px;
    margin-left: 20px;
  }

  .bannerHeaderText{
    font-size: 32px;
    font-weight: 700;
    color: white;
  }

  .bannerHeaderText h1{
    margin-bottom: 10px;
  }

  .main{
    padding: 5px 7px;
    background-color: white;
    border-radius: 4px 4px 0 0;
    box-shadow: 1px 1px 1px darkgrey;
  }
</style>
