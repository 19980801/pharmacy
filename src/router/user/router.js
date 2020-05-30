//老师管理
export const userRouter = [{
    id: 214, //查询用户页面
    path: '/userMgt',
    icon: 'search',
    component: resolve => {
        require(['@/views/userMgt/userMgt.vue'], resolve)
    }
},{
    id: 232, //推荐关系查询
    path: '/recomment',
    icon: 'search',
    component: resolve => {
        require(['@/views/userMgt/recomment.vue'], resolve)
    }
}];

