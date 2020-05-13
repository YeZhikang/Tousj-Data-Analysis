<template>
  <div style="min-width: 1400px">
    <new-the-nav></new-the-nav>

    <div class="welcomeUnit">

    </div>
    <div class="mainBlock">

        <h2>在线网红价值评估跟踪系统</h2>

      <p>无论你是电商厂家、淘宝店铺卖家，还是一个网红探索者，在 <span style="font-weight: 300">透视镜™️ </span>里，你总能发现一些有趣的东西。我们将网红的平台数据进行挖掘，并以此进行
      可视化，对代表网红的特定商品广告进行分析，你可以在这里发掘相关网红的潜在价值、与相关领域的价值匹配度、自定义标签，这是个值得你思考并玩转的数据分析平台！</p>
        <div class="index-img">

        </div>
    </div>
    <div class="handler">
      <div class="mainBlock2">
        <h2>数据分析在线平台</h2>
        <p>将数据文件<small>(.csv / .txt / .xlsx)</small>拖入<span style="font-weight: 300">透视镜™️ </span>数据分析系统里，我们将对数据进行系统分析，
          通过步骤诠释、面向步骤的简单操作，完成一份精彩的数据分析报表，并为你导出为 .ipynb 文件</p>
        <div class="index-img2">
        </div>
    </div>
      <transition name="el-zoom-in-bottom">
        <div v-if="bottomShow" class="transition-box">
          <div style="padding: 8px 0 8px 0">
            <p style="font-size:14px;margin-bottom: 6px;margin-top:0;color: white">开启旅程</p>
            <el-button size="mini" @click="$router.push({name:'博主搜索'})" style="background-color: #00c9d1;font-size: 16px;border: none;color: white;font-weight: 500;line-height: 1;">Start!</el-button>
          </div>
        </div>
      </transition>
    </div>
<!--    <div class="mainBlock">-->
<!--      <div class="part" style="border-right: #009a61 dashed 2px;">-->
<!--        <h2 style="margin-bottom: 0;font-weight: 400;color: #009a61">网红价值评估平台</h2>-->
<!--        <div>-->
<!--          <h1 style="font-size: 88px;margin: 10px;color: #009a61;"><i class="el-icon-edit-outline"></i></h1>-->
<!--        </div>-->
<!--        <div style="margin: 30px;font-size: 14px">-->
<!--          <p>我们通过对网红博文的定点爬取、对相关网红的博文下的粉丝行为、相关粉丝群的分析，来判断一个网红的内在价值。通过处理，得出分析数据报表</p>-->
<!--        </div>-->
<!--        <el-button-->
<!--          type="text"-->
<!--          style="border: 1px solid white;padding: 12px 20px;color: white;background-color: #009a61"-->
<!--          @click="$router.push('/celebrityAnalysis')"-->
<!--        >立即体验</el-button>-->
<!--      </div>-->
<!--      <div class="part" >-->
<!--        <h2 style="margin-bottom: 0;font-weight: 400;color: #009a61">数据分析 DIY</h2>-->
<!--        <div>-->
<!--          <h1 style="font-size: 88px;margin: 10px;color: #009a61;"><i class="el-icon-set-up"></i></h1>-->
<!--        </div>-->
<!--        <div style="margin: 30px;font-size: 14px">-->
<!--          <p>通过对数据的白话文形式的描述，对相关提供数据进行分析、图表制作；并且对其自动导出为 .ipynb 文件。</p>-->
<!--        </div>-->
<!--        <el-button type="text" style="border: 1px solid white;padding: 12px 20px;color: white;background-color: #009a61" @click="$router.push('/da')">立即体验</el-button>-->
<!--      </div>-->
<!--    </div>-->
    <Footer></Footer>
  </div>
</template>

<script>
//     function windowAddMouseWheel() {
//         var scrollFunc = function (e) {
//             e = e || window.event;
//             if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
//                 if (e.wheelDelta > 100) { //当滑轮向上滚动时
//                     alert("滑轮向上滚动");
//                 }
//                 if (e.wheelDelta < -100) { //当滑轮向下滚动时
//                     alert("滑轮向下滚动");
//                 }
//             } else if (e.detail) {  //Firefox滑轮事件
//                 if (e.detail> 100) { //当滑轮向上滚动时
//                     alert("滑轮向上滚动");
//                 }
//                 if (e.detail< -100) { //当滑轮向下滚动时
//                     alert("滑轮向下滚动");
//                 }
//             }
//         };
//         //给页面绑定滑轮滚动事件
//         if (document.addEventListener) {
//             document.addEventListener('DOMMouseScroll', scrollFunc, false);
//         }
// //滚动滑轮触发scrollFunc方法
//         window.onmousewheel = document.onmousewheel = scrollFunc;
//     }

    import Nav from "../components/TheNav";
    import Footer from "../components/TheFooter";
    import NewTheNav from "../components/NewTheNav";
    export default {
        name: "Index",
        components: {NewTheNav, Footer, Nav},
        data(){
            return{
                show:true,
                bottomShow:false
            }
        },
        created(){
            document.title = "透视镜"
        },
        mounted(){
            if(this.$store.state.isMobile){
                this.$router.push({name:"MobileIndex"})
            }
            this.windowAddMouseWheel();
        },
        methods:{
            windowAddMouseWheel(){
                var scrollFunc = (e) => {
                    e = e || window.event;
                    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                        if (e.wheelDelta > 100) { //当滑轮向上滚动时
                            this.bottomShow = true
                        }
                        if (e.wheelDelta < -100) { //当滑轮向下滚动时
                            this.bottomShow = false
                        }
                    } else if (e.detail) {  //Firefox滑轮事件
                        if (e.detail> 100) { //当滑轮向上滚动时
                            this.bottomShow = true
                        }
                        if (e.detail< -100) { //当滑轮向下滚动时
                            this.bottomShow = false
                        }
                    }
                };
                //给页面绑定滑轮滚动事件
                if (document.addEventListener) {
                    document.addEventListener('DOMMouseScroll', scrollFunc, false);
                }
                          //滚动滑轮触发scrollFunc方法
                window.onmousewheel = document.onmousewheel = scrollFunc;
            }
        }
    }
</script>

<style scoped>
  .welcomeBlock{
    width: 1100px;
    margin: 0 auto;
    text-align: left;
    color: white;
    display: flex;
    justify-content: space-between;
  }

  .mainBlock h2{
    font-weight: 400;
    font-size: 32px;
  }

  .mainBlock2 h2{
    font-weight: 400;
    font-size: 32px;
  }

  .mainBlock{
    padding: 40px;
    width: 1000px;
    margin: 0 auto;
    text-align: left;
  }

  .handler{
    width: 100%;
    background-color: #f4f4f4;
  }

  .mainBlock2{
    padding: 40px 0 100px 0;
    width: 1000px;
    margin: 0 auto;
    text-align: right;
  }
  .mainBlock2 p{
    font-size: 20px;
    font-weight: 400;
  }

  .mainBlock p{
    font-size: 20px;
    font-weight: 400;
  }

  .mainBlock2 p{
    font-size: 20px;
    font-weight: 400;
    text-align: left;
  }
  #intro{
    padding: 20px 0;
  }

  .welcomeBlock h1{
    font-size: 32px;
    font-weight: 500;
    margin: 0px 0 5px 0;
  }

  .welcomeUnit{
    background-color: #009a61;
  }

  .welcomeBlock p {
    font-size:17px;
    margin: 5px 0;
  }

  #method{
    padding: 0;
  }

  .part{
    width: 50%;
    height: 450px;
    margin-top: 40px;
    margin-bottom: 50px;
  }

  .index-img{
    background-image: url("../assets/index_img3.png");
    background-size: cover;
    width: 100%;
    height: 550px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    z-index: 999;
    opacity: 1;

  }
  .index-img2{
    background-image: url("../assets/index_img4.png");
    background-size: cover;
    width: 100%;
    height: 550px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    z-index: 999;
  }

  .transition-box{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #2c3e50;
    border-radius: 80px 80px 0 0;
  }

  .mainBlock{}
</style>
