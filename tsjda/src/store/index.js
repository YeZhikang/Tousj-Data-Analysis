import Vue from 'vue'
import Vuex from 'vuex'
import {count,increaseCount,mu_increaseCount} from "./other";

Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    baseItem:[],
    userBehavior:{
      colTypeChanges:[],
      deleteCols:[],
      analyseProcess:[],
      analyseProcessResult:[]
    },
    userInfo:{
      userName:"",
      password:""
    },
    isMobile:false,
    viewHistory:[],
    count
  },
  getters:{
    getBaseItem: state => {
      return state.baseItem
    },

  },
  mutations:{
    increaseCount,
    changeBaseItem( state,newItem){
      state.baseItem = newItem
    },
    changeColTypeChanges( state,newChanges ){
      state.userBehavior.colTypeChanges = newChanges
    },
    changeDeleteCols( state,newChanges ){
      state.userBehavior.deleteCols = newChanges
    },
    updateAnalyseProcess( state,behaviorLst ){
      state.userBehavior.analyseProcess.push(behaviorLst)
    },
    deleteAnalyseProcess( state,index ){
      state.userBehavior.analyseProcess.splice(index,1)
      state.userBehavior.analyseProcessResult.splice(index,1)
    },
    updateAnalyseProcessResult( state,resultObj ){
      state.userBehavior.analyseProcessResult.push(resultObj)
    },
    changeUserInfo( state,userInfoObj ){
      state.userInfo = userInfoObj
    },
    judgeIsMobile( state,bool ){
      state.isMobile = bool
    },
    turnToMobile( state,router ){
      if(state.isMobile){
        router.push({ name:"MobileLogin" })
      }
    },
    updateViewHistory( state,celebrityInfo ){
      const viewHistory = state.viewHistory;
      viewHistory.push(celebrityInfo);
      state.viewHistory = viewHistory
    }
  },
  actions:{
    mu_increaseCount,
    changeBaseItem(context,newItem){
      context.commit("changeBaseItem",newItem);
    },
    changeColTypeChanges( {commit}, newChanges ){
      commit("changeColTypeChanges",newChanges)
    },
    changeDeleteCols( {commit}, newChanges ){
      commit("changeDeleteCols",newChanges)
    },
    updateAnalyseProcess( {commit}, behaviorLst ){
      commit("updateAnalyseProcess",behaviorLst)
    },
    deleteAnalyseProcess( {commit}, index ){
      commit("deleteAnalyseProcess",index)
    },
    updateAnalyseProcessResult( {commit},resultObj){
      commit("updateAnalyseProcessResult",resultObj)
    },
    changeUserInfo( {commit}, userInfo ){
      commit("changeUserInfo", userInfo)
    },
  }
})

export default store
