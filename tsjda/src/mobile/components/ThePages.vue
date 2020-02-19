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
        <div class="input-search">
          <input class="search-input" type="text" placeholder="点击此处来进行搜索" v-model="text">
          <h3>{{resultNum}}</h3>
        </div>
        <div class="searchedRes">
          <div @click="turnToArticles(articleRes.urlHash)" v-for="(articleRes,index) in articles" :key="index" class="searchedUnit">
            <img class="cover" :src="pngCate[articleRes.category]">
            <div class="title-continue-isnew">
              <div class="title-continue">
                <h2>{{articleRes.file}}</h2>
                <p>{{articleRes.time | changeToMDY}}</p>
              </div>
              <div class="isnew"><el-tag type="warning" v-if="isNew(articleRes.time)">New</el-tag></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import '../../static/font.css'
    import ToHoney from "./toHoney"
    import JavaScript from '../../assets/blogs/javascript.png'
    import React from '../../assets/blogs/react.png'
    import Vue from '../../assets/blogs/vue.png'
    import CSS from '../../assets/blogs/css.png'

    export default {
        name: "ThePages",
        components: {ToHoney},
        data(){
            return{
                isActive: [false,false,false,false,false],
                cateLst: ["代码","工具","设计","生活笔记","解决方案"],
                text:"",
                articles:[

                ],
                pngCate:{
                    JavaScript,
                    Vue,
                    React,
                    CSS
                }
            }
        },
        computed:{
            resultNum(){
                return this.articles.length
            }
        },
        methods:{
            getActiveLabels(){
                let activeLabels = []
                for(let index = 0;index<this.isActive.length;index++){
                    if(this.isActive[index] === true){
                        activeLabels.push(this.cateLst[index])
                    }
                }
                return activeLabels
            },
            activeButton(index){
                let isActive = [...this.isActive];
                isActive[index] = !isActive[index];
                this.isActive = isActive;

                if(this.getActiveLabels().length > 0) {
                    this.getArticles(this.getActiveLabels(), this.text)
                }else{
                    this.getArticles(this.getActiveLabels(),this.text)
                }
            },
            getArticles(activeLabels,text){
                this.articles = [];
                this.$axios.post('/getArticles',{activeLabels: activeLabels,text:text}).then(res => {
                    console.log(res.data.articles)
                    this.articles = this.articles.concat(res.data.articles);
                }).catch(error => {
                    console.log(error)
                })
            },

            isNew(time){
                return new Date() - new Date(time) < 100000000
            },
            turnToArticles(urlHash){
                console.log(urlHash)
                this.$router.push({
                    name: "articles",
                    params: {
                        hash: urlHash
                    }
                })
            }
        },
        mounted(){
            // document.body.addEventListener('touchstart', function(){ });
        },
        watch:{
          text:{
              handler:function (val) {
                  console.log(this.getActiveLabels())
                  this.getArticles(this.getActiveLabels(),val)
              },
              immediate:true
          }
        },
        filters:{
            changeToMDY(value){
                return new Date(value).toString().split(" ").slice(0,4).join(" ")
            }
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

    cursor:pointer;

  }

  .cate-button:focus{
    background-color: #d1e5fb;
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
  .input-search{
    margin-top: 25px;
  }
  .input-search h3{
    font-size: 22px;
    margin: 0;
    padding: 0 0 0 26px;
    color: #3a8ee6;
    display: inline-block;

  }
  .article{
    font-size: 17px;
    letter-spacing: 1px;
    color: #434343;
  }

  .searchedRes{
    margin: 56px 0 25px 0;
  }
  .search-input{
    height: 32px;
    font-size: 14px;
    width: 320px;
    border-radius: 4px;
    border:2px solid #cccccc;
    font-weight:500;
    outline: none;
    box-shadow: none;
    padding: 2px 2px 2px 14px;
    letter-spacing: 1px;
    transition: width 0.3s ease,border 0.2s ease,background-color 0.2s ease;
  }
  .search-input:focus{
    width: 430px;
    border: 2px solid #3a8ee6;
    background-color: rgba(209, 229, 251, 0.11);
  }

  .searchedUnit{
    display: flex;
    padding: 6px 6px 13px 0px;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
  }

  .searchedUnit:hover{
    background-color: rgba(209, 229, 251, 0.3);
    cursor: pointer;
  }

  .title-continue-isnew{
    width: calc(100% - 82px);
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-continue h1,h2,h3,p{
    margin: 0;

  }

  .title-continue h2{
    font-size: 18px;
  }

  .title-continue p{
    font-weight: 400;
    color: #747474;
    font-size: 12px;
  }
  .cover{
    width: 55px;
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
    .cate-button{
      font-size: 12px;
      padding: 4px 8px;
    }
    .search-input{
      width: 60%;
    }
    .search-input:focus{
      width: 72%;
    }
    .cover{
      width: 40px;
    }
    .title-continue-isnew{
      width: calc(100% - 60px);
      padding-left: 20px;

    }
    .title-continue-isnew h2{
      font-size: 14px;
    }
    .title-continue-isnew p{
      font-size: 10px;
    }


  }
</style>
