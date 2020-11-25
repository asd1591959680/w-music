import {request} from './request.js'

export function getBanner(){
  return request({
    url:"/recommend/banner",
  })
}

export function getHotList(){
  return request({
    url:"/recommend/playlist/u"
  })
}
