<template>
  <div>
    <el-row style="margin-top: 30px">
      <el-col :span="24" :offset="0">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="userName">
            <el-input  v-model="ruleForm.userName">
              <template slot="prepend">登陆账户</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input type="email"  v-model="ruleForm.email">
              <template slot="prepend">注册邮箱</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"  v-model="ruleForm.password">
              <template slot="prepend">登陆密码</template>
              <el-button
                style="padding-left: 0;padding-right: 0;" slot="append" icon="el-icon-close"
                @click="ruleForm.password = ''"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"  v-model="ruleForm.check">
              <template slot="prepend">确认密码</template>
              <el-button
                style="padding-left: 0;padding-right: 0;" slot="append" icon="el-icon-close"
                @click="ruleForm.check = ''"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div :style="{width: 'calc(100%-20px)',textAlign: 'right',padding: '10px'}">
      <el-button type="text" style="padding: 0;font-size: 12px">用户协议</el-button>
    </div>
    <el-row style="margin-top: 100px" type="flex" justify="space-around">
      <el-col :span="16" >
        <el-button
          type="warning"
          style="width: 100%;"
          @click="Register()"
        >立即注册</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "MobileRegister",
        data(){
            return{
                ruleForm:{
                    userName:"",
                    password:"",
                    email:"",
                    check:""
                }
            }
        },
        methods:{
            Register(){
                if(this.ruleForm.check !== this.ruleForm.password){
                    this.$message({
                        type:"warning",
                        message:"输入密码与确认密码不一致"
                    })
                }else if(!this.ruleForm.email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)){
                    this.$message({
                        type:"warning",
                        message:"输入邮箱格式有误"
                    })
                }else if(this.ruleForm.userName.length < 4 || this.ruleForm.userName.length > 15
                    || this.ruleForm.password.length < 4 || this.ruleForm.password.length > 15){
                    this.$message({
                        type:"warning",
                        message:"用户名需要在4位至15位"
                    })
                }else{
                    this.$axios.post('/register',{userInfo:this.ruleForm}).then(res => {
                        if(res.data.code === 200){
                            this.$message({
                                type:"success",
                                message:"注册成功"
                            })
                            setTimeout(()=> {
                                this.$router.push({name:"MobileLogin"})
                            },1000)
                        }else if(res.data.code === 500){
                            this.$message({
                                type:"error",
                                message:"该用户名已经被注册"
                            })
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
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
