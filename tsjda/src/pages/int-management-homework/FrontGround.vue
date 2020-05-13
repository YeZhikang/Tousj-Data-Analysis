<template>
  <div
    ref="bg"
    class="bg"
  >
    <div
      ref="container"
      class="container"
    >
      <template v-if="!isChecking">
        <div class="carousel block">
          <el-carousel
            trigger="click"
            height="240px"
          >
            <el-carousel-item
              class="carousel__item"
              v-for="item in colNewsArr"
              :key="item.title"
              :style="{'background-image': `url(${item.imgURL})`}"
            >
              <div @click="handleCheck(item)" class="layer">
                {{ item.title }}
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="header">
          <div class="header__title">
            <i class="el-icon-loading"></i> 滚动快讯
          </div>
          <div @click="handleCheck(showNew)" class="header__content">
            {{ showNew.title }}
          </div>
        </div>
        <div class="body">
          <div
            @click="handleCheck(newInfo)"
            class="body__unit"
            v-for="(newInfo,index) in newsArr.slice((currentPage-1)*5, currentPage*5)"
            :key="newInfo.id"
            :style="{'border-color': backgroundColorArr[index % 4]}"
          >
            <div
              class="news-bg"
              :style="{'background-image': `url(${newInfo.imgURL})`}"
            >
            </div>
            <div class="news-content">
              <div class="news__title">{{ newInfo.title }}</div>
              <div class="news__body">{{ newInfo.time }}</div>
            </div>
            <div class="news__time">
              NEW
            </div>
          </div>
        </div>
        <div class="footer">
          <el-pagination
            @current-change="handlePageChange"
            :total="newsArr.length"
            small
            layout="prev, pager, next"
            :page-size="5"
          >
          </el-pagination>
        </div>
      </template>
      <template v-else>
        <div style="height: 94%;padding: 3% 0;overflow: scroll">
          <div class="check-bg" :style="{'background-image': `url(${currentItem.imgURL})`}">
            <div @click="handleBack" class="back-button"><i class="el-icon-arrow-left"></i></div>
          </div>
          <div class="check-main">
            <h2 class="check-title">{{ currentItem.title }}</h2>
            <div v-html="currentItem.content"></div>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
import {Loading} from 'element-ui'
export default {
    name: "FrontGround",
    data() {
        return {
            newsArr: [

            ],
            roleNewsArr: [],
            colNewsArr: [],
            backgroundColorArr: ['#67C23A', '#E6A23C', '#F56C6C', '#909399'],
            currentPage: 1,
            showNew: '',
            isChecking: false,
            currentItem: null
        }
    },
    methods: {
        checkIsMobile() {
            const WINDOW_WIDTH = window.innerWidth
            if (WINDOW_WIDTH > 700) {
                this.$refs.bg.classList.add('bg--pc')
                this.$refs.container.classList.add('container--pc')
            } else {
                this.$refs.container.classList.add('container--mb')
            }
        },
        handlePageChange(page) {
            this.currentPage = page
        },
        getAllNews(){
            let loadingInstance = Loading.service({ target: '.container' });
            this.$axios.get('/getNews').then(res => {
                const newsArr = res.data.data
                newsArr.sort((a,b) => Number(b.rank) - Number(a.rank))
                res.data.data.forEach(item => {
                    switch (item.type) {
                        case '轮播':
                            this.colNewsArr.push(item)
                            break
                        case '普通':
                            this.newsArr.push(item)
                            break
                        case '快讯':
                            this.roleNewsArr.push(item)
                    }
                })
                loadingInstance.close()

                let i = 0;
                if(this.roleNewsArr.length > 0){
                    this.showNew = this.roleNewsArr[0]
                    setInterval(() => {
                        this.showNew = this.roleNewsArr[i%this.roleNewsArr.length]
                        i++
                    }, 5000)
                }
            })
        },
        handleCheck(item){
            this.currentItem = item
            this.isChecking = true

        },
        handleBack(){

            this.isChecking = false
        }
    },
    created(){
        this.getAllNews()
    },
    async mounted() {
        await this.checkIsMobile()

    },
}
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
  }

  .bg--pc {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(250, 84, 28, 0.18);
  }

  .container {
    transform: translate(0);
  }

  .container--mb {
    height: 100%;
    width: 100%;
    background-color: white;
  }

  .container--pc {
    height: 700px;
    width: 400px;
    background-color: white;
    box-shadow: 0 0 6px lightgrey;
  }

  .carousel__item {
    background-color: lightcoral;
    background-size: cover;
    background-position: center;
  }

  .header {
    height: 46px;
    display: flex;
    align-items: center;

    margin: 15px 6px;
    background-color: rgba(211, 211, 211, 0.53);
    border-radius: 4px;
  }

  .header__title {
    font-size: 14px;
    color: rgb(111, 111, 111);
    padding-left: 6px;
    border-left: 4px solid darksalmon;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    height: 100%;
    line-height: 46px;
  }

  .header__content {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px dashed rgb(111, 111, 111);
    flex-grow: 1;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.2s;
  }

  .header__content:hover{
    color: #2c3e50;
  }

  .body {
    margin: 15px 6px 3px;
  }

  .body__unit {
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 6px;
    border-left: 4px solid;
    width: calc(100% - 6px);
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s;
  }

  .body__unit:hover{
    background-color: rgb(244,244,244);
  }

  .body__unit {
    margin: 12px 0;
  }

  .news-bg {
    background-color: lightcoral;
    height: 100%;
    width: 90px;
    border-radius: 3px;
    background-size: cover;
    background-position: center;
  }

  .news-content {
    text-align: left;
    padding-left: 8px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 200px;
  }

  .news__title {
    font-size: 15px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .news__body {
    font-size: 12px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .news__time {
    width: calc(100% - 290px);
    margin-right: 15px;
    font-size: 12px;
    text-align: right;
    color: rgb(111, 111, 111);
  }

  .footer {
    position: fixed;
    bottom: 7px;
    margin: 0 auto;
    width: 100%;
  }

  .layer{
    position: absolute;
    bottom: 10px;
    right: 20px;
    max-width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 6px 10px;
    background-color: rgba(100,100,100,0.5);
    border-radius: 3px;
    color: white;
    display: -webkit-box;
    text-align: left;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    transition: 0.3s;
    cursor: pointer;
  }

  .layer:hover{
    background-color: rgba(100,100,100,0.8);
  }

  .check-bg{
    box-sizing: border-box;
    margin: 12px 16px;
    height: 240px;
    background-size: cover;
    background-position: center;
    position: relative;
  }

  .check-main{
    margin: 0 0 10px;
    padding: 15px 16px;
    text-align: left;
    background-color: white;
  }

  .back-button{
    position: absolute;
    left: 6px;
    top: 6px;
    height: 30px;
    width: 30px;
    color: white;
    border-radius: 50%;
    background-color: rgba(111,111,111,0.6);
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-button:hover{
    color: #3a8ee6;
    background-color: rgba(255,255,255,1);
  }

  /*.check-title{*/
  /*  bottom: 5px;*/
  /*  left: 8px;*/
  /*  padding: 8px;*/
  /*  border-radius: 6px;*/
  /*  background-color: rgba(111,111,111,0.7);*/
  /*  position: absolute;*/
  /*  color: white;*/
  /*}*/
</style>
