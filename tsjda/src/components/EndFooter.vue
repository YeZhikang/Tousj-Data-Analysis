<template>
    <div>
      <div class="end" >
        <div style="display: flex;align-items: center">
          <router-link class="rl" :to="{name:'blogIndex'}">Articles</router-link>
          <router-link class="rl pl25" :to="{name:'blogIndex'}">ToushiJing</router-link>
          <router-link class="rl pl25" :to="{name:'blogIndex'}">Contact  <i class="el-icon-paperclip"></i></router-link>
        </div>
        <div>
          <router-link class="rl" :to="{name:'blogIndex'}">
            <img src="../assets/github.svg" height="30px">
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
    import '../static/font.css'
    export default {
        name: "EndFooter"
    }
</script>

<style scoped>
  .main{
    text-align: left;
    width: 60%;
    margin: 0 auto;
    padding-top: 180px;
  }
  .imgLogo{
    width:150px;
    padding:35px 35px 35px 0;
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
    margin: 80px 0 20px 0;padding:0 40px;display: flex;justify-content: space-between
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
