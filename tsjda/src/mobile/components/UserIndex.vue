<template>
    <div style="text-align: left">
      <el-row>
        <el-col :span="20" :offset="2">
          <h1 style="margin: 55px 0 25px 0px;font-size: 30px;color: black;">历史记录</h1>
          <el-card>
            <div style="display: flex;align-items: center">
              <el-avatar>{{userName}}</el-avatar>
              <p style="margin-left: 10px">{{userName}}</p>
              <el-tag style="margin-left: 4px" type="primary" size="mini">用户</el-tag>
            </div>
            <el-table
              :data="viewHistory"
              v-loading="searchTableLoading"
              stripe
              style="width: 100%">
              <el-table-column
                label="微博博主"
                :show-overflow-tooltip="true"
              >
                <template v-slot="scope">
                  <el-button
                    type="text"
                    @click="turnToGraph(scope.row)"
                  >
                    <span style="white-space:nowrap; overflow:hidden;text-overflow:clip;width: 100%">{{scope.row.userName}}</span>
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
                label="粉丝人数">
                <template v-slot="scope">
                  <el-tag type="warning">
                    {{scope.row.fansNum}}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>

        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserIndex",
        data(){
            return{
                userName: localStorage.getItem("userName"),
                viewHistory: this.$store.state.viewHistory
            }
        },
        mounted() {
            console.log(this.viewHistory)
        }
    }
</script>

<style scoped>
  .sectionBanner__heading h1{
    font-size: 30px;
    margin-bottom: 0px;
    font-family: 'Open Sans','PingFang SC',sans-serif!important;
    font-weight: 500;
    color: black;
  }

  .sectionBanner{
    padding: 36px 7px 36px 7px;
    border-bottom: 1px dashed rgb(222,222,222);
  }

  .sectionBanner p{
    color: black;
  }
  .sectionBanner__img{
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>
