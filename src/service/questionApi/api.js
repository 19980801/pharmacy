import { fetch, postConfig } from '../http.js'

// 获取用户分类
export const getUserClass = data => fetch('admin/user/findAllCategory', data);

// 获取题目分类
export const getTopicType = data => fetch('admin/subject/getQuestionCategory', data);

//查询题目
export const getTopicList = data => postConfig('admin/subject/pageQuery', data);

// 上传题库
export const uploadBank = data => postConfig('admin/bank/uploadBank', data);