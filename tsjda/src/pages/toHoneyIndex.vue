<template>
  <div style="width: 100%;height: 100%">
    <transition name="el-fade-in">
      <div v-if="isAlbum" style="width: 100%; z-index: 2000">
        <div style="padding-top: 78px">
          <div class="album-main">
            <div class="add" >
              <el-upload
                :on-success="fileUploadSuccess"
                action="https://www.yezhikang.site:8081/uploadImage"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <div>
                  <i class="el-icon-plus"></i>
                </div>
              </el-upload>
            </div>
  <!--          <div-->
  <!--            v-if="newImgSrc"-->
  <!--            v-for="newImg in newImgSrc"-->
  <!--            class="photo"-->
  <!--            :style="{backgroundImage:`url(${newImg})`}"-->
  <!--            @click="seeDetail(newImg)"-->
  <!--          >-->
  <!--          </div>-->
            <transition v-for="pic in picturesUrl" name="el-fade-in">
              <div
                class="photo"
                :style="{backgroundImage:`url(${pic})`}"
                @click="seeDetail(pic)"
              ></div>
            </transition>
          </div>
        </div>
      </div>
    </transition>

    <div class="edit"
         style="position: fixed;left: -80px;bottom: 40%;background-image:linear-gradient(to right,lightpink, lightcoral);
        color: white;border: none;width: 50px;font-size: 14px;padding: 8px 10px;text-align: right;box-shadow: 0 0 10px #bebebe;
         border-radius: 0 5px 5px 0;transition: 1s"
      @click="edit()"
    >
      撰写
    </div>

    <transition name="el-fade-in">
      <div v-if="isNoteBook" style="width: 100%;height: 100%;z-index: 2000">
        <div style="padding-top: 78px">
          <div style="display: flex;justify-content: flex-start;">
<!--            <el-button-->
<!--              style="font-size: 16px;margin: 0 0px 10px 3vw;-->
<!--              padding-left: 6px;-->
<!--              padding-right: 6px;-->
<!--              background-image: linear-gradient(to left,lightpink, lightcoral);border: none"-->
<!--              type="primary" size="mini"><i class="el-icon-edit"> 撰写</i></el-button>-->
          </div>
          <div class="notebook-main">
            <el-collapse v-model="activeTitle">
              <el-collapse-item style="text-align: left" :key="index" v-for="(note,index) in allNotes" :title="note.title" :name="index">
                <div style="font-size: 12px;color: darkgrey">{{note.time}}</div>
                <div v-html="note.text"></div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </transition>

    <div class="box1" @click="album()">
      <h3 class="babel-font" >相册</h3>
    </div>
    <div class="box2" @click="notebook()">
      <h3 class="babel-font">记事本</h3>
    </div>
    <transition name="el-fade-in">
      <div class="main" v-if="!isClicked">
        <div class="font-body" >
            <div class="font-babel" style="transition: 1.3s;opacity: 1">
              <h3 style="font-weight: 400;;letter-spacing: 5px">{{nameLst[index].name}}</h3>
              <h4 style="font-weight: 300;letter-spacing: 2px">{{nameLst[index].ENGname}}</h4>
            </div>
          <div class="clickHere">
            <div class="clickHere-son" @click="clickIt">Click Here</div>
          </div>
        </div>
      </div>
    </transition>
    <div
      class="Nav"
      style="position: fixed;display: flex;justify-content: space-between;width: 100%;padding: 15px 0 15px 0;align-items: center;">
      <div style="margin-left: 30px;font-weight: 600">雅萱</div>
      <div class="clickHere-son" style="width: 60px;text-align: center;margin-right: 30px" @click="clickIt">Back</div>
    </div>
    <el-dialog :visible.sync="dialog.visible" width="86%">
      <img :src=dialog.src style="width: 100%">
      <el-button @click="removeImage(dialog.src)" type="danger" size="mini" style="margin-left: 80%" >删除</el-button>
    </el-dialog>
    <el-dialog
      title="撰写"
      :visible.sync="centerDialogVisible"
      width="92%"
      center>
      <el-row>
        <el-col :span="20">
          <el-input v-model="note.title" placeholder="标题"></el-input>
        </el-col>
        <el-col :span="24" style="margin-top: 10px">
          <el-input
            type="textarea" :autosize="{ minRows: 10, maxRows: 12}"
            v-model="note.text"
            placeholder="记事本内容">
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitNote()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "toHoneyIndex",
        data(){
          return{
              activeTitle:1,
              nameLst: [{
                  name:"雅萱",
                  ENGname:"Yaxuan"
              },{
                  name:"宝宝",
                  ENGname: "Honey"
              }],
              part1:true,
              part2:false,
              note:{
                  title: "",
                  text: "",
              },
              allNotes:[],
              centerDialogVisible:false,
              isClicked: false,
              box1: "",
              boxA: "",
              boxB: "",
              isAlbum: false,
              isNoteBook: false,
              babel1: null,
              babel2: null,
              picturesUrl:null,
              newImgSrc:[],
              dialog:{
                  src:'',
                  visible: false
              },
              NameInterval:null,
              indexInterval:null,
              index:0,
          }
        },
        computed:{
            activeName(){

            }
        },
        created(){
        },
        mounted() {
            let fontBabel = document.querySelector(".font-babel")
            this.NameInterval = setInterval(()=>{
                if(fontBabel.style.opacity === '0'){
                    fontBabel.style.opacity = '1'
                }else{
                    fontBabel.style.opacity = '0'
                }
            },1400)
            setTimeout(()=>{
                this.indexInterval = setInterval(()=>{
                    if(fontBabel.style.opacity === "0"){
                        if(this.index === 1){
                            this.index = 0
                        }else{
                            this.index = 1
                        }
                    }
                },1400)
            },900)
            this.babel1  = document.querySelectorAll(".babel-font")[0]
            this.babel2  = document.querySelectorAll(".babel-font")[1]
            this.boxA = document.querySelector(".box1")
            this.boxB = document.querySelector(".box2")
            let box1 = document.querySelector(".box1");
            setTimeout(() => {
                let box1 = document.querySelector(".box1");
                box1.style.borderRadius = "50% 50%";
                box1.style.top =  "-100px"
                box1.style.left =  "-100px"
                box1.style.transition = '1s ease'
                box1.style.opacity = '0.7'
                setTimeout(() => {
                    let box2 = document.querySelector(".box2");
                    let button = document.querySelector('.clickHere-son')
                    let fontBody = document.querySelector(".font-body");
                    box2.style.borderRadius = "50% 50%";
                    box2.style.bottom =  "-100px"
                    box2.style.right =  "-100px"
                    box2.style.transition = '1s ease'
                    box2.style.opacity = '0.8';
                },300)
            },500)
        },
        beforeCreate(){
            document.title = "致宝宝"
        },
        methods:{
            submitNote(){
                this.$axios.post('/submitNote',{time:new Date().toLocaleString(),title:this.note.title,text:this.note.text}).then(res => {
                    if(res.data.code === 200){
                        this.$message({
                            message: "提交成功",
                            type: "success"
                        })
                        this.note.text = this.note.text.replace(/\n/g,'<br>')
                        this.allNotes.splice(0,0,{time:new Date().toLocaleString(),...this.note})
                        this.centerDialogVisible = false;
                        this.note = {
                            title: "",
                            text: ""
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            getAllNote(){
                this.$axios.get('/getAllNote').then(res => {
                    this.allNotes = res.data.allNotes.reverse()
                    for(let i = 0;i<this.allNotes.length;i++){
                        this.allNotes[i].text = this.allNotes[i].text.replace(/\n/g,'<br>')
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            edit(){
                this.centerDialogVisible = true;
            },
            removeImage(src){
                this.$axios.post('/removeImage',{src:src}).then(res => {
                    if(res.data.code === 200){
                        this.$message({
                            message: "删除成功",
                            type: "warning"
                        });
                        this.dialog = {}
                        this.getAllImages()
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            seeDetail(src){
                this.dialog = {
                    src: src,
                    visible: true
                }
            },
            getAllImages(){
                this.$axios.get('/getImages').then(res => {
                    let srcs = res.data.dirs.map( item => `https://www.yezhikang.site:8081/static/${item}`)
                    this.picturesUrl = srcs;
                }).catch(error => {
                    console.log(error)
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            fileUploadSuccess(res,file,fileList){
                if(res.code === 200){
                    this.newImgSrc.push('https://www.yezhikang.site:8081/static/'+res.filePath)
                    this.$message({
                        message: "上传成功",
                        type: "success"
                    })
                    this.getAllImages()
                }
            },
            clickIt(){

                let box2 = document.querySelector(".box2");
                let box1 = document.querySelector(".box1");
                let nav = document.querySelector(".Nav")
                let babel1  = document.querySelectorAll(".babel-font")[0]
                let babel2  = document.querySelectorAll(".babel-font")[1]
                let windowWidth = window.innerWidth;
                let windowHeight = window.innerHeight;
                let edit = document.getElementsByClassName("edit")[0]
                if(!this.isClicked && !this.isAlbum && !this.isNoteBook) {
                    let fontBabel = document.querySelector(".font-babel")
                    this.isClicked = !this.isClicked;
                    box1.style.transition = '1s ease'
                    box1.style.top = `${windowHeight/2 - 160}px`
                    box1.style.left = `${windowWidth/2 - 50}px`
                    box2.style.bottom = `${windowHeight/2 - 160}px`
                    box2.style.right = `${windowWidth/2 - 50}px`;
                    babel1.style.opacity = 1
                    babel2.style.opacity = 1
                    setTimeout(() => nav.style.top = "0",400)
                }else if(this.isClicked && !this.isAlbum && !this.isNoteBook){
                    // let fontBabel = document.querySelector(".font-babel")
                    // setInterval(()=>{
                    //     if(fontBabel.style.opacity === '0'){
                    //         fontBabel.style.opacity = '1'
                    //     }else{
                    //         fontBabel.style.opacity = '0'
                    //     }
                    // },2020)
                    // setTimeout(()=>{
                    //     setInterval(()=>{
                    //         if(fontBabel.style.opacity === "0"){
                    //             if(this.index === 1){
                    //                 this.index = 0
                    //             }else{
                    //                 this.index = 1
                    //             }
                    //         }
                    //     },2020)
                    // },1500)
                    this.$nextTick(() => {
                        clearInterval(this.NameInterval)
                        clearInterval(this.indexInterval)

                    })
                    nav.style.top = "-70px"
                    setTimeout(() => {
                        babel1.style.opacity = 0
                        babel2.style.opacity = 0
                        box1.style.top = '-100px'
                        box1.style.left = '-100px'
                        box2.style.bottom = '-100px'
                        box2.style.right = '-100px'
                        this.isClicked = false;
                    },100)
                }else{

                    this.boxA.style.display = 'flex'
                    this.boxB.style.display = 'flex'
                    setTimeout(()=>{
                        box1.style.opacity = 0.8;
                        box2.style.opacity = 0.8;
                    },400)
                    box1.style.top = `${windowHeight/2 - 160}px`
                    box1.style.left = `${windowWidth/2 - 50}px`
                    box2.style.bottom = `${windowHeight/2 - 160}px`
                    box2.style.right = `${windowWidth/2 - 50}px`;
                    edit.style.left = "-80px"
                    this.babel1.style.margin = "0"
                    this.babel2.style.margin = "0"
                    this.babel1.style.opacity = 1;
                    this.babel2.style.opacity = 1
                    this.isAlbum = false;
                    this.isNoteBook = false;
                }
            },
            album(){
                let babel1  = document.querySelectorAll(".babel-font")[0]
                let babel2  = document.querySelectorAll(".babel-font")[1]
                if(this.isClicked){
                    this.isAlbum = true;
                    let box1 = document.querySelector(".box1");
                    let box2 = document.querySelector(".box2");
                    babel1.style.marginLeft = "60px"
                    babel1.style.marginTop = "60px"
                    babel2.style.opacity = 0
                    box2.style.opacity = 0
                    box1.style.opacity = 1;
                    box1.style.top = '-100px'
                    box1.style.left = '-100px'
                    setTimeout(() => {
                        this.getAllImages()
                        this.boxB.style.display = 'none'
                    },600)
                }
            },
            notebook(){
                if(this.isClicked){
                    this.getAllNote();
                    this.isNoteBook = true
                    let edit = document.getElementsByClassName("edit")[0]
                    let box1 = document.querySelector(".box1");
                    let box2 = document.querySelector(".box2");
                    this.babel2.style.marginRight = "85px"
                    this.babel2.style.marginBottom = "80px"
                    this.babel1.style.opacity = 0
                    box1.style.opacity = 0
                    box2.style.opacity = 1
                    box2.style.bottom = '-100px'
                    box2.style.right = '-100px'
                    edit.style.left = "0"
                    setTimeout(() => {
                        this.boxA.style.display = 'none'
                    },600)
                }
            }
        }
    }
</script>

<style scoped>

  .main{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box1{
    position: fixed;
    width: 200px;
    height: 200px;
    background-image: linear-gradient(to right,lightpink, #f88585,lightcoral);
    opacity: 0.5;
    transition: 2s ease;
    left: -200px;
    top: -200px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .box2{
    position: fixed;
    z-index: 998;
    width: 200px;
    height: 200px;
    background-image: linear-gradient(to left,lightpink, lightcoral);
    opacity: 0.5;
    transition: 2s ease;
    bottom: -200px;
    right: -200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box:hover{
    border-radius: 50% 50%;
    transform: translate(50px,50px);
    opacity: 1;
  }
  .main h1,h2,h3,h4,p{
    margin: 0;
    padding: 0;
  }

  .font-body{
    transition: 1.4s;
    width: 100%;

  }

  .clickHere{
    width: calc(100% - 25px);
    padding-right: 25px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    margin-top: 17px;
    font-size: 13px;
    transition: 1s ease;
  }

  .Nav{
    box-shadow: 0 0 10px lightgrey;
    top:-70px;
    transition: 0.6s ease;
    z-index: 5;
    background-color: white;
  }

  .clickHere-son{
    padding: 4px 6px;
    display: block;
    border-radius: 5px;
    color: white;
    box-shadow: 0 0 10px lightgrey;
    opacity: 1;
    transition: 1s;
    background-image: linear-gradient(to left,lightpink, lightcoral);;
  }

  .clickHere-son{
    cursor: pointer;
  }
  .clickHere-son:focus{

  }
  .babel-font{
    font-weight: 700;
    color: white;
    opacity: 0;
    transition: 0.7s ease;
    letter-spacing: 2px;
  }

  .demo-image__lazy{
    width: 90%;
    overflow: scroll;
    height: 100%;
    margin: 0 auto;
    text-align: left;
  }

  .notebook-main{
    margin: 0 auto 30px auto;
    width: 90vw;
    padding: 10px;
    box-shadow: 0 0 14px #b4b4b4;
  }

  .album-main{
    margin: 0 auto 30px auto;
    width: 90vw;
    justify-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
    padding: 10px;
    box-shadow: 0 0 14px #b4b4b4;
    background-color: white;
  }


  .photo{
    background-position: 50% 50%;
    background-size: cover;
    width: 30vw;height: 30vw;
  }
  .add{
    background:floralwhite;
    width: 30vw;height: 30vw;
  }

  >>>.el-upload{
    width: 30vw;
    height: 30vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  >>>.el-upload-list{
    display: none;
  }

  >>>.el-dialog__body{
    padding-bottom: 6px;
  }
  >>>.el-collapse-item__content{
    padding-bottom: 8px;
  }
</style>
