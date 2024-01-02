import request from '@/util/request'

export const getTodoList = () => request.get('/todos');