import { fetch, postConfig,post } from '../http.js'

// 获取所有课程分类
export const getCoursetypeList = data => fetch('admin/course/findAllCategory', data);

// 获取用户分类
export const getUserClass = data => fetch('admin/user/findAllCategory', data);

// 上传课程
export const addCourseData = data => postConfig('/admin/course/upload', data);