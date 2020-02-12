<template>
    <div class="footer">
      <div class="footerBlock">
        <div class="icon-block">
          <h3><i class="el-icon-phone-outline"></i></h3>
          <h3><i class="el-icon-share"></i></h3>
          <h3><i class="el-icon-postcard"></i></h3>
          <h3><i class="el-icon-discover"></i></h3>
        </div>
        <div>
          <div style="display: flex;align-items: center;justify-content:flex-end	">
            <h3 style="margin: 0">透视镜 TouShiJing</h3><img style="width: 100px;margin-left: 20px" src="../assets/faviconn3.png">
          </div>
          <p>Copyright © 2019 - 2020 杭州师范大学 · 阿里巴巴商学院 · 透视镜</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
  .footer{
    width: 100%;
    color: white;
    padding: 50px 0;
    background-color: rgb(41, 48, 57);
    font-weight: 400;
    text-align: right;
  }

  .footerBlock{
    display: flex;
    justify-content: space-between;

    width: 1000px;
    margin: 0 auto;
  }

  h3{
    font-size: 20px;
  }
  p{
    font-size: 14px;
  }

  >>>i{
  }

  .icon-block h3{
    display: inline-block;
    margin-right: 15px;
  }
</style>
