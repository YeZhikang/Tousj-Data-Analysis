<template>
    <div>
      <to-honey></to-honey>
      <div class="main-body">
        <h1>Contact</h1>
        <p>Hi,我是叶志康，一个前端开发者，爱好编程。对对 <code class="pjfont">JavaScript</code> , <code class="pjfont">Python</code> , <code class="pjfont">Node.js</code> 很感兴趣。</p>
        <p>Stay Hungry,Stay Foolish.由于学习计算机知识的时间较短，目前的知识储备尚且粗浅；博客中若有疏漏，敬请谅解。除此之外我一直在努力学习，在自学、分享经验中乐此不疲。如果你想了解我更多，或是有需要进行沟通，我很乐意与你获得联系！
          👇 以下是我的微信号</p>
        <div class="imgLogo" style="text-align: center;">
          <img src="../../assets/blogs/contactMe.png" style="width: 166px;padding: 10px;box-shadow: 0 0 10px lightgrey;">
        </div>
        <h2>Around the web</h2>
        <ul>
          <li><span class="inside">WeChat: <span class="pjfont"> ImYezhikang</span></span></li>
          <li><span class="inside">QQ: <span class="pjfont"> 794101456</span></span></li>
          <li><span class="inside">Email: <span class="pjfont"> 794101456@qq.com</span></span></li>
          <li><span class="inside">新浪微博: <a class="pjfont" href="https://weibo.com/u/6859127991"> 叶志康康</a></span></li>
          <li><span class="inside">GitHub: <a class="pjfont" href="https://www.github.com/Yezhikang"> Yezhikang</a></span></li>
        </ul>
        <end-footer></end-footer>
      </div>
    </div>
</template>

<script>
    import ToHoney from "./toHoney";
    import '../../static/font.css'
    import EndFooter from "../../components/EndFooter";
    export default {
        name: "ContactMe",
        components: {EndFooter, ToHoney},
        data(){
            return{

            }
        },
        methods:{

        },
        created() {
            document.title = "联系我"
        }
    }
</script>

<style scoped>
  .main-body{
    width: calc( 60% + (1440px - 100%)/3)  ;
    margin: 0 auto;
    padding: 180px 0 25px 0;
    text-align: left;
    color: black;
    transition: 0.3s;
  }
  .imgLogo{
    margin-top: 60px;
  }

  .main-body h1{
    font-size: 30px;
    font-weight: 600;
  }
  .main-body p{
    font-size: 17px;
  }
  .main-body h2{
    margin-top: 70px;
  }

  li{
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 10px;
    color: darkgrey;
  }

  .inside{
    color: black;
    font-weight: 600;
    font-family: BlinkMacSystemFont,-apple-system,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;
  }

  @media screen and (max-width: 800px) {
    .main-body {
      width: 90%;
      padding: 70px 0 25px 0;
    }
    .main-body p{
      font-size: 14px;
    }
    .main-body h2{
      margin-top: 60px;
    }
    .imgLogo{
      margin-top: 34px
    }
  }
</style>
