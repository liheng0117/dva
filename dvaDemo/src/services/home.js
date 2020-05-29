import { get, post } from '@/utils/request';
import api from './api'

export const getList = () => get(api.homeList)
export const addList = (payload) => post(api.addList,payload)
export const delList = (payload) => post(api.delList,payload)
export const updateList = (payload) => post(api.updateList,payload)
