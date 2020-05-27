export default [
    { path: '/',name:'index',component: resolve => require(['../pages/index/index.vue'], resolve) },
    { path: '/index',name:'index', component: resolve => require(['../pages/index/index.vue'], resolve) },
    { path: '/course', name:'course',component: resolve => require(['../pages/course/course.vue'], resolve) },
    { path: '/notice', name:'notice',component: resolve => require(['../pages/notice/notice.vue'], resolve) },
];