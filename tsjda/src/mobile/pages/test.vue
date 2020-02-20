<template>
    <div>
      <div>hello</div>
      <div>{{count()}}</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "test",
        methods:{
            ...mapState({
                count: "count"
            })
        }
    }
</script>

<style scoped>

</style>
