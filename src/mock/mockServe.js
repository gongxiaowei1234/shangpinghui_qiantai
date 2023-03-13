//先引入mockjs模块
import Mock from 'mockjs'
//把JSON数据格式引入进来
//webpack 默认对外暴露:图片，JSON数据格式
import banner from './banner.json';
import floor from './floor.json'
//模拟首页轮播图的数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})