<template>
  <div class="container">
    <img  src="../../assets/blogger-adv.5bd38015.png">
    <span>该功能仅限<span style="color: #409EFF">高级版</span>以上会员用户使用，
      <br>建议您选择<router-link to="/">升级会员</router-link>，体验完整功能。</span>
  </div>
</template>

<script>
    export default {
        name: "HistoryAdvBlog",
        data(){
            return{
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        }
    }
</script>

<style scoped>
  .container{
    margin: 30px 5px;
    text-align: center;
  }

  .container span{
    font-size: 14px;
    color: rgb(144,144,144);
    line-height: 1.3;
  }

  a{
    text-decoration: none;

  }

  a:link{
    color: #2c3e50;
  }

  a:visited{
    color: #2c3e50;
  }

  a:hover{
    color: rgba(44, 62, 80, 0.7);
  }

  a:active{
    color: rgba(44, 62, 80, 0.7);
  }
</style>
