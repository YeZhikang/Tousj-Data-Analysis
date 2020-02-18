<template>
    <div>
      <to-honey></to-honey>
      <div class="main-body">
        <div>
          <h1>Articles</h1>
          <div
            v-for="(cate,index) in cateLst"
            :key="index"
            :class="{buttonActive:isActive[index],'cate-button':true}"
            @click="activeButton(index)"
          >
            {{cate}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import '../../static/font.css'
    import ToHoney from "./toHoney"


    export default {
        name: "ThePages",
        components: {ToHoney},
        data(){
            return{
                isActive: [false,false,false,false,false],
                cateLst: ["代码","工具","设计","生活笔记","解决方案"]
            }
        },
        computed:{

        },
        methods:{
            activeButton(index){
                let isActive = [...this.isActive]
                isActive[index] = !isActive[index];
                this.isActive = isActive
                console.log(this.isActive)
            }
        },
        updated() {

        },
        watch:{

        }
    }
</script>

<style scoped>
  .cate-button{
    transition: 0.1s;
    font-size: 14px;
    padding: 6px 11px;
    border-radius: 4px;
    display: inline-block;
    margin-right: 12px;
    background-color:#ebf1fe ;
    font-weight: 600;
    color: #5183f5;
  }
  .cate-button:hover{
    background-color: #d1e5fb;
    cursor:pointer;
  }

  .buttonActive{
    background-color: #d1e5fb;
  }

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
