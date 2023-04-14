import API from './request'

/* 
    @@description 根据关键词搜索影视列表
    @params key: 关键词
    @params page: 当前页码
*/
export const getMoiveList = (params) => {
    return API.get({
        url: '/movie/list', 
        params
    })
}