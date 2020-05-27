export default [
    { path: '/', component: resolve => require(['../pages/index/index.vue'], resolve) },
    { path: '/index', component: resolve => require(['../pages/index/index.vue'], resolve) },
    { path: '/course', component: resolve => require(['../pages/course/course.vue'], resolve) },
    { path: '/notice', component: resolve => require(['../pages/notice/notice.vue'], resolve) },
];