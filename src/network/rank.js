import {request} from './request.js'

export function getRank(){
  return request({
    url:'/top/category',
    params:{
      showDetail:1
    }
  })
}

export function getTopList(id){
  return request({
    url:'/top',
    params:{
      id
    }
  })
}