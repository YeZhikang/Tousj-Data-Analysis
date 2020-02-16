<template>
  <div>

    <el-row :gutter="12">
      <el-col :span="20">
        <span style="font-size: 13px">排序方式：
        </span>
        <el-radio-group
          v-model="sortBy"
          size="mini">
          <el-radio-button label="粉丝数" value="fansNum"></el-radio-button>
          <el-radio-button label="近30日发博数量" value="last30"></el-radio-button>
          <el-radio-button label="价值指数" value="rankScore"></el-radio-button>
        </el-radio-group>
      </el-col>
<!--      <el-col :span="12">-->
<!--        <el-card>-->
<!--          111-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <el-card>-->
<!--          111-->
<!--        </el-card>-->
<!--      </el-col>-->
    </el-row>
    <el-row style="margin-top: 30px" :gutter="12">
      <el-col class="userCard" v-for="(userInfo,index) in userInfoArr" :key="index" :span="8">
        <el-card shadow="hover" style="white-space: nowrap;overflow: hidden;">
          <h3 style="font-weight: 400;margin: 0;padding: 0;text-overflow: ellipsis">
            <router-link :to="{name:'数据统计',query:{userId: userInfo.userId}}">
              {{userInfo.userName}}
            </router-link>
            <el-tag type="warning" size="mini">
              明星
            </el-tag>
          </h3>
          <small>粉丝数：<i>{{userInfo.fansNum}}</i></small>
          <p style="overflow: hidden;margin: 0;padding: 0;font-size: 13px;text-overflow: ellipsis">{{userInfo.definedRes}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import DataCount from "../DataCount";
    export default {
        name: "SimilarBlogger",
        components: {DataCount},
        data(){
            return{
                userId: this.$route.query.userId,
                sortBy:"粉丝数",
                userInfoArr:[

                ]
            }
        },
        methods:{
            getSimilarBloggerArr(){
                this.userInfoArr = [];
                this.$axios.post('/getSimilarBloggerArr',{
                    userId: this.userId,
                    sortBy: this.sortBy
                }).then(res => {
                    console.log(res)
                    let userInfoArr = res.data.userInfoArr
                    userInfoArr.forEach(item => {
                        console.log(this.userId + "-----" + item.userId)
                        if(item.userId != this.userId){
                            this.userInfoArr.push(item)
                        }
                    })
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted(){
            this.getSimilarBloggerArr()
        },
        watch:{
            sortBy:{
                handler:function (val) {
                    this.getSimilarBloggerArr()
                }
            }
        }
    }
</script>

<style scoped>

  .userCard{
    margin-bottom: 15px;
  }

  a{
    text-decoration: none;
  }

  a:link{
    color: black;
  }

  a:visited{
    color: black;
  }

  a:hover{
    color: #2c3e50;
  }

  a:active{
    color: #2c3e50;
  }


</style>
