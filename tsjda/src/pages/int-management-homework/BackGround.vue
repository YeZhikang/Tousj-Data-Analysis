<template>
  <el-row class="container">
    <el-col class="nav" :span="24">
      <div class="nav__title">MIS <span style="color: #458afe;font-weight: 600">后台</span></div>
      <div class="nav__main">
        <el-autocomplete
          class="inline-input"
          v-model="searchContext"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleReturn"
          prefix-icon="el-icon-search"
        ></el-autocomplete>
        <div @click="handleJump('all')" style="margin-left: 40px" class="link">所有新闻 <i class="el-icon-news"></i></div>
        <div @click="handleJump('create')" style="margin-left: 25px;" class="link">撰写新闻 <i class="el-icon-edit"></i></div>
      </div>
    </el-col>
    <el-col class="sidebar" :span="4">
      <el-menu @select="handleSelect" :default-active="currentActive" style="height: 600px">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title"> 所有新闻</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-tickets"></i>
          <span slot="title"> 编辑新闻</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-edit"></i>
          <span slot="title"> 新建新闻</span>
        </el-menu-item>
      </el-menu>
      <div class="sidebar__footer">
        <div style="margin-left: 25px" class="fxal sidebar__footer__version"><i class="el-icon-price-tag" style="margin-right: 6px"></i> v0.1.0</div>
        <el-tooltip class="item" effect="dark" content="转换主题" placement="top">
          <div class="theme-choose" style="margin-right: 25px"><i class="el-icon-sunny"></i></div>
        </el-tooltip>
      </div>
    </el-col>
    <el-col class="main-body" :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
export default {
    name: "BackGround",
    data(){
        return{
            isMobile: false,
            currentActive: '1',
            searchContext: '',
            newsArr: []
        }
    },
    methods:{
        handleSelect(index){
            switch (index) {
                case '1':
                    this.$router.push('all')
                    break
                case '2':
                    this.$router.push('edit')
                    break
                case '3':
                    this.$router.push('create')
            }
        },
        getAllNews(){
            this.$axios.get('/getNews').then(res => {
                this.newsArr = res.data.data
            })
        },

        querySearch(queryString,cb){
            const results = queryString ? this.newsArr.filter(item => item.title.toLowerCase().includes(queryString)) : this.newsArr;
            cb(results.map(item => {
                return { value: item.title, id: item._id.$oid }
            }))
        },
        handleReturn(newInfo){
            this.$router.push({
                name: 'mis-homework-back-ground-edit',
                query: {
                    id: newInfo.id
                }
            })
        },
        handleJump(name){
            this.$router.push(name)
        }
    },
    watch:{
        $route:{
            handler: function (val) {
                switch (val.name) {
                    case 'mis-homework-back-ground-create':
                        this.currentActive = '3'
                        break
                    case 'mis-homework-back-ground-edit':
                        this.currentActive = '2'
                        break
                    case 'mis-homework-back-ground-all':
                        this.currentActive = '1'
                        break
                }
            },
            immediate: true
        }
    },
    created() {
        this.getAllNews()
    }
}
</script>

<style scoped>
  .container{
    height: 100%;
    min-width: 1400px;
  }
  .sidebar{
    height: calc(100% - 70px);
    text-align: left;
    border-right: 1px solid lightgrey;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .nav{
    background-color: white;
    height: 70px;
    border-bottom: 1px solid lightgrey;
    display: flex;
    align-items: center;
    padding: 0 25px;
    justify-content: space-between;
  }

  .nav__title{
    font-size: 22px;
    font-weight: 400;

  }



  .main-body{
    height: calc(100% - 70px);
  }

  .link{
    display: inline-block;
    cursor: pointer;
    transition: 0.3s;
    font-weight: 300;
  }

  .link:hover{
    color: #3a8ee6;
  }

  >>>.el-menu{
    border-right: none;
  }

  .sidebar__footer{
    height: 50px;border-top: 1px solid lightgrey;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .fxal{
    display: flex;
    align-items: center;

  }

  .sidebar__footer__version{
    font-size: 15px;
    font-weight: 500;
    transition: 0.2s;
    cursor: pointer;
  }

  .sidebar__footer__version:hover{
    color: #3a8ee6;
  }

  .theme-choose{
    transition: 0.2s;
    cursor: pointer;
  }

  .theme-choose:hover{
    color: #3a8ee6;
  }
</style>
