// 收益管理
export const profitRouter = [{ 
    id: 218,
    path: '/profit_mgt',
    icon: 'search',
    component: resolve => {
        require(['@/views/profit/profit-mgt.vue'], resolve)
    }
}, 
{ 
    //全球分红
    id: 234,
    path: '/profit_global',
    icon: 'search',
    component: resolve => {
        require(['@/views/profit/profit-global.vue'], resolve)
    }
},
{ 
    //冻结打币
    id:236,
    path: '/profit_freeze',
    icon: 'search',
    component: resolve => {
        require(['@/views/profit/profit-freeze.vue'], resolve)
    }
}
]