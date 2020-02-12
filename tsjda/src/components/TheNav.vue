<template>
    <div class="headerBlock">
      <div class="navBlock" ref="navBlock" :style="{width:width}">
        <ul class="menu-item">
          <div class="main">
            <li class="menu-son"><h1>Toushi <span style="color: #009a61">Jing</span></h1></li>
            <li class="menu-son"><router-link to="/" ><a ref="index">首页</a></router-link></li>
            <li class="menu-son"><router-link to="/da" ><a ref="da">数据分析</a></router-link></li>
            <li class="menu-son"><router-link to="/celebrityAnalysis"><a ref="ca">网红价值</a></router-link></li>
            <li class="menu-son"><el-input placeholder="搜索" size="small" suffix-icon="el-icon-search" style="width: 200px" ref="search"></el-input></li>
          </div>
          <div class="logreg">
            <div v-if="!userName">
              <li class="menu-son" id="login" ref="login">
                <router-link
                  :to="{name:'login'}"
                  class="active"
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
                <li class="menu-son" id="userName" ref="userName"><router-link to="/" class="active">{{userName}} <i class="el-icon-arrow-down el-icon--right"></i></router-link></li>
                <el-dropdown-menu id="sub" slot="dropdown">
                  <el-dropdown-item>用户中心</el-dropdown-item>
                  <el-dropdown-item><a @click="pullDown()">注销</a></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data(){
            return{
                userName:localStorage.getItem("userName")
            }
        },
        props:{
          width:{
              type: String,
              default: '1100px'
          }
        },
        methods:{
            changeIndex(){
                let theme = this.$route.name;
                this.$refs[theme].style.color = '#009a61';
                this.$refs[theme].style.fontWeight = '600'
            },
            pullDown(){
                this.$store.dispatch("changeUserInfo",{});
                this.$router.push({name:"login"})
            }

        },
        mounted(){
            this.changeIndex();
        },
        watch:{

        }
    }
</script>

<style scoped>
.headerBlock{
  width: 100%;
  margin: 0;
  border-top:4px solid #009a61;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
}
  .menu-item{
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  .menu-son{
    display: inline-block;
  }

  h1{
    display: inline-block;
  }

  .navBlock{
    margin: 0 auto;
  }


  h1 {
    font-size: 26px;
    margin: 0;
  }

  li{
    line-height: 63px;
    margin-left: 8px;
  }

  a{
    text-decoration: none;
    padding: 7px 10px ;
    color: #757575;
    font-size:15px
  }

  .regis{
    color: white;
    background-color: #009a61;
    border-radius: 6px;
  }
  .active{
    color: #009a61;
  }

  a:link{

  }
  a:visited{

  }

  a:hover{
    background-color: rgb(244,244,244);
    border-radius: 6px;
  }
  a:active{
    background-color: rgb(244,244,244);
    border-radius: 6px;
  }

  .regis:active{
    color: #009a61;
  }

  .regis:hover{
    color: #009a61;
  }
</style>
