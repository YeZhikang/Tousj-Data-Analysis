<template>
  <div>
    <el-radio-group size="mini" v-model="blogFreq">
      <el-radio-button label="近7日"></el-radio-button>
      <el-radio-button label="30天热门微博"></el-radio-button>
    </el-radio-group>
    <el-row class="mt20">
      <el-col :span="10">
        <el-input
          v-model="searchBlog"
          placeholder="搜索近期博客"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
          >搜索</el-button>
        </el-input>
      </el-col>
      <el-col :span="6" :offset="3">
        <el-date-picker
          v-model="timeSelected"
          type="daterange"
          align="right"
          unlink-panels
          range-separator=" - "
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row class="mt20">
      <el-table
        v-if="!isSearched"
        :data="blogList"
        stripe
        v-loading="tableLoading"
        style="width: 100%">
        <el-table-column
          width="290"
          label="微博内容"
        >
          <template v-slot="scope">
            <div v-html="scope.row.mainBody"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column
          prop="likeNum"
          label="点赞数"
        >
        </el-table-column>
        <el-table-column
          prop="commentNum"
          label="评论数"
        >
        </el-table-column>
        <el-table-column
          prop="repostNum"
          label="转发数"
        >
        </el-table-column>
      </el-table>


      <el-table
        v-if="isSearched"
        :data="searchBlogList"
        v-loading="tableLoading"
        stripe
        style="width: 100%">
        <el-table-column
          width="290"
          label="微博内容"
        >
          <template v-slot="scope">
            <div v-html="scope.row.mainBody"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column
          prop="likeNum"
          label="点赞数"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="commentNum"
          label="评论数"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="repostNum"
          label="转发数"
          width="80"
        >
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "HistoryBlog",
        data(){
            return{
                tableLoading:true,
                blogList: [

                ],
                isSearched:false,
                searchBlogList:[],
                userId:this.$route.query.userId,
                blogFreq:"近7日",
                searchBlog:"",
                timeSelected:'',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        mounted(){
            this.getHistoryBlog();
        },
        methods:{
            getHistoryBlog(){
                this.$axios.post("/getHistoryBlog",{
                    userId:this.userId,
                    dayLimit:[],
                    lastDay:50
                }).then(res => {
                    this.tableLoading = false
                    this.blogList = res.data.blogList
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        watch:{
            searchBlog:{
                handler:function (val,oldVal) {
                    this.searchBlogList = []
                    if(!val && oldVal){
                        this.isSearched = false;
                    }else {
                        console.log("yes")
                        this.isSearched = true;
                        this.blogList.forEach(item => {
                            if (item.mainBody.includes(val)) {
                                this.searchBlogList.push(item)
                            }
                        })
                    }
                }
            },
            timeSelected:{
                handler:function (val) {
                    let dateFromTo = [val[0].toLocaleDateString().split('/').join('-'),val[1].toLocaleDateString().split('/').join('-')]
                    this.blogFreq = ""
                    this.$axios.post("/getHistoryBlog",{
                        userId:this.userId,
                        dayLimit:dateFromTo,
                        lastDay:"null"
                    }).then(res => {
                        this.blogList = res.data.blogList
                        this.tableLoading = false
                    }).catch(error => {
                        console.log(error)
                    })
                }
            },
            blogFreq:{
                handler:function (val) {
                    if(val.includes("30")){
                        this.$axios.post("/getHistoryBlog",{
                            userId:this.userId,
                            dayLimit:[],
                            lastDay:30
                        }).then(res => {
                            this.blogList = res.data.blogList
                            this.tableLoading = false
                        }).catch(error => {
                            console.log(error)
                        })
                    }else{
                        this.$axios.post("/getHistoryBlog",{
                            userId:this.userId,
                            dayLimit:[],
                            lastDay:7
                        }).then(res => {
                            this.blogList = res.data.blogList
                            this.tableLoading = false
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped>
  .mt20{
    margin-top: 20px;
  }

  >>>th{
    background-color: rgb(244,247,249);
  }

  >>>a{
    text-decoration: none;
  }

  >>>a:link{
    color: darkcyan;
  }

  >>>a:visited{
    color: darkcyan;
  }

  >>>a:hover{
    color: seagreen;
  }

  >>>a:active{
    color: seagreen;
  }


</style>
