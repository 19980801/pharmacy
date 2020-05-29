export default [
    { path: '/',name:'index',component: resolve => require(['../pages/index/index.vue'], resolve) },
    { path: '/index',name:'index', component: resolve => require(['../pages/index/index.vue'], resolve) },
    // 课程
    { path: '/course', name:'course',component: resolve => require(['../pages/course/course.vue'], resolve)},
    // 购买课程
    { path: '/courseBuy', name:'course',component: resolve => require(['../pages/course/courseBuy.vue'], resolve)},
    // 课程详情
    { path: '/courseDetail', name:'course',component: resolve => require(['../pages/course/courseDetail.vue'], resolve)},
    // 课程详情
		{ path: '/detail', name:'course',component: resolve => require(['../pages/course/detail.vue'], resolve) },
    // 题库
    { path: '/question', name:'question',component: resolve => require(['../pages/question/question.vue'], resolve)},
    // 通知
    { path: '/notice', name:'notice',component: resolve => require(['../pages/notice/notice.vue'], resolve) },
    // 通知详情
    { path: '/noticeDetail', name:'noticeDetail',component: resolve => require(['../pages/notice/noticeDetail.vue'], resolve) },
		// 用户信息列表
    { path: '/mine', name:'mine',component: resolve => require(['../pages/mine/mine.vue'], resolve),
      // children: [{
      //   path: 'trade/*',
      //   component: resolve => require(['../pages/otc/Trade'], resolve),
      // }]
    },
];