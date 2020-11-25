import {request} from './request.js'

export function getSearchHot(){
  return request({
    url:'/search/hot'
  })
}

export function getSearch(key,pageNo,t,pageSize){
  return request({
    url:'/search',
    params:{
      key,
      pageNo,
      t,
      pageSize
    }
  })
}

//歌手是个数组时
export function filterSinger(singer){
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach((res) =>{
    ret.push(res.name)
  })
  return ret.join('/')
}