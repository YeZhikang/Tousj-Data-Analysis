<template>
    <div>
<!--      <el-input-->
<!--        @input="handleInput()"-->
<!--        v-model="text">-->
<!--      </el-input>-->
      <slot name="first" v-bind:user="user">
        {{user.firstName}}
      </slot>
      <slot name="last" v-bind:user="user">
        {{user.lastName}}
      </slot>
    </div>
</template>

<script>
    export default {
        name: "CodeTest",
        data(){
          return{
              text:'',
              user:{
                  firstName:"Ye",
                  lastName:"Zhikang"
              }
          }
        },
        computed:{
          // textLength(){
          //     return this.text.length
          // }
        },
        methods:{
            handleInput(){
                if(this.textLength > 3){
                    this.$emit("send-text",this.text)
                }
            }
        }
    }
</script>

<style scoped>

</style>
