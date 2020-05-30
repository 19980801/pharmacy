import { fetch, postConfig } from '../http.js'

// 学生列表查询
export const getList = () => fetch("/admin/data/findAllDic");

// 根据id查询
export const getInfo = (id) => fetch(`/admin/data/findOne/${id}`);

// 修改
export const updateInfo = data => postConfig("/admin/data/update",data);