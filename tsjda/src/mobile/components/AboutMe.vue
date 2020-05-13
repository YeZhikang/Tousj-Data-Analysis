<template>
    <div>
      <to-honey></to-honey>
      <div class="main-body">
        <h1>About me</h1>
        <p class="article">我是叶志康，来自浙江杭州，就读于杭州师范大学，目前大二。平时喜欢学习新技术、运动，了解身边发生的新鲜事。现在正在自学
          <code class="pjfont">JavaScript</code> 、 <code class="pjfont">Node.JS</code> 、
          <code class="pjfont">Python</code> 等一系列的前后端知识。</p>
        <p class="article">这个网站是我在2020年寒假抽空开发的。开始的目的很简单：记录自己的学习状况、技术问题及解决情况。在此之外，还对之前的项目经历进行总结，归纳。</p>
        <div class="me-intro-block">
          <h1>
            Personal Project Experience
          </h1>
          <p>一个正在不断书写和完善的清单</p>
          <ul>
            <li><a class="pjfont" href="https://github.com/YeZhikang/Vue-Express-CnBlogsFunc">仿写CnBlogs</a> - 对 CnBlogs 论坛的主要功能进行复写</li>
            <li><a class="pjfont" href="/#/illness">Illness 疫情平台</a> - 新型冠状病毒疫情即时响应</li>
            <li><a class="pjfont" href="/#/m/main/index">透视镜数据分析平台</a> - 基于 Pandas 及 Scrpay 的 Web 数据抓取、分析平台</li>
            <li><a class="pjfont">Auto-Swagger-UI</a> - 基于 React+React-Router+Redux/Koa(Node.Js) 的API文档，支持自动化导出接口函数文件</li>
          </ul>
        </div>
        <div class="me-intro-block">
          <h1>
            工作经历
          </h1>
          <ul>
            <li><a class="pjfont" >指令集科技 (2020/03 至今)</a> ：前端开发（实习）</li>
          </ul>
        </div>
        <div class="me-intro-block">
          <h1>
             技术栈
          </h1>
          <ul>
            <li><span class="pjfont">JavaScript</span> <span class="pjfont">CSS</span></li>
            <li><span class="pjfont">Vue</span></li>
            <li><span class="pjfont">React</span></li>
            <li><span class="pjfont">Node.JS</span>( <span class="pjfont">Koa</span> 、 <span class="pjfont">Express</span> )</li>
            <li><span class="pjfont">Python</span> ( <span class="pjfont">Flask</span> 、 <span class="pjfont">Django</span> 、 <span class="pjfont">Pandas</span> ) </li>
          </ul>
        </div>
        <end-footer></end-footer>
      </div>
    </div>
</template>

<script>
    import ToHoney from "./toHoney";
    import '../../static/font.css'
    import EndFooter from "../../components/EndFooter";
    export default {
        name: "AboutMe",
        components: {EndFooter, ToHoney},
        data(){
          return{

          }
        },
        created(){
            document.title = "关于我"
        },
    }
</script>

<style scoped>
  >>>::selection
  {
    background-color: rgba(8, 96, 96, 0.44);
    color: white;
  }
  .main-body{
    width: calc( 60% + (1440px - 100%)/3)  ;
    margin: 0 auto;
    padding: 180px 0 25px 0;
    text-align: left;
    color: black;
    transition: 0.3s;
  }
  li{
    padding-bottom: 8px;
  }

  .article{
    font-size: 17px;
    letter-spacing: 1px;
    color: #434343;
  }

  .me-intro-block{
    margin-top: 72px;
  }
  @media screen and (max-width: 800px) {
    .main-body{
      width: 90%;
      padding: 70px 0 25px 0;
    }
    h1{
      font-size: 24px;
    }
    p{
      font-size: 14px;
    }
    .article{
      font-size: 14px;
    }
    li{
      font-size: 14px;
    }
    .me-intro-block{
      margin-top: 40px;
    }
  }
</style>
