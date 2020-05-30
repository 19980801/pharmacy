import { fetch, postConfig } from '../http.js'

// 查询合约列表
export const getList = () => fetch("/admin/contract/findAllContract");

// 根据id查合约
export const getContract = (id) => fetch(`/admin/contract/findContract/${id}`);

// 修改合约
export const editContract = data => postConfig('/admin/contract/updateContract', data);

// 添加合约
export const addContract = data => postConfig('/admin/contract/saveContract', data);

// 抢购批次查询
export const getBatchList = data => postConfig('/admin/contractLoot/getContractLootList', data);

// 添加批次
export const addBatch = data => postConfig('/admin/contractLoot/addContractLoot', data);

// 删除
export const delBatch = (id) => fetch(`/admin/contractLoot/deleteContractLoot/${id}`);