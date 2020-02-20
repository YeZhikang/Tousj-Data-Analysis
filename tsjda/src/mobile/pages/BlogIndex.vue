<template>
  <div class="main">
    <to-honey></to-honey>
    <div class="main-body">
      <div class="welcome-block">
        <div class="intro" style="text-align: left;color: black">
          <h1>Hey,我是叶志康</h1>
          <p>我是一个前端开发者，爱好编程。对 <code class="pjfont">JavaScript</code> , <code class="pjfont">Python</code> , <code class="pjfont">Node.js</code> 很感兴趣。</p>
          <div style="margin-top: 24px">
            <el-button @click="urlRedirect({name:'MobileIndex'})" type="primary" size="mini">Vision DataAnalysis <i class="el-icon-search"></i></el-button>
              <el-button type="warning" size="mini" @click="urlRedirect({name:'me'})">About Me</el-button>
          </div>
        </div>
        <div class="welcome-card">
          <el-card >
            <img style="width: 80px;border-radius: 50%" src="../../assets/indexLogo.png">
            <h3>Ye Zhikang</h3>
            <p>我在这里撰写博客和分享笔记，不求能帮助别人，但希望能记录自己每天的日常，让自己踏踏实实地进步。</p>
            <el-button style="margin-top: 20px" size="mini" type="primary" plain>Follow</el-button>
          </el-card>
        </div>
      </div>
      <div class="recent-blog">
        <div class="fa">
          <h2>Recent Articles</h2>
          <el-button @click="urlRedirect({name:'pages'})" style="margin-left: 25px" type="info" size="mini">View all</el-button>
        </div>
        <div class="article-list">
          <div v-for="(article,index) in articleLst" :key="index" class="fa" style="margin-top: 25px">
<!--            <img :src="article.img" alt="">-->
            <img :src="pngCate[article.category]" style="width: 33px">
            <h4 style="width: 89%;padding-left: 15px;"><router-link class="rl" :to="{name:'articles',params:{hash:article.urlHash}}">{{article.file}}</router-link></h4>
            <el-tag class="isNew" type="warning">New</el-tag>
          </div>
        </div>
      </div>
      <end-footer id="footer"></end-footer>
    </div>
  </div>
</template>

<script>
    import ToHoney from "../components/toHoney";
    import EndFooter from "../../components/EndFooter";
    import '../../static/font.css'
    import JavaScript from '../../assets/blogs/javascript.png'
    import React from '../../assets/blogs/react.png'
    import Vue from '../../assets/blogs/vue.png'
    import CSS from '../../assets/blogs/css.png'
    import Golang from '../../assets/blogs/Golang.png'
    import DailyLife from '../../assets/blogs/Daily Life.png'
    import Design from '../../assets/blogs/Design.png'
    import NodeJS from '../../assets/blogs/Node.JS.png'
    import Python from '../../assets/blogs/Python.png'
    import SolveWay from '../../assets/blogs/SolveWay.png'
    import Tool from '../../assets/blogs/Tool.png'

    export default {
        name: "BlogIndex",
        components: {EndFooter, ToHoney},
        data(){
            return{
                articleLst:[

                ],
                pngCate:{
                    JavaScript,
                    Vue,
                    React,
                    CSS,
                    Golang,
                    Design,
                    NodeJS,
                    Python,
                    SolveWay,
                    Tool,
                    DailyLife
                }
            }
        },
        methods:{
            getAllArticleInfo(){
                this.$axios.post('/getArticles',{activeLabels:[],text:""}).then(res => {
                    this.articleLst = res.data.articles.reverse()
                }).catch(error => {
                    console.log(error)
                })
            },
            urlRedirect(obj){
                this.$router.push(obj)
            },

        },
        created(){
            document.title = "叶志康的博客"
        },
        mounted() {
            this.getAllArticleInfo();
        }
    }
</script>

<style scoped>
  .article-list{
    margin-top: 40px;
  }
  .main-body{
    width: calc( 60% + (1440px - 100%)/3)  ;
    margin: auto;
    transition: 0.3s;
    padding-bottom: 25px;
  }
  .welcome-block{
    padding-top: 240px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .welcome-block h1,h2,h3,h4,h5,p{
    margin: 0;
    padding: 0;
  }
  .welcome-block h1{
    font-size: 48px;
  }

  .welcome-block p{
    font-size: 18px;
    margin-top: 6px;
  }

  .welcome-card p{
    font-size:14px;
    line-height: 1.8;
  }

  .welcome-card{
    width: 35%;
  }

  .intro{
    width: 60%;
  }

  .recent-blog{
    margin-top: 120px;
    text-align: left;
    font-size: 20px;
  }

  .isNew{

  }

  .article-list h4{
    font-size: 18px;
    font-weight: 500;
  }

  @media screen and (max-width: 600px){
    .recent-blog h2{
      font-size: 24px;
    }
    .recent-blog h4{
      font-size: 16px;
    }
    .recent-blog{
      margin-top: 45px;
    }
    .main-body{
      width: 90%;

    }

    .welcome-block{
      padding-top: 100px;
    }

    .welcome-card{
      display: none;
    }

    .intro{
      width: 500px;
    }




    .intro h1{
      font-size: 40px;
      font-weight: 500;
    }

    .intro p{
      font-size: 16px;
      line-height: 1.8;
    }

    .main{
      width: 100%;
    }

  }


</style>
