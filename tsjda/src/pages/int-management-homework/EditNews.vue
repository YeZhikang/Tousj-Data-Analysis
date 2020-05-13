<template>
  <div style="display: flex;height: 100%;align-items: center;justify-content: center;width: 100%">
    <div class="main-table" style="width: 100%;height: 92%">
<!--      <el-form :inline="true" :model="formData" class="form demo-form-inline">-->
<!--        <el-form-item label="新闻封面">-->
<!--          <el-upload-->
<!--            class="avatar-uploader"-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            :show-file-list="false"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            :before-upload="beforeAvatarUpload">-->
<!--            <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="新闻标题">-->
<!--          <el-input size="small" v-model="formData.title" placeholder="输入标题"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="新闻类型">-->
<!--          <el-select size="small" v-model="formData.type">-->
<!--            <el-option v-for="(option,index) in options" :key="index" :value="option" :label="option"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="新闻权重">-->
<!--          <el-input size="small" type="number" v-model="formData.rank" placeholder="权重越高，排位越高"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">查询</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
      <div class="form" style="height: 120px">
        <el-input v-model="formData.title" placeholder="输入标题"></el-input>
        <div class="form-sub">
          <span class="form-title">新闻类型：</span><el-select @visible-change="handleChange" style="z-index: 999999" size="small" v-model="formData.type">
              <el-option style="z-index: 999999" v-for="(option,index) in options" :key="index" :value="option" :label="option"></el-option>
            </el-select>
          <span class="form-title ml10">新闻权重：</span>
          <el-input size="small" style="width: 80px" type="number" v-model="formData.rank"></el-input>
          <span class="form-title ml10">新闻封面：</span>
          <el-upload
            class="avatar-uploader"
            action="https://www.yezhikang.site:8081/uploadImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else-if="!imageUrl && !isSend" class="el-icon-plus avatar-uploader-icon"></i>
            <i v-else class="el-icon-loading avatar-uploader-icon"></i>
          </el-upload>
          <el-button @click="handleSend" style="margin-left: auto;width: 100px" type="primary" size="small"><i class="el-icon-check"></i> 发送</el-button>
        </div>
      </div>
      <div class="editor" ref="editor" style="height: calc(100% - 140px)"></div>
    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
import {Loading} from 'element-ui'
export default {
    name: "EditNews",
    data(){
        return{
            formData: {},
            options: ['普通','轮播','快讯'],
            imageUrl:'',
            isSend: false,
            editor: null,
            editorContent: null
        }
    },
    mounted() {
        this.handleSelect()
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
            this.editorContent = html
        }
        editor.create()
        this.editor = editor
    },
    methods:{
        handleAvatarSuccess(res, file) {
            console.log(file)
            this.imageUrl = 'https://www.yezhikang.site:8081/static/'+file.response.filePath
            this.isSend = false
        },
        beforeAvatarUpload(file) {
            this.isSend = true
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleChange(val){
            if(val){
                this.$nextTick(() => {
                    const select = document.querySelector('.el-select-dropdown')
                    select.style.zIndex = '999999'

                })
            }
        },
        handleSend(){
            const newsData = {
                ...this.formData,
                content: this.editorContent,
                imgURL: this.imageUrl,
                time: new Date().toLocaleDateString().replace(/\//g,'-')
            }
            this.$axios.post('/sendNews', {...newsData, id: this.$route.query.id}).then(res => {
                if(res.data.code === 200){
                    this.$message({
                        type: 'success',
                        message: '发送成功'
                    })
                    this.$router.push('all')
                }else{
                    this.$message({
                        type: 'error',
                        message: '发送失败'
                    })
                }
            })
        },
        handleSelect(){
            let loadingInstance = Loading.service({ target: '.main-table' });
            this.$axios.post('/selectNews', {id: this.$route.query.id}).then(res => {
                const item = res.data.item
                this.editor.txt.html(`${item.content}`)
                this.imageUrl = item.imgURL
                this.editorContent = item.content || ''
                this.formData = {
                    title: item.title,
                    rank: item.rank,
                    type: item.type
                }
                loadingInstance.close()
            }).catch(err => {
                loadingInstance.close()
            })
        }
    },

}
</script>

<style scoped>
  .editor{
    text-align: left;
    padding: 10px 36px;
  }

  .form{
    margin: 0 36px
  }

  .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }

  .form-sub{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 10px 0 0 0;
  }

  .ml10{
    margin-left: 10px;
  }

  .form-title{
    font-size: 14px;
    color: rgb(111,111,111);
  }

  >>> .w-e-text-container{
    height: calc(100% - 40px) !important;
  }

</style>
