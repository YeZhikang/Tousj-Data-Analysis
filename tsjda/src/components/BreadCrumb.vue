<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(routeName,index) in routeArray"
        :key="route"
        :to="{ name:routeName }"
      >{{routeName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
    export default {
        name: "BreadCrumb",
        data(){
            return{
                routeArray:[]
            }
        },
        mounted() {
          this.getRouteStep()
        },
        methods:{
            getRouteStep(){
                let routeArray = this.$route.path.split('/');
                this.routeArray = routeArray.slice(1)
                console.log(this.routeArray);
            }
        },
        watch:{
            $route:{
                handler(val){
                    this.getRouteStep();
                }
            }
        }
    }
</script>

<style scoped>

</style>
