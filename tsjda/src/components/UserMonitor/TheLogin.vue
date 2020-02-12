<template>
  <div>
    <div class="content">
      <h1>Hello,请登录</h1>
      <p>新用户请<router-link :to="{name:'register'}">注册</router-link></p>
      <el-row style="margin-top: 40px">
        <el-form
          ref="userInfo"
          :rules="rules"
          :model="userInfo"
          label-width="70px"
          label-position="left"
        >
          <el-col>
            <el-form-item
              prop="userName"
              label="用户名"
            >
              <el-input
                prop="userName"
                v-model="userInfo.userName"
                type="text"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              label="密码"
              prop="password"
            >
              <el-input
                v-model="userInfo.password"
                type="password"
                @keyup.enter.native="login()"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col :offset="20" :span="4">
          <el-link type="primary" style="color: #2c3e50">忘记密码？</el-link>
        </el-col>
        <el-col :span="18" :offset="3" style="margin-top: 40px">
          <el-button ref="loginButton" @click="login()" style="width: 100%" type="primary" round>立即登陆</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TheLogin",
        data(){
            return{
                userInfo:{
                    userName:"",
                    password:""
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            login(){
                this.$refs.loginButton.disabled = true;
                this.$axios.post('/login',{userInfo:this.userInfo}).then(res => {
                    console.log(res)
                    if(res.data.code === 200){
                        this.$message({
                            type:"success",
                            message:"登陆成功"
                        })
                        // this.$store.dispatch("changeUserInfo",this.userInfo)
                        localStorage.setItem("userName",this.userInfo.userName)
                        setTimeout(()=>{
                            this.$router.push({name:'index'})
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

  .content{
    margin: 20px 5px 0 10px
  }

  h1,p{
    margin: 0;
  }

  .content p{
    color: #757575;
    font-size: 15px;
    font-weight: 500;
  }

  a:link{
    color: #409EFF;
  }
  a:visited{
    color: #409EFF;
  }

  a{
    text-decoration: none;
    font-weight: 600;
  }

</style>
