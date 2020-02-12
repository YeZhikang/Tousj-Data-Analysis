<template>
    <div>
      <input v-model="a.msg">
      {{a.msg | capitalize}}
<!--      <p id="msg">{{a.msg}}</p>-->
<!--      <h1 ref="he" id="he"></h1>-->
<!--      <h4 style="color: yellow" ref="yellow"></h4>-->
<!--      <el-button @click="getData()"></el-button>-->
      <CodeTest>
        <template v-slot:first="slotProps">
          {{slotProps.user.lastName}}
        </template>
        <template v-slot="anotherSlotProps">
          {{anotherSlotProps.user.lastName}}
        </template>
      </CodeTest>
    </div>
</template>

<script>
    import CodeTest from "./CodeTest";
    export default {
        name: "TheBackground",
        components: {CodeTest},
        data(){
            return{
                a:{
                    msg:'haha'
                }
            }
        },
        filters:{
          capitalize(value){
              if(!value) return ''
              value = value.toString()
              return value.charAt(0).toUpperCase() + value.slice(1)
          }
        },
        methods:{
          // getData(){
          //     this.a.msg = "ok";
          //     this.$nextTick(()=>{this.$refs.yellow.textContent = document.getElementById("msg").textContent})
          //     document.querySelector("#he").textContent = this.a.msg;
          // }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
