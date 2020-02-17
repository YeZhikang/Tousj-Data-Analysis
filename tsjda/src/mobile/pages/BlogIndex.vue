<template>
  <div class="main">
    <to-honey></to-honey>
    <div class="index-main">
      <div class="welcome-block">
        <div class="intro" style="text-align: left;color: black">
          <h1>Hey,我是叶志康</h1>
          <p>我是一个前端开发者，爱好编程。对 JavaScript,Python,Node.js 很感兴趣。希望能寻找更多志同道合的人！</p>
          <div style="margin-top: 24px">
            <el-button type="primary" size="mini">Vision DataAnalysis <i class="el-icon-search"></i></el-button>
              <el-button type="warning" size="mini">About Me</el-button>
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
          <el-button style="margin-left: 25px" type="info" size="mini">View all</el-button>
        </div>
        <div class="article-list">
          <div v-for="(article,index) in articleLst" :key="index" class="fa" style="margin-top: 25px">
<!--            <img :src="article.img" alt="">-->
            <img src="../../assets/jsImg.png" style="width: 33px">
            <h4 style="width: 89%;padding-left: 15px;"><router-link class="rl" :to="{name:'articles',params:{hash:article.urlHash}}">{{article.file}}</router-link></h4>
            <el-tag class="isNew" type="warning">New</el-tag>
          </div>
        </div>
      </div>
      <end-footer></end-footer>
    </div>
  </div>
</template>

<script>
    import ToHoney from "../components/toHoney";
    import EndFooter from "../../components/EndFooter";
    import '../../static/font.css'
    export default {
        name: "BlogIndex",
        components: {EndFooter, ToHoney},
        data(){
            return{
                articleLst:[

                ]
            }
        },
        methods:{
            getAllArticleInfo(){
                this.$axios.get('/getAllMd').then(res => {
                    this.articleLst = res.data.mdLst
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.getAllArticleInfo()
        }
    }
</script>

<style scoped>
  .article-list{
    margin-top: 40px;
  }
  .index-main{
    width: 60%;
    margin: auto;
    transition: 0.3s;
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
    .index-main{
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
