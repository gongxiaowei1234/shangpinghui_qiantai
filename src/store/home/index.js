import {reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api";
//仓库存放的初始化数据
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[],

};
//修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    },
};
//处理actions,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //通过API里的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}) {
        let res = await reqCategoryList();
        // console.log(res);
        if (res.code == 200) {
            //提交mutation
            commit("CATEGORYLIST", res.data)
        }
    },
    //获取轮播图数据
    async getBannerList({commit}){
       let res= await reqGetBannerList()
       if(res.code==200){
        commit('GETBANNERLIST',res.data)
       }
    //    console.log(res);
    },
     //获取floor数据
     async getFloorList({commit}){
        let res= await reqGetFloorList()
        if(res.code==200){
         commit('GETFLOORLIST',res.data)
        }
        // console.log(res);
     }

};
//理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}