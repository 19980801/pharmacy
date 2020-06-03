import { fetch, postConfig,post } from '../http.js'

// 查询收益
export const getprofit = data => postConfig('/admin/accountChange/getAccountChangeList', data);

// 审核接口
export const updateProfit = data => postConfig('admin/accountChange/update', data);

// 全球分红
export const getprofitnum = data => post('/admin/dividend/update', data);

// 后台管理用户冻结账户拨款
export const freezeAccount = data => post('/admin/freeze/setFreezeAccount', data);
