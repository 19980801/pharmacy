import { fetch, postConfig } from '../http.js'

// 列表查询
export const getList = data => postConfig(`/admin/announcement/findAll/`,data);

// 根据id查询
export const getInfo = (id) => fetch(`/admin/announcement/findOne/${id}`);

// 修改
export const updateInfo = data => postConfig("/admin/announcement/update",data);

// 新增
export const addInfo = data => postConfig("/admin/announcement/save",data);

// 删除
export const delInfo = (id) => fetch(`/admin/announcement/delete/${id}`);
