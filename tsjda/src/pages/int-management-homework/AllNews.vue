<template>
  <div class="main">
    <div class="container">
      <el-form
        style="text-align: left"
        :inline="true"
        :model="filterForm"
        class="demo-form-inline"
      >
        <el-form-item label="文章标题">
          <el-input
            size="small"
            v-model="filterForm.title"
            placeholder="标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select
            style="z-index: 999999"
            size="small"
            v-model="filterForm.type"
          >
            <el-option
              style="z-index: 999999"
              v-for="(option,index) in options"
              :key="index"
              :value="option"
              :label="option"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权重">
          <el-input-number
            size="small"
            v-model="filterForm.rank"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            @click="filterNews(true)"
          >查询
          </el-button>
          <el-button
            size="small"
            type="warning"
            @click="filterNews(false)"
          >重置
          </el-button>
        </el-form-item>
      </el-form>
      <div class="main-table">
        <div
          class="new-unit"
          v-for="(news,index) in chooseArr.slice(7*(currentPage-1),7*currentPage)"
          :style="{'border-left-color': selectBorderColor(news.type)}"
        >
          <div
            class="new-type"
            :style="{'background-color': selectBackgroundColor(news.type),'color': selectBorderColor(news.type),'font-weight': '700'}"
          >{{ news.type }}
          </div>
          <div
            class="new-bgUrl"
            :style="{'background-image': `url(${news.imgURL})`}"
          ></div>
          <div class="new-title">{{ news.title }} <small style="color: darkgrey"> 权重: {{ news.rank }}</small></div>
          <div class="new-rank">{{ 7*(currentPage-1) + index+1 }}</div>
          <div class="new-option">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(news)"
            ><i class="el-icon-edit"></i></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDrop(news)"
            ><i class="el-icon-delete"></i></el-button>
          </div>
        </div>
        <div class="footer">
          <el-pagination
            @current-change="handlePageChange"
            :total="chooseArr.length"
            small
            layout="prev, pager, next"
            :page-size="7"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui';

export default {
    name: "AllNews",
    data() {
        return {
            filterForm: {},
            newsArr: [],
            options: ['普通', '轮播', '快讯'],
            colorArr: ['#67C23A', '#E6A23C', '#F56C6C'],
            colorArrSub: ['rgba(103,194,58,0.45)', 'rgba(230,162,60,0.45)', 'rgba(245,108,108,0.4)'],
            currentPage: 1,
            filterNewsArr: [],
            isFilter: false,
        }
    },
    computed: {
        chooseArr() {
            return this.isFilter ? this.filterNewsArr : this.newsArr
        }
    },
    mounted() {
        this.getAllNews()
    },
    methods: {
        selectBorderColor(type) {
            switch (type) {
                case '轮播':
                    return this.colorArr[0]
                case '快讯':
                    return this.colorArr[1]
                case '普通':
                    return this.colorArr[2]
            }
        },
        selectBackgroundColor(type) {
            switch (type) {
                case '轮播':
                    return this.colorArrSub[0]
                case '快讯':
                    return this.colorArrSub[1]
                case '普通':
                    return this.colorArrSub[2]
            }
        },
        handlePageChange(page) {
            this.currentPage = page
        },
        getAllNews() {
            let loadingInstance = Loading.service({ target: '.main-table' });
            this.$axios.get('/getNews').then(res => {
                console.log(res)
                this.newsArr = res.data.data
                loadingInstance.close()
            })
        },
        handleEdit(news) {
            this.$router.push({
                path: 'edit',
                query: {
                    id: news._id.$oid
                }
            })
        },
        handleDrop(news) {
            this.$axios.post('/dropNews', { id: news._id.$oid }).then(res => {
                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.newsArr = this.newsArr.filter(item => item !== news)
                }
            })
        },
        filterNews(bool) {
            if (bool) {
                this.filterNewsArr = []
                this.isFilter = true
                this.newsArr.forEach(item => {
                    if ((item.title.includes(this.filterForm.title) || !this.filterForm.title) && (item.type === this.filterForm.type || !this.filterForm.type) && (item.rank == this.filterForm.rank || !this.filterForm.rank)) {
                        this.filterNewsArr.push(item)
                    }
                })

            } else {
                this.isFilter = false
                this.filterForm = {}
            }
        }
    }
}
</script>

<style scoped>
  .container {
    padding: 24px 36px;
    position: relative;
    height: 100%;
    box-sizing: border-box;

  }

  .main {
    height: 100%;
  }

  .new-unit {
    height: 60px;
    border-left: 10px solid;
    margin: 12px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    transition: 0.3s;
    cursor: pointer;
    position: relative;
  }

  .new-unit:hover {
    border-top: 1px solid #3a8ee6;
    border-bottom: 1px solid #3a8ee6;
    border-right: 1px solid #3a8ee6;

  }

  .new-type {
    padding: 0 12px;
    height: 100%;
    line-height: 60px;
  }

  .new-bgUrl {
    background-color: #3a8ee6;
    height: 50px;
    width: 50px;
    margin-left: 10px;
    border-radius: 6px;
    background-position: center;
    background-size: cover;
  }

  .new-title {
    margin-left: 10px;
    width: 76%;
    text-align: left;
  }

  .footer {
    position: absolute;
    bottom: 18px;
    width: calc(100% - 72px);
    margin: 0 auto;
  }

  .new-rank {
    position: absolute;
    right: 5px;
    top: -14px;
    font-size: 22px;
    color: darkcyan;
    text-shadow: 0 0 6px lightgrey;
    font-weight: 600;
    padding: 0 3px;
    background-color: white;
  }
</style>
