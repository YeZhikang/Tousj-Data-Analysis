<template>
    <div>
      <div class="end" >
        <div style="display: flex;align-items: center">
          <router-link class="rl" :to="{name:'pages'}">Articles</router-link>
          <router-link class="rl pl25" :to="{name:'MobileIndex'}">ToushiJing</router-link>
          <router-link class="rl pl25" :to="{name:'contact'}">Contact  <i class="el-icon-paperclip"></i></router-link>
        </div>
        <div>
          <a class="rl" href="https://www.github.com/Yezhikang">
            <img src="../assets/github.svg" height="30px">
          </a>
        </div>
      </div>
    </div>
</template>

<script>
    import '../static/font.css'
    export default {
        name: "EndFooter",
        data(){
            return{

            }
        },
        methods:{
            footerChange(){
                // let main = document.getElementsByClassName("main-body")[0]
                // let app = document.getElementById("app")
                // let distance = app.clientHeight-main.clientHeight
                // if(main.clientHeight < 700 && main.clientWidth < 800){
                //     document.getElementById("footer").style.position = "absolute"
                //     document.getElementById("footer").style.bottom = "0"
                //     document.getElementById("footer").style.width = "86%"
                // }else{
                //     document.getElementById("footer").style.position = "relative"
                //     document.getElementById("footer").style.width = "100%"
                // }
            },
            changeFooter(){
                // window.addEventListener("resize",this.footerChange,false)
            }
        },
        mounted() {
            this.footerChange()
            this.changeFooter()
        }
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
    margin:120px 0 20px 0;padding:20px 40px 0 10px;display: flex;justify-content: space-between;
    line-height: 0;
    border-left: 7px solid darkcyan;
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
    a{
      font-size: 13px;
      padding-right: 5px;
    }
    .end{
      padding:0 10px;
      border-left: 5px solid darkcyan;

    }
    .end .pl25{
      padding-left: 10px;
    }
  }
</style>
