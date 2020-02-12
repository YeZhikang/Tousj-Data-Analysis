<template>
  <div>
    <div class="search-block" v-show="searchBlock">
      <transition name="el-fade-in-linear">
            <div >
          <div style="border-bottom: 1px solid lightgray;margin-bottom: 4px;width: 800px">
            <el-row>
              <el-col :span="20">
                <el-input
                  id="searchC"
                  placeholder="输入想要查询的微博Id、网红名字、昵称"
                  v-model="celebrityName"
                >
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    type="primary"
                    @click="searchCelebrity"
                  >搜索</el-button>
                </el-input>
              </el-col>
              <el-col :span="3" :offset="1">
                <el-link type="primary" @click="appendCelebrityInfo">+ 添加收录</el-link>
              </el-col>
            </el-row>
            <p class="search-font">支持模糊化查找、昵称查找、ID查找等方式进行检索</p>

          </div>
          <div v-if="searchList">
            <h5>搜索记录：
              <span v-for="(searchItem,index) in searchList" :key="searchItem"><el-link @click="historyToSearch(searchItem)">{{searchItem}}</el-link> <span v-if="index!=searchList.length-1">、</span></span>
            </h5>
          </div>
          <div>
            <word-cloud-chart
              id="echarts05"
              :data="celebrityData"
              :width="width"
              :height="height"
            />
          </div>
        </div>
      </transition>
      <el-dialog
        title="添加收录"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body='false'
      >
        <el-form :model="appendCelebrityForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="明星id" :label-width="formLabelWidth">
                <el-input v-model="appendCelebrityForm.userId" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="appendCelebrityForm.userName" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="主页" :label-width="formLabelWidth">
                <el-input v-model="appendCelebrityForm.userIndex" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="认证理由" :label-width="formLabelWidth">
                <el-input v-model="appendCelebrityForm.definedRes" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="appendCelebrityForm.gender" label="男"></el-radio>
            <el-radio v-model="appendCelebrityForm.gender" label="女"></el-radio>
          </el-form-item>
          <el-row :gutter="15">
            <el-form-item label="账号信息" :label-width="formLabelWidth">
              <el-col :span="7">
                <el-input v-model="appendCelebrityForm.fansNum" auto-complete="off" placeholder="粉丝数"></el-input>
              </el-col>
              <el-col :span="7">
                <el-input v-model="appendCelebrityForm.focusNum" auto-complete="off" placeholder="关注数"></el-input>
              </el-col>
              <el-col :span="7">
                <el-input v-model="appendCelebrityForm.userLevel" auto-complete="off" placeholder="用户等级"></el-input>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <transition name="el-fade-in-linear">
      <div class="doneBlock" v-if="!searchBlock">
        <el-card>
          <el-row>
            <el-col :span="12">
              <el-input
                v-model="celebrityName"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  type="primary"
                  @click="searchCelebrity"
                >搜索</el-button>
              </el-input>
            </el-col>
            <el-col :span="3" :offset="9">
              <el-button
                type="text"
                @click="back()"
              >
                返回
              </el-button>
            </el-col>
          </el-row>
          <p class="search-font">支持模糊化查找、昵称查找、ID查找等方式进行检索</p>
          <el-table
            :data="celebrityTable"
            v-loading="searchTableLoading"
            stripe
            style="width: 100%">
            <el-table-column

              label="微博博主"
              width="180">
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
              prop="definedRes"
              label="认证"
              width="480">
            </el-table-column>
            <el-table-column
              prop="fansNum"
              label="粉丝人数">
            </el-table-column>
            <el-table-column
              prop="focusNum"
              label="关注人数">
            </el-table-column>
            <el-table-column
              prop="userLevel"
              label="用户等级">
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template v-slot="scope">
                <el-button type="text" @click="handleClick(scope.row)">
                  用户首页
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </transition>

  </div>
</template>

<script>
    import WordCloudChart from "../charts/WordCloudChart";
    import celebrityData from "../../data/celebrityData"
    import BreadCrumb from "../BreadCrumb";

    export default {
        name: "BlogerSearch",
        components: {BreadCrumb, WordCloudChart},
        data(){
            return{
                searchTableLoading:true,
                celebrityTable:[],
                searchBlock:true,
                dialogVisible:true,
                formLabelWidth:"120px",
                appendCelebrityForm:{
                    userId:null,
                    userName:null,
                    userIndex:null,
                    definedRes:null,
                    gender:null,
                    fansNum:null,
                    focusNum:null,
                    userLevel:null
                },
                dialogFormVisible:false,
                isFocus:true,
                celebrityName:"",
                searchList:[""],
                celebrityData:celebrityData
            }
        },
        mounted(){
          this.getSearchHistory()
        },
        methods:{
            handleClick(user){
                location.href = user.userIndex
            },
            searchCelebrity(){
                let searchList = localStorage.getItem("searchHistory") ? JSON.parse(localStorage.getItem("searchHistory")) : [];
                if(this.celebrityName) {
                    searchList.push(this.celebrityName);
                    localStorage.setItem("searchHistory",JSON.stringify(searchList));
                    this.searchList.push(this.celebrityName);
                }
                this.searchBlock = false;
                this.$axios.post('/searchBlogger',{bloggerName:this.celebrityName}).then(res => {
                    this.celebrityTable = res.data.celebrityTable;
                    this.searchTableLoading = false
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            },
            getSearchHistory(){
                this.searchList = JSON.parse(localStorage.getItem("searchHistory")).reverse().slice(0,10)
            },
            appendCelebrityInfo(){
                this.dialogFormVisible = true;

            },
            submitForm(){
                console.log(this.appendCelebrityForm);
                this.$axios.post('/regCelebrityInfo',this.appendCelebrityForm).then(res => {
                    if(res.data.code === 200){
                        this.$message({
                            type:"success",
                            message:"收录成功"
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
                this.dialogFormVisible = false
                this.appendCelebrityForm = {}
            },
            historyToSearch(searchItem){
                this.celebrityName = searchItem;
                this.searchBlock = false;
                this.$axios.post('/searchBlogger',{bloggerName:this.celebrityName}).then(res => {
                    this.celebrityTable = res.data.celebrityTable;
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            },
            back(){
                this.celebrityName = "";
                this.searchBlock = true;
            },
            turnToGraph(user){
                this.$router.push({
                    name:"数据统计",
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
  .search-block{
    margin: 200px 200px 0 200px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    height: calc(100% - 30px);
    flex-wrap: wrap;
  }


  .search-font{
    font-size: 14px;
    color: #898989;
  }

  >>>.el-link{
    line-height: 40px;
  }

  .doneBlock{
    margin: 15px;
  }

  >>>th{
    background-color: rgb(244,247,249);
  }
</style>
