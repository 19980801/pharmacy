import { fetch, postConfig } from '../http.js'

//查询
export const getList = data => postConfig('/admin/user/getAllUser', data);

//启用禁用
export const changeStatu = (id,status) => fetch(`/admin/user/updateUserStatus/${id}/${status}`);

//推荐关系查询
export const getrecomment = data => postConfig('/admin/user/getRecommendList', data);
