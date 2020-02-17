<template>
  <div style="width: 100%">
    <to-honey></to-honey>
      <div class="main" >
        <div style="display: flex;align-items: center;width: 100%">
          <img class="imgLogo" src="../assets/jsImg.png">
          <div>
            <h1 class="title" style="margin-bottom: 0;margin-top: 0;color: black;font-size: 34px">{{this.title}}</h1>
            <span style="font-size: 13px;color: darkgrey;line-height: 1">{{this.time}} /
              <span style="font-weight: 600;font-size: 15px"> share</span></span><br>
            <el-tag style="margin-top: 20px" type="primary" size="mini" plain>JavaScript</el-tag>
            <el-tag style="margin-top: 20px" type="warning" size="mini" plain>Blog</el-tag>
          </div>
        </div>
        <div class="htmlBlock" style="color: black" v-html="mdHtml" v-highlight></div>
<!--        <el-card>-->
<!--          <div style="display: flex;align-items: center;justify-content: space-around;font-size: 16px;line-height: 1.8">-->
<!--            <img src="../assets/indexLogo.png" class="imgLogo2">-->
<!--            <div style="width: 68%">-->
<!--              <p>-->
<!--                心若改变，你的态度跟着改变；态度改变，你的习惯跟着改变；习惯改变，你的性格跟着改变；性格改变，你的人生跟着改变。-->
<!--              </p>-->
<!--              <i style="float: right">——亚伯拉罕·马斯洛</i>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-card>-->
        <div class="end" >
          <div style="display: flex;align-items: center">
            <router-link class="rl" :to="{name:MyBlog}">Articles</router-link>
            <router-link class="rl pl25" :to="{name:MyBlog}">ToushiJing</router-link>
            <router-link class="rl pl25" :to="{name:MyBlog}">Contact  <i class="el-icon-paperclip"></i></router-link>
          </div>
          <div>
            <a class="rl" href= "https://github.com/YeZhikang'">
              <img src="../assets/github.svg" height="30px">
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
    import ToHoney from "../mobile/components/toHoney";
    import '../static/font.css'
    export default {
        name: "TheArticles",
        components: {ToHoney},
        data(){
            return{
                mdHtml:"",
                title:"",
                time:"",
            }
        },
        created() {
            let hash = this.$route.params.hash;
            console.log(hash);
            this.$axios.post('/getmd',{hash}).then(res => {
                this.mdHtml = this.$marked(res.data.text);
                this.title = res.data.file;
                this.time = res.data.time;
                console.log(res.data)
            }).catch(error => {
                console.log(error)
            })
        },

    }
</script>

<style scoped>
  >>>::selection
  {
    background-color: rgba(8, 96, 96, 0.44);
    color: white;
  }

  .main{
    text-align: left;
    width: calc( 60% + (1440px - 100%)/3)  ;
    margin: 0 auto;
    padding-top: 180px;
  }
  .imgLogo{
    width:150px;
    padding:35px 35px 35px 0;
  }

  >>>code:not(.hljs){
    display: inline;
    margin: 4px 0;
    background-color: rgba(184, 128, 3, 0.07);
    padding: 4px 3px;
    border-radius: 5px;
  }

  /*>>>code:not(pre code){*/
  /*  display: inline;*/
  /*  margin: 4px 0;*/
  /*  background-color: rgba(184, 128, 3, 0.07);*/
  /*}*/
  >>>.hljs{
    border-radius: 5px;

  }
  >>>li{
    padding: 4px 0;
  }

  >>>blockquote{
    background-color: rgba(178, 184, 155, 0.07);
    border-radius: 6px;
    width: calc(100%- 50px);
    margin: 14px 0;
    padding: 5px 25px;
  }
  >>>blockquote p{
    font-size: 14px;
    padding-left: 26px;
    border-left: 5px solid rgba(211,211,211,0.4);

  }
  >>>pre{
    font-family: Monaco;
  }


  >>>pre{
    margin: 0;
    position: relative;
    border-radius: 15px;
    color: white;
  }
  >>>pre:before{
    content: "\2022 \2022 \2022";
    position: absolute;
    top: 0px;
    left: 0;
    height: 0;
    background: #e1e1e1;
    color:#c2c3c4;
    width:100%;
    font-size:18px;
    margin:0;
    line-height:0;
    padding:14px 5px;
    text-indent:4px;
    letter-spacing:-6px;
    box-sizing:border-box;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  >>>pre code{
    box-shadow: 0 5px 14px #cbcbcb;
    padding: 45px 25px 15px 25px;
    display: inline-block;
    width: calc(100% - 50px);
  }




  code{
    display: inline;
  }
  li{
    display: inline;
  }

  .htmlBlock >>> img{
    text-align: center;
  }

  .htmlBlock{
    padding-bottom: 50px;
  }
  .imgLogo2{
    width: 18%;
    border-radius: 50%;
  }

  .end{
    margin: 160px 0 120px 0;padding:0 40px;display: flex;justify-content: space-between
  }

  @media screen and (max-width: 720px) {
    .main{
      width: 90%;
      padding-top: 90px;
    }
    .imgLogo{
      width: 120px;
      padding: 15px 15px 15px 0;
    }
    .htmlBlock >>> img{
      text-align: center;
      width: 100%;
    }
    .imgLogo2{

    }
    .end{
      padding:0 10px
    }
    .end .pl25{
      padding-left: 10px;
    }
  }
</style>
