<template>
  <div>
    <div class="DC-Block-Par">
      <div class="DC-Block">
        <div class="DC-son-next">
          <div class="son-intro">
            <h4>粉丝终端分析</h4>
          </div>
        </div>
        <div class="graph">
          <section>
            <chart
              :options="equipPie"
              :init-options="initOptions"
              ref="pie"
              autoresize
              :height="height"
            />
          </section>
        </div>
      </div>

      <div class="DC-Block">
        <div class="DC-son-next">
          <div class="son-intro">
            <h4>粉丝性别分布</h4>
          </div>
        </div>
        <div class="graph">
          <section>
            <chart
              :options="genderPie"
              :init-options="initOptions"
              ref="pie2"
              autoresize
              :height="height"
            />
          </section>
          <section>
            <chart
              :options="genderBar"
              :init-options="initOptions"
              ref="pie2"
              autoresize
              :height="height"
            />
          </section>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import equipPie from '../../data/pie';
    import genderPie from '../../data/MobilegenderPie';
    import genderBar from '../../data/genderBar';
    import ECharts from '../../components/charts/Echarts2'
    import { Loading } from 'element-ui';

    export default {
        name: "MobileFansPortrait",
        components:{
            chart: ECharts
        },
        data(){
            return {
                equipPie: equipPie,
                genderPie: genderPie,
                genderBar:genderBar,
                userId:this.$route.query.userId,
                height: "240px"
            }
        },
        mounted() {
            this.getDetailInfo({userId:this.userId})
            this.getGenderInfo({userId:this.userId})
        },
        methods:{
            getDetailInfo(userId){
                console.log(equipPie);
                let loadingInstance1 = Loading.service({ target: ".DC-Block-Par" });
                this.$axios.post('/getEquipInfo',userId).then(res => {
                    loadingInstance1.close()
                    equipPie.series[0].data = res.data.equip_list;
                    console.log(equipPie)
                    return equipPie
                }).catch(error => {
                    console.log(error);
                });
            },
            getGenderInfo(userId){
                this.$axios.post('/getGenderInfo',userId).then(res => {
                    genderPie.series[0].data = [
                        {
                            value:res.data.genderInfo.f,
                            name:"女性"
                        },
                        {
                            value:res.data.genderInfo.m,
                            name:"男性"
                        }
                    ];
                    genderBar.visualMap.max = res.data.genderInfo.m;
                    genderBar.visualMap.min = res.data.genderInfo.f;
                    genderBar.dataset.source.push([res.data.genderInfo.m,"男性"],[res.data.genderInfo.f,"女性"])
                    // equipPie.series[0].data = res.data.genderInfo;
                    // console.log(equipPie)
                    // return equipPie
                    console.log(res)
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
  .DC-son{
    justify-content: space-between;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .DC-son small{
    font-size: 12px;
    color: rgb(111,111,111);
    margin-left: 15px;
  }

  .son-intro h4{
    padding-left: 10px;
    border-left: 4px solid #409EFF;
  }

  .son-intro .el-button{
    padding: 0;
  }

  .time-data{
    width: 100%;
    border: 0.5px solid #b2aaaa;
    padding: 7px 5px;
    display: flex;
    justify-content: space-between;
    border-radius: 4px;

  }

  .time-data-block{
    width: 25%;
    text-align: center;
  }

  .time-data-block h3{
    font-weight: 400;
    font-size: 18px;
    margin:0 5px 0 5px
  }

  .time-data-block h5{
    margin:0 0 8px 0;
    font-size: 13px;
    color: #898989;
  }

  section{
    width: 100%;
  }

  .graph{
    padding: 15px 10px 5px 10px;
    border: 1px dashed rgb(230,230,230);
  }

  .DC-son-next{
    justify-content: space-between;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .DC-son-next small{
    font-size: 12px;
    color: rgb(111,111,111);
    margin-left: 15px;
  }
  .DC-son-next h4{
    margin-top: 20px;
  }


</style>
