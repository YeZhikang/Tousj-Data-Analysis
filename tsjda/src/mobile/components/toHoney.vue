<template>
  <div>
    <div class="to-a">
      <ul>
        <li><router-link :to="{name: 'blogIndex'}"><h2><i class="el-icon-ice-cream"></i> Ye zhikang</h2></router-link></li>
        <div class="button-group">
          <li><h3><router-link :to="{name: 'articles'}">About Me</router-link></h3></li>
          <li><h3><router-link :to="{name: 'articles'}">Articles</router-link></h3></li>
          <li><h3><router-link :to="{name: 'aboutMe'}">Contact <i class="el-icon-paperclip"></i></router-link></h3></li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
    // let toA = document.querySelector("div")
    // function haha() {
    //     if(document.documentElement.scrollTop <= 100){
    //         toA.style.height = '115px' ;
    //         toA.style.boxShadow = 'none';
    //     }else{
    //         toA.style.height = '58px' ;
    //         toA.style.boxShadow = '0 0 10px lightgray';
    //     }
    // }
    //
    // window.addEventListener('scroll',haha,false);

    export default {
        name: "toHoney",
        methods:{
            addNavListener(){
                let toA = document.querySelector(".to-a");
                function func1(){
                    if(document.documentElement.scrollTop <= 20){
                        toA.style.height = '165px' ;
                        toA.style.boxShadow = 'none';
                    }else{
                        toA.style.height = '58px' ;
                        toA.style.boxShadow = '0 0 10px lightgray';
                    }
                }
                function func2(){
                    if(window.innerWidth <= 720){
                        toA.style.height = '58px' ;
                        toA.style.boxShadow = '0 0 10px lightgray';
                        window.removeEventListener("scroll",func1,false)
                    }else{
                        toA.style.height = '58px' ;
                        toA.style.boxShadow = '0 0 10px lightgray';
                        window.addEventListener('scroll',func1,false);
                    }
                }
                window.addEventListener('scroll',func1,false);
                window.addEventListener('resize',func2,false);
                if(window.innerWidth < 720){
                    window.removeEventListener('scroll',func1,false)
                }
            },
            // haha2(){
            //     let toA = document.querySelector(".to-a")
            //     window.addEventListener('scroll',()=>{
            //         if(document.documentElement.scrollTop <= 50){
            //             toA.style.boxShadow = 'none';
            //         }else{
            //             toA.style.boxShadow = '0 0 10px lightgray';
            //         }
            //     },false);
            // }
        },
        mounted() {
            if(this.$store.state.isMobile === false){
                this.addNavListener()
            }
        }
    }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: black;
    transition: color 0.3s,border-top 0.15s;
  }

  a:hover{
    color: #517598;
    border-top: 5px solid darkcyan;
    border-top-left-radius: 6px ;
    border-top-right-radius: 6px  ;
  }

  .to-a{
    background-color: white;
    z-index: 999;
    width: 100%;
    height: 165px ;
    box-shadow: none;
    position: fixed;
    transition: 0.25s ease;
    top: 0;
  }

  /*.to-a:hover{*/
  /*    box-shadow: none;*/
  /*    height: 112px;*/
  /*}*/

  ul{
    display: flex;
    align-items: center;
    padding: 0;
    width: calc( 60% + (1440px - 100%)/3)  ;
    height: 100%;
    margin: 0 auto;
    justify-content: space-between;
    list-style: none;
    transition: 0.2s ease;
  }
  li{
    display: inline-block;
  }

  h3{
    font-weight: 400;
    font-size: 17px;
  }

  .button-group li{
    padding-left: 20px;
  }

  @media screen and (max-width:720px ) {
    .to-a{
      height: 58px;
      box-shadow: 0 0 5px lightgrey;

    }
    ul{
      width: 90%;
      justify-content: space-between;
    }
    h2{
      font-size: 18px;
    }
    .button-group li{
      padding-left: 10px;
    }

    h3{
      font-size:12px;
    }
  }
</style>
