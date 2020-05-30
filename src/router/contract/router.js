// 班级管理
export const contractRouter = [{
    id: 216,
    path: '/contract_mgt',
    icon: 'search',
    component: resolve => {
        require(['@/views/contract/contract-mgt.vue'], resolve)
    }
},
{
    id:229,
    path:"/buy_batch",
    icon:'search',
    component: resolve => {
        require(['@/views/contract/batch.vue'], resolve)
    }
}
]