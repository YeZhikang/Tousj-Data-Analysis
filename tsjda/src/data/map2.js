const dataList = [{
  name: "南海诸岛",
  value: 0
},
  {
    name: '北京',
    value: 54
  },
  {
    name: '天津',
    value: 13
  },
  {
    name: '上海',
    value: 40
  },
  {
    name: '重庆',
    value: 75
  },
  {
    name: '河北',
    value: 13
  },
  {
    name: '河南',
    value: 83
  },
  {
    name: '云南',
    value: 11
  },
  {
    name: '辽宁',
    value: 19
  },
  {
    name: '黑龙江',
    value: 15
  },
  {
    name: '湖南',
    value: 69
  },
  {
    name: '安徽',
    value: 60
  },
  {
    name: '山东',
    value: 39
  },
  {
    name: '新疆',
    value: 4
  },
  {
    name: '江苏',
    value: 31
  },
  {
    name: '浙江',
    value: 104
  },
  {
    name: '江西',
    value: 36
  },
  {
    name: '湖北',
    value: 1052
  },
  {
    name: '广西',
    value: 33
  },
  {
    name: '甘肃',
    value: 7
  },
  {
    name: '山西',
    value: 9
  },
  {
    name: '内蒙古',
    value: 7
  },
  {
    name: '陕西',
    value: 22
  },
  {
    name: '吉林',
    value: 4
  },
  {
    name: '福建',
    value: 18
  },
  {
    name: '贵州',
    value: 5
  },
  {
    name: '广东',
    value: 98
  },
  {
    name: '青海',
    value: 1
  },
  {
    name: '西藏',
    value: 0
  },
  {
    name: '四川',
    value: 44
  },
  {
    name: '宁夏',
    value: 4
  },
  {
    name: '海南',
    value: 22
  },
  {
    name: '台湾',
    value: 3
  },
  {
    name: '香港',
    value: 5
  },
  {
    name: '澳门',
    value: 5
  }
];
export default {
  tooltip: {
    triggerOn: "click",
    formatter: function(e, t, n) {
      return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
    }
  },
  visualMap: {
    fontSize:"10",
    min: 0,
    max: 100000,
    left: 26,
    bottom: 70,
    showLabel: !0,
    text: ["高", "低"],
    pieces: [{
      gt: 10000,
      label: "> 10000 人",
      color: "#7f1100"
    }, {
      gt: 1000,
      lt: 2000,
      label: "1000 - 2000 人",
      color: "#ff472a"
    }, {
      gt: 500,
      lt: 1000,
      label: "500 - 1000 人",
      color: "#ff6c62"
    }, {
      gt: 250,
      lt: 500,
      label: "250 - 500 人",
      color: "#ffa459"
    }, {
      gt: 0,
      lt: 250,
      color: "#f5ffa3",
      label: "0 - 250 人",
    }],
  },
  geo: {
    map: "china",
    roam: !1,
    scaleLimit: {
      min: 1,
      max: 2
    },
    zoom: 1.23,
    top: 120,
    label: {
      normal: {
        show: !0,
        fontSize: "10",
        color: "rgba(0,0,0,0.7)"
      }
    },
    itemStyle: {
      normal: {
        //shadowBlur: 50,
        //shadowColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: "rgba(0, 0, 0, 0.2)"
      },
      emphasis: {
        areaColor: "#f2d5ad",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0
      }
    }
  },
  series: [{
    name: "确诊病例",
    type: "map",
    geoIndex: 0,
    data: dataList
  }]
}
