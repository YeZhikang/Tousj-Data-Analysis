import Vue from 'vue'
import Router from 'vue-router'
import Index from "../pages/Index";
import Da from "../pages/Da";
import CodeTest from "../pages/CodeTest";
import TheBackground from "../pages/TheBackground";
import CelebrityAnalysis from "../pages/CelebrityAnalysis";
import DataCount from "../components/DataCount";
import HistoryBlog from "../components/CelebrityAnalysis/HistoryBlog";
import BlogerSearch from "../components/CelebrityAnalysis/BlogerSearch";
import SinaRank from "../components/CelebrityAnalysis/SinaRank";
import BloggerRank from "../components/CelebrityAnalysis/BloggerRank";
import AdvRank from "../components/CelebrityAnalysis/AdvRank";
import GoodsSearch from "../components/CelebrityAnalysis/GoodsSearch";
import RetailersData from "../components/CelebrityAnalysis/RetailersData";
import GoodsRank from "../components/CelebrityAnalysis/GoodsRank";
import CelebrityRank from "../components/CelebrityAnalysis/CelebrityRank";
import GroupPurchaseRank from "../components/CelebrityAnalysis/GroupPurchaseRank";
import SinaMonitor from "../components/CelebrityAnalysis/SinaMonitor";
import PersonalCentre from "../components/CelebrityAnalysis/PersonalCentre";
import DataAnalysis from "../components/CelebrityAnalysis/DataAnalysis";
import HistoryAdvBlog from "../components/CelebrityAnalysis/HistoryAdvBlog";
import FansPortrait from "../components/CelebrityAnalysis/FansPortrait";
import SimilarBlogger from "../components/CelebrityAnalysis/SimilarBlogger";
import LoginRegister from "../pages/LoginRegister";
import TheLogin from "../components/UserMonitor/TheLogin";
import TheRegister from "../components/UserMonitor/TheRegister";
import NotLogin from "../pages/NotLogin";
import MobileLogReg from "../mobile/pages/MobileLogReg";
import MobileLogin from "../mobile/components/MobileLogin";
import MobileIndex from "../mobile/components/MobileIndex";
import MobileMainBody from "../mobile/components/MobileMainBody";
import MobileCelebrityAnalysis from "../mobile/components/MobileCelebrityAnalysis";
import MobileBloggerSearch from "../mobile/components/MobileBloggerSearch";
import MobileDataCount from "../mobile/components/MobileDataCount";
import MobileDataAnalysis from "../mobile/components/MobileDataAnalysis";
import MobileFansPortrait from "../mobile/components/MobileFansPortrait";
import MobileHistoryBlog from "../mobile/components/MobileHistoryBlog";
import MobileRegister from "../mobile/components/MobileRegister";
import UserIndex from "../mobile/components/UserIndex";
import NotFound from "../pages/NotFound";
import toHoney from "../mobile/components/toHoney";
import BlogIndex from "../mobile/pages/BlogIndex";
import writeMarkdown from "../mobile/pages/writeMarkdown";
import TheArticles from "../pages/TheArticles";
import Illness from "../mobile/pages/Illness";
import AboutMe from "../mobile/components/AboutMe";
import ThePages from "../mobile/components/ThePages";
import ContactMe from "../mobile/components/ContactMe";
import test from "../mobile/pages/test";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/sign',
      name: 'sign',
      component: LoginRegister,
      redirect:'/sign/login',
      children:[
        {
          path:'/sign/login',
          name:'login',
          component:TheLogin
        },
        {
          path: '/sign/register',
          name: 'register',
          component:TheRegister
        }
      ]
    },
    {
      path: '/da',
      name: 'da',
      component: Da
    },
    {
      path:'/testCode',
      name:'tc',
      component:TheBackground
    },
    {
      path:'/celebrityAnalysis',
      name:'celebrityAnalysis',
      component:CelebrityAnalysis,
      alias:'/网红价值',
      redirect:{
        name: "博主搜索"
      },
      children:[
        {
          name: '博主搜索',
          path: '/celebrityAnalysis/博主搜索',
          component: BlogerSearch
        },
        {
          name: '数据分析',
          path: '/celebrityAnalysis/数据分析',
          component:DataAnalysis,
          redirect: '/celebrityAnalysis/数据分析/数据统计',
          children:[
            {
              name:'数据统计',
              path: '/celebrityAnalysis/数据分析/数据统计',
              component: DataCount
            },
            {
              name:'历史微博',
              path: '/celebrityAnalysis/数据分析/历史微博',
              component: HistoryBlog
            },
            {
              name:'历史广告微博',
              path: '/celebrityAnalysis/数据分析/历史广告微博',
              component: HistoryAdvBlog
            },
            {
              name:'粉丝画像',
              path: '/celebrityAnalysis/数据分析/粉丝画像',
              component:FansPortrait
            },
            {
              name:'相似博主',
              path: '/celebrityAnalysis/数据分析/相似博主',
              component: SimilarBlogger
            }
          ]
        },
        {
          name: '微博排行榜',
          path: '/celebrityAnalysis/微博排行榜',
          redirect: {
            name: '博主影响力排行榜'
          },
          component: SinaRank,
          children:[
            {
              name:'博主影响力排行榜',
              path: '/celebrityAnalysis/微博排行榜/博主影响力排行榜',
              component:BloggerRank
            },
            {
              name:'广告微博排行榜',
              path: '/celebrityAnalysis/微博排行榜/广告微博排行榜',
              component:AdvRank
            },
          ]
        },
        {
          name: '电商数据分析',
          path: '/celebrityAnalysis/电商数据分析',
          redirect: {
            name: "商品搜索"
          },
          component: RetailersData,
          children:[
            {
              name: '商品搜索',
              path: '/celebrityAnalysis/电商数据分析/商品搜索',
              component: GoodsSearch
            },
            {
              name: '商品排行榜',
              path: '/celebrityAnalysis/电商数据分析/商品排行榜',
              component: GoodsRank
            },
            {
              name: '电商达人排行榜',
              path: '/celebrityAnalysis/电商数据分析/电商达人排行榜',
              component:CelebrityRank
            },
            {
              name: '团购排行榜',
              path: '/celebrityAnalysis/电商数据分析/团购排行榜',
              component:GroupPurchaseRank
            }
          ]
        },
        {
          name: "微博监控",
          path: "/celebrityAnalysis/微博监控",
          component: SinaMonitor
        },
        {
          name: "个人中心",
          path: "/celebrityAnalysis/个人中心",
          component: PersonalCentre
        }
      ],
      // children:[
      //   {
      //     name: '数据统计',
      //     path: '/celebrityAnalysis/数据统计',
      //     component:DataCount
      //   },
      //   {
      //     name: '历史微博',
      //     path: '/celebrityAnalysis/历史微博',
      //     component:HistoryBlog
      //   },
      //   {
      //     name: '历史广告微博',
      //     path: '/celebrityAnalysis/历史广告微博',
      //     component:HistoryBlog
      //   },
      //   {
      //     name: '粉丝画像',
      //     path: '/celebrityAnalysis/粉丝画像',
      //     component:HistoryBlog
      //   },
      //   {
      //     name: '相似博主',
      //     path: '/celebrityAnalysis/相似博主',
      //     component:HistoryBlog
      //   },
      // ]
    },
    {
      name:"NotLogin",
      component:NotLogin,
      path:"/NotLogin"
    },
    {
      name:"NotFound",
      component:NotFound,
      path:"/NotFound"
    },
    {
      name:"MobileSign",
      path:"/m/sign",
      component: MobileLogReg,
      redirect:"/m/sign/login",
      children:[
        {
          name:"MobileLogin",
          component:MobileLogin,
          path: "/m/sign/login"
        },
        {
          name:"MobileRegister",
          component:MobileRegister,
          path: "/m/sign/register"
        }
      ]
    },
    {
      name:"MobileMainBody",
      path:"/m/main",
      component:MobileMainBody,
      redirect: {
        name: "MobileIndex"
      },
      children:[
        {
          name: "MobileIndex",
          path:"/m/main/index",
          component:MobileIndex
        },
        {
          name: "MobileCelebrityAnalysis",
          path: "/m/main/celebrityAnalysis",
          component:MobileCelebrityAnalysis,
          redirect:{
            name: "手机端博主搜索"
          },
          children:[
            {
              path:"/m/main/celebrityAnalysis/博主搜索",
              name: "手机端博主搜索",
              component:MobileBloggerSearch
            },
            {
              path:"/m/main/celebrity/Analysis/数据统计",
              name: "手机端数据统计",
              component: MobileDataCount,
              redirect:{
                name: "手机端数据分析"
              },
              children:[
                {
                  path:"/m/main/celebrityAnalysis/数据统计/手机端数据分析",
                  name: "手机端数据分析",
                  component:MobileDataAnalysis
                },
                {
                  path:"/m/main/celebrityAnalysis/数据统计/手机端历史微博",
                  name: "手机端历史微博",
                  component:MobileHistoryBlog
                },
                {
                  path:"/m/main/celebrityAnalysis/数据统计/手机端粉丝画像",
                  name: "手机端粉丝画像",
                  component:MobileFansPortrait
                }
              ]
            }
          ]
        },
        {
          name: "MobileUserIndex",
          path:"/m/main/userIndex",
          component:UserIndex
        },

      ]
    },
    {
      name: "blogIndex",
      path: '/blogIndex',
      component: BlogIndex
    },
    {
      name: "write",
      path: '/write',
      component: writeMarkdown
    },
    {
      name: "articles",
      path: '/articles/:hash',
      component:TheArticles
    },
    {
      name: 'illness',
      path: '/illness',
      component: Illness
    },
    {
      name: 'me',
      path: '/me',
      component: AboutMe
    },
    {
      name: 'pages',
      path: '/pages',
      component: ThePages
    },
    {
      name: "contact",
      path: "/contact",
      component: ContactMe
    },
    {
      name: 't',
      path: '/t',
      component: test
    }
  ]
})
