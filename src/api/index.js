import http from './http'

// 登录
export const login = (params)=>http('/login', params, 'POST');

// 获取任务列表
export const getTaskList = (params)=>http('/tasks', params, 'POST');

// 查看详情
export const getTaskBill = (params)=>http('/task', params, 'POST');

// 审核/驳回
export const approval = (params)=>http('/approval', params, 'POST');

// 获取 收到/未处理 的 动作类型
export const getTaskAction = (params)=>http('/action', params, 'POST');

// 获取 流程图
export const getFlowChart = (params)=>http('/flowchart', params, 'POST');

// 获取 审批流程
export const getApproveDetail = (params)=>http('/approvedetail', params, 'POST');