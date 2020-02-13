<template>
  <div>
    <el-row style="margin-top: 30px">
      <el-col :span="24" :offset="0">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="userName">
            <el-input  v-model="ruleForm.userName">
              <template slot="prepend">账号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input type="password"  v-model="ruleForm.password">
              <template slot="prepend">密码</template>
              <el-button style="padding-left: 0;padding-right: 0;" slot="append" icon="el-icon-close"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div :style="{width: 'calc(100%-20px)',textAlign: 'right',padding: '10px'}">
      <el-button type="text" style="padding: 0;font-size: 12px">忘记密码</el-button>
    </div>
    <el-row type="flex" justify="space-around">
      <el-col :span="11" >
        <el-button
          ref="loginButton"
          @click="submitForm()"
          size="small"
          type="primary"
          style="width: 100%;"
          plain
        >立即登陆</el-button>
      </el-col>
      <el-col :span="11" >
        <el-button
          size="small"
          type="warning"
          style="width: 100%;"
          @click="turnToRegister()"
          plain
        >免费注册</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "MobileLogin",
        data(){
            return{
                ruleForm:{
                    userName:"",
                    password:""
                }
            }
        },
        methods:{
            turnToRegister(){
                this.$router.push({ name:"MobileRegister" })
            },
            submitForm(){
                this.$refs.loginButton.disabled = true;
                this.$axios.post('/login',{userInfo:this.ruleForm}).then(res => {
                    console.log(res)
                    if(res.data.code === 200){
                        this.$message({
                            type:"success",
                            message:"登陆成功"
                        })
                        // this.$store.dispatch("changeUserInfo",this.userInfo)
                        localStorage.setItem("userName",this.ruleForm.userName)
                        setTimeout(()=>{
                            // this.$router.push({name:'index'})
                            this.$router.push({name:'MobileIndex'})
                        },1000)
                    }else{
                        this.$refs.loginButton.disabled = false;
                        this.$message({
                            type:"warning",
                            message:"账号或密码错误"
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
  >>>.el-form-item{
    margin: 0;
  }

  >>>.el-input-group__append{
    background-color: white;

  }

  >>>.el-input-group__prepend{
    padding-right: 15px;
    padding-left: 15px;
  }

</style>
