<template>
  <div class="card-block">
    <el-card>
      <bread-crumb/>
      <router-view/>
    </el-card>
  </div>
</template>

<script>
    import BreadCrumb from "../BreadCrumb";
    export default {
        name: "RetailersData",
        components: {BreadCrumb}
    }
</script>

<style scoped>
  .card-block{
    margin: 15px;
  }
</style>
