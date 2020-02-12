<template>
  <div>
    <div class="content">
      <h1>欢迎注册</h1>
      <p>已注册请<router-link :to="{name:'login'}">登陆</router-link></p>
      <el-row style="margin-top: 40px">
        <el-form
          :model="userInfo"
          label-width="80px"
          label-position="left"
          :rules="rules"
        >
          <el-col>
            <el-form-item
              label="用户名"
              prop="userName"
            >
              <el-input
                v-model="userInfo.userName"
                type="text"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item
              label="注册邮箱"
              prop="email"
            >
              <el-input
                v-model="userInfo.email"
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
                @keyup.enter.native="register()"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="18" :offset="3" style="margin-top: 40px">
          <el-button style="width: 100%" type="warning" @click="register()" round>注册</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TheRegister",
        data(){
            return{
                userInfo:{
                    userName:"",
                    password:"",
                    email:"",
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            register(){
                if(this.userInfo.userName.length < 3 || this.userInfo.password.length < 3 || this.userInfo.email.length < 3){
                    this.$message({
                        type:"error",
                        message:"输入格式有误"
                    });
                    return;
                }
                this.$axios.post('/register',{userInfo:this.userInfo}).then(res => {
                    if(res.data.code === 200){
                        this.$message({
                            type:"success",
                            message:"注册成功"
                        })
                        setTimeout(()=> {
                            this.$router.push({name:"login"})
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
