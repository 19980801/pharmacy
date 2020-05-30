// 学生管理
export const newsRouter = [{
  //学生信息管理页面
  id: 231, 
  path: '/info_mgt',
  icon: 'search',
  component: resolve => {
    require(['@/views/news/news-mgt.vue'], resolve)
  }
},
];