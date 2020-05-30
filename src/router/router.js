import Main from '@/views/Main.vue';
import Cookies from "js-cookie";
import {
  setStore,
  getStore,
  removeStore
} from "@/config/storage.js"

import { newsRouter } from "./news/router";
import { profitRouter } from "./profit/router";
import { contractRouter } from "./contract/router";
import { userRouter } from "./user/router";
import { systemRouter } from "./system/router";
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
let findSlideArr = [
  //用户管理
  {
    id: 213,
    path: '/user',
    icon: 'person-stalker',
    component: Main
  },
  ...userRouter,
    //合约管理
  {
    id: 215,
    path: '/contract',
    icon: 'person-stalker',
    component: Main
  },
  ...contractRouter,

  //收益管理
  {
    id:217,
    path: '/profit',
    icon: 'ios-book',
    component: Main
  },
  ...profitRouter,

  // 公告管理
  {
    id:230,
    path:"/news",
    icon:"person-stalker",
    component:Main
  },
  ...newsRouter,

    //系统管理
  {
    id: 8,
    path: '/system',
    icon: 'settings',
    component: Main
  },
  ...systemRouter
]

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => {
    require(['@/views/login.vue'], resolve);
  }
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => {
    require(['@/views/error-page/404.vue'], resolve);
  }
};

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: resolve => {
    require(['@//views/error-page/403.vue'], resolve);
  }
};

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: resolve => {
    require(['@/views/error-page/500.vue'], resolve);
  }
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: resolve => {
    require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
  }
};

let sidebarArr = JSON.parse(getStore('leftSidebarList')) || [];
let userDefinedIDArr = []; //获取所有左侧菜单的id 数组
findSlideArr.forEach(item => {
  userDefinedIDArr.push(item.id);
})

sidebarArr.forEach((item, index) => { //对左侧菜单用id字段进行过滤,前端路由没有配置的 sidebarArr数组进行删减;
  if (!userDefinedIDArr.includes(item.id)) {
    delete sidebarArr[index];
  }
})

let formateUndefinedArr = []; //获取删除后的左侧菜单数组;
sidebarArr.forEach(item => {
  formateUndefinedArr.push(item);
})

if (formateUndefinedArr.length > 0) {
  formateUndefinedArr.forEach(item => {
    let index = userDefinedIDArr.indexOf(item.id);
    item.path = findSlideArr[index].path;
    item.icon = findSlideArr[index].icon;
    item.perChildren = [...item.subMenu];
    item.children = [];
    item.component = Main
    if (item.perChildren.length > 0) {
      item.perChildren.forEach((it, index) => {
        //获取左侧菜单配置子菜单的路由信息;
        let subIndex = userDefinedIDArr.indexOf(it.id);
        if (subIndex !== -1) {
          it.icon = findSlideArr[subIndex].icon;
          it.path = findSlideArr[subIndex].path;
          it.component = findSlideArr[subIndex].component;
        } else {
          delete item.perChildren[index]
        }
      })
      item.perChildren.forEach(it => {
        item.children.push(it);
      })

    }
  })
}

export let appRouter = formateUndefinedArr;
export const clearAppRouter = () => {
  appRouter = [];
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [{
    path: 'home',
    title: '首页',
    name: 'home_index',
    // redirect: appRouter[0] ? appRouter[0].path : "/login",
    component: resolve => {
      require(['@/views/home/home.vue'], resolve);
    }
  },

  {
    path: 'system/employee/auditEmployee',
    title: '编辑用户',
    name: 'system:employee:auditEmployee',
    component: resolve => {
      require(['@/views/system/AddAuditEmployee.vue'], resolve)
    }
  },
  {
    path: '/user/personalcenter',
    title: '个人中心',
    name: 'user:personalcenter',
    component: resolve => {
      require(['@/views/user/PersonalCenter.vue'], resolve)
    }
  },
  ]
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  locking,
  ...appRouter,
  page500,
  page403,
  page404
];