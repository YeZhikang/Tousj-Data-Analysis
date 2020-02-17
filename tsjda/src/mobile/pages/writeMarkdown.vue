<template>
  <div style="height: 100%">
    <to-honey></to-honey>
    <div style="height: 100%;display: flex;align-items: center;justify-content: center">
<!--      <el-row type="flex" justify="space-around" style="text-align: left;height: 100%">-->
<!--        <el-col :span="10">-->
<!--          <el-input type="textarea" v-model="markdownCode" @input="submitForm"></el-input>-->
<!--        </el-col>-->
<!--        <el-col :span="10" >-->
<!--          <div v-highlight>-->
<!--            <div v-html="markdownHtml">-->

<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <div>
        <div style="display: flex;align-items: center;margin-bottom: 25px;justify-content: center">
          <h2 style="margin: 0 10px 0 0;">Markdown 文件上传</h2>
          <el-select v-model="value" placeholder="请选择主题">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              >
              <template>
                <span>{{item.value}}</span>
              </template>
            </el-option>
          </el-select>
        </div>
        <el-upload
          class="upload-demo"
          drag
          action="http://127.0.0.1:5000/mdUpload"
          multiple
          :on-success="fileUploadSuccess">
          <div>
            <i style="margin: 0" class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
    import ToHoney from "../components/toHoney";
    export default {
        name: "writeMarkdown",
        components: {ToHoney},
        data(){
            return{
                value:"JavaScript",
                markdownCode:"",
                markdownHtml:"",
                options: [{
                    value: 'JavaScript',
                    label: 'JavaScript'
                }, {
                    value: 'CSS',
                    label: 'CSS'
                }, {
                    value: 'Node.JS',
                    label: 'Node.JS'
                }, {
                    value: 'Python',
                    label: 'Python'
                }, {
                    value: 'Golang',
                    label: 'Golang'
                },{
                    value: 'Vue',
                    label: 'Vue'
                },{
                    value: 'React',
                    label: 'React'
                }],
            }
        },
        methods:{
            // submitForm(){
            //     this.$axios.post('/markdown',{markdownCode:this.markdownCode}).then(res => {
            //         this.markdownHtml = res.data.code
            //     }).catch(error => {
            //         console.log(error)
            //     })
            // },
            fileUploadSuccess(res,file,fileList) {
                if (res.code === 200) {
                    this.$message({
                        message: "文件上传成功",
                        type: "success"
                    });
                }
            }
        },
    }
</script>

<style scoped>

  >>>.el-upload-dragger{
    display: flex;
    align-items: center;
    width: 600px;
    height: 250px;
    flex-wrap: wrap;
    justify-content: center;
  }


</style>
