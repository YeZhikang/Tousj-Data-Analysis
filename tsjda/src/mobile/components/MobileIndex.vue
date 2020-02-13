<template>
    <div style="text-align: left">
      <div class="sectionBanner">
        <div class="sectionBanner__heading">
          <h1 class="sp">网红价值</h1>
          <p class="sp">将网红的平台数据进行挖掘，并以此进行
            可视化，对代表网红的特定商品广告进行分析</p>
          <img class="sectionBanner__img" src="../../assets/Mobile/mobileIndexPG.png" style="width: 100%">
        </div>
      </div>
      <div class="sectionBanner">
        <div class="sectionBanner__heading">
          <h1 class="sp">数据分析</h1>
          <p class="sp">将任何数据源文件投入，进行拖拽、点击式分析，并获得丰富的图标</p>
          <img class="sectionBanner__img" src="../../assets/Mobile/mobileIndexBG2.png" style="width: 100%">
        </div>
      </div>
      <div style="position: fixed;bottom: 30%;text-align: right;width: 90%">
        <el-button size="mini" type="success"  plain round>Try Now!</el-button>
      </div>
    </div>
</template>

<script>
    import "../../static/Mobile.css"
    export default {
        name: "MobileIndex",
        data(){
            return{
                userAvatarURL:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            }
        }
    }
</script>

<style scoped>

  ul{
    list-style: none;
    padding:0
  }
  li{
    display: inline-block;
    font-size: 14px;
    padding-right: 7px;
  }
  .sectionBanner__heading h1{
    font-size: 30px;
    margin-bottom: 0px;
    font-family: 'Open Sans','PingFang SC',sans-serif!important;
    font-weight: 500;
    color: black;
  }

  .sectionBanner{
    padding: 36px 7px 36px 7px;
    border-bottom: 1px dashed rgb(222,222,222);
  }

  .sectionBanner p{
    color: black;
  }
  .sectionBanner__img{
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
