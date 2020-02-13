<template>
  <div>
      <el-row v-if="!getSearchInfo2" style="margin-top: 70px">
        <el-col :span="20" :offset="2">
            <div class="sectionBanner">
              <div class="sectionBanner__heading">
                <h1>博主搜索</h1>
                <p>搜索你心仪的博主。可以通过微博ID、昵称等方式，支持模糊查找</p>
              </div>
            </div>
            <el-input
              v-model="celebrityName"
              style="margin-top: 15px"
              placeholder="此处输入博主信息"
            >
            </el-input>
          </el-col>
          <el-col style="margin-top: 20px" :span="3" :offset="19">
            <el-button @click="searchCelebrity" size="small" type="primary" icon="el-icon-arrow-right" circle>
            </el-button>
          </el-col>
      </el-row>

<!--  搜索图表  -->
    <transition name="el-fade-in-linear">
      <el-row v-if="getSearchInfo" style="margin-top: 40px;text-align: left">
        <el-col>
          <h1>搜索结果 <small><el-button @click="back()" type="text">返回</el-button></small></h1>
          <el-table
            :data="celebrityTable"
            v-loading="searchTableLoading"
            stripe
            style="width: 100%">
            <el-table-column
              label="微博博主"
              >
              <template v-slot="scope">
                <el-button
                  type="text"
                  @click="turnToGraph(scope.row)"
                >
                  {{scope.row.userName}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="认证"
              >
              <template v-slot="scope">
                <span>
                  {{scope.row.definedRes.substr(0,10)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="fansNum"
              label="粉丝人数">
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "MobileBloggerSearch",
        data(){
            return{
                celebrityName:"",
                getSearchInfo: false,
                getSearchInfo2:false,
                searchTableLoading: true,
                celebrityTable:[]
            }
        },
        methods:{
            searchCelebrity(){
                this.getSearchInfo = true;
                this.getSearchInfo2 = true
                this.$axios.post('/searchBlogger',{bloggerName:this.celebrityName}).then(res => {
                    this.celebrityTable = res.data.celebrityTable;
                    this.searchTableLoading = false
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            },
            back(){
                this.getSearchInfo = false
                setTimeout(()=>{
                    this.getSearchInfo2 = false
                },250)
            },
            turnToGraph(user){
                this.$router.push({
                    name:"手机端数据统计",
                    /*
                    params:{
                        userInfo:user
                    },
                    */
                    query:{
                        userId:user.userId
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
