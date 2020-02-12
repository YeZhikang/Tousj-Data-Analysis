<template>
  <div>
    <el-row class="mt30">
      <el-col :span="4">
        <el-radio-group
          v-model="timeLimit"
          size="mini"
        >
          <el-radio-button label="日榜"></el-radio-button>
          <el-radio-button label="周榜"></el-radio-button>
          <el-radio-button label="月榜"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="4" >
        <el-date-picker
          size="mini"
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row class="mt30" >
      <el-col :span="2" class="nfs">博主类型</el-col>
      <el-col :span="22" class="nfs">
        <el-radio-group
          v-model="category"
          size="mini"
        >
          <el-radio-button v-for="(index) in 15" :label="index+' 领域'" >
          </el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="mt30">
      <el-col :span="24">
        <el-table
          :data= "bloggerInfo"
        >
          <el-table-column
            label="排行"
          >
            <template v-slot="scope" >
              <i>{{scope.row.rank}}</i>
            </template>
          </el-table-column>
          <el-table-column
            label="博主"
            width="300"
          >
            <template v-slot="scope">
              <div style="display: flex;align-items: center">
                <el-avatar :size="40" :src="scope.row.avatarURL"></el-avatar>
                <div style="margin-left: 10px">{{scope.row.bloggerName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="identify"
            label="身份"
          >
          </el-table-column>
          <el-table-column
            prop="fansNum"
            label="粉丝数"
          >
          </el-table-column>
          <el-table-column
            prop="blogNum"
            label="发博数"
          >
          </el-table-column>
          <el-table-column
            prop="commentAvgNum"
            label="平均评论数"
          >
          </el-table-column>
          <el-table-column
            prop="score"
            label="评价指数"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template v-slot="scope">
              <el-button type="text" @click="enterBloggerInfo(scope.row)">操作</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import BreadCrumb from "../BreadCrumb";

    export default {
        name: "BloggerRank",
        components: {BreadCrumb},
        data(){
            return{
                timeLimit:"日榜",
                value1:"",
                category:"",
                bloggerInfo:[
                    {
                        rank: 1,
                        bloggerName: "蔡徐坤",
                        avatarURL:"https://tvax1.sinaimg.cn/crop.0.0.512.512.180/69e273f8ly8g8f8w2397wj20e80e80tc.jpg",
                        identify:"明星",
                        fansNum: 0,
                        commentAvgNum: 0,
                        userId: 12323551,
                        score: 323411,
                        blogNum: 13
                    },
                    {
                        rank: 2,
                        bloggerName: "蔡徐坤",
                        avatarURL:"https://tvax1.sinaimg.cn/crop.0.0.512.512.180/69e273f8ly8g8f8w2397wj20e80e80tc.jpg",
                        identify:"明星",
                        fansNum: 0,
                        commentAvgNum: 0,
                        userId: 12323551,
                        score: 323411,
                        blogNum: 13
                    },
                    {
                        rank: 3,
                        bloggerName: "蔡徐坤",
                        avatarURL:"https://tvax1.sinaimg.cn/crop.0.0.512.512.180/69e273f8ly8g8f8w2397wj20e80e80tc.jpg",
                        identify:"明星",
                        fansNum: 0,
                        commentAvgNum: 0,
                        userId: 12323551,
                        score: 323411,
                        blogNum: 13
                    },
                    {
                        rank: 4,
                        bloggerName: "蔡徐坤",
                        avatarURL:"https://tvax1.sinaimg.cn/crop.0.0.512.512.180/69e273f8ly8g8f8w2397wj20e80e80tc.jpg",
                        identify:"明星",
                        fansNum: 0,
                        commentAvgNum: 0,
                        userId: 12323551,
                        score: 323411,
                        blogNum: 13
                    }

                ],
            }
        },
        methods:{
            enterBloggerInfo(row){
                console.log(row)
            }
        },
        mounted() {
            console.log(this.$route)
        }
    }
</script>

<style scoped>

  >>>th{
    background-color: rgb(244,247,249);
  }

</style>
