import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('../pages/Index.vue')
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../pages/LoginRegister'),
      redirect:'/sign/login',
      children:[
        {
          path:'/sign/login',
          name:'login',
          component: () => import('../components/UserMonitor/TheLogin'),
        },
        {
          path: '/sign/register',
          name: 'register',
          component: () => import('../components/UserMonitor/TheRegister')
        }
      ]
    },
    {
      path: '/da',
      name: 'da',
      component: () => import('../pages/Da')
    },
    {
      path:'/celebrityAnalysis',
      name:'celebrityAnalysis',
      component: () => import('../pages/CelebrityAnalysis'),
      alias:'/网红价值',
      redirect:{
        name: "博主搜索"
      },
      children:[
        {
          name: '博主搜索',
          path: '/celebrityAnalysis/博主搜索',
          component: () => import('../components/CelebrityAnalysis/BlogerSearch')
        },
        {
          name: '数据分析',
          path: '/celebrityAnalysis/数据分析',
          component: () => import('../components/CelebrityAnalysis/DataAnalysis'),
          redirect: '/celebrityAnalysis/数据分析/数据统计',
          children:[
            {
              name:'数据统计',
              path: '/celebrityAnalysis/数据分析/数据统计',
              component: () => import('../components/DataCount'),
            },
            {
              name:'历史微博',
              path: '/celebrityAnalysis/数据分析/历史微博',
              component: () => import('../components/CelebrityAnalysis/HistoryBlog')
            },
            {
              name:'历史广告微博',
              path: '/celebrityAnalysis/数据分析/历史广告微博',
              component: () => import('../components/CelebrityAnalysis/HistoryAdvBlog')
            },
            {
              name:'粉丝画像',
              path: '/celebrityAnalysis/数据分析/粉丝画像',
              component: () => import('../components/CelebrityAnalysis/FansPortrait')
            },
            {
              name:'相似博主',
              path: '/celebrityAnalysis/数据分析/相似博主',
              component: () => import('../components/CelebrityAnalysis/SimilarBlogger')
            }
          ]
        },
        {
          name: '微博排行榜',
          path: '/celebrityAnalysis/微博排行榜',
          redirect: {
            name: '博主影响力排行榜'
          },
          component: () => import("../components/CelebrityAnalysis/SinaRank"),
          children:[
            {
              name:'博主影响力排行榜',
              path: '/celebrityAnalysis/微博排行榜/博主影响力排行榜',
              component: () => import('../components/CelebrityAnalysis/BloggerRank')
            },
            {
              name:'广告微博排行榜',
              path: '/celebrityAnalysis/微博排行榜/广告微博排行榜',
              component: () => import("../components/CelebrityAnalysis/AdvRank")
            },
          ]
        },
        {
          name: '电商数据分析',
          path: '/celebrityAnalysis/电商数据分析',
          redirect: {
            name: "商品搜索"
          },
          component: () => import("../components/CelebrityAnalysis/RetailersData"),
          children:[
            {
              name: '商品搜索',
              path: '/celebrityAnalysis/电商数据分析/商品搜索',
              component: () => import("../components/CelebrityAnalysis/GoodsSearch")
            },
            {
              name: '商品排行榜',
              path: '/celebrityAnalysis/电商数据分析/商品排行榜',
              component: () => import("../components/CelebrityAnalysis/GoodsRank")
            },
            {
              name: '电商达人排行榜',
              path: '/celebrityAnalysis/电商数据分析/电商达人排行榜',
              component: () => import("../components/CelebrityAnalysis/CelebrityRank")
            },
            {
              name: '团购排行榜',
              path: '/celebrityAnalysis/电商数据分析/团购排行榜',
              component: () => import("../components/CelebrityAnalysis/GroupPurchaseRank")
            }
          ]
        },
        {
          name: "微博监控",
          path: "/celebrityAnalysis/微博监控",
          component: () => import("../components/CelebrityAnalysis/SinaMonitor")
        },
        {
          name: "个人中心",
          path: "/celebrityAnalysis/个人中心",
          component: () => import("../components/CelebrityAnalysis/PersonalCentre")
        }
      ],
    },
    {
      name:"NotLogin",
      component: () => import("../pages/NotLogin"),
      path:"/NotLogin"
    },
    {
      name:"NotFound",
      component: () => import("../pages/NotFound"),
      path:"/NotFound"
    },
    {
      name:"MobileSign",
      path:"/m/sign",
      component: () => import('../mobile/pages/MobileLogReg'),
      redirect:"/m/sign/login",
      children:[
        {
          name:"MobileLogin",
          component: () => import( "../mobile/components/MobileLogin"),
          path: "/m/sign/login"
        },
        {
          name:"MobileRegister",
          component: () => import("../mobile/components/MobileRegister"),
          path: "/m/sign/register"
        }
      ]
    },
    {
      name:"MobileMainBody",
      path:"/m/main",
      component: () => import("../mobile/components/MobileMainBody"),
      redirect: {
        name: "MobileIndex"
      },
      children:[
        {
          name: "MobileIndex",
          path:"/m/main/index",
          component: () => import('../mobile/components/MobileIndex')
        },
        {
          name: "MobileCelebrityAnalysis",
          path: "/m/main/celebrityAnalysis",
          component: () => import('../mobile/components/MobileCelebrityAnalysis'),
          redirect:{
            name: "手机端博主搜索"
          },
          children:[
            {
              path:"/m/main/celebrityAnalysis/博主搜索",
              name: "手机端博主搜索",
              component: () => import("../mobile/components/MobileBloggerSearch")
            },
            {
              path:"/m/main/celebrity/Analysis/数据统计",
              name: "手机端数据统计",
              component: () => import("../mobile/components/MobileDataCount"),
              redirect:{
                name: "手机端数据分析"
              },
              children:[
                {
                  path:"/m/main/celebrityAnalysis/数据统计/手机端数据分析",
                  name: "手机端数据分析",
                  component: () => import("../mobile/components/MobileDataAnalysis")
                },
                {
                  path:"/m/main/celebrityAnalysis/数据统计/手机端历史微博",
                  name: "手机端历史微博",
                  component: () => import("../mobile/components/MobileHistoryBlog")
                },
                {
                  path:"/m/main/celebrityAnalysis/数据统计/手机端粉丝画像",
                  name: "手机端粉丝画像",
                  component: () => import("../mobile/components/MobileFansPortrait")
                }
              ]
            }
          ]
        },
        {
          name: "MobileUserIndex",
          path:"/m/main/userIndex",
          component: () => import("../mobile/components/UserIndex")
        },

      ]
    },
    {
      name: "blogIndex",
      path: '/',
      component: () => import("../mobile/pages/BlogIndex")
    },
    {
      name: "write",
      path: '/write',
      component: () => import("../mobile/pages/writeMarkdown")
    },
    {
      name: "articles",
      path: '/articles/:hash',
      component: () => import("../pages/TheArticles")
    },
    {
      name: 'illness',
      path: '/illness',
      component: () => import("../mobile/pages/Illness")
    },
    {
      name: 'me',
      path: '/me',
      component: () => import("../mobile/components/AboutMe")
    },
    {
      name: 'pages',
      path: '/pages',
      component: () => import("../mobile/components/ThePages")
    },
    {
      name: "contact",
      path: "/contact",
      component: () => import("../mobile/components/ContactMe")
    },
    {
      name: 'to-honey',
      path: '/to-honey',
      component: () => import("../pages/toHoneyIndex")
    },
    {
      name: 'mis-homework-front-ground',
      path: '/mis-homework/front-ground',
      component: () => import('../pages/int-management-homework/FrontGround')
    },
    {
      name: 'mis-homework-back-ground',
      path: '/mis-homework/back-ground',
      component: () => import('../pages/int-management-homework/BackGround'),
      redirect: {
        name: 'mis-homework-back-ground-all'
      },
      children:[
        {
          name: 'mis-homework-back-ground-all',
          path: '/mis-homework/back-ground/all',
          component: () => import('../pages/int-management-homework/AllNews')
        },
        {
          name: 'mis-homework-back-ground-edit',
          path: '/mis-homework/back-ground/edit',
          component: () => import('../pages/int-management-homework/EditNews')
        },
        {
          name: 'mis-homework-back-ground-create',
          path: '/mis-homework/back-ground/create',
          component: () => import('../pages/int-management-homework/CreateNews')
        }
      ]
    }
  ]
})
