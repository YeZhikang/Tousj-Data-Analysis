<template>
    <div>
      <el-tabs v-model="activeData" @tab-click="handleClick">
        <el-tab-pane label="数据统计" name="数据统计"></el-tab-pane>
        <el-tab-pane label="历史微博" name="历史微博"></el-tab-pane>
        <el-tab-pane label="历史广告微博" name="历史广告微博"></el-tab-pane>
        <el-tab-pane label="粉丝画像" name="粉丝画像"></el-tab-pane>
        <el-tab-pane label="相似博主" name="相似博主"></el-tab-pane>
      </el-tabs>
      <router-view/>
    </div>
</template>

<script>
    export default {
        name: "AnalysisGraph",
        props:{
          userInfo:Object
        },
        data(){
            return{
                activeData: "数据统计",
                userId: this.$route.query.userId
            }
        },
        methods:{
            handleClick(val){
                this.$router.push({
                    name: val.label,
                    query:{
                        userId: this.userId
                    }
                })
            },
        },
        mounted() {
            this.activeData = this.$route.name
        },
        watch:{
            $route:{
                handler:function (val) {
                  this.activeData = val.name;
                  this.userId = val.query.userId
                }
            }
        }
    }
</script>

<style scoped>

</style>
