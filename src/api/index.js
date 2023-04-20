import API from './request'

/**
* 根据关键词搜索影视、图书、音乐列表
*
* @params urlParams: movie、book、music
* @params key: 关键词
* @params page: 当前页码
*/ 
   
export const getSearchDataList = (params) => {
    const url = `/${params.urlParams}/list`
    return API.get({ url, params })
}