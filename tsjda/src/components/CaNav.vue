<template>
  <div style="width: 100%">
    <transition name="el-zoom-in-top">
      <div class="headerBlock" v-if="!isDown">
        <div class="navBlock" ref="navBlock" :style="{width:width}">

            <div >
              <ul>
                <div class="main">
                  <div class="logoPart" @click="collapseIt"></div>
                  <li><router-link to="/" ><a ref="index">首页</a></router-link></li>
                  <li><router-link to="/da" ><a ref="da">数据分析</a></router-link></li>
                  <li><router-link to="/celebrityAnalysis"><a ref="ca" style="color: #409EFF;font-weight: 600">网红价值</a></router-link></li>
                  <li><el-input placeholder="搜索" size="small" suffix-icon="el-icon-search" style="width: 200px" ref="search"></el-input></li>
                </div>
                <div class="logreg">

                  <div v-if="!userName">
                    <li id="login" ref="login"><router-link :to="{name:'login'}" class="active">立即登陆</router-link></li>
                    <li id="register" ref="register"><router-link :to="{name:'register'}" class="regis">免费注册</router-link></li>
                  </div>
                  <div v-if="userName">
                    <li id="userName" ref="userName"><router-link to="/" class="active"> <el-tag type="primary" size="mini" style="margin-right: 10px">用户</el-tag> {{userName}}</router-link></li>
                  </div>
                </div>
              </ul>
            </div>
        </div>
      </div>
    </transition>
    <transition name="el-zoom-in-bottom" >
      <div class="headerBlock" v-if="isDown">
        <div class="navBlock" ref="navBlock" :style="{width:width}">
            <div class="isScroll">
              <ul>
                <div class="main">
                  <div class="logoPart" @click="collapseIt"></div>

                </div>
                <div style="display: flex;align-items: center">
                  <el-avatar :src="userAvatar"></el-avatar>
                  <li><el-tag type="primary">{{userInfo.userName}}</el-tag></li>
                  <li><el-tag type="primary">粉丝数：{{userInfo.fansNum}}</el-tag></li>
                </div>
              </ul>
            </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
    export default {
        name: "CaNav",
        data(){
            return{
                isCollapsed:false,
                userName: localStorage.getItem("userName"),
                isDown: false,
                userInfo:null,
                scrollTopNum: 0,
                userAvatar: "https://tvax3.sinaimg.cn/crop.0.8.1125.1125.180/6ade4348ly8fpcrds6cy3j20v90vq75s.jpg?KID=imgbed,tva&Expires=1580924289&ssig=VNE48sOCaF",
            }
        },
        props:{
            width:{
                type: String,
                default: '1100px'
            }
        },
        methods:{
            getCelebrityBloogerName(){
                let userId = this.$route.query.userId;
                this.$axios.post('/searchBloggerById',{bloggerId:userId}).then(res => {
                    console.log(res)
                    if(res.data.bloggerInfo){
                        this.userInfo = res.data.bloggerInfo
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            changeIndex(){
                let theme = this.$route.name;
                this.$refs[theme].style.color = '#409EFF';
                this.$refs[theme].style.fontWeight = '600'
            },
            collapseIt(){
                this.isCollapsed = !this.isCollapsed;
                this.$emit("is-collapsed",this.isCollapsed)
            },
            windowAddScroll(){
                let bodyM = document.querySelector("body")
                if(this.$route.query.userId) {
                    window.onscroll = () => {
                        if ((document.documentElement.scrollTop - this.scrollTopNum) > 20) {
                            this.scrollTopNum = document.documentElement.scrollTop
                            this.isDown = true
                        } else if ((document.documentElement.scrollTop - this.scrollTopNum) < -20) {
                            this.scrollTopNum = document.documentElement.scrollTop;
                            this.isDown = false
                        }
                    }
                }else{
                    window.onscroll = null
                }
            },
            // windowAddMouseWheel(){
            //     var scrollFunc = (e) => {
            //         e = e || window.event;
            //         if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            //             if (e.wheelDelta > 60) { //当滑轮向上滚动时
            //                 this.isDown = false
            //                 console.log("yes")
            //             }
            //             if (e.wheelDelta < -60) { //当滑轮向下滚动时
            //                 this.isDown = true
            //             }
            //         } else if (e.detail) {  //Firefox滑轮事件
            //             if (e.detail > 60) { //当滑轮向上滚动时
            //                 this.isDown = false
            //             }
            //             if (e.detail < -60) { //当滑轮向下滚动时
            //                 this.isDown = true
            //             }
            //         }
            //     };
            //     if(document.addEventListener) {
            //         if (this.$route.query.userId) {
            //             document.addEventListener('DOMMouseScroll', scrollFunc, false);
            //             window.onmousewheel = document.onmousewheel = scrollFunc;
            //         } else {
            //             console.log("ok")
            //             window.onmousewheel = document.onmousewheel = ()=>{};
            //             document.removeEventListener('DOMMouseScroll', scrollFunc, true)
            //         }
            //     }
            //
            //     // //给页面绑定滑轮滚动事件
            //     // if (document.addEventListener) {
            //     //     document.addEventListener('DOMMouseScroll', scrollFunc, false);
            //     // }
            //
            //     //滚动滑轮触发scrollFunc方法
            // }
        },
        mounted(){
            this.getCelebrityBloogerName();
            this.windowAddScroll();

        },
        watch:{
            $route:{
                handler:function (val) {
                    this.getCelebrityBloogerName();
                    this.windowAddScroll();
                }
            }
        }
    }
</script>

<style scoped>
  .headerBlock{
    width: 100%;
    margin: 0;
    z-index: 1;

    border-top:4px solid #409EFF;
    border-bottom: 1px solid lightgray;
    position: fixed;
    background-color: white;
  }
  ul{
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  li{
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
    background-color: #409EFF;
    border-radius: 6px;
  }
  .active{
    color: #409EFF;
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

  .logreg{
    display: flex;
    align-items: center;
  }

  .logoPart{
    background-size: cover;
    background-image: url("../assets/faviconn.png");
    width: 100px;
    height: 40px;
    margin: 0 20px;
  }

  .main{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .specialUser{

    font:400 1em/1.8 Avenir,Tahoma,Arial,PingFang SC,Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,Helvetica,sans-serif;

  }
</style>
