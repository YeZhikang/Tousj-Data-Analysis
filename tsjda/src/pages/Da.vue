<template>
    <div>
      <Nav></Nav>

      <transition name="el-fade-in">
        <div v-show="hasUploaded">
          <div class="introUnit">
            <transition name="el-fade-in-linear">
              <div class="introBlock" v-show="show">
                <div id="intro">
                  <h1>DIY 数据分析</h1>
                  <p>将数据拖入框中</p>
                  <p>开始进行数据分析，并且制作丰富的图表！<small> ( 文件最大不超过10MB )</small></p>
                </div>
                <div id="method" >
                  <el-button style="float: right;color:white;" size="medium" type="text" @click="show = !show"><i class="el-icon-close"></i></el-button>
                </div>
              </div>
            </transition>
          </div>
          <div class="DABlock">
            <el-upload
              class="upload-demo"
              drag
              action="http://121.43.155.100:8081/fileUpload"
              accept="text/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              :multiple="false"
              :on-success="fileUploadSuccess"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传 csv/excel/txt 文件，且不超过10MB</div>
            </el-upload>
          </div>
        </div>
      </transition>
      <div class="daBlock" v-if="!hasUploaded">
        <div class="daIntro">
          <el-row>
            <el-col :span="6">
              <el-card>
                <el-button type="text" style="float: right;color: darkgrey"><i class="el-icon-close"></i></el-button>
                <h2><i class="el-icon-document"></i> {{file.name.split('.')[0]}}</h2>
                <div class="mainInfo">
                  <h5>基本信息 <i class="el-icon-success" style="color: #009a61"></i></h5>
                  <p>文件大小：{{Math.floor(file.size/1024)}}KB<br>数据个数：{{file.dataLength}} 条</p>
                  <el-alert
                    v-if="file.colObj.length>0"
                    :closable="false"
                    :title="'存在空值的字段:' + file.colObj.join('、') + '  '"
                    type="warning">
                  </el-alert>
                  <el-alert
                    v-if="file.colObj.length==0"
                    :closable="false"
                    :title="'无空值字段'"
                    type="success">
                  </el-alert>
                </div>
              </el-card>
            </el-col>
            <el-col :span="17" :offset="1">
              <template>
                <el-table :data="file.objLst" style="width: 100%"
                          stripe>
                  <el-table-column
                    v-for="(data) in Object.keys(file.objLst[0])" :prop="data" :label="data" width="120">
                  </el-table-column>
                </el-table>
              </template>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;border-top: 2px dashed darkgrey">

            <el-col :span="6">
              <h3 style="color: #6b6b6b">基本情况 <small>Main Situation</small></h3>
              <radar-chart :id="'heihei'" :class-name="'chartA'"></radar-chart>
<!--              <RadarCharts :id="'a1'" :className="'cn'" :title="'属性字段'" :legends="legends" :indicator="indicator" :dataA="info"></RadarCharts>-->
            </el-col>
            <el-col :span="16" :offset="2">
              <el-row style="margin-top: 30px">
                <el-col :offset="20" :span="2">
                <el-button type="primary" size="mini" @click="check()"> <i class="el-icon-check"></i> 确认更改</el-button>
                </el-col>
              </el-row>
              <el-table :data="file.NaNInfo" style="width: 100%" height="300" :row-class-name="tableRowClassName">
                <el-table-column
                  :label="'字段名'" prop="name">
                </el-table-column>
                <el-table-column
                  :label="'字段类型'" prop="type">
                  <template slot-scope="scope">
                    <span v-if="file.NaNInfo[scope.$index].type">{{scope.row.type}}</span>
                    <el-select v-model="file.NaNInfo[scope.$index].type" placeholder="请选择" v-if="!file.NaNInfo[scope.$index].type">
                      <el-option
                        v-for="type in colTypeOptions"
                        :key="type"
                        :label="type"
                        :value="type">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="'操作'">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">
                      更改数据类型
                    </el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">
                      删除字段
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row style="margin-top: 30px;border-top: 1px dashed lightgray" v-for="(behavior,index) in userBehaviors">
            <el-col :span="12" >
              <h2>step {{index+1}} </h2>
              <h4>请输入步骤</h4>
              <div class="block">
                <el-cascader
                  v-model="userBehaviors[index]"
                  :options="options"
                  @change="handleChange"></el-cascader>
              </div>
            </el-col>
            <el-col :span="9" :offset="1">
              <h4>graph {{index+1}}</h4>
              <line-chart :id="'graph'+index" :class-name="'chartA'"></line-chart>
            </el-col>

            <el-col :span="1" :offset="1" style="margin-top: 20px">
              <el-button icon="el-icon-plus" size="mini" type="success" @click="addBehavior(index)" circle></el-button><br><br>
              <el-button icon="el-icon-minus" size="mini" type="warning" @click="delBehavior(index)"  circle></el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="colChange"
        width="30%"
        center>
        <span>这将改变你的文件格式，可能导致错误。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="colChange = false">取 消</el-button>
          <el-button type="primary" @click="submitFormChange">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
    import Nav from "../components/TheNav";
    import Footer from "../components/TheFooter";
    import RadarCharts from "../components/charts/RadarCharts";
    import RadarChart from "../components/charts/RadarChart";
    import LineChart from "../components/charts/LineChart";
    export default {
        name: "Da",
        components: {LineChart, RadarChart, RadarCharts, Footer, Nav},
        data(){
            return{

                userBehaviors:[["null"]],
                colTypeOptions:["str","int","datetime","float","bool"],
                colTypeChange:[],
                colChange:false,
                show:true,
                hasUploaded:true,
                fileExt:["sheet","csv","txt"],
                file:null,
                deleteCols:[],
                // options:[
                //
                //     {
                //         value: 'groupby',
                //         label: '归并',
                //         children:[
                //             // {
                //             //     value: 'colA',
                //             //     label: 'colA',
                //             //     children: [
                //             //          {
                //             //            value: 'count',
                //             //            label: '各种情况查看'
                //             //          },
                //             //          {
                //             //            value: 'max',
                //             //            label: '最大值'
                //             //          }
                //             //          ...
                //             //     ]
                //             // }
                //         ]
                //     },
                //     {
                //         value: 'timesort',
                //         label: '时间排序',
                //         children:[
                //             // {
                //             //     value: 'colA',
                //             //     label: 'colA',
                //             //     children: [
                //             //          {
                //             //            value: 'count',
                //             //            label: '各种情况查看'
                //             //          },
                //             //          {
                //             //            value: 'max',
                //             //            label: '最大值'
                //             //          }
                //             //          ...
                //             //     ]
                //             // }
                //         ]
                //     },
                //
                //     {
                //         value: '比较',
                //         label: '比较',
                //         children:[
                //             // {
                //             //     value: '平均值比较',
                //             //     label: '平均值比较',
                //             //     children: [
                //             //          {
                //             //            value: 'colA',
                //             //            label: 'colA'
                //             //          },
                //             //          {
                //             //            value: 'colB',
                //             //            label: 'colB'
                //             //          }
                //             //          ...
                //             //     ]
                //             //     value: 'size比较',
                //             //     label: 'size比较',
                //             //     children: [
                //             //          {
                //             //            value: 'colA',
                //             //            label: 'colA'
                //             //          },
                //             //          {
                //             //            value: 'colB',
                //             //            label: 'colB'
                //             //          }
                //             //          ...
                //             //     ]
                //             // }
                //         ]
                //     }
                // ]
                options:null
            }
        },
        mounted(){
        },
        methods:{
            handleEdit(index,row){
                this.file.NaNInfo[index].type = "";
                console.log(this.file.NaNInfo)
            },
            handleDelete(index,row){
                this.deleteCols.push(row.name);
                this.file.NaNInfo.splice(index,1);
                this.$message({
                    message:"删除成功",
                    type:"success"
                })
            },
            tableRowClassName({row, rowIndex}) {
                if (row.type === "datetime") {
                    return 'warning-row';
                } else if (row.type === "int") {
                    return 'success-row';
                }
                return '';
            },
            addBehavior(index){
                this.userBehaviors.splice(index+1,0,"null")
            },
            delBehavior(index){
                this.userBehaviors.splice(index,1)
            },
            fileUploadSuccess(res,file,fileList){
                if(res.code === 200){
                    this.$message({
                        message:"文件上传成功，开始分析",
                        type:"success"
                    });
                    setTimeout(()=> {
                        this.hasUploaded = false;
                        this.$nextTick(()=> {
                            this.file = file;
                            this.file.dataLength = res.dataLength;
                            this.file.colObj = res.colObj;
                            this.file.objLst = res.objLst;
                            this.file.NaNInfo = res.NaNInfo;
                            this.options = res.options;
                            console.log(res.options);
                            this.$store.dispatch("changeBaseItem",res.NaNInfo);
                        })
                    },1000)
                }
                if(res.code === 500){
                    this.$message({
                        message:"文件上传失败，请稍后再试",
                        type:"error"
                    })
                }
            },
            check(){
                this.colChange = true;
            },
            submitFormChange(){
                this.colChange = false;
                this.$message({
                    type:"success",
                    message:"修改成功"
                });
                this.$store.dispatch("changeColTypeChanges",this.file.NaNInfo);
                this.$store.dispatch("changeDeleteCols",this.deleteCols);
                console.log(this.$store.state.userBehavior);
            },

            handleChange(value){
                console.log(value)
                let behavior = {
                    value: value,
                    fileName: this.file
                }
                this.$axios.post("/uploadBehavior",behavior).then(res => {
                    this.$store.dispatch("updateAnalyseProcess",value);
                    this.$store.dispatch("updateAnalyseProcessResult",res.result)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
  .daBlock{
    width: 1100px;
    margin: 0 auto;
  }
  .introBlock h1{
    font-size: 32px;
    font-weight: 500;
    margin: 0px 0 5px 0;
  }

  .introUnit{
    background-color: #009a61;

  }

  .introBlock p {
    font-size:17px;
    margin: 5px 0;
  }

  .daIntro{
    text-align: left;
    margin: 20px 0;
  }

  .introBlock{
    width: 1100px;
    margin: 0 auto;
    text-align: left;
    color: white;
    display: flex;
    justify-content: space-between;
  }

  #intro{
    padding: 20px 0;
  }

  .DABlock{
    margin-top: 100px;
  }

  >>>.el-upload-dragger{
    width: 800px;
    height: 300px;
    border: 2px dashed #009a61;
  }

  >>>.el-icon-upload{
    margin-top: 100px;
  }

  >>>.el-upload__text em{
    color: #009a61;
  }

  >>>.upload-demo{
    width: 800px;
    margin: 0 auto;
  }

  >>>.warning-row {
    background: oldlace;
  }

  >>>.success-row {
    background: #f0f9eb;
  }

  >>>.el-input__inner{
    width: 320px;
  }

</style>
